"use client";

import React, { useEffect, useRef } from "react";
import { WebGLFluidPaintProps } from "./types";
import { getFluidConfig } from "./presets";

export default function WebGLFluidPaint({
  className = "absolute inset-0 w-full h-full",
  style,
  preset = "editorial",
  brushAmount,
  splatForce,
  dissipation,
  velocityDissipation,
  curl,
  pressure,
  shading,
  bloom,
  bloomIntensity,
  bloomThreshold,
  clickSplatAmount,
  triggerOnHover,
  transparent,
  backgroundColor,
  colorUpdateSpeed,
  globalEvents,
  initialSplats,
}: WebGLFluidPaintProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Merge preset defaults with explicit user prop overrides
  const resolved = getFluidConfig(preset, {
    ...(brushAmount !== undefined ? { brushAmount } : {}),
    ...(splatForce !== undefined ? { splatForce } : {}),
    ...(dissipation !== undefined ? { dissipation } : {}),
    ...(velocityDissipation !== undefined ? { velocityDissipation } : {}),
    ...(curl !== undefined ? { curl } : {}),
    ...(pressure !== undefined ? { pressure } : {}),
    ...(shading !== undefined ? { shading } : {}),
    ...(bloom !== undefined ? { bloom } : {}),
    ...(bloomIntensity !== undefined ? { bloomIntensity } : {}),
    ...(bloomThreshold !== undefined ? { bloomThreshold } : {}),
    ...(clickSplatAmount !== undefined ? { clickSplatAmount } : {}),
    ...(triggerOnHover !== undefined ? { triggerOnHover } : {}),
    ...(transparent !== undefined ? { transparent } : {}),
    ...(backgroundColor !== undefined ? { backgroundColor } : {}),
    ...(colorUpdateSpeed !== undefined ? { colorUpdateSpeed } : {}),
    ...(globalEvents !== undefined ? { globalEvents } : {}),
    ...(initialSplats !== undefined ? { initialSplats } : {}),
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasEl: HTMLCanvasElement = canvas;

    let animFrameId: number;
    let isDestroyed = false;

    // Simulation configuration state
    const config = {
      SIM_RESOLUTION: 128,
      DYE_RESOLUTION: 1024,
      DENSITY_DISSIPATION: resolved.dissipation ?? 0.88,
      VELOCITY_DISSIPATION: resolved.velocityDissipation ?? 0.2,
      PRESSURE: resolved.pressure ?? 0.8,
      PRESSURE_ITERATIONS: 20,
      CURL: resolved.curl ?? 32,
      SPLAT_RADIUS: resolved.brushAmount ?? 0.36,
      SPLAT_FORCE: resolved.splatForce ?? 6200,
      SHADING: resolved.shading ?? true,
      COLORFUL: true,
      COLOR_UPDATE_SPEED: resolved.colorUpdateSpeed ?? 10,
      PAUSED: false,
      BACK_COLOR: resolved.backgroundColor ?? { r: 5, g: 5, b: 7 },
      TRANSPARENT: resolved.transparent ?? true,
      BLOOM: resolved.bloom ?? true,
      BLOOM_ITERATIONS: 6,
      BLOOM_RESOLUTION: 256,
      BLOOM_INTENSITY: resolved.bloomIntensity ?? 0.75,
      BLOOM_THRESHOLD: resolved.bloomThreshold ?? 0.6,
      BLOOM_SOFT_KNEE: 0.7,
      CLICK_SPLATS: resolved.clickSplatAmount ?? 6,
      HOVER_TRAIL: resolved.triggerOnHover ?? true,
      GLOBAL_EVENTS: resolved.globalEvents ?? false,
      INITIAL_SPLATS: resolved.initialSplats !== undefined ? resolved.initialSplats : 3,
    };
    // Helper functions & pointers
    class Pointer {
      id = -1;
      texcoordX = 0;
      texcoordY = 0;
      prevTexcoordX = 0;
      prevTexcoordY = 0;
      deltaX = 0;
      deltaY = 0;
      down = false;
      moved = false;
      color = { r: 30, g: 0, b: 300 };
    }

    const pointers: Pointer[] = [new Pointer()];
    const splatStack: number[] = [];

    // Setup WebGL Context
    function getWebGLContext(canvasEl: HTMLCanvasElement) {
      const params = {
        alpha: true,
        depth: false,
        stencil: false,
        antialias: false,
        preserveDrawingBuffer: false,
      };

      let gl = canvasEl.getContext("webgl2", params) as WebGL2RenderingContext | null;
      const isWebGL2 = !!gl;
      if (!gl) {
        gl = (canvasEl.getContext("webgl", params) ||
          canvasEl.getContext("experimental-webgl", params)) as WebGL2RenderingContext | null;
      }

      if (!gl) return null;

      let halfFloat: any;
      let supportLinearFiltering: any;
      if (isWebGL2) {
        gl.getExtension("EXT_color_buffer_float");
        supportLinearFiltering = gl.getExtension("OES_texture_float_linear");
      } else {
        halfFloat = gl.getExtension("OES_texture_half_float");
        supportLinearFiltering = gl.getExtension("OES_texture_half_float_linear");
      }

      gl.clearColor(0.0, 0.0, 0.0, 1.0);

      const halfFloatTexType = isWebGL2
        ? gl.HALF_FLOAT
        : halfFloat
        ? halfFloat.HALF_FLOAT_OES
        : gl.FLOAT;

      function supportRenderTextureFormat(
        glCtx: WebGLRenderingContext,
        internalFormat: number,
        format: number,
        type: number
      ) {
        const texture = glCtx.createTexture();
        glCtx.bindTexture(glCtx.TEXTURE_2D, texture);
        glCtx.texParameteri(glCtx.TEXTURE_2D, glCtx.TEXTURE_MIN_FILTER, glCtx.NEAREST);
        glCtx.texParameteri(glCtx.TEXTURE_2D, glCtx.TEXTURE_MAG_FILTER, glCtx.NEAREST);
        glCtx.texParameteri(glCtx.TEXTURE_2D, glCtx.TEXTURE_WRAP_S, glCtx.CLAMP_TO_EDGE);
        glCtx.texParameteri(glCtx.TEXTURE_2D, glCtx.TEXTURE_WRAP_T, glCtx.CLAMP_TO_EDGE);
        glCtx.texImage2D(glCtx.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);

        const fbo = glCtx.createFramebuffer();
        glCtx.bindFramebuffer(glCtx.FRAMEBUFFER, fbo);
        glCtx.framebufferTexture2D(
          glCtx.FRAMEBUFFER,
          glCtx.COLOR_ATTACHMENT0,
          glCtx.TEXTURE_2D,
          texture,
          0
        );

        const status = glCtx.checkFramebufferStatus(glCtx.FRAMEBUFFER);
        return status === glCtx.FRAMEBUFFER_COMPLETE;
      }

      function getSupportedFormat(
        glCtx: any,
        internalFormat: number,
        format: number,
        type: number
      ): { internalFormat: number; format: number } | null {
        if (!supportRenderTextureFormat(glCtx, internalFormat, format, type)) {
          switch (internalFormat) {
            case glCtx.R16F:
              return getSupportedFormat(glCtx, glCtx.RG16F, glCtx.RG, type);
            case glCtx.RG16F:
              return getSupportedFormat(glCtx, glCtx.RGBA16F, glCtx.RGBA, type);
            default:
              return null;
          }
        }
        return { internalFormat, format };
      }

      let formatRGBA: any;
      let formatRG: any;
      let formatR: any;

      if (isWebGL2) {
        formatRGBA = getSupportedFormat(gl, (gl as any).RGBA16F, gl.RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(gl, (gl as any).RG16F, (gl as any).RG, halfFloatTexType);
        formatR = getSupportedFormat(gl, (gl as any).R16F, (gl as any).RED, halfFloatTexType);
      } else {
        formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
        formatR = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
      }

      return {
        gl,
        ext: {
          formatRGBA,
          formatRG,
          formatR,
          halfFloatTexType,
          supportLinearFiltering: !!supportLinearFiltering,
        },
      };
    }

    const contextData = getWebGLContext(canvas);
    if (!contextData) return;

    const { gl, ext } = contextData;

    // Helper classes for shaders & programs
    function compileShader(type: number, source: string, keywords: string[] | null = null) {
      if (keywords) {
        let keywordsString = "";
        keywords.forEach((keyword) => {
          keywordsString += "#define " + keyword + "\n";
        });
        source = keywordsString + source;
      }

      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    }

    function createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader) {
      const program = gl.createProgram()!;
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      return program;
    }

    function getUniforms(program: WebGLProgram) {
      const uniforms: Record<string, any> = {};
      const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < uniformCount; i++) {
        const uniformName = gl.getActiveUniform(program, i)!.name;
        uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
      }
      return uniforms;
    }

    class Program {
      program: WebGLProgram;
      uniforms: Record<string, any>;
      constructor(vertexShader: WebGLShader, fragmentShader: WebGLShader) {
        this.program = createProgram(vertexShader, fragmentShader);
        this.uniforms = getUniforms(this.program);
      }
      bind() {
        gl.useProgram(this.program);
      }
    }

    class Material {
      vertexShader: WebGLShader;
      fragmentShaderSource: string;
      programs: Record<number, WebGLProgram> = {};
      activeProgram: WebGLProgram | null = null;
      uniforms: Record<string, any> = {};

      constructor(vertexShader: WebGLShader, fragmentShaderSource: string) {
        this.vertexShader = vertexShader;
        this.fragmentShaderSource = fragmentShaderSource;
      }

      setKeywords(keywords: string[]) {
        let hash = 0;
        for (let i = 0; i < keywords.length; i++) {
          for (let j = 0; j < keywords[i].length; j++) {
            hash += keywords[i].charCodeAt(j);
          }
        }

        let program = this.programs[hash];
        if (!program) {
          const fragmentShader = compileShader(gl.FRAGMENT_SHADER, this.fragmentShaderSource, keywords);
          program = createProgram(this.vertexShader, fragmentShader);
          this.programs[hash] = program;
        }

        if (program === this.activeProgram) return;
        this.uniforms = getUniforms(program);
        this.activeProgram = program;
      }

      bind() {
        if (this.activeProgram) gl.useProgram(this.activeProgram);
      }
    }

    // Shaders
    const baseVertexShader = compileShader(
      gl.VERTEX_SHADER,
      `
      precision highp float;
      attribute vec2 aPosition;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform vec2 texelSize;

      void main () {
          vUv = aPosition * 0.5 + 0.5;
          vL = vUv - vec2(texelSize.x, 0.0);
          vR = vUv + vec2(texelSize.x, 0.0);
          vT = vUv + vec2(0.0, texelSize.y);
          vB = vUv - vec2(0.0, texelSize.y);
          gl_Position = vec4(aPosition, 0.0, 1.0);
      }
      `
    );

    const blurVertexShader = compileShader(
      gl.VERTEX_SHADER,
      `
      precision highp float;
      attribute vec2 aPosition;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      uniform vec2 texelSize;

      void main () {
          vUv = aPosition * 0.5 + 0.5;
          float offset = 1.33333333;
          vL = vUv - texelSize * offset;
          vR = vUv + texelSize * offset;
          gl_Position = vec4(aPosition, 0.0, 1.0);
      }
      `
    );

    const blurShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
      precision mediump float;
      precision mediump sampler2D;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      uniform sampler2D uTexture;

      void main () {
          vec4 sum = texture2D(uTexture, vUv) * 0.29411764;
          sum += texture2D(uTexture, vL) * 0.35294117;
          sum += texture2D(uTexture, vR) * 0.35294117;
          gl_FragColor = sum;
      }
      `
    );

    const copyShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      uniform sampler2D uTexture;

      void main () {
          gl_FragColor = texture2D(uTexture, vUv);
      }
      `
    );

    const clearShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      uniform sampler2D uTexture;
      uniform float value;

      void main () {
          gl_FragColor = value * texture2D(uTexture, vUv);
      }
      `
    );

    const colorShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
      precision mediump float;
      uniform vec4 color;
      void main () {
          gl_FragColor = color;
      }
      `
    );

    const splatShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      uniform sampler2D uTarget;
      uniform float aspectRatio;
      uniform vec3 color;
      uniform vec2 point;
      uniform float radius;

      void main () {
          vec2 p = vUv - point.xy;
          p.x *= aspectRatio;
          vec3 splat = exp(-dot(p, p) / radius) * color;
          vec3 base = texture2D(uTarget, vUv).xyz;
          gl_FragColor = vec4(base + splat, 1.0);
      }
      `
    );

    const advectionShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      uniform sampler2D uVelocity;
      uniform sampler2D uSource;
      uniform vec2 texelSize;
      uniform vec2 dyeTexelSize;
      uniform float dt;
      uniform float dissipation;

      vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
          vec2 st = uv / tsize - 0.5;
          vec2 iuv = floor(st);
          vec2 fuv = fract(st);
          vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
          vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
          vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
          vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);
          return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
      }

      void main () {
      #ifdef MANUAL_FILTERING
          vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
          vec4 result = bilerp(uSource, coord, dyeTexelSize);
      #else
          vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
          vec4 result = texture2D(uSource, coord);
      #endif
          float decay = 1.0 + dissipation * dt;
          gl_FragColor = result / decay;
      }
      `,
      ext.supportLinearFiltering ? null : ["MANUAL_FILTERING"]
    );

    const divergenceShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uVelocity;

      void main () {
          float L = texture2D(uVelocity, vL).x;
          float R = texture2D(uVelocity, vR).x;
          float T = texture2D(uVelocity, vT).y;
          float B = texture2D(uVelocity, vB).y;
          vec2 C = texture2D(uVelocity, vUv).xy;
          if (vL.x < 0.0) { L = -C.x; }
          if (vR.x > 1.0) { R = -C.x; }
          if (vT.y > 1.0) { T = -C.y; }
          if (vB.y < 0.0) { B = -C.y; }
          float div = 0.5 * (R - L + T - B);
          gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
      }
      `
    );

    const curlShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uVelocity;

      void main () {
          float L = texture2D(uVelocity, vL).y;
          float R = texture2D(uVelocity, vR).y;
          float T = texture2D(uVelocity, vT).x;
          float B = texture2D(uVelocity, vB).x;
          float vorticity = R - L - T + B;
          gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
      }
      `
    );

    const vorticityShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uVelocity;
      uniform sampler2D uCurl;
      uniform float curl;
      uniform float dt;

      void main () {
          float L = texture2D(uCurl, vL).x;
          float R = texture2D(uCurl, vR).x;
          float T = texture2D(uCurl, vT).x;
          float B = texture2D(uCurl, vB).x;
          float C = texture2D(uCurl, vUv).x;
          vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
          force /= length(force) + 0.0001;
          force *= curl * C;
          force.y *= -1.0;
          vec2 velocity = texture2D(uVelocity, vUv).xy;
          velocity += force * dt;
          velocity = min(max(velocity, -1000.0), 1000.0);
          gl_FragColor = vec4(velocity, 0.0, 1.0);
      }
      `
    );

    const pressureShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uDivergence;

      void main () {
          float L = texture2D(uPressure, vL).x;
          float R = texture2D(uPressure, vR).x;
          float T = texture2D(uPressure, vT).x;
          float B = texture2D(uPressure, vB).x;
          float divergence = texture2D(uDivergence, vUv).x;
          float pressure = (L + R + B + T - divergence) * 0.25;
          gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
      }
      `
    );

    const gradientSubtractShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uVelocity;

      void main () {
          float L = texture2D(uPressure, vL).x;
          float R = texture2D(uPressure, vR).x;
          float T = texture2D(uPressure, vT).x;
          float B = texture2D(uPressure, vB).x;
          vec2 velocity = texture2D(uVelocity, vUv).xy;
          velocity.xy -= vec2(R - L, T - B);
          gl_FragColor = vec4(velocity, 0.0, 1.0);
      }
      `
    );

    const displayShaderSource = `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uTexture;
      uniform sampler2D uBloom;
      uniform vec2 texelSize;

      vec3 linearToGamma (vec3 color) {
          color = max(color, vec3(0));
          return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
      }

      void main () {
          vec3 c = texture2D(uTexture, vUv).rgb;

      #ifdef SHADING
          vec3 lc = texture2D(uTexture, vL).rgb;
          vec3 rc = texture2D(uTexture, vR).rgb;
          vec3 tc = texture2D(uTexture, vT).rgb;
          vec3 bc = texture2D(uTexture, vB).rgb;
          float dx = length(rc) - length(lc);
          float dy = length(tc) - length(bc);
          vec3 n = normalize(vec3(dx, dy, length(texelSize)));
          vec3 l = vec3(0.0, 0.0, 1.0);
          float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
          c *= diffuse;
      #endif

      #ifdef BLOOM
          vec3 bloom = texture2D(uBloom, vUv).rgb;
          bloom = linearToGamma(bloom);
          c += bloom;
      #endif

          float a = max(c.r, max(c.g, c.b));
          gl_FragColor = vec4(c, a);
      }
    `;

    const bloomPrefilterShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
      precision mediump float;
      precision mediump sampler2D;
      varying vec2 vUv;
      uniform sampler2D uTexture;
      uniform vec3 curve;
      uniform float threshold;

      void main () {
          vec3 c = texture2D(uTexture, vUv).rgb;
          float br = max(c.r, max(c.g, c.b));
          float rq = clamp(br - curve.x, 0.0, curve.y);
          rq = curve.z * rq * rq;
          c *= max(rq, br - threshold) / max(br, 0.0001);
          gl_FragColor = vec4(c, 0.0);
      }
      `
    );

    const bloomBlurShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
      precision mediump float;
      precision mediump sampler2D;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uTexture;

      void main () {
          vec4 sum = vec4(0.0);
          sum += texture2D(uTexture, vL);
          sum += texture2D(uTexture, vR);
          sum += texture2D(uTexture, vT);
          sum += texture2D(uTexture, vB);
          sum *= 0.25;
          gl_FragColor = sum;
      }
      `
    );

    const bloomFinalShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
      precision mediump float;
      precision mediump sampler2D;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uTexture;
      uniform float intensity;

      void main () {
          vec4 sum = vec4(0.0);
          sum += texture2D(uTexture, vL);
          sum += texture2D(uTexture, vR);
          sum += texture2D(uTexture, vT);
          sum += texture2D(uTexture, vB);
          sum *= 0.25;
          gl_FragColor = sum * intensity;
      }
      `
    );

    // Quad geometry setup
    const blit = (() => {
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]),
        gl.STATIC_DRAW
      );
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(0);

      return (target: any = null, clear = false) => {
        if (target == null) {
          gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
          gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        } else {
          gl.viewport(0, 0, target.width, target.height);
          gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
        }
        if (clear) {
          gl.clearColor(0.0, 0.0, 0.0, 1.0);
          gl.clear(gl.COLOR_BUFFER_BIT);
        }
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
      };
    })();

    // Programs
    const blurProgram = new Program(blurVertexShader, blurShader);
    const copyProgram = new Program(baseVertexShader, copyShader);
    const clearProgram = new Program(baseVertexShader, clearShader);
    const colorProgram = new Program(baseVertexShader, colorShader);
    const splatProgram = new Program(baseVertexShader, splatShader);
    const advectionProgram = new Program(baseVertexShader, advectionShader);
    const divergenceProgram = new Program(baseVertexShader, divergenceShader);
    const curlProgram = new Program(baseVertexShader, curlShader);
    const vorticityProgram = new Program(baseVertexShader, vorticityShader);
    const pressureProgram = new Program(baseVertexShader, pressureShader);
    const gradienSubtractProgram = new Program(baseVertexShader, gradientSubtractShader);
    const bloomPrefilterProgram = new Program(baseVertexShader, bloomPrefilterShader);
    const bloomBlurProgram = new Program(baseVertexShader, bloomBlurShader);
    const bloomFinalProgram = new Program(baseVertexShader, bloomFinalShader);

    const displayMaterial = new Material(baseVertexShader, displayShaderSource);

    // Framebuffer Object helpers
    function createFBO(
      w: number,
      h: number,
      internalFormat: number,
      format: number,
      type: number,
      param: number
    ) {
      gl.activeTexture(gl.TEXTURE0);
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      gl.viewport(0, 0, w, h);
      gl.clear(gl.COLOR_BUFFER_BIT);

      return {
        texture,
        fbo,
        width: w,
        height: h,
        texelSizeX: 1.0 / w,
        texelSizeY: 1.0 / h,
        attach(id: number) {
          gl.activeTexture(gl.TEXTURE0 + id);
          gl.bindTexture(gl.TEXTURE_2D, texture);
          return id;
        },
      };
    }

    function createDoubleFBO(
      w: number,
      h: number,
      internalFormat: number,
      format: number,
      type: number,
      param: number
    ) {
      let fbo1 = createFBO(w, h, internalFormat, format, type, param);
      let fbo2 = createFBO(w, h, internalFormat, format, type, param);
      return {
        width: w,
        height: h,
        texelSizeX: fbo1.texelSizeX,
        texelSizeY: fbo1.texelSizeY,
        get read() {
          return fbo1;
        },
        set read(val) {
          fbo1 = val;
        },
        get write() {
          return fbo2;
        },
        set write(val) {
          fbo2 = val;
        },
        swap() {
          const temp = fbo1;
          fbo1 = fbo2;
          fbo2 = temp;
        },
      };
    }

    function resizeFBO(
      target: any,
      w: number,
      h: number,
      internalFormat: number,
      format: number,
      type: number,
      param: number
    ) {
      const newFBO = createFBO(w, h, internalFormat, format, type, param);
      copyProgram.bind();
      gl.uniform1i(copyProgram.uniforms.uTexture, target.attach(0));
      blit(newFBO);
      return newFBO;
    }

    function resizeDoubleFBO(
      target: any,
      w: number,
      h: number,
      internalFormat: number,
      format: number,
      type: number,
      param: number
    ) {
      if (target.width === w && target.height === h) return target;
      target.read = resizeFBO(target.read, w, h, internalFormat, format, type, param);
      target.write = createFBO(w, h, internalFormat, format, type, param);
      target.width = w;
      target.height = h;
      target.texelSizeX = 1.0 / w;
      target.texelSizeY = 1.0 / h;
      return target;
    }

    function getResolution(resolution: number) {
      let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
      if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio;
      const min = Math.round(resolution);
      const max = Math.round(resolution * aspectRatio);
      if (gl.drawingBufferWidth > gl.drawingBufferHeight) return { width: max, height: min };
      else return { width: min, height: max };
    }

    let dye: any;
    let velocity: any;
    let divergence: any;
    let curlTex: any;
    let pressureTex: any;
    let bloomFbo: any;
    const bloomFramebuffers: any[] = [];

    function initFramebuffers() {
      const simRes = getResolution(config.SIM_RESOLUTION);
      const dyeRes = getResolution(config.DYE_RESOLUTION);

      const texType = ext.halfFloatTexType;
      const rgba = ext.formatRGBA;
      const rg = ext.formatRG;
      const r = ext.formatR;
      const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

      gl.disable(gl.BLEND);

      if (!dye) {
        dye = createDoubleFBO(dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);
      } else {
        dye = resizeDoubleFBO(dye, dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);
      }

      if (!velocity) {
        velocity = createDoubleFBO(simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering);
      } else {
        velocity = resizeDoubleFBO(velocity, simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering);
      }

      divergence = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
      curlTex = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
      pressureTex = createDoubleFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);

      // Bloom framebuffers
      const bRes = getResolution(config.BLOOM_RESOLUTION);
      bloomFbo = createFBO(bRes.width, bRes.height, rgba.internalFormat, rgba.format, texType, filtering);
      bloomFramebuffers.length = 0;
      for (let i = 0; i < config.BLOOM_ITERATIONS; i++) {
        const width = bRes.width >> (i + 1);
        const height = bRes.height >> (i + 1);
        if (width < 2 || height < 2) break;
        bloomFramebuffers.push(createFBO(width, height, rgba.internalFormat, rgba.format, texType, filtering));
      }
    }

    function updateKeywords() {
      const displayKeywords: string[] = [];
      if (config.SHADING) displayKeywords.push("SHADING");
      if (config.BLOOM) displayKeywords.push("BLOOM");
      displayMaterial.setKeywords(displayKeywords);
    }

    // Color generation & math helpers
    function HSVtoRGB(h: number, s: number, v: number) {
      let r = 0, g = 0, b = 0;
      const i = Math.floor(h * 6);
      const f = h * 6 - i;
      const p = v * (1 - s);
      const q = v * (1 - f * s);
      const t = v * (1 - (1 - f) * s);
      switch (i % 6) {
        case 0: r = v; g = t; b = p; break;
        case 1: r = q; g = v; b = p; break;
        case 2: r = p; g = v; b = t; break;
        case 3: r = p; g = q; b = v; break;
        case 4: r = t; g = p; b = v; break;
        case 5: r = v; g = p; b = q; break;
      }
      return { r, g, b };
    }

    function generateColor() {
      const c = HSVtoRGB(Math.random(), 1.0, 1.0);
      c.r *= 0.18;
      c.g *= 0.18;
      c.b *= 0.18;
      return c;
    }

    function correctRadius(radius: number) {
      const aspectRatio = canvasEl.width / canvasEl.height;
      if (aspectRatio > 1) radius *= aspectRatio;
      return radius;
    }

    function splat(x: number, y: number, dx: number, dy: number, color: { r: number; g: number; b: number }) {
      splatProgram.bind();
      gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0));
      gl.uniform1f(splatProgram.uniforms.aspectRatio, canvasEl.width / canvasEl.height);
      gl.uniform2f(splatProgram.uniforms.point, x, y);
      gl.uniform3f(splatProgram.uniforms.color, dx, dy, 0.0);
      gl.uniform1f(splatProgram.uniforms.radius, correctRadius(config.SPLAT_RADIUS / 100.0));
      blit(velocity.write);
      velocity.swap();

      gl.uniform1i(splatProgram.uniforms.uTarget, dye.read.attach(0));
      gl.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b);
      blit(dye.write);
      dye.swap();
    }

    function splatPointer(pointer: Pointer) {
      const dx = pointer.deltaX * config.SPLAT_FORCE;
      const dy = pointer.deltaY * config.SPLAT_FORCE;
      splat(pointer.texcoordX, pointer.texcoordY, dx, dy, pointer.color);
    }

    function multipleSplats(amount: number) {
      const bloomScale = Math.min(Math.max(config.BLOOM_INTENSITY, 0.2), 1.2);
      const colorMult = 3.0 + bloomScale * 7.0;
      const forceScale = Math.min(Math.max(config.SPLAT_FORCE / 6200, 0.35), 1.3);
      for (let i = 0; i < amount; i++) {
        const color = generateColor();
        color.r *= colorMult;
        color.g *= colorMult;
        color.b *= colorMult;
        const x = Math.random();
        const y = Math.random();
        const dx = 1200 * forceScale * (Math.random() - 0.5);
        const dy = 1200 * forceScale * (Math.random() - 0.5);
        splat(x, y, dx, dy, color);
      }
    }

    // Step / Advection / Pressure solver
    function step(dt: number) {
      gl.disable(gl.BLEND);

      // Curl
      curlProgram.bind();
      gl.uniform2f(curlProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0));
      blit(curlTex);

      // Vorticity
      vorticityProgram.bind();
      gl.uniform2f(vorticityProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(vorticityProgram.uniforms.uCurl, curlTex.attach(1));
      gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL);
      gl.uniform1f(vorticityProgram.uniforms.dt, dt);
      blit(velocity.write);
      velocity.swap();

      // Divergence
      divergenceProgram.bind();
      gl.uniform2f(divergenceProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read.attach(0));
      blit(divergence);

      // Clear Pressure
      clearProgram.bind();
      gl.uniform1i(clearProgram.uniforms.uTexture, pressureTex.read.attach(0));
      gl.uniform1f(clearProgram.uniforms.value, config.PRESSURE);
      blit(pressureTex.write);
      pressureTex.swap();

      // Pressure Iterations
      pressureProgram.bind();
      gl.uniform2f(pressureProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(0));
      for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
        gl.uniform1i(pressureProgram.uniforms.uPressure, pressureTex.read.attach(1));
        blit(pressureTex.write);
        pressureTex.swap();
      }

      // Gradient Subtract
      gradienSubtractProgram.bind();
      gl.uniform2f(gradienSubtractProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(gradienSubtractProgram.uniforms.uPressure, pressureTex.read.attach(0));
      gl.uniform1i(gradienSubtractProgram.uniforms.uVelocity, velocity.read.attach(1));
      blit(velocity.write);
      velocity.swap();

      // Velocity Advection
      advectionProgram.bind();
      gl.uniform2f(advectionProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      if (!ext.supportLinearFiltering) {
        gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, velocity.texelSizeX, velocity.texelSizeY);
      }
      const velocityId = velocity.read.attach(0);
      gl.uniform1i(advectionProgram.uniforms.uVelocity, velocityId);
      gl.uniform1i(advectionProgram.uniforms.uSource, velocityId);
      gl.uniform1f(advectionProgram.uniforms.dt, dt);
      gl.uniform1f(advectionProgram.uniforms.dissipation, config.VELOCITY_DISSIPATION);
      blit(velocity.write);
      velocity.swap();

      // Dye Advection
      if (!ext.supportLinearFiltering) {
        gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, dye.texelSizeX, dye.texelSizeY);
      }
      gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(advectionProgram.uniforms.uSource, dye.read.attach(1));
      gl.uniform1f(advectionProgram.uniforms.dissipation, config.DENSITY_DISSIPATION);
      blit(dye.write);
      dye.swap();
    }

    function applyBloom(source: any, destination: any) {
      if (bloomFramebuffers.length < 2) return;
      let last = destination;

      gl.disable(gl.BLEND);
      bloomPrefilterProgram.bind();
      const knee = config.BLOOM_THRESHOLD * config.BLOOM_SOFT_KNEE + 0.0001;
      const curve0 = config.BLOOM_THRESHOLD - knee;
      const curve1 = knee * 2;
      const curve2 = 0.25 / knee;
      gl.uniform3f(bloomPrefilterProgram.uniforms.curve, curve0, curve1, curve2);
      gl.uniform1f(bloomPrefilterProgram.uniforms.threshold, config.BLOOM_THRESHOLD);
      gl.uniform1i(bloomPrefilterProgram.uniforms.uTexture, source.attach(0));
      blit(last);

      bloomBlurProgram.bind();
      for (let i = 0; i < bloomFramebuffers.length; i++) {
        const dest = bloomFramebuffers[i];
        gl.uniform2f(bloomBlurProgram.uniforms.texelSize, last.texelSizeX, last.texelSizeY);
        gl.uniform1i(bloomBlurProgram.uniforms.uTexture, last.attach(0));
        blit(dest);
        last = dest;
      }

      gl.blendFunc(gl.ONE, gl.ONE);
      gl.enable(gl.BLEND);

      for (let i = bloomFramebuffers.length - 2; i >= 0; i--) {
        const baseTex = bloomFramebuffers[i];
        gl.uniform2f(bloomBlurProgram.uniforms.texelSize, last.texelSizeX, last.texelSizeY);
        gl.uniform1i(bloomBlurProgram.uniforms.uTexture, last.attach(0));
        gl.viewport(0, 0, baseTex.width, baseTex.height);
        blit(baseTex);
        last = baseTex;
      }

      gl.disable(gl.BLEND);
      bloomFinalProgram.bind();
      gl.uniform2f(bloomFinalProgram.uniforms.texelSize, last.texelSizeX, last.texelSizeY);
      gl.uniform1i(bloomFinalProgram.uniforms.uTexture, last.attach(0));
      gl.uniform1f(bloomFinalProgram.uniforms.intensity, config.BLOOM_INTENSITY);
      blit(destination);
    }

    function render(target: any = null) {
      if (config.BLOOM) applyBloom(dye.read, bloomFbo);

      if (target == null || !config.TRANSPARENT) {
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.enable(gl.BLEND);
      } else {
        gl.disable(gl.BLEND);
      }

      if (!config.TRANSPARENT) {
        colorProgram.bind();
        gl.uniform4f(
          colorProgram.uniforms.color,
          config.BACK_COLOR.r / 255,
          config.BACK_COLOR.g / 255,
          config.BACK_COLOR.b / 255,
          1
        );
        blit(target);
      }

      const width = target == null ? gl.drawingBufferWidth : target.width;
      const height = target == null ? gl.drawingBufferHeight : target.height;

      displayMaterial.bind();
      if (config.SHADING) {
        gl.uniform2f(displayMaterial.uniforms.texelSize, 1.0 / width, 1.0 / height);
      }
      gl.uniform1i(displayMaterial.uniforms.uTexture, dye.read.attach(0));
      if (config.BLOOM) {
        gl.uniform1i(displayMaterial.uniforms.uBloom, bloomFbo.attach(1));
      }
      blit(target);
    }

    function resizeCanvas() {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.floor(canvasEl.clientWidth * pixelRatio);
      const height = Math.floor(canvasEl.clientHeight * pixelRatio);
      if (canvasEl.width !== width || canvasEl.height !== height) {
        canvasEl.width = width;
        canvasEl.height = height;
        return true;
      }
      return false;
    }

    function correctDeltaX(delta: number) {
      const aspectRatio = canvasEl.width / canvasEl.height;
      if (aspectRatio < 1) delta *= aspectRatio;
      return delta;
    }

    function correctDeltaY(delta: number) {
      const aspectRatio = canvasEl.width / canvasEl.height;
      if (aspectRatio > 1) delta /= aspectRatio;
      return delta;
    }

    function updatePointerDownData(pointer: Pointer, id: number, posX: number, posY: number) {
      pointer.id = id;
      pointer.down = true;
      pointer.moved = false;
      pointer.texcoordX = posX / canvasEl.width;
      pointer.texcoordY = 1.0 - posY / canvasEl.height;
      pointer.prevTexcoordX = pointer.texcoordX;
      pointer.prevTexcoordY = pointer.texcoordY;
      pointer.deltaX = 0;
      pointer.deltaY = 0;
      pointer.color = generateColor();
    }

    function updatePointerMoveData(pointer: Pointer, posX: number, posY: number) {
      pointer.prevTexcoordX = pointer.texcoordX;
      pointer.prevTexcoordY = pointer.texcoordY;
      pointer.texcoordX = posX / canvasEl.width;
      pointer.texcoordY = 1.0 - posY / canvasEl.height;
      pointer.deltaX = correctDeltaX(pointer.texcoordX - pointer.prevTexcoordX);
      pointer.deltaY = correctDeltaY(pointer.texcoordY - pointer.prevTexcoordY);
      pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;
    }

    function updatePointerUpData(pointer: Pointer) {
      pointer.down = false;
    }

    // Event handlers for mouse & touch interaction
    const getPos = (e: MouseEvent) => {
      const rect = canvasEl.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      return {
        x: (e.clientX - rect.left) * pixelRatio,
        y: (e.clientY - rect.top) * pixelRatio,
      };
    };

    const handleMouseDown = (e: MouseEvent) => {
      const { x, y } = getPos(e);
      let pointer = pointers.find((p) => p.id === -1);
      if (!pointer) {
        pointer = new Pointer();
        pointers.push(pointer);
      }
      updatePointerDownData(pointer, -1, x, y);

      // Trigger burst splash on click / tap
      splatStack.push(config.CLICK_SPLATS);
      const color = generateColor();
      const bloomScale = Math.min(Math.max(config.BLOOM_INTENSITY, 0.2), 1.2);
      const colorMult = 4.0 + bloomScale * 8.0;
      color.r *= colorMult;
      color.g *= colorMult;
      color.b *= colorMult;
      const forceScale = Math.min(Math.max(config.SPLAT_FORCE / 6200, 0.35), 1.3);
      for (let i = 0; i < config.CLICK_SPLATS; i++) {
        const dx = (Math.random() - 0.5) * (1800 * forceScale);
        const dy = (Math.random() - 0.5) * (1800 * forceScale);
        splat(pointer.texcoordX, pointer.texcoordY, dx, dy, color);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const pointer = pointers[0];
      const { x, y } = getPos(e);

      if (pointer.down) {
        // Active click & drag paint brush stroke
        updatePointerMoveData(pointer, x, y);
      } else if (config.HOVER_TRAIL) {
        // Gentle hover trail
        updatePointerMoveData(pointer, x, y);
        if (pointer.moved) {
          pointer.color = generateColor();
          splatPointer(pointer);
          pointer.moved = false;
        }
      }
    };

    const handleMouseUp = () => {
      updatePointerUpData(pointers[0]);
    };

    const handleTouchStart = (e: TouchEvent) => {
      const rect = canvasEl.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const touches = e.targetTouches;
      
      for (let i = 0; i < touches.length; i++) {
        let pointer = pointers.find((p) => p.id === touches[i].identifier);
        if (!pointer) {
          pointer = new Pointer();
          pointers.push(pointer);
        }
        const posX = (touches[i].clientX - rect.left) * pixelRatio;
        const posY = (touches[i].clientY - rect.top) * pixelRatio;
        updatePointerDownData(pointer, touches[i].identifier, posX, posY);
      }
      splatStack.push(config.CLICK_SPLATS);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const rect = canvasEl.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const touches = e.targetTouches;
      for (let i = 0; i < touches.length; i++) {
        const pointer = pointers.find((p) => p.id === touches[i].identifier);
        if (!pointer || !pointer.down) continue;
        const posX = (touches[i].clientX - rect.left) * pixelRatio;
        const posY = (touches[i].clientY - rect.top) * pixelRatio;
        updatePointerMoveData(pointer, posX, posY);
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touches = e.changedTouches;
      for (let i = 0; i < touches.length; i++) {
        const pointer = pointers.find((p) => p.id === touches[i].identifier);
        if (pointer) updatePointerUpData(pointer);
      }
    };

    if (config.GLOBAL_EVENTS) {
      window.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("touchstart", handleTouchStart, { passive: true });
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
    } else {
      canvasEl.addEventListener("mousedown", handleMouseDown);
      canvasEl.addEventListener("touchstart", handleTouchStart, { passive: true });
      canvasEl.addEventListener("touchmove", handleTouchMove, { passive: true });
    }
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleTouchEnd);

    // Initial setup
    resizeCanvas();
    updateKeywords();
    initFramebuffers();

    // Initial introductory splats
    if (config.INITIAL_SPLATS > 0) {
      multipleSplats(config.INITIAL_SPLATS);
    }

    let lastUpdateTime = Date.now();
    let colorUpdateTimer = 0.0;

    const tick = () => {
      if (isDestroyed) return;

      const now = Date.now();
      let dt = (now - lastUpdateTime) / 1000;
      dt = Math.min(dt, 0.016666);
      lastUpdateTime = now;

      if (resizeCanvas()) {
        initFramebuffers();
      }

      // Update color cycle
      if (config.COLORFUL) {
        colorUpdateTimer += dt * config.COLOR_UPDATE_SPEED;
        if (colorUpdateTimer >= 1) {
          colorUpdateTimer = 0;
          pointers.forEach((p) => {
            p.color = generateColor();
          });
        }
      }

      // Apply input strokes
      if (splatStack.length > 0) {
        multipleSplats(splatStack.pop() || 1);
      }
      pointers.forEach((p) => {
        if (p.moved) {
          p.moved = false;
          splatPointer(p);
        }
      });

      if (!config.PAUSED) {
        step(dt);
      }

      render(null);
      animFrameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      isDestroyed = true;
      cancelAnimationFrame(animFrameId);
      if (config.GLOBAL_EVENTS) {
        window.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchmove", handleTouchMove);
      } else {
        canvasEl.removeEventListener("mousedown", handleMouseDown);
        canvasEl.removeEventListener("touchstart", handleTouchStart);
        canvasEl.removeEventListener("touchmove", handleTouchMove);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [
    preset,
    brushAmount,
    splatForce,
    dissipation,
    velocityDissipation,
    curl,
    pressure,
    shading,
    bloom,
    bloomIntensity,
    bloomThreshold,
    clickSplatAmount,
    triggerOnHover,
    transparent,
    backgroundColor,
    colorUpdateSpeed,
    globalEvents,
    initialSplats,
  ]);
  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        display: "block",
        touchAction: "none",
        ...style,
      }}
    />
  );
}
