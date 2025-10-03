var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// ../../.nvm/versions/node/v22.18.0/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented, "notImplemented");
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass, "notImplementedClass");

// ../../.nvm/versions/node/v22.18.0/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry = class {
  static {
    __name(this, "PerformanceEntry");
  }
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
var PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
  static {
    __name(this, "PerformanceMark");
  }
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
var PerformanceMeasure = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceMeasure");
  }
  entryType = "measure";
};
var PerformanceResourceTiming = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceResourceTiming");
  }
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
var PerformanceObserverEntryList = class {
  static {
    __name(this, "PerformanceObserverEntryList");
  }
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
var Performance = class {
  static {
    __name(this, "Performance");
  }
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
var PerformanceObserver = class {
  static {
    __name(this, "PerformanceObserver");
  }
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();

// ../../.nvm/versions/node/v22.18.0/lib/node_modules/wrangler/node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;

// ../../.nvm/versions/node/v22.18.0/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";

// ../../.nvm/versions/node/v22.18.0/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default = Object.assign(() => {
}, { __unenv__: true });

// ../../.nvm/versions/node/v22.18.0/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/console.mjs
var _console = globalThis.console;
var _ignoreErrors = true;
var _stderr = new Writable();
var _stdout = new Writable();
var log = _console?.log ?? noop_default;
var info = _console?.info ?? log;
var trace = _console?.trace ?? info;
var debug = _console?.debug ?? log;
var table = _console?.table ?? log;
var error = _console?.error ?? log;
var warn = _console?.warn ?? error;
var createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
var clear = _console?.clear ?? noop_default;
var count = _console?.count ?? noop_default;
var countReset = _console?.countReset ?? noop_default;
var dir = _console?.dir ?? noop_default;
var dirxml = _console?.dirxml ?? noop_default;
var group = _console?.group ?? noop_default;
var groupEnd = _console?.groupEnd ?? noop_default;
var groupCollapsed = _console?.groupCollapsed ?? noop_default;
var profile = _console?.profile ?? noop_default;
var profileEnd = _console?.profileEnd ?? noop_default;
var time = _console?.time ?? noop_default;
var timeEnd = _console?.timeEnd ?? noop_default;
var timeLog = _console?.timeLog ?? noop_default;
var timeStamp = _console?.timeStamp ?? noop_default;
var Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
var _times = /* @__PURE__ */ new Map();
var _stdoutErrorHandler = noop_default;
var _stderrErrorHandler = noop_default;

// ../../.nvm/versions/node/v22.18.0/lib/node_modules/wrangler/node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole = globalThis["console"];
var {
  assert,
  clear: clear2,
  // @ts-expect-error undocumented public API
  context,
  count: count2,
  countReset: countReset2,
  // @ts-expect-error undocumented public API
  createTask: createTask2,
  debug: debug2,
  dir: dir2,
  dirxml: dirxml2,
  error: error2,
  group: group2,
  groupCollapsed: groupCollapsed2,
  groupEnd: groupEnd2,
  info: info2,
  log: log2,
  profile: profile2,
  profileEnd: profileEnd2,
  table: table2,
  time: time2,
  timeEnd: timeEnd2,
  timeLog: timeLog2,
  timeStamp: timeStamp2,
  trace: trace2,
  warn: warn2
} = workerdConsole;
Object.assign(workerdConsole, {
  Console,
  _ignoreErrors,
  _stderr,
  _stderrErrorHandler,
  _stdout,
  _stdoutErrorHandler,
  _times
});
var console_default = workerdConsole;

// ../../.nvm/versions/node/v22.18.0/lib/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
globalThis.console = console_default;

// ../../.nvm/versions/node/v22.18.0/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
  return BigInt(Date.now() * 1e6);
}, "bigint") });

// ../../.nvm/versions/node/v22.18.0/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";

// ../../.nvm/versions/node/v22.18.0/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream = class {
  static {
    __name(this, "ReadStream");
  }
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};

// ../../.nvm/versions/node/v22.18.0/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream = class {
  static {
    __name(this, "WriteStream");
  }
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir4, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env3) {
    return 1;
  }
  hasColors(count4, env3) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str2, encoding, cb) {
    if (str2 instanceof Uint8Array) {
      str2 = new TextDecoder().decode(str2);
    }
    try {
      console.log(str2);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
};

// ../../.nvm/versions/node/v22.18.0/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs
var NODE_VERSION = "22.14.0";

// ../../.nvm/versions/node/v22.18.0/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/process/process.mjs
var Process = class _Process extends EventEmitter {
  static {
    __name(this, "Process");
  }
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd3) {
    this.#cwd = cwd3;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION}`;
  }
  get versions() {
    return { node: NODE_VERSION };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw createNotImplementedError("process.kill");
  }
  abort() {
    throw createNotImplementedError("process.abort");
  }
  dlopen() {
    throw createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw createNotImplementedError("process.openStdin");
  }
  assert() {
    throw createNotImplementedError("process.assert");
  }
  binding() {
    throw createNotImplementedError("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};

// ../../.nvm/versions/node/v22.18.0/lib/node_modules/wrangler/node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var workerdProcess = getBuiltinModule("node:process");
var isWorkerdProcessV2 = globalThis.Cloudflare.compatibilityFlags.enable_nodejs_process_v2;
var unenvProcess = new Process({
  env: globalProcess.env,
  // `hrtime` is only available from workerd process v2
  hrtime: isWorkerdProcessV2 ? workerdProcess.hrtime : hrtime,
  // `nextTick` is available from workerd process v1
  nextTick: workerdProcess.nextTick
});
var { exit, features, platform } = workerdProcess;
var {
  // Always implemented by workerd
  env,
  // Only implemented in workerd v2
  hrtime: hrtime3,
  // Always implemented by workerd
  nextTick
} = unenvProcess;
var {
  _channel,
  _disconnect,
  _events,
  _eventsCount,
  _handleQueue,
  _maxListeners,
  _pendingMessage,
  _send,
  assert: assert2,
  disconnect,
  mainModule
} = unenvProcess;
var {
  // @ts-expect-error `_debugEnd` is missing typings
  _debugEnd,
  // @ts-expect-error `_debugProcess` is missing typings
  _debugProcess,
  // @ts-expect-error `_exiting` is missing typings
  _exiting,
  // @ts-expect-error `_fatalException` is missing typings
  _fatalException,
  // @ts-expect-error `_getActiveHandles` is missing typings
  _getActiveHandles,
  // @ts-expect-error `_getActiveRequests` is missing typings
  _getActiveRequests,
  // @ts-expect-error `_kill` is missing typings
  _kill,
  // @ts-expect-error `_linkedBinding` is missing typings
  _linkedBinding,
  // @ts-expect-error `_preload_modules` is missing typings
  _preload_modules,
  // @ts-expect-error `_rawDebug` is missing typings
  _rawDebug,
  // @ts-expect-error `_startProfilerIdleNotifier` is missing typings
  _startProfilerIdleNotifier,
  // @ts-expect-error `_stopProfilerIdleNotifier` is missing typings
  _stopProfilerIdleNotifier,
  // @ts-expect-error `_tickCallback` is missing typings
  _tickCallback,
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  arch,
  argv,
  argv0,
  availableMemory,
  // @ts-expect-error `binding` is missing typings
  binding,
  channel,
  chdir,
  config,
  connected,
  constrainedMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  // @ts-expect-error `domain` is missing typings
  domain,
  emit,
  emitWarning,
  eventNames,
  execArgv,
  execPath,
  exitCode,
  finalization,
  getActiveResourcesInfo,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getMaxListeners,
  getuid,
  hasUncaughtExceptionCaptureCallback,
  // @ts-expect-error `initgroups` is missing typings
  initgroups,
  kill,
  listenerCount,
  listeners,
  loadEnvFile,
  memoryUsage,
  // @ts-expect-error `moduleLoadList` is missing typings
  moduleLoadList,
  off,
  on,
  once,
  // @ts-expect-error `openStdin` is missing typings
  openStdin,
  permission,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  // @ts-expect-error `reallyExit` is missing typings
  reallyExit,
  ref,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  send,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setMaxListeners,
  setSourceMapsEnabled,
  setuid,
  setUncaughtExceptionCaptureCallback,
  sourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  throwDeprecation,
  title,
  traceDeprecation,
  umask,
  unref,
  uptime,
  version,
  versions
} = isWorkerdProcessV2 ? workerdProcess : unenvProcess;
var _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
var process_default = _process;

// ../../.nvm/versions/node/v22.18.0/lib/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
globalThis.process = process_default;

// .wrangler/tmp/pages-Qylb6p/functionsWorker-0.3502491602836484.mjs
import { Writable as Writable2 } from "node:stream";
import { EventEmitter as EventEmitter2 } from "node:events";
import libDefault from "events";
import libDefault2 from "util";
import libDefault3 from "crypto";
import libDefault4 from "dns";
import libDefault5 from "net";
import libDefault6 from "tls";
import libDefault7 from "path";
import libDefault8 from "stream";
import libDefault9 from "string_decoder";
var __create = Object.create;
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
var __require2 = /* @__PURE__ */ ((x) => typeof __require !== "undefined" ? __require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: /* @__PURE__ */ __name((a, b) => (typeof __require !== "undefined" ? __require : a)[b], "get")
}) : x)(function(x) {
  if (typeof __require !== "undefined") return __require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = /* @__PURE__ */ __name((fn, res) => /* @__PURE__ */ __name(function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
}, "__init"), "__esm");
var __commonJS = /* @__PURE__ */ __name((cb, mod) => /* @__PURE__ */ __name(function __require22() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
}, "__require2"), "__commonJS");
var __export = /* @__PURE__ */ __name((target, all) => {
  for (var name in all)
    __defProp2(target, name, { get: all[name], enumerable: true });
}, "__export");
var __copyProps = /* @__PURE__ */ __name((to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp2(to, key, { get: /* @__PURE__ */ __name(() => from[key], "get"), enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
}, "__copyProps");
var __toESM = /* @__PURE__ */ __name((mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target,
  mod
)), "__toESM");
// @__NO_SIDE_EFFECTS__
function createNotImplementedError2(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError2, "createNotImplementedError");
// @__NO_SIDE_EFFECTS__
function notImplemented2(name) {
  const fn = /* @__PURE__ */ __name2(() => {
    throw /* @__PURE__ */ createNotImplementedError2(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented2, "notImplemented");
// @__NO_SIDE_EFFECTS__
function notImplementedAsync(name) {
  const fn = /* @__PURE__ */ notImplemented2(name);
  fn.__promisify__ = () => /* @__PURE__ */ notImplemented2(name + ".__promisify__");
  fn.native = fn;
  return fn;
}
__name(notImplementedAsync, "notImplementedAsync");
// @__NO_SIDE_EFFECTS__
function notImplementedClass2(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass2, "notImplementedClass");
var init_utils = __esm({
  "../../../.nvm/versions/node/v22.18.0/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/_internal/utils.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    __name2(createNotImplementedError2, "createNotImplementedError");
    __name2(notImplemented2, "notImplemented");
    __name2(notImplementedAsync, "notImplementedAsync");
    __name2(notImplementedClass2, "notImplementedClass");
  }
});
var _timeOrigin2;
var _performanceNow2;
var nodeTiming2;
var PerformanceEntry2;
var PerformanceMark3;
var PerformanceMeasure2;
var PerformanceResourceTiming2;
var PerformanceObserverEntryList2;
var Performance2;
var PerformanceObserver2;
var performance2;
var init_performance = __esm({
  "../../../.nvm/versions/node/v22.18.0/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    _timeOrigin2 = globalThis.performance?.timeOrigin ?? Date.now();
    _performanceNow2 = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin2;
    nodeTiming2 = {
      name: "node",
      entryType: "node",
      startTime: 0,
      duration: 0,
      nodeStart: 0,
      v8Start: 0,
      bootstrapComplete: 0,
      environment: 0,
      loopStart: 0,
      loopExit: 0,
      idleTime: 0,
      uvMetricsInfo: {
        loopCount: 0,
        events: 0,
        eventsWaiting: 0
      },
      detail: void 0,
      toJSON() {
        return this;
      }
    };
    PerformanceEntry2 = class {
      static {
        __name(this, "PerformanceEntry");
      }
      static {
        __name2(this, "PerformanceEntry");
      }
      __unenv__ = true;
      detail;
      entryType = "event";
      name;
      startTime;
      constructor(name, options) {
        this.name = name;
        this.startTime = options?.startTime || _performanceNow2();
        this.detail = options?.detail;
      }
      get duration() {
        return _performanceNow2() - this.startTime;
      }
      toJSON() {
        return {
          name: this.name,
          entryType: this.entryType,
          startTime: this.startTime,
          duration: this.duration,
          detail: this.detail
        };
      }
    };
    PerformanceMark3 = class PerformanceMark2 extends PerformanceEntry2 {
      static {
        __name(this, "PerformanceMark2");
      }
      static {
        __name2(this, "PerformanceMark");
      }
      entryType = "mark";
      constructor() {
        super(...arguments);
      }
      get duration() {
        return 0;
      }
    };
    PerformanceMeasure2 = class extends PerformanceEntry2 {
      static {
        __name(this, "PerformanceMeasure");
      }
      static {
        __name2(this, "PerformanceMeasure");
      }
      entryType = "measure";
    };
    PerformanceResourceTiming2 = class extends PerformanceEntry2 {
      static {
        __name(this, "PerformanceResourceTiming");
      }
      static {
        __name2(this, "PerformanceResourceTiming");
      }
      entryType = "resource";
      serverTiming = [];
      connectEnd = 0;
      connectStart = 0;
      decodedBodySize = 0;
      domainLookupEnd = 0;
      domainLookupStart = 0;
      encodedBodySize = 0;
      fetchStart = 0;
      initiatorType = "";
      name = "";
      nextHopProtocol = "";
      redirectEnd = 0;
      redirectStart = 0;
      requestStart = 0;
      responseEnd = 0;
      responseStart = 0;
      secureConnectionStart = 0;
      startTime = 0;
      transferSize = 0;
      workerStart = 0;
      responseStatus = 0;
    };
    PerformanceObserverEntryList2 = class {
      static {
        __name(this, "PerformanceObserverEntryList");
      }
      static {
        __name2(this, "PerformanceObserverEntryList");
      }
      __unenv__ = true;
      getEntries() {
        return [];
      }
      getEntriesByName(_name, _type) {
        return [];
      }
      getEntriesByType(type) {
        return [];
      }
    };
    Performance2 = class {
      static {
        __name(this, "Performance");
      }
      static {
        __name2(this, "Performance");
      }
      __unenv__ = true;
      timeOrigin = _timeOrigin2;
      eventCounts = /* @__PURE__ */ new Map();
      _entries = [];
      _resourceTimingBufferSize = 0;
      navigation = void 0;
      timing = void 0;
      timerify(_fn, _options) {
        throw /* @__PURE__ */ createNotImplementedError2("Performance.timerify");
      }
      get nodeTiming() {
        return nodeTiming2;
      }
      eventLoopUtilization() {
        return {};
      }
      markResourceTiming() {
        return new PerformanceResourceTiming2("");
      }
      onresourcetimingbufferfull = null;
      now() {
        if (this.timeOrigin === _timeOrigin2) {
          return _performanceNow2();
        }
        return Date.now() - this.timeOrigin;
      }
      clearMarks(markName) {
        this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
      }
      clearMeasures(measureName) {
        this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
      }
      clearResourceTimings() {
        this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
      }
      getEntries() {
        return this._entries;
      }
      getEntriesByName(name, type) {
        return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
      }
      getEntriesByType(type) {
        return this._entries.filter((e) => e.entryType === type);
      }
      mark(name, options) {
        const entry = new PerformanceMark3(name, options);
        this._entries.push(entry);
        return entry;
      }
      measure(measureName, startOrMeasureOptions, endMark) {
        let start;
        let end;
        if (typeof startOrMeasureOptions === "string") {
          start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
          end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
        } else {
          start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
          end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
        }
        const entry = new PerformanceMeasure2(measureName, {
          startTime: start,
          detail: {
            start,
            end
          }
        });
        this._entries.push(entry);
        return entry;
      }
      setResourceTimingBufferSize(maxSize) {
        this._resourceTimingBufferSize = maxSize;
      }
      addEventListener(type, listener, options) {
        throw /* @__PURE__ */ createNotImplementedError2("Performance.addEventListener");
      }
      removeEventListener(type, listener, options) {
        throw /* @__PURE__ */ createNotImplementedError2("Performance.removeEventListener");
      }
      dispatchEvent(event) {
        throw /* @__PURE__ */ createNotImplementedError2("Performance.dispatchEvent");
      }
      toJSON() {
        return this;
      }
    };
    PerformanceObserver2 = class {
      static {
        __name(this, "PerformanceObserver");
      }
      static {
        __name2(this, "PerformanceObserver");
      }
      __unenv__ = true;
      static supportedEntryTypes = [];
      _callback = null;
      constructor(callback) {
        this._callback = callback;
      }
      takeRecords() {
        return [];
      }
      disconnect() {
        throw /* @__PURE__ */ createNotImplementedError2("PerformanceObserver.disconnect");
      }
      observe(options) {
        throw /* @__PURE__ */ createNotImplementedError2("PerformanceObserver.observe");
      }
      bind(fn) {
        return fn;
      }
      runInAsyncScope(fn, thisArg, ...args) {
        return fn.call(thisArg, ...args);
      }
      asyncId() {
        return 0;
      }
      triggerAsyncId() {
        return 0;
      }
      emitDestroy() {
        return this;
      }
    };
    performance2 = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance2();
  }
});
var init_perf_hooks = __esm({
  "../../../.nvm/versions/node/v22.18.0/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/perf_hooks.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_performance();
  }
});
var init_performance2 = __esm({
  "../../../.nvm/versions/node/v22.18.0/lib/node_modules/wrangler/node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs"() {
    init_perf_hooks();
    globalThis.performance = performance2;
    globalThis.Performance = Performance2;
    globalThis.PerformanceEntry = PerformanceEntry2;
    globalThis.PerformanceMark = PerformanceMark3;
    globalThis.PerformanceMeasure = PerformanceMeasure2;
    globalThis.PerformanceObserver = PerformanceObserver2;
    globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList2;
    globalThis.PerformanceResourceTiming = PerformanceResourceTiming2;
  }
});
var noop_default2;
var init_noop = __esm({
  "../../../.nvm/versions/node/v22.18.0/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/mock/noop.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    noop_default2 = Object.assign(() => {
    }, { __unenv__: true });
  }
});
var _console2;
var _ignoreErrors2;
var _stderr2;
var _stdout2;
var log3;
var info3;
var trace3;
var debug3;
var table3;
var error3;
var warn3;
var createTask3;
var clear3;
var count3;
var countReset3;
var dir3;
var dirxml3;
var group3;
var groupEnd3;
var groupCollapsed3;
var profile3;
var profileEnd3;
var time3;
var timeEnd3;
var timeLog3;
var timeStamp3;
var Console2;
var _times2;
var _stdoutErrorHandler2;
var _stderrErrorHandler2;
var init_console = __esm({
  "../../../.nvm/versions/node/v22.18.0/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/console.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_noop();
    init_utils();
    _console2 = globalThis.console;
    _ignoreErrors2 = true;
    _stderr2 = new Writable2();
    _stdout2 = new Writable2();
    log3 = _console2?.log ?? noop_default2;
    info3 = _console2?.info ?? log3;
    trace3 = _console2?.trace ?? info3;
    debug3 = _console2?.debug ?? log3;
    table3 = _console2?.table ?? log3;
    error3 = _console2?.error ?? log3;
    warn3 = _console2?.warn ?? error3;
    createTask3 = _console2?.createTask ?? /* @__PURE__ */ notImplemented2("console.createTask");
    clear3 = _console2?.clear ?? noop_default2;
    count3 = _console2?.count ?? noop_default2;
    countReset3 = _console2?.countReset ?? noop_default2;
    dir3 = _console2?.dir ?? noop_default2;
    dirxml3 = _console2?.dirxml ?? noop_default2;
    group3 = _console2?.group ?? noop_default2;
    groupEnd3 = _console2?.groupEnd ?? noop_default2;
    groupCollapsed3 = _console2?.groupCollapsed ?? noop_default2;
    profile3 = _console2?.profile ?? noop_default2;
    profileEnd3 = _console2?.profileEnd ?? noop_default2;
    time3 = _console2?.time ?? noop_default2;
    timeEnd3 = _console2?.timeEnd ?? noop_default2;
    timeLog3 = _console2?.timeLog ?? noop_default2;
    timeStamp3 = _console2?.timeStamp ?? noop_default2;
    Console2 = _console2?.Console ?? /* @__PURE__ */ notImplementedClass2("console.Console");
    _times2 = /* @__PURE__ */ new Map();
    _stdoutErrorHandler2 = noop_default2;
    _stderrErrorHandler2 = noop_default2;
  }
});
var workerdConsole2;
var assert3;
var clear22;
var context2;
var count22;
var countReset22;
var createTask22;
var debug22;
var dir22;
var dirxml22;
var error22;
var group22;
var groupCollapsed22;
var groupEnd22;
var info22;
var log22;
var profile22;
var profileEnd22;
var table22;
var time22;
var timeEnd22;
var timeLog22;
var timeStamp22;
var trace22;
var warn22;
var console_default2;
var init_console2 = __esm({
  "../../../.nvm/versions/node/v22.18.0/lib/node_modules/wrangler/node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_console();
    workerdConsole2 = globalThis["console"];
    ({
      assert: assert3,
      clear: clear22,
      context: (
        // @ts-expect-error undocumented public API
        context2
      ),
      count: count22,
      countReset: countReset22,
      createTask: (
        // @ts-expect-error undocumented public API
        createTask22
      ),
      debug: debug22,
      dir: dir22,
      dirxml: dirxml22,
      error: error22,
      group: group22,
      groupCollapsed: groupCollapsed22,
      groupEnd: groupEnd22,
      info: info22,
      log: log22,
      profile: profile22,
      profileEnd: profileEnd22,
      table: table22,
      time: time22,
      timeEnd: timeEnd22,
      timeLog: timeLog22,
      timeStamp: timeStamp22,
      trace: trace22,
      warn: warn22
    } = workerdConsole2);
    Object.assign(workerdConsole2, {
      Console: Console2,
      _ignoreErrors: _ignoreErrors2,
      _stderr: _stderr2,
      _stderrErrorHandler: _stderrErrorHandler2,
      _stdout: _stdout2,
      _stdoutErrorHandler: _stdoutErrorHandler2,
      _times: _times2
    });
    console_default2 = workerdConsole2;
  }
});
var init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console = __esm({
  "../../../.nvm/versions/node/v22.18.0/lib/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console"() {
    init_console2();
    globalThis.console = console_default2;
  }
});
var hrtime4;
var init_hrtime = __esm({
  "../../../.nvm/versions/node/v22.18.0/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    hrtime4 = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name2(/* @__PURE__ */ __name(function hrtime22(startTime) {
      const now = Date.now();
      const seconds = Math.trunc(now / 1e3);
      const nanos = now % 1e3 * 1e6;
      if (startTime) {
        let diffSeconds = seconds - startTime[0];
        let diffNanos = nanos - startTime[0];
        if (diffNanos < 0) {
          diffSeconds = diffSeconds - 1;
          diffNanos = 1e9 + diffNanos;
        }
        return [diffSeconds, diffNanos];
      }
      return [seconds, nanos];
    }, "hrtime2"), "hrtime"), { bigint: /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function bigint2() {
      return BigInt(Date.now() * 1e6);
    }, "bigint"), "bigint") });
  }
});
var ReadStream2;
var init_read_stream = __esm({
  "../../../.nvm/versions/node/v22.18.0/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    ReadStream2 = class {
      static {
        __name(this, "ReadStream");
      }
      static {
        __name2(this, "ReadStream");
      }
      fd;
      isRaw = false;
      isTTY = false;
      constructor(fd) {
        this.fd = fd;
      }
      setRawMode(mode) {
        this.isRaw = mode;
        return this;
      }
    };
  }
});
var WriteStream2;
var init_write_stream = __esm({
  "../../../.nvm/versions/node/v22.18.0/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    WriteStream2 = class {
      static {
        __name(this, "WriteStream");
      }
      static {
        __name2(this, "WriteStream");
      }
      fd;
      columns = 80;
      rows = 24;
      isTTY = false;
      constructor(fd) {
        this.fd = fd;
      }
      clearLine(dir32, callback) {
        callback && callback();
        return false;
      }
      clearScreenDown(callback) {
        callback && callback();
        return false;
      }
      cursorTo(x, y, callback) {
        callback && typeof callback === "function" && callback();
        return false;
      }
      moveCursor(dx, dy, callback) {
        callback && callback();
        return false;
      }
      getColorDepth(env22) {
        return 1;
      }
      hasColors(count32, env22) {
        return false;
      }
      getWindowSize() {
        return [this.columns, this.rows];
      }
      write(str2, encoding, cb) {
        if (str2 instanceof Uint8Array) {
          str2 = new TextDecoder().decode(str2);
        }
        try {
          console.log(str2);
        } catch {
        }
        cb && typeof cb === "function" && cb();
        return false;
      }
    };
  }
});
var init_tty = __esm({
  "../../../.nvm/versions/node/v22.18.0/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/tty.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_read_stream();
    init_write_stream();
  }
});
var NODE_VERSION2;
var init_node_version = __esm({
  "../../../.nvm/versions/node/v22.18.0/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    NODE_VERSION2 = "22.14.0";
  }
});
var Process2;
var init_process = __esm({
  "../../../.nvm/versions/node/v22.18.0/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/process/process.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_tty();
    init_utils();
    init_node_version();
    Process2 = class _Process extends EventEmitter2 {
      static {
        __name(this, "_Process");
      }
      static {
        __name2(this, "Process");
      }
      env;
      hrtime;
      nextTick;
      constructor(impl) {
        super();
        this.env = impl.env;
        this.hrtime = impl.hrtime;
        this.nextTick = impl.nextTick;
        for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter2.prototype)]) {
          const value = this[prop];
          if (typeof value === "function") {
            this[prop] = value.bind(this);
          }
        }
      }
      // --- event emitter ---
      emitWarning(warning, type, code) {
        console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
      }
      emit(...args) {
        return super.emit(...args);
      }
      listeners(eventName) {
        return super.listeners(eventName);
      }
      // --- stdio (lazy initializers) ---
      #stdin;
      #stdout;
      #stderr;
      get stdin() {
        return this.#stdin ??= new ReadStream2(0);
      }
      get stdout() {
        return this.#stdout ??= new WriteStream2(1);
      }
      get stderr() {
        return this.#stderr ??= new WriteStream2(2);
      }
      // --- cwd ---
      #cwd = "/";
      chdir(cwd22) {
        this.#cwd = cwd22;
      }
      cwd() {
        return this.#cwd;
      }
      // --- dummy props and getters ---
      arch = "";
      platform = "";
      argv = [];
      argv0 = "";
      execArgv = [];
      execPath = "";
      title = "";
      pid = 200;
      ppid = 100;
      get version() {
        return `v${NODE_VERSION2}`;
      }
      get versions() {
        return { node: NODE_VERSION2 };
      }
      get allowedNodeEnvironmentFlags() {
        return /* @__PURE__ */ new Set();
      }
      get sourceMapsEnabled() {
        return false;
      }
      get debugPort() {
        return 0;
      }
      get throwDeprecation() {
        return false;
      }
      get traceDeprecation() {
        return false;
      }
      get features() {
        return {};
      }
      get release() {
        return {};
      }
      get connected() {
        return false;
      }
      get config() {
        return {};
      }
      get moduleLoadList() {
        return [];
      }
      constrainedMemory() {
        return 0;
      }
      availableMemory() {
        return 0;
      }
      uptime() {
        return 0;
      }
      resourceUsage() {
        return {};
      }
      // --- noop methods ---
      ref() {
      }
      unref() {
      }
      // --- unimplemented methods ---
      umask() {
        throw /* @__PURE__ */ createNotImplementedError2("process.umask");
      }
      getBuiltinModule() {
        return void 0;
      }
      getActiveResourcesInfo() {
        throw /* @__PURE__ */ createNotImplementedError2("process.getActiveResourcesInfo");
      }
      exit() {
        throw /* @__PURE__ */ createNotImplementedError2("process.exit");
      }
      reallyExit() {
        throw /* @__PURE__ */ createNotImplementedError2("process.reallyExit");
      }
      kill() {
        throw /* @__PURE__ */ createNotImplementedError2("process.kill");
      }
      abort() {
        throw /* @__PURE__ */ createNotImplementedError2("process.abort");
      }
      dlopen() {
        throw /* @__PURE__ */ createNotImplementedError2("process.dlopen");
      }
      setSourceMapsEnabled() {
        throw /* @__PURE__ */ createNotImplementedError2("process.setSourceMapsEnabled");
      }
      loadEnvFile() {
        throw /* @__PURE__ */ createNotImplementedError2("process.loadEnvFile");
      }
      disconnect() {
        throw /* @__PURE__ */ createNotImplementedError2("process.disconnect");
      }
      cpuUsage() {
        throw /* @__PURE__ */ createNotImplementedError2("process.cpuUsage");
      }
      setUncaughtExceptionCaptureCallback() {
        throw /* @__PURE__ */ createNotImplementedError2("process.setUncaughtExceptionCaptureCallback");
      }
      hasUncaughtExceptionCaptureCallback() {
        throw /* @__PURE__ */ createNotImplementedError2("process.hasUncaughtExceptionCaptureCallback");
      }
      initgroups() {
        throw /* @__PURE__ */ createNotImplementedError2("process.initgroups");
      }
      openStdin() {
        throw /* @__PURE__ */ createNotImplementedError2("process.openStdin");
      }
      assert() {
        throw /* @__PURE__ */ createNotImplementedError2("process.assert");
      }
      binding() {
        throw /* @__PURE__ */ createNotImplementedError2("process.binding");
      }
      // --- attached interfaces ---
      permission = { has: /* @__PURE__ */ notImplemented2("process.permission.has") };
      report = {
        directory: "",
        filename: "",
        signal: "SIGUSR2",
        compact: false,
        reportOnFatalError: false,
        reportOnSignal: false,
        reportOnUncaughtException: false,
        getReport: /* @__PURE__ */ notImplemented2("process.report.getReport"),
        writeReport: /* @__PURE__ */ notImplemented2("process.report.writeReport")
      };
      finalization = {
        register: /* @__PURE__ */ notImplemented2("process.finalization.register"),
        unregister: /* @__PURE__ */ notImplemented2("process.finalization.unregister"),
        registerBeforeExit: /* @__PURE__ */ notImplemented2("process.finalization.registerBeforeExit")
      };
      memoryUsage = Object.assign(() => ({
        arrayBuffers: 0,
        rss: 0,
        external: 0,
        heapTotal: 0,
        heapUsed: 0
      }), { rss: /* @__PURE__ */ __name2(() => 0, "rss") });
      // --- undefined props ---
      mainModule = void 0;
      domain = void 0;
      // optional
      send = void 0;
      exitCode = void 0;
      channel = void 0;
      getegid = void 0;
      geteuid = void 0;
      getgid = void 0;
      getgroups = void 0;
      getuid = void 0;
      setegid = void 0;
      seteuid = void 0;
      setgid = void 0;
      setgroups = void 0;
      setuid = void 0;
      // internals
      _events = void 0;
      _eventsCount = void 0;
      _exiting = void 0;
      _maxListeners = void 0;
      _debugEnd = void 0;
      _debugProcess = void 0;
      _fatalException = void 0;
      _getActiveHandles = void 0;
      _getActiveRequests = void 0;
      _kill = void 0;
      _preload_modules = void 0;
      _rawDebug = void 0;
      _startProfilerIdleNotifier = void 0;
      _stopProfilerIdleNotifier = void 0;
      _tickCallback = void 0;
      _disconnect = void 0;
      _handleQueue = void 0;
      _pendingMessage = void 0;
      _channel = void 0;
      _send = void 0;
      _linkedBinding = void 0;
    };
  }
});
var globalProcess2;
var getBuiltinModule2;
var workerdProcess2;
var isWorkerdProcessV22;
var unenvProcess2;
var exit2;
var features2;
var platform2;
var env2;
var hrtime32;
var nextTick2;
var _channel2;
var _disconnect2;
var _events2;
var _eventsCount2;
var _handleQueue2;
var _maxListeners2;
var _pendingMessage2;
var _send2;
var assert22;
var disconnect2;
var mainModule2;
var _debugEnd2;
var _debugProcess2;
var _exiting2;
var _fatalException2;
var _getActiveHandles2;
var _getActiveRequests2;
var _kill2;
var _linkedBinding2;
var _preload_modules2;
var _rawDebug2;
var _startProfilerIdleNotifier2;
var _stopProfilerIdleNotifier2;
var _tickCallback2;
var abort2;
var addListener2;
var allowedNodeEnvironmentFlags2;
var arch2;
var argv2;
var argv02;
var availableMemory2;
var binding2;
var channel2;
var chdir2;
var config2;
var connected2;
var constrainedMemory2;
var cpuUsage2;
var cwd2;
var debugPort2;
var dlopen2;
var domain2;
var emit2;
var emitWarning2;
var eventNames2;
var execArgv2;
var execPath2;
var exitCode2;
var finalization2;
var getActiveResourcesInfo2;
var getegid2;
var geteuid2;
var getgid2;
var getgroups2;
var getMaxListeners2;
var getuid2;
var hasUncaughtExceptionCaptureCallback2;
var initgroups2;
var kill2;
var listenerCount2;
var listeners2;
var loadEnvFile2;
var memoryUsage2;
var moduleLoadList2;
var off2;
var on2;
var once2;
var openStdin2;
var permission2;
var pid2;
var ppid2;
var prependListener2;
var prependOnceListener2;
var rawListeners2;
var reallyExit2;
var ref2;
var release2;
var removeAllListeners2;
var removeListener2;
var report2;
var resourceUsage2;
var send2;
var setegid2;
var seteuid2;
var setgid2;
var setgroups2;
var setMaxListeners2;
var setSourceMapsEnabled2;
var setuid2;
var setUncaughtExceptionCaptureCallback2;
var sourceMapsEnabled2;
var stderr2;
var stdin2;
var stdout2;
var throwDeprecation2;
var title2;
var traceDeprecation2;
var umask2;
var unref2;
var uptime2;
var version2;
var versions2;
var _process2;
var process_default2;
var init_process2 = __esm({
  "../../../.nvm/versions/node/v22.18.0/lib/node_modules/wrangler/node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_hrtime();
    init_process();
    globalProcess2 = globalThis["process"];
    getBuiltinModule2 = globalProcess2.getBuiltinModule;
    workerdProcess2 = getBuiltinModule2("node:process");
    isWorkerdProcessV22 = globalThis.Cloudflare.compatibilityFlags.enable_nodejs_process_v2;
    unenvProcess2 = new Process2({
      env: globalProcess2.env,
      // `hrtime` is only available from workerd process v2
      hrtime: isWorkerdProcessV22 ? workerdProcess2.hrtime : hrtime4,
      // `nextTick` is available from workerd process v1
      nextTick: workerdProcess2.nextTick
    });
    ({ exit: exit2, features: features2, platform: platform2 } = workerdProcess2);
    ({
      env: (
        // Always implemented by workerd
        env2
      ),
      hrtime: (
        // Only implemented in workerd v2
        hrtime32
      ),
      nextTick: (
        // Always implemented by workerd
        nextTick2
      )
    } = unenvProcess2);
    ({
      _channel: _channel2,
      _disconnect: _disconnect2,
      _events: _events2,
      _eventsCount: _eventsCount2,
      _handleQueue: _handleQueue2,
      _maxListeners: _maxListeners2,
      _pendingMessage: _pendingMessage2,
      _send: _send2,
      assert: assert22,
      disconnect: disconnect2,
      mainModule: mainModule2
    } = unenvProcess2);
    ({
      _debugEnd: (
        // @ts-expect-error `_debugEnd` is missing typings
        _debugEnd2
      ),
      _debugProcess: (
        // @ts-expect-error `_debugProcess` is missing typings
        _debugProcess2
      ),
      _exiting: (
        // @ts-expect-error `_exiting` is missing typings
        _exiting2
      ),
      _fatalException: (
        // @ts-expect-error `_fatalException` is missing typings
        _fatalException2
      ),
      _getActiveHandles: (
        // @ts-expect-error `_getActiveHandles` is missing typings
        _getActiveHandles2
      ),
      _getActiveRequests: (
        // @ts-expect-error `_getActiveRequests` is missing typings
        _getActiveRequests2
      ),
      _kill: (
        // @ts-expect-error `_kill` is missing typings
        _kill2
      ),
      _linkedBinding: (
        // @ts-expect-error `_linkedBinding` is missing typings
        _linkedBinding2
      ),
      _preload_modules: (
        // @ts-expect-error `_preload_modules` is missing typings
        _preload_modules2
      ),
      _rawDebug: (
        // @ts-expect-error `_rawDebug` is missing typings
        _rawDebug2
      ),
      _startProfilerIdleNotifier: (
        // @ts-expect-error `_startProfilerIdleNotifier` is missing typings
        _startProfilerIdleNotifier2
      ),
      _stopProfilerIdleNotifier: (
        // @ts-expect-error `_stopProfilerIdleNotifier` is missing typings
        _stopProfilerIdleNotifier2
      ),
      _tickCallback: (
        // @ts-expect-error `_tickCallback` is missing typings
        _tickCallback2
      ),
      abort: abort2,
      addListener: addListener2,
      allowedNodeEnvironmentFlags: allowedNodeEnvironmentFlags2,
      arch: arch2,
      argv: argv2,
      argv0: argv02,
      availableMemory: availableMemory2,
      binding: (
        // @ts-expect-error `binding` is missing typings
        binding2
      ),
      channel: channel2,
      chdir: chdir2,
      config: config2,
      connected: connected2,
      constrainedMemory: constrainedMemory2,
      cpuUsage: cpuUsage2,
      cwd: cwd2,
      debugPort: debugPort2,
      dlopen: dlopen2,
      domain: (
        // @ts-expect-error `domain` is missing typings
        domain2
      ),
      emit: emit2,
      emitWarning: emitWarning2,
      eventNames: eventNames2,
      execArgv: execArgv2,
      execPath: execPath2,
      exitCode: exitCode2,
      finalization: finalization2,
      getActiveResourcesInfo: getActiveResourcesInfo2,
      getegid: getegid2,
      geteuid: geteuid2,
      getgid: getgid2,
      getgroups: getgroups2,
      getMaxListeners: getMaxListeners2,
      getuid: getuid2,
      hasUncaughtExceptionCaptureCallback: hasUncaughtExceptionCaptureCallback2,
      initgroups: (
        // @ts-expect-error `initgroups` is missing typings
        initgroups2
      ),
      kill: kill2,
      listenerCount: listenerCount2,
      listeners: listeners2,
      loadEnvFile: loadEnvFile2,
      memoryUsage: memoryUsage2,
      moduleLoadList: (
        // @ts-expect-error `moduleLoadList` is missing typings
        moduleLoadList2
      ),
      off: off2,
      on: on2,
      once: once2,
      openStdin: (
        // @ts-expect-error `openStdin` is missing typings
        openStdin2
      ),
      permission: permission2,
      pid: pid2,
      ppid: ppid2,
      prependListener: prependListener2,
      prependOnceListener: prependOnceListener2,
      rawListeners: rawListeners2,
      reallyExit: (
        // @ts-expect-error `reallyExit` is missing typings
        reallyExit2
      ),
      ref: ref2,
      release: release2,
      removeAllListeners: removeAllListeners2,
      removeListener: removeListener2,
      report: report2,
      resourceUsage: resourceUsage2,
      send: send2,
      setegid: setegid2,
      seteuid: seteuid2,
      setgid: setgid2,
      setgroups: setgroups2,
      setMaxListeners: setMaxListeners2,
      setSourceMapsEnabled: setSourceMapsEnabled2,
      setuid: setuid2,
      setUncaughtExceptionCaptureCallback: setUncaughtExceptionCaptureCallback2,
      sourceMapsEnabled: sourceMapsEnabled2,
      stderr: stderr2,
      stdin: stdin2,
      stdout: stdout2,
      throwDeprecation: throwDeprecation2,
      title: title2,
      traceDeprecation: traceDeprecation2,
      umask: umask2,
      unref: unref2,
      uptime: uptime2,
      version: version2,
      versions: versions2
    } = isWorkerdProcessV22 ? workerdProcess2 : unenvProcess2);
    _process2 = {
      abort: abort2,
      addListener: addListener2,
      allowedNodeEnvironmentFlags: allowedNodeEnvironmentFlags2,
      hasUncaughtExceptionCaptureCallback: hasUncaughtExceptionCaptureCallback2,
      setUncaughtExceptionCaptureCallback: setUncaughtExceptionCaptureCallback2,
      loadEnvFile: loadEnvFile2,
      sourceMapsEnabled: sourceMapsEnabled2,
      arch: arch2,
      argv: argv2,
      argv0: argv02,
      chdir: chdir2,
      config: config2,
      connected: connected2,
      constrainedMemory: constrainedMemory2,
      availableMemory: availableMemory2,
      cpuUsage: cpuUsage2,
      cwd: cwd2,
      debugPort: debugPort2,
      dlopen: dlopen2,
      disconnect: disconnect2,
      emit: emit2,
      emitWarning: emitWarning2,
      env: env2,
      eventNames: eventNames2,
      execArgv: execArgv2,
      execPath: execPath2,
      exit: exit2,
      finalization: finalization2,
      features: features2,
      getBuiltinModule: getBuiltinModule2,
      getActiveResourcesInfo: getActiveResourcesInfo2,
      getMaxListeners: getMaxListeners2,
      hrtime: hrtime32,
      kill: kill2,
      listeners: listeners2,
      listenerCount: listenerCount2,
      memoryUsage: memoryUsage2,
      nextTick: nextTick2,
      on: on2,
      off: off2,
      once: once2,
      pid: pid2,
      platform: platform2,
      ppid: ppid2,
      prependListener: prependListener2,
      prependOnceListener: prependOnceListener2,
      rawListeners: rawListeners2,
      release: release2,
      removeAllListeners: removeAllListeners2,
      removeListener: removeListener2,
      report: report2,
      resourceUsage: resourceUsage2,
      setMaxListeners: setMaxListeners2,
      setSourceMapsEnabled: setSourceMapsEnabled2,
      stderr: stderr2,
      stdin: stdin2,
      stdout: stdout2,
      title: title2,
      throwDeprecation: throwDeprecation2,
      traceDeprecation: traceDeprecation2,
      umask: umask2,
      uptime: uptime2,
      version: version2,
      versions: versions2,
      // @ts-expect-error old API
      domain: domain2,
      initgroups: initgroups2,
      moduleLoadList: moduleLoadList2,
      reallyExit: reallyExit2,
      openStdin: openStdin2,
      assert: assert22,
      binding: binding2,
      send: send2,
      exitCode: exitCode2,
      channel: channel2,
      getegid: getegid2,
      geteuid: geteuid2,
      getgid: getgid2,
      getgroups: getgroups2,
      getuid: getuid2,
      setegid: setegid2,
      seteuid: seteuid2,
      setgid: setgid2,
      setgroups: setgroups2,
      setuid: setuid2,
      permission: permission2,
      mainModule: mainModule2,
      _events: _events2,
      _eventsCount: _eventsCount2,
      _exiting: _exiting2,
      _maxListeners: _maxListeners2,
      _debugEnd: _debugEnd2,
      _debugProcess: _debugProcess2,
      _fatalException: _fatalException2,
      _getActiveHandles: _getActiveHandles2,
      _getActiveRequests: _getActiveRequests2,
      _kill: _kill2,
      _preload_modules: _preload_modules2,
      _rawDebug: _rawDebug2,
      _startProfilerIdleNotifier: _startProfilerIdleNotifier2,
      _stopProfilerIdleNotifier: _stopProfilerIdleNotifier2,
      _tickCallback: _tickCallback2,
      _disconnect: _disconnect2,
      _handleQueue: _handleQueue2,
      _pendingMessage: _pendingMessage2,
      _channel: _channel2,
      _send: _send2,
      _linkedBinding: _linkedBinding2
    };
    process_default2 = _process2;
  }
});
var init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process = __esm({
  "../../../.nvm/versions/node/v22.18.0/lib/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process"() {
    init_process2();
    globalThis.process = process_default2;
  }
});
var default_format;
var formatters;
var RFC1738;
var init_formats = __esm({
  "../node_modules/openai/internal/qs/formats.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    default_format = "RFC3986";
    formatters = {
      RFC1738: /* @__PURE__ */ __name2((v) => String(v).replace(/%20/g, "+"), "RFC1738"),
      RFC3986: /* @__PURE__ */ __name2((v) => String(v), "RFC3986")
    };
    RFC1738 = "RFC1738";
  }
});
function is_buffer(obj) {
  if (!obj || typeof obj !== "object") {
    return false;
  }
  return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
}
__name(is_buffer, "is_buffer");
function maybe_map(val, fn) {
  if (is_array(val)) {
    const mapped = [];
    for (let i = 0; i < val.length; i += 1) {
      mapped.push(fn(val[i]));
    }
    return mapped;
  }
  return fn(val);
}
__name(maybe_map, "maybe_map");
var is_array;
var hex_table;
var limit;
var encode;
var init_utils2 = __esm({
  "../node_modules/openai/internal/qs/utils.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_formats();
    is_array = Array.isArray;
    hex_table = (() => {
      const array = [];
      for (let i = 0; i < 256; ++i) {
        array.push("%" + ((i < 16 ? "0" : "") + i.toString(16)).toUpperCase());
      }
      return array;
    })();
    limit = 1024;
    encode = /* @__PURE__ */ __name2((str2, _defaultEncoder, charset, _kind, format) => {
      if (str2.length === 0) {
        return str2;
      }
      let string = str2;
      if (typeof str2 === "symbol") {
        string = Symbol.prototype.toString.call(str2);
      } else if (typeof str2 !== "string") {
        string = String(str2);
      }
      if (charset === "iso-8859-1") {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function($0) {
          return "%26%23" + parseInt($0.slice(2), 16) + "%3B";
        });
      }
      let out = "";
      for (let j = 0; j < string.length; j += limit) {
        const segment = string.length >= limit ? string.slice(j, j + limit) : string;
        const arr = [];
        for (let i = 0; i < segment.length; ++i) {
          let c = segment.charCodeAt(i);
          if (c === 45 || // -
          c === 46 || // .
          c === 95 || // _
          c === 126 || // ~
          c >= 48 && c <= 57 || // 0-9
          c >= 65 && c <= 90 || // a-z
          c >= 97 && c <= 122 || // A-Z
          format === RFC1738 && (c === 40 || c === 41)) {
            arr[arr.length] = segment.charAt(i);
            continue;
          }
          if (c < 128) {
            arr[arr.length] = hex_table[c];
            continue;
          }
          if (c < 2048) {
            arr[arr.length] = hex_table[192 | c >> 6] + hex_table[128 | c & 63];
            continue;
          }
          if (c < 55296 || c >= 57344) {
            arr[arr.length] = hex_table[224 | c >> 12] + hex_table[128 | c >> 6 & 63] + hex_table[128 | c & 63];
            continue;
          }
          i += 1;
          c = 65536 + ((c & 1023) << 10 | segment.charCodeAt(i) & 1023);
          arr[arr.length] = hex_table[240 | c >> 18] + hex_table[128 | c >> 12 & 63] + hex_table[128 | c >> 6 & 63] + hex_table[128 | c & 63];
        }
        out += arr.join("");
      }
      return out;
    }, "encode");
    __name2(is_buffer, "is_buffer");
    __name2(maybe_map, "maybe_map");
  }
});
function is_non_nullish_primitive(v) {
  return typeof v === "string" || typeof v === "number" || typeof v === "boolean" || typeof v === "symbol" || typeof v === "bigint";
}
__name(is_non_nullish_primitive, "is_non_nullish_primitive");
function inner_stringify(object, prefix, generateArrayPrefix, commaRoundTrip, allowEmptyArrays, strictNullHandling, skipNulls, encodeDotInKeys, encoder, filter, sort, allowDots, serializeDate, format, formatter, encodeValuesOnly, charset, sideChannel) {
  let obj = object;
  let tmp_sc = sideChannel;
  let step = 0;
  let find_flag = false;
  while ((tmp_sc = tmp_sc.get(sentinel)) !== void 0 && !find_flag) {
    const pos = tmp_sc.get(object);
    step += 1;
    if (typeof pos !== "undefined") {
      if (pos === step) {
        throw new RangeError("Cyclic object value");
      } else {
        find_flag = true;
      }
    }
    if (typeof tmp_sc.get(sentinel) === "undefined") {
      step = 0;
    }
  }
  if (typeof filter === "function") {
    obj = filter(prefix, obj);
  } else if (obj instanceof Date) {
    obj = serializeDate?.(obj);
  } else if (generateArrayPrefix === "comma" && is_array2(obj)) {
    obj = maybe_map(obj, function(value) {
      if (value instanceof Date) {
        return serializeDate?.(value);
      }
      return value;
    });
  }
  if (obj === null) {
    if (strictNullHandling) {
      return encoder && !encodeValuesOnly ? (
        // @ts-expect-error
        encoder(prefix, defaults.encoder, charset, "key", format)
      ) : prefix;
    }
    obj = "";
  }
  if (is_non_nullish_primitive(obj) || is_buffer(obj)) {
    if (encoder) {
      const key_value = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, "key", format);
      return [
        formatter?.(key_value) + "=" + // @ts-expect-error
        formatter?.(encoder(obj, defaults.encoder, charset, "value", format))
      ];
    }
    return [formatter?.(prefix) + "=" + formatter?.(String(obj))];
  }
  const values = [];
  if (typeof obj === "undefined") {
    return values;
  }
  let obj_keys;
  if (generateArrayPrefix === "comma" && is_array2(obj)) {
    if (encodeValuesOnly && encoder) {
      obj = maybe_map(obj, encoder);
    }
    obj_keys = [{ value: obj.length > 0 ? obj.join(",") || null : void 0 }];
  } else if (is_array2(filter)) {
    obj_keys = filter;
  } else {
    const keys = Object.keys(obj);
    obj_keys = sort ? keys.sort(sort) : keys;
  }
  const encoded_prefix = encodeDotInKeys ? String(prefix).replace(/\./g, "%2E") : String(prefix);
  const adjusted_prefix = commaRoundTrip && is_array2(obj) && obj.length === 1 ? encoded_prefix + "[]" : encoded_prefix;
  if (allowEmptyArrays && is_array2(obj) && obj.length === 0) {
    return adjusted_prefix + "[]";
  }
  for (let j = 0; j < obj_keys.length; ++j) {
    const key = obj_keys[j];
    const value = (
      // @ts-ignore
      typeof key === "object" && typeof key.value !== "undefined" ? key.value : obj[key]
    );
    if (skipNulls && value === null) {
      continue;
    }
    const encoded_key = allowDots && encodeDotInKeys ? key.replace(/\./g, "%2E") : key;
    const key_prefix = is_array2(obj) ? typeof generateArrayPrefix === "function" ? generateArrayPrefix(adjusted_prefix, encoded_key) : adjusted_prefix : adjusted_prefix + (allowDots ? "." + encoded_key : "[" + encoded_key + "]");
    sideChannel.set(object, step);
    const valueSideChannel = /* @__PURE__ */ new WeakMap();
    valueSideChannel.set(sentinel, sideChannel);
    push_to_array(values, inner_stringify(
      value,
      key_prefix,
      generateArrayPrefix,
      commaRoundTrip,
      allowEmptyArrays,
      strictNullHandling,
      skipNulls,
      encodeDotInKeys,
      // @ts-ignore
      generateArrayPrefix === "comma" && encodeValuesOnly && is_array2(obj) ? null : encoder,
      filter,
      sort,
      allowDots,
      serializeDate,
      format,
      formatter,
      encodeValuesOnly,
      charset,
      valueSideChannel
    ));
  }
  return values;
}
__name(inner_stringify, "inner_stringify");
function normalize_stringify_options(opts = defaults) {
  if (typeof opts.allowEmptyArrays !== "undefined" && typeof opts.allowEmptyArrays !== "boolean") {
    throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
  }
  if (typeof opts.encodeDotInKeys !== "undefined" && typeof opts.encodeDotInKeys !== "boolean") {
    throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
  }
  if (opts.encoder !== null && typeof opts.encoder !== "undefined" && typeof opts.encoder !== "function") {
    throw new TypeError("Encoder has to be a function.");
  }
  const charset = opts.charset || defaults.charset;
  if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  }
  let format = default_format;
  if (typeof opts.format !== "undefined") {
    if (!has.call(formatters, opts.format)) {
      throw new TypeError("Unknown format option provided.");
    }
    format = opts.format;
  }
  const formatter = formatters[format];
  let filter = defaults.filter;
  if (typeof opts.filter === "function" || is_array2(opts.filter)) {
    filter = opts.filter;
  }
  let arrayFormat;
  if (opts.arrayFormat && opts.arrayFormat in array_prefix_generators) {
    arrayFormat = opts.arrayFormat;
  } else if ("indices" in opts) {
    arrayFormat = opts.indices ? "indices" : "repeat";
  } else {
    arrayFormat = defaults.arrayFormat;
  }
  if ("commaRoundTrip" in opts && typeof opts.commaRoundTrip !== "boolean") {
    throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
  }
  const allowDots = typeof opts.allowDots === "undefined" ? !!opts.encodeDotInKeys === true ? true : defaults.allowDots : !!opts.allowDots;
  return {
    addQueryPrefix: typeof opts.addQueryPrefix === "boolean" ? opts.addQueryPrefix : defaults.addQueryPrefix,
    // @ts-ignore
    allowDots,
    allowEmptyArrays: typeof opts.allowEmptyArrays === "boolean" ? !!opts.allowEmptyArrays : defaults.allowEmptyArrays,
    arrayFormat,
    charset,
    charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
    commaRoundTrip: !!opts.commaRoundTrip,
    delimiter: typeof opts.delimiter === "undefined" ? defaults.delimiter : opts.delimiter,
    encode: typeof opts.encode === "boolean" ? opts.encode : defaults.encode,
    encodeDotInKeys: typeof opts.encodeDotInKeys === "boolean" ? opts.encodeDotInKeys : defaults.encodeDotInKeys,
    encoder: typeof opts.encoder === "function" ? opts.encoder : defaults.encoder,
    encodeValuesOnly: typeof opts.encodeValuesOnly === "boolean" ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
    filter,
    format,
    formatter,
    serializeDate: typeof opts.serializeDate === "function" ? opts.serializeDate : defaults.serializeDate,
    skipNulls: typeof opts.skipNulls === "boolean" ? opts.skipNulls : defaults.skipNulls,
    // @ts-ignore
    sort: typeof opts.sort === "function" ? opts.sort : null,
    strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling
  };
}
__name(normalize_stringify_options, "normalize_stringify_options");
function stringify(object, opts = {}) {
  let obj = object;
  const options = normalize_stringify_options(opts);
  let obj_keys;
  let filter;
  if (typeof options.filter === "function") {
    filter = options.filter;
    obj = filter("", obj);
  } else if (is_array2(options.filter)) {
    filter = options.filter;
    obj_keys = filter;
  }
  const keys = [];
  if (typeof obj !== "object" || obj === null) {
    return "";
  }
  const generateArrayPrefix = array_prefix_generators[options.arrayFormat];
  const commaRoundTrip = generateArrayPrefix === "comma" && options.commaRoundTrip;
  if (!obj_keys) {
    obj_keys = Object.keys(obj);
  }
  if (options.sort) {
    obj_keys.sort(options.sort);
  }
  const sideChannel = /* @__PURE__ */ new WeakMap();
  for (let i = 0; i < obj_keys.length; ++i) {
    const key = obj_keys[i];
    if (options.skipNulls && obj[key] === null) {
      continue;
    }
    push_to_array(keys, inner_stringify(
      obj[key],
      key,
      // @ts-expect-error
      generateArrayPrefix,
      commaRoundTrip,
      options.allowEmptyArrays,
      options.strictNullHandling,
      options.skipNulls,
      options.encodeDotInKeys,
      options.encode ? options.encoder : null,
      options.filter,
      options.sort,
      options.allowDots,
      options.serializeDate,
      options.format,
      options.formatter,
      options.encodeValuesOnly,
      options.charset,
      sideChannel
    ));
  }
  const joined = keys.join(options.delimiter);
  let prefix = options.addQueryPrefix === true ? "?" : "";
  if (options.charsetSentinel) {
    if (options.charset === "iso-8859-1") {
      prefix += "utf8=%26%2310003%3B&";
    } else {
      prefix += "utf8=%E2%9C%93&";
    }
  }
  return joined.length > 0 ? prefix + joined : "";
}
__name(stringify, "stringify");
var has;
var array_prefix_generators;
var is_array2;
var push;
var push_to_array;
var to_ISO;
var defaults;
var sentinel;
var init_stringify = __esm({
  "../node_modules/openai/internal/qs/stringify.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils2();
    init_formats();
    has = Object.prototype.hasOwnProperty;
    array_prefix_generators = {
      brackets(prefix) {
        return String(prefix) + "[]";
      },
      comma: "comma",
      indices(prefix, key) {
        return String(prefix) + "[" + key + "]";
      },
      repeat(prefix) {
        return String(prefix);
      }
    };
    is_array2 = Array.isArray;
    push = Array.prototype.push;
    push_to_array = /* @__PURE__ */ __name2(function(arr, value_or_array) {
      push.apply(arr, is_array2(value_or_array) ? value_or_array : [value_or_array]);
    }, "push_to_array");
    to_ISO = Date.prototype.toISOString;
    defaults = {
      addQueryPrefix: false,
      allowDots: false,
      allowEmptyArrays: false,
      arrayFormat: "indices",
      charset: "utf-8",
      charsetSentinel: false,
      delimiter: "&",
      encode: true,
      encodeDotInKeys: false,
      encoder: encode,
      encodeValuesOnly: false,
      format: default_format,
      formatter: formatters[default_format],
      /** @deprecated */
      indices: false,
      serializeDate(date) {
        return to_ISO.call(date);
      },
      skipNulls: false,
      strictNullHandling: false
    };
    __name2(is_non_nullish_primitive, "is_non_nullish_primitive");
    sentinel = {};
    __name2(inner_stringify, "inner_stringify");
    __name2(normalize_stringify_options, "normalize_stringify_options");
    __name2(stringify, "stringify");
  }
});
var init_qs = __esm({
  "../node_modules/openai/internal/qs/index.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_stringify();
  }
});
var VERSION;
var init_version = __esm({
  "../node_modules/openai/version.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    VERSION = "4.104.0";
  }
});
function setShims(shims, options = { auto: false }) {
  if (auto) {
    throw new Error(`you must \`import 'openai/shims/${shims.kind}'\` before importing anything else from openai`);
  }
  if (kind) {
    throw new Error(`can't \`import 'openai/shims/${shims.kind}'\` after \`import 'openai/shims/${kind}'\``);
  }
  auto = options.auto;
  kind = shims.kind;
  fetch2 = shims.fetch;
  Request2 = shims.Request;
  Response2 = shims.Response;
  Headers2 = shims.Headers;
  FormData2 = shims.FormData;
  Blob2 = shims.Blob;
  File2 = shims.File;
  ReadableStream2 = shims.ReadableStream;
  getMultipartRequestOptions = shims.getMultipartRequestOptions;
  getDefaultAgent = shims.getDefaultAgent;
  fileFromPath = shims.fileFromPath;
  isFsReadStream = shims.isFsReadStream;
}
__name(setShims, "setShims");
var auto;
var kind;
var fetch2;
var Request2;
var Response2;
var Headers2;
var FormData2;
var Blob2;
var File2;
var ReadableStream2;
var getMultipartRequestOptions;
var getDefaultAgent;
var fileFromPath;
var isFsReadStream;
var init_registry = __esm({
  "../node_modules/openai/_shims/registry.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    auto = false;
    kind = void 0;
    fetch2 = void 0;
    Request2 = void 0;
    Response2 = void 0;
    Headers2 = void 0;
    FormData2 = void 0;
    Blob2 = void 0;
    File2 = void 0;
    ReadableStream2 = void 0;
    getMultipartRequestOptions = void 0;
    getDefaultAgent = void 0;
    fileFromPath = void 0;
    isFsReadStream = void 0;
    __name2(setShims, "setShims");
  }
});
var MultipartBody;
var init_MultipartBody = __esm({
  "../node_modules/openai/_shims/MultipartBody.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    MultipartBody = class {
      static {
        __name(this, "MultipartBody");
      }
      static {
        __name2(this, "MultipartBody");
      }
      constructor(body) {
        this.body = body;
      }
      get [Symbol.toStringTag]() {
        return "MultipartBody";
      }
    };
  }
});
function getRuntime({ manuallyImported } = {}) {
  const recommendation = manuallyImported ? `You may need to use polyfills` : `Add one of these imports before your first \`import \u2026 from 'openai'\`:
- \`import 'openai/shims/node'\` (if you're running on Node)
- \`import 'openai/shims/web'\` (otherwise)
`;
  let _fetch, _Request, _Response, _Headers;
  try {
    _fetch = fetch;
    _Request = Request;
    _Response = Response;
    _Headers = Headers;
  } catch (error32) {
    throw new Error(`this environment is missing the following Web Fetch API type: ${error32.message}. ${recommendation}`);
  }
  return {
    kind: "web",
    fetch: _fetch,
    Request: _Request,
    Response: _Response,
    Headers: _Headers,
    FormData: (
      // @ts-ignore
      typeof FormData !== "undefined" ? FormData : class FormData {
        static {
          __name(this, "FormData");
        }
        static {
          __name2(this, "FormData");
        }
        // @ts-ignore
        constructor() {
          throw new Error(`file uploads aren't supported in this environment yet as 'FormData' is undefined. ${recommendation}`);
        }
      }
    ),
    Blob: typeof Blob !== "undefined" ? Blob : class Blob {
      static {
        __name(this, "Blob");
      }
      static {
        __name2(this, "Blob");
      }
      constructor() {
        throw new Error(`file uploads aren't supported in this environment yet as 'Blob' is undefined. ${recommendation}`);
      }
    },
    File: (
      // @ts-ignore
      typeof File !== "undefined" ? File : class File {
        static {
          __name(this, "File");
        }
        static {
          __name2(this, "File");
        }
        // @ts-ignore
        constructor() {
          throw new Error(`file uploads aren't supported in this environment yet as 'File' is undefined. ${recommendation}`);
        }
      }
    ),
    ReadableStream: (
      // @ts-ignore
      typeof ReadableStream !== "undefined" ? ReadableStream : class ReadableStream {
        static {
          __name(this, "ReadableStream");
        }
        static {
          __name2(this, "ReadableStream");
        }
        // @ts-ignore
        constructor() {
          throw new Error(`streaming isn't supported in this environment yet as 'ReadableStream' is undefined. ${recommendation}`);
        }
      }
    ),
    getMultipartRequestOptions: /* @__PURE__ */ __name2(async (form, opts) => ({
      ...opts,
      body: new MultipartBody(form)
    }), "getMultipartRequestOptions"),
    getDefaultAgent: /* @__PURE__ */ __name2((url) => void 0, "getDefaultAgent"),
    fileFromPath: /* @__PURE__ */ __name2(() => {
      throw new Error("The `fileFromPath` function is only supported in Node. See the README for more details: https://www.github.com/openai/openai-node#file-uploads");
    }, "fileFromPath"),
    isFsReadStream: /* @__PURE__ */ __name2((value) => false, "isFsReadStream")
  };
}
__name(getRuntime, "getRuntime");
var init_web_runtime = __esm({
  "../node_modules/openai/_shims/web-runtime.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_MultipartBody();
    __name2(getRuntime, "getRuntime");
  }
});
var init_runtime = __esm({
  "../node_modules/openai/_shims/auto/runtime.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_web_runtime();
  }
});
var init;
var init_shims = __esm({
  "../node_modules/openai/_shims/index.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_registry();
    init_runtime();
    init_registry();
    init = /* @__PURE__ */ __name2(() => {
      if (!kind) setShims(getRuntime(), { auto: true });
    }, "init");
    init();
  }
});
var OpenAIError;
var APIError;
var APIUserAbortError;
var APIConnectionError;
var APIConnectionTimeoutError;
var BadRequestError;
var AuthenticationError;
var PermissionDeniedError;
var NotFoundError;
var ConflictError;
var UnprocessableEntityError;
var RateLimitError;
var InternalServerError;
var LengthFinishReasonError;
var ContentFilterFinishReasonError;
var init_error = __esm({
  "../node_modules/openai/error.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_core();
    OpenAIError = class extends Error {
      static {
        __name(this, "OpenAIError");
      }
      static {
        __name2(this, "OpenAIError");
      }
    };
    APIError = class _APIError extends OpenAIError {
      static {
        __name(this, "_APIError");
      }
      static {
        __name2(this, "APIError");
      }
      constructor(status, error32, message, headers) {
        super(`${_APIError.makeMessage(status, error32, message)}`);
        this.status = status;
        this.headers = headers;
        this.request_id = headers?.["x-request-id"];
        this.error = error32;
        const data = error32;
        this.code = data?.["code"];
        this.param = data?.["param"];
        this.type = data?.["type"];
      }
      static makeMessage(status, error32, message) {
        const msg = error32?.message ? typeof error32.message === "string" ? error32.message : JSON.stringify(error32.message) : error32 ? JSON.stringify(error32) : message;
        if (status && msg) {
          return `${status} ${msg}`;
        }
        if (status) {
          return `${status} status code (no body)`;
        }
        if (msg) {
          return msg;
        }
        return "(no status code or body)";
      }
      static generate(status, errorResponse, message, headers) {
        if (!status || !headers) {
          return new APIConnectionError({ message, cause: castToError(errorResponse) });
        }
        const error32 = errorResponse?.["error"];
        if (status === 400) {
          return new BadRequestError(status, error32, message, headers);
        }
        if (status === 401) {
          return new AuthenticationError(status, error32, message, headers);
        }
        if (status === 403) {
          return new PermissionDeniedError(status, error32, message, headers);
        }
        if (status === 404) {
          return new NotFoundError(status, error32, message, headers);
        }
        if (status === 409) {
          return new ConflictError(status, error32, message, headers);
        }
        if (status === 422) {
          return new UnprocessableEntityError(status, error32, message, headers);
        }
        if (status === 429) {
          return new RateLimitError(status, error32, message, headers);
        }
        if (status >= 500) {
          return new InternalServerError(status, error32, message, headers);
        }
        return new _APIError(status, error32, message, headers);
      }
    };
    APIUserAbortError = class extends APIError {
      static {
        __name(this, "APIUserAbortError");
      }
      static {
        __name2(this, "APIUserAbortError");
      }
      constructor({ message } = {}) {
        super(void 0, void 0, message || "Request was aborted.", void 0);
      }
    };
    APIConnectionError = class extends APIError {
      static {
        __name(this, "APIConnectionError");
      }
      static {
        __name2(this, "APIConnectionError");
      }
      constructor({ message, cause }) {
        super(void 0, void 0, message || "Connection error.", void 0);
        if (cause)
          this.cause = cause;
      }
    };
    APIConnectionTimeoutError = class extends APIConnectionError {
      static {
        __name(this, "APIConnectionTimeoutError");
      }
      static {
        __name2(this, "APIConnectionTimeoutError");
      }
      constructor({ message } = {}) {
        super({ message: message ?? "Request timed out." });
      }
    };
    BadRequestError = class extends APIError {
      static {
        __name(this, "BadRequestError");
      }
      static {
        __name2(this, "BadRequestError");
      }
    };
    AuthenticationError = class extends APIError {
      static {
        __name(this, "AuthenticationError");
      }
      static {
        __name2(this, "AuthenticationError");
      }
    };
    PermissionDeniedError = class extends APIError {
      static {
        __name(this, "PermissionDeniedError");
      }
      static {
        __name2(this, "PermissionDeniedError");
      }
    };
    NotFoundError = class extends APIError {
      static {
        __name(this, "NotFoundError");
      }
      static {
        __name2(this, "NotFoundError");
      }
    };
    ConflictError = class extends APIError {
      static {
        __name(this, "ConflictError");
      }
      static {
        __name2(this, "ConflictError");
      }
    };
    UnprocessableEntityError = class extends APIError {
      static {
        __name(this, "UnprocessableEntityError");
      }
      static {
        __name2(this, "UnprocessableEntityError");
      }
    };
    RateLimitError = class extends APIError {
      static {
        __name(this, "RateLimitError");
      }
      static {
        __name2(this, "RateLimitError");
      }
    };
    InternalServerError = class extends APIError {
      static {
        __name(this, "InternalServerError");
      }
      static {
        __name2(this, "InternalServerError");
      }
    };
    LengthFinishReasonError = class extends OpenAIError {
      static {
        __name(this, "LengthFinishReasonError");
      }
      static {
        __name2(this, "LengthFinishReasonError");
      }
      constructor() {
        super(`Could not parse response content as the length limit was reached`);
      }
    };
    ContentFilterFinishReasonError = class extends OpenAIError {
      static {
        __name(this, "ContentFilterFinishReasonError");
      }
      static {
        __name2(this, "ContentFilterFinishReasonError");
      }
      constructor() {
        super(`Could not parse response content as the request was rejected by the content filter`);
      }
    };
  }
});
function findNewlineIndex(buffer, startIndex) {
  const newline = 10;
  const carriage = 13;
  for (let i = startIndex ?? 0; i < buffer.length; i++) {
    if (buffer[i] === newline) {
      return { preceding: i, index: i + 1, carriage: false };
    }
    if (buffer[i] === carriage) {
      return { preceding: i, index: i + 1, carriage: true };
    }
  }
  return null;
}
__name(findNewlineIndex, "findNewlineIndex");
function findDoubleNewlineIndex(buffer) {
  const newline = 10;
  const carriage = 13;
  for (let i = 0; i < buffer.length - 1; i++) {
    if (buffer[i] === newline && buffer[i + 1] === newline) {
      return i + 2;
    }
    if (buffer[i] === carriage && buffer[i + 1] === carriage) {
      return i + 2;
    }
    if (buffer[i] === carriage && buffer[i + 1] === newline && i + 3 < buffer.length && buffer[i + 2] === carriage && buffer[i + 3] === newline) {
      return i + 4;
    }
  }
  return -1;
}
__name(findDoubleNewlineIndex, "findDoubleNewlineIndex");
var __classPrivateFieldSet;
var __classPrivateFieldGet;
var _LineDecoder_carriageReturnIndex;
var LineDecoder;
var init_line = __esm({
  "../node_modules/openai/internal/decoders/line.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_error();
    __classPrivateFieldSet = /* @__PURE__ */ __name(function(receiver, state, value, kind2, f) {
      if (kind2 === "m") throw new TypeError("Private method is not writable");
      if (kind2 === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind2 === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
    }, "__classPrivateFieldSet");
    __classPrivateFieldGet = /* @__PURE__ */ __name(function(receiver, state, kind2, f) {
      if (kind2 === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind2 === "m" ? f : kind2 === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }, "__classPrivateFieldGet");
    LineDecoder = class {
      static {
        __name(this, "LineDecoder");
      }
      static {
        __name2(this, "LineDecoder");
      }
      constructor() {
        _LineDecoder_carriageReturnIndex.set(this, void 0);
        this.buffer = new Uint8Array();
        __classPrivateFieldSet(this, _LineDecoder_carriageReturnIndex, null, "f");
      }
      decode(chunk) {
        if (chunk == null) {
          return [];
        }
        const binaryChunk = chunk instanceof ArrayBuffer ? new Uint8Array(chunk) : typeof chunk === "string" ? new TextEncoder().encode(chunk) : chunk;
        let newData = new Uint8Array(this.buffer.length + binaryChunk.length);
        newData.set(this.buffer);
        newData.set(binaryChunk, this.buffer.length);
        this.buffer = newData;
        const lines = [];
        let patternIndex;
        while ((patternIndex = findNewlineIndex(this.buffer, __classPrivateFieldGet(this, _LineDecoder_carriageReturnIndex, "f"))) != null) {
          if (patternIndex.carriage && __classPrivateFieldGet(this, _LineDecoder_carriageReturnIndex, "f") == null) {
            __classPrivateFieldSet(this, _LineDecoder_carriageReturnIndex, patternIndex.index, "f");
            continue;
          }
          if (__classPrivateFieldGet(this, _LineDecoder_carriageReturnIndex, "f") != null && (patternIndex.index !== __classPrivateFieldGet(this, _LineDecoder_carriageReturnIndex, "f") + 1 || patternIndex.carriage)) {
            lines.push(this.decodeText(this.buffer.slice(0, __classPrivateFieldGet(this, _LineDecoder_carriageReturnIndex, "f") - 1)));
            this.buffer = this.buffer.slice(__classPrivateFieldGet(this, _LineDecoder_carriageReturnIndex, "f"));
            __classPrivateFieldSet(this, _LineDecoder_carriageReturnIndex, null, "f");
            continue;
          }
          const endIndex = __classPrivateFieldGet(this, _LineDecoder_carriageReturnIndex, "f") !== null ? patternIndex.preceding - 1 : patternIndex.preceding;
          const line = this.decodeText(this.buffer.slice(0, endIndex));
          lines.push(line);
          this.buffer = this.buffer.slice(patternIndex.index);
          __classPrivateFieldSet(this, _LineDecoder_carriageReturnIndex, null, "f");
        }
        return lines;
      }
      decodeText(bytes) {
        if (bytes == null)
          return "";
        if (typeof bytes === "string")
          return bytes;
        if (typeof Buffer !== "undefined") {
          if (bytes instanceof Buffer) {
            return bytes.toString();
          }
          if (bytes instanceof Uint8Array) {
            return Buffer.from(bytes).toString();
          }
          throw new OpenAIError(`Unexpected: received non-Uint8Array (${bytes.constructor.name}) stream chunk in an environment with a global "Buffer" defined, which this library assumes to be Node. Please report this error.`);
        }
        if (typeof TextDecoder !== "undefined") {
          if (bytes instanceof Uint8Array || bytes instanceof ArrayBuffer) {
            this.textDecoder ?? (this.textDecoder = new TextDecoder("utf8"));
            return this.textDecoder.decode(bytes);
          }
          throw new OpenAIError(`Unexpected: received non-Uint8Array/ArrayBuffer (${bytes.constructor.name}) in a web platform. Please report this error.`);
        }
        throw new OpenAIError(`Unexpected: neither Buffer nor TextDecoder are available as globals. Please report this error.`);
      }
      flush() {
        if (!this.buffer.length) {
          return [];
        }
        return this.decode("\n");
      }
    };
    _LineDecoder_carriageReturnIndex = /* @__PURE__ */ new WeakMap();
    LineDecoder.NEWLINE_CHARS = /* @__PURE__ */ new Set(["\n", "\r"]);
    LineDecoder.NEWLINE_REGEXP = /\r\n|[\n\r]/g;
    __name2(findNewlineIndex, "findNewlineIndex");
    __name2(findDoubleNewlineIndex, "findDoubleNewlineIndex");
  }
});
function ReadableStreamToAsyncIterable(stream) {
  if (stream[Symbol.asyncIterator])
    return stream;
  const reader = stream.getReader();
  return {
    async next() {
      try {
        const result = await reader.read();
        if (result?.done)
          reader.releaseLock();
        return result;
      } catch (e) {
        reader.releaseLock();
        throw e;
      }
    },
    async return() {
      const cancelPromise = reader.cancel();
      reader.releaseLock();
      await cancelPromise;
      return { done: true, value: void 0 };
    },
    [Symbol.asyncIterator]() {
      return this;
    }
  };
}
__name(ReadableStreamToAsyncIterable, "ReadableStreamToAsyncIterable");
var init_stream_utils = __esm({
  "../node_modules/openai/internal/stream-utils.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    __name2(ReadableStreamToAsyncIterable, "ReadableStreamToAsyncIterable");
  }
});
async function* _iterSSEMessages(response, controller) {
  if (!response.body) {
    controller.abort();
    throw new OpenAIError(`Attempted to iterate over a response with no body`);
  }
  const sseDecoder = new SSEDecoder();
  const lineDecoder = new LineDecoder();
  const iter = ReadableStreamToAsyncIterable(response.body);
  for await (const sseChunk of iterSSEChunks(iter)) {
    for (const line of lineDecoder.decode(sseChunk)) {
      const sse = sseDecoder.decode(line);
      if (sse)
        yield sse;
    }
  }
  for (const line of lineDecoder.flush()) {
    const sse = sseDecoder.decode(line);
    if (sse)
      yield sse;
  }
}
__name(_iterSSEMessages, "_iterSSEMessages");
async function* iterSSEChunks(iterator) {
  let data = new Uint8Array();
  for await (const chunk of iterator) {
    if (chunk == null) {
      continue;
    }
    const binaryChunk = chunk instanceof ArrayBuffer ? new Uint8Array(chunk) : typeof chunk === "string" ? new TextEncoder().encode(chunk) : chunk;
    let newData = new Uint8Array(data.length + binaryChunk.length);
    newData.set(data);
    newData.set(binaryChunk, data.length);
    data = newData;
    let patternIndex;
    while ((patternIndex = findDoubleNewlineIndex(data)) !== -1) {
      yield data.slice(0, patternIndex);
      data = data.slice(patternIndex);
    }
  }
  if (data.length > 0) {
    yield data;
  }
}
__name(iterSSEChunks, "iterSSEChunks");
function partition(str2, delimiter) {
  const index = str2.indexOf(delimiter);
  if (index !== -1) {
    return [str2.substring(0, index), delimiter, str2.substring(index + delimiter.length)];
  }
  return [str2, "", ""];
}
__name(partition, "partition");
var Stream;
var SSEDecoder;
var init_streaming = __esm({
  "../node_modules/openai/streaming.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_shims();
    init_error();
    init_line();
    init_stream_utils();
    init_core();
    init_error();
    Stream = class _Stream {
      static {
        __name(this, "_Stream");
      }
      static {
        __name2(this, "Stream");
      }
      constructor(iterator, controller) {
        this.iterator = iterator;
        this.controller = controller;
      }
      static fromSSEResponse(response, controller) {
        let consumed = false;
        async function* iterator() {
          if (consumed) {
            throw new Error("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");
          }
          consumed = true;
          let done = false;
          try {
            for await (const sse of _iterSSEMessages(response, controller)) {
              if (done)
                continue;
              if (sse.data.startsWith("[DONE]")) {
                done = true;
                continue;
              }
              if (sse.event === null || sse.event.startsWith("response.") || sse.event.startsWith("transcript.")) {
                let data;
                try {
                  data = JSON.parse(sse.data);
                } catch (e) {
                  console.error(`Could not parse message into JSON:`, sse.data);
                  console.error(`From chunk:`, sse.raw);
                  throw e;
                }
                if (data && data.error) {
                  throw new APIError(void 0, data.error, void 0, createResponseHeaders(response.headers));
                }
                yield data;
              } else {
                let data;
                try {
                  data = JSON.parse(sse.data);
                } catch (e) {
                  console.error(`Could not parse message into JSON:`, sse.data);
                  console.error(`From chunk:`, sse.raw);
                  throw e;
                }
                if (sse.event == "error") {
                  throw new APIError(void 0, data.error, data.message, void 0);
                }
                yield { event: sse.event, data };
              }
            }
            done = true;
          } catch (e) {
            if (e instanceof Error && e.name === "AbortError")
              return;
            throw e;
          } finally {
            if (!done)
              controller.abort();
          }
        }
        __name(iterator, "iterator");
        __name2(iterator, "iterator");
        return new _Stream(iterator, controller);
      }
      /**
       * Generates a Stream from a newline-separated ReadableStream
       * where each item is a JSON value.
       */
      static fromReadableStream(readableStream, controller) {
        let consumed = false;
        async function* iterLines() {
          const lineDecoder = new LineDecoder();
          const iter = ReadableStreamToAsyncIterable(readableStream);
          for await (const chunk of iter) {
            for (const line of lineDecoder.decode(chunk)) {
              yield line;
            }
          }
          for (const line of lineDecoder.flush()) {
            yield line;
          }
        }
        __name(iterLines, "iterLines");
        __name2(iterLines, "iterLines");
        async function* iterator() {
          if (consumed) {
            throw new Error("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");
          }
          consumed = true;
          let done = false;
          try {
            for await (const line of iterLines()) {
              if (done)
                continue;
              if (line)
                yield JSON.parse(line);
            }
            done = true;
          } catch (e) {
            if (e instanceof Error && e.name === "AbortError")
              return;
            throw e;
          } finally {
            if (!done)
              controller.abort();
          }
        }
        __name(iterator, "iterator");
        __name2(iterator, "iterator");
        return new _Stream(iterator, controller);
      }
      [Symbol.asyncIterator]() {
        return this.iterator();
      }
      /**
       * Splits the stream into two streams which can be
       * independently read from at different speeds.
       */
      tee() {
        const left = [];
        const right = [];
        const iterator = this.iterator();
        const teeIterator = /* @__PURE__ */ __name2((queue) => {
          return {
            next: /* @__PURE__ */ __name2(() => {
              if (queue.length === 0) {
                const result = iterator.next();
                left.push(result);
                right.push(result);
              }
              return queue.shift();
            }, "next")
          };
        }, "teeIterator");
        return [
          new _Stream(() => teeIterator(left), this.controller),
          new _Stream(() => teeIterator(right), this.controller)
        ];
      }
      /**
       * Converts this stream to a newline-separated ReadableStream of
       * JSON stringified values in the stream
       * which can be turned back into a Stream with `Stream.fromReadableStream()`.
       */
      toReadableStream() {
        const self = this;
        let iter;
        const encoder = new TextEncoder();
        return new ReadableStream2({
          async start() {
            iter = self[Symbol.asyncIterator]();
          },
          async pull(ctrl) {
            try {
              const { value, done } = await iter.next();
              if (done)
                return ctrl.close();
              const bytes = encoder.encode(JSON.stringify(value) + "\n");
              ctrl.enqueue(bytes);
            } catch (err) {
              ctrl.error(err);
            }
          },
          async cancel() {
            await iter.return?.();
          }
        });
      }
    };
    __name2(_iterSSEMessages, "_iterSSEMessages");
    __name2(iterSSEChunks, "iterSSEChunks");
    SSEDecoder = class {
      static {
        __name(this, "SSEDecoder");
      }
      static {
        __name2(this, "SSEDecoder");
      }
      constructor() {
        this.event = null;
        this.data = [];
        this.chunks = [];
      }
      decode(line) {
        if (line.endsWith("\r")) {
          line = line.substring(0, line.length - 1);
        }
        if (!line) {
          if (!this.event && !this.data.length)
            return null;
          const sse = {
            event: this.event,
            data: this.data.join("\n"),
            raw: this.chunks
          };
          this.event = null;
          this.data = [];
          this.chunks = [];
          return sse;
        }
        this.chunks.push(line);
        if (line.startsWith(":")) {
          return null;
        }
        let [fieldname, _, value] = partition(line, ":");
        if (value.startsWith(" ")) {
          value = value.substring(1);
        }
        if (fieldname === "event") {
          this.event = value;
        } else if (fieldname === "data") {
          this.data.push(value);
        }
        return null;
      }
    };
    __name2(partition, "partition");
  }
});
async function toFile(value, name, options) {
  value = await value;
  if (isFileLike(value)) {
    return value;
  }
  if (isResponseLike(value)) {
    const blob = await value.blob();
    name || (name = new URL(value.url).pathname.split(/[\\/]/).pop() ?? "unknown_file");
    const data = isBlobLike(blob) ? [await blob.arrayBuffer()] : [blob];
    return new File2(data, name, options);
  }
  const bits = await getBytes(value);
  name || (name = getName(value) ?? "unknown_file");
  if (!options?.type) {
    const type = bits[0]?.type;
    if (typeof type === "string") {
      options = { ...options, type };
    }
  }
  return new File2(bits, name, options);
}
__name(toFile, "toFile");
async function getBytes(value) {
  let parts = [];
  if (typeof value === "string" || ArrayBuffer.isView(value) || // includes Uint8Array, Buffer, etc.
  value instanceof ArrayBuffer) {
    parts.push(value);
  } else if (isBlobLike(value)) {
    parts.push(await value.arrayBuffer());
  } else if (isAsyncIterableIterator(value)) {
    for await (const chunk of value) {
      parts.push(chunk);
    }
  } else {
    throw new Error(`Unexpected data type: ${typeof value}; constructor: ${value?.constructor?.name}; props: ${propsForError(value)}`);
  }
  return parts;
}
__name(getBytes, "getBytes");
function propsForError(value) {
  const props = Object.getOwnPropertyNames(value);
  return `[${props.map((p) => `"${p}"`).join(", ")}]`;
}
__name(propsForError, "propsForError");
function getName(value) {
  return getStringFromMaybeBuffer(value.name) || getStringFromMaybeBuffer(value.filename) || // For fs.ReadStream
  getStringFromMaybeBuffer(value.path)?.split(/[\\/]/).pop();
}
__name(getName, "getName");
var isResponseLike;
var isFileLike;
var isBlobLike;
var isUploadable;
var getStringFromMaybeBuffer;
var isAsyncIterableIterator;
var isMultipartBody;
var multipartFormRequestOptions;
var createForm;
var addFormValue;
var init_uploads = __esm({
  "../node_modules/openai/uploads.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_shims();
    init_shims();
    isResponseLike = /* @__PURE__ */ __name2((value) => value != null && typeof value === "object" && typeof value.url === "string" && typeof value.blob === "function", "isResponseLike");
    isFileLike = /* @__PURE__ */ __name2((value) => value != null && typeof value === "object" && typeof value.name === "string" && typeof value.lastModified === "number" && isBlobLike(value), "isFileLike");
    isBlobLike = /* @__PURE__ */ __name2((value) => value != null && typeof value === "object" && typeof value.size === "number" && typeof value.type === "string" && typeof value.text === "function" && typeof value.slice === "function" && typeof value.arrayBuffer === "function", "isBlobLike");
    isUploadable = /* @__PURE__ */ __name2((value) => {
      return isFileLike(value) || isResponseLike(value) || isFsReadStream(value);
    }, "isUploadable");
    __name2(toFile, "toFile");
    __name2(getBytes, "getBytes");
    __name2(propsForError, "propsForError");
    __name2(getName, "getName");
    getStringFromMaybeBuffer = /* @__PURE__ */ __name2((x) => {
      if (typeof x === "string")
        return x;
      if (typeof Buffer !== "undefined" && x instanceof Buffer)
        return String(x);
      return void 0;
    }, "getStringFromMaybeBuffer");
    isAsyncIterableIterator = /* @__PURE__ */ __name2((value) => value != null && typeof value === "object" && typeof value[Symbol.asyncIterator] === "function", "isAsyncIterableIterator");
    isMultipartBody = /* @__PURE__ */ __name2((body) => body && typeof body === "object" && body.body && body[Symbol.toStringTag] === "MultipartBody", "isMultipartBody");
    multipartFormRequestOptions = /* @__PURE__ */ __name2(async (opts) => {
      const form = await createForm(opts.body);
      return getMultipartRequestOptions(form, opts);
    }, "multipartFormRequestOptions");
    createForm = /* @__PURE__ */ __name2(async (body) => {
      const form = new FormData2();
      await Promise.all(Object.entries(body || {}).map(([key, value]) => addFormValue(form, key, value)));
      return form;
    }, "createForm");
    addFormValue = /* @__PURE__ */ __name2(async (form, key, value) => {
      if (value === void 0)
        return;
      if (value == null) {
        throw new TypeError(`Received null for "${key}"; to pass null in FormData, you must use the string 'null'`);
      }
      if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
        form.append(key, String(value));
      } else if (isUploadable(value)) {
        const file = await toFile(value);
        form.append(key, file);
      } else if (Array.isArray(value)) {
        await Promise.all(value.map((entry) => addFormValue(form, key + "[]", entry)));
      } else if (typeof value === "object") {
        await Promise.all(Object.entries(value).map(([name, prop]) => addFormValue(form, `${key}[${name}]`, prop)));
      } else {
        throw new TypeError(`Invalid value given to form, expected a string, number, boolean, object, Array, File or Blob but got ${value} instead`);
      }
    }, "addFormValue");
  }
});
async function defaultParseResponse(props) {
  const { response } = props;
  if (props.options.stream) {
    debug32("response", response.status, response.url, response.headers, response.body);
    if (props.options.__streamClass) {
      return props.options.__streamClass.fromSSEResponse(response, props.controller);
    }
    return Stream.fromSSEResponse(response, props.controller);
  }
  if (response.status === 204) {
    return null;
  }
  if (props.options.__binaryResponse) {
    return response;
  }
  const contentType = response.headers.get("content-type");
  const mediaType = contentType?.split(";")[0]?.trim();
  const isJSON = mediaType?.includes("application/json") || mediaType?.endsWith("+json");
  if (isJSON) {
    const json = await response.json();
    debug32("response", response.status, response.url, response.headers, json);
    return _addRequestID(json, response);
  }
  const text = await response.text();
  debug32("response", response.status, response.url, response.headers, text);
  return text;
}
__name(defaultParseResponse, "defaultParseResponse");
function _addRequestID(value, response) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return value;
  }
  return Object.defineProperty(value, "_request_id", {
    value: response.headers.get("x-request-id"),
    enumerable: false
  });
}
__name(_addRequestID, "_addRequestID");
function getBrowserInfo() {
  if (typeof navigator === "undefined" || !navigator) {
    return null;
  }
  const browserPatterns = [
    { key: "edge", pattern: /Edge(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "ie", pattern: /MSIE(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "ie", pattern: /Trident(?:.*rv\:(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "chrome", pattern: /Chrome(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "firefox", pattern: /Firefox(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "safari", pattern: /(?:Version\W+(\d+)\.(\d+)(?:\.(\d+))?)?(?:\W+Mobile\S*)?\W+Safari/ }
  ];
  for (const { key, pattern } of browserPatterns) {
    const match2 = pattern.exec("Cloudflare-Workers");
    if (match2) {
      const major = match2[1] || 0;
      const minor = match2[2] || 0;
      const patch = match2[3] || 0;
      return { browser: key, version: `${major}.${minor}.${patch}` };
    }
  }
  return null;
}
__name(getBrowserInfo, "getBrowserInfo");
function isEmptyObj(obj) {
  if (!obj)
    return true;
  for (const _k in obj)
    return false;
  return true;
}
__name(isEmptyObj, "isEmptyObj");
function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
__name(hasOwn, "hasOwn");
function applyHeadersMut(targetHeaders, newHeaders) {
  for (const k in newHeaders) {
    if (!hasOwn(newHeaders, k))
      continue;
    const lowerKey = k.toLowerCase();
    if (!lowerKey)
      continue;
    const val = newHeaders[k];
    if (val === null) {
      delete targetHeaders[lowerKey];
    } else if (val !== void 0) {
      targetHeaders[lowerKey] = val;
    }
  }
}
__name(applyHeadersMut, "applyHeadersMut");
function debug32(action, ...args) {
  if (typeof process !== "undefined" && process?.env?.["DEBUG"] === "true") {
    const modifiedArgs = args.map((arg) => {
      if (!arg) {
        return arg;
      }
      if (arg["headers"]) {
        const modifiedArg2 = { ...arg, headers: { ...arg["headers"] } };
        for (const header in arg["headers"]) {
          if (SENSITIVE_HEADERS.has(header.toLowerCase())) {
            modifiedArg2["headers"][header] = "REDACTED";
          }
        }
        return modifiedArg2;
      }
      let modifiedArg = null;
      for (const header in arg) {
        if (SENSITIVE_HEADERS.has(header.toLowerCase())) {
          modifiedArg ?? (modifiedArg = { ...arg });
          modifiedArg[header] = "REDACTED";
        }
      }
      return modifiedArg ?? arg;
    });
    console.log(`OpenAI:DEBUG:${action}`, ...modifiedArgs);
  }
}
__name(debug32, "debug3");
function isObj(obj) {
  return obj != null && typeof obj === "object" && !Array.isArray(obj);
}
__name(isObj, "isObj");
var __classPrivateFieldSet2;
var __classPrivateFieldGet2;
var _AbstractPage_client;
var APIPromise;
var APIClient;
var AbstractPage;
var PagePromise;
var createResponseHeaders;
var requestOptionsKeys;
var isRequestOptions;
var getPlatformProperties;
var normalizeArch;
var normalizePlatform;
var _platformHeaders;
var getPlatformHeaders;
var safeJSON;
var startsWithSchemeRegexp;
var isAbsoluteURL;
var sleep;
var validatePositiveInteger;
var castToError;
var readEnv;
var SENSITIVE_HEADERS;
var uuid4;
var isRunningInBrowser;
var isHeadersProtocol;
var getHeader;
var toFloat32Array;
var init_core = __esm({
  "../node_modules/openai/core.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_version();
    init_streaming();
    init_error();
    init_shims();
    init_uploads();
    init_uploads();
    __classPrivateFieldSet2 = /* @__PURE__ */ __name(function(receiver, state, value, kind2, f) {
      if (kind2 === "m") throw new TypeError("Private method is not writable");
      if (kind2 === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind2 === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
    }, "__classPrivateFieldSet2");
    __classPrivateFieldGet2 = /* @__PURE__ */ __name(function(receiver, state, kind2, f) {
      if (kind2 === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind2 === "m" ? f : kind2 === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }, "__classPrivateFieldGet2");
    init();
    __name2(defaultParseResponse, "defaultParseResponse");
    __name2(_addRequestID, "_addRequestID");
    APIPromise = class _APIPromise extends Promise {
      static {
        __name(this, "_APIPromise");
      }
      static {
        __name2(this, "APIPromise");
      }
      constructor(responsePromise, parseResponse2 = defaultParseResponse) {
        super((resolve) => {
          resolve(null);
        });
        this.responsePromise = responsePromise;
        this.parseResponse = parseResponse2;
      }
      _thenUnwrap(transform) {
        return new _APIPromise(this.responsePromise, async (props) => _addRequestID(transform(await this.parseResponse(props), props), props.response));
      }
      /**
       * Gets the raw `Response` instance instead of parsing the response
       * data.
       *
       * If you want to parse the response body but still get the `Response`
       * instance, you can use {@link withResponse()}.
       *
       * 👋 Getting the wrong TypeScript type for `Response`?
       * Try setting `"moduleResolution": "NodeNext"` if you can,
       * or add one of these imports before your first `import … from 'openai'`:
       * - `import 'openai/shims/node'` (if you're running on Node)
       * - `import 'openai/shims/web'` (otherwise)
       */
      asResponse() {
        return this.responsePromise.then((p) => p.response);
      }
      /**
       * Gets the parsed response data, the raw `Response` instance and the ID of the request,
       * returned via the X-Request-ID header which is useful for debugging requests and reporting
       * issues to OpenAI.
       *
       * If you just want to get the raw `Response` instance without parsing it,
       * you can use {@link asResponse()}.
       *
       *
       * 👋 Getting the wrong TypeScript type for `Response`?
       * Try setting `"moduleResolution": "NodeNext"` if you can,
       * or add one of these imports before your first `import … from 'openai'`:
       * - `import 'openai/shims/node'` (if you're running on Node)
       * - `import 'openai/shims/web'` (otherwise)
       */
      async withResponse() {
        const [data, response] = await Promise.all([this.parse(), this.asResponse()]);
        return { data, response, request_id: response.headers.get("x-request-id") };
      }
      parse() {
        if (!this.parsedPromise) {
          this.parsedPromise = this.responsePromise.then(this.parseResponse);
        }
        return this.parsedPromise;
      }
      then(onfulfilled, onrejected) {
        return this.parse().then(onfulfilled, onrejected);
      }
      catch(onrejected) {
        return this.parse().catch(onrejected);
      }
      finally(onfinally) {
        return this.parse().finally(onfinally);
      }
    };
    APIClient = class {
      static {
        __name(this, "APIClient");
      }
      static {
        __name2(this, "APIClient");
      }
      constructor({
        baseURL,
        maxRetries = 2,
        timeout = 6e5,
        // 10 minutes
        httpAgent,
        fetch: overriddenFetch
      }) {
        this.baseURL = baseURL;
        this.maxRetries = validatePositiveInteger("maxRetries", maxRetries);
        this.timeout = validatePositiveInteger("timeout", timeout);
        this.httpAgent = httpAgent;
        this.fetch = overriddenFetch ?? fetch2;
      }
      authHeaders(opts) {
        return {};
      }
      /**
       * Override this to add your own default headers, for example:
       *
       *  {
       *    ...super.defaultHeaders(),
       *    Authorization: 'Bearer 123',
       *  }
       */
      defaultHeaders(opts) {
        return {
          Accept: "application/json",
          "Content-Type": "application/json",
          "User-Agent": this.getUserAgent(),
          ...getPlatformHeaders(),
          ...this.authHeaders(opts)
        };
      }
      /**
       * Override this to add your own headers validation:
       */
      validateHeaders(headers, customHeaders) {
      }
      defaultIdempotencyKey() {
        return `stainless-node-retry-${uuid4()}`;
      }
      get(path, opts) {
        return this.methodRequest("get", path, opts);
      }
      post(path, opts) {
        return this.methodRequest("post", path, opts);
      }
      patch(path, opts) {
        return this.methodRequest("patch", path, opts);
      }
      put(path, opts) {
        return this.methodRequest("put", path, opts);
      }
      delete(path, opts) {
        return this.methodRequest("delete", path, opts);
      }
      methodRequest(method, path, opts) {
        return this.request(Promise.resolve(opts).then(async (opts2) => {
          const body = opts2 && isBlobLike(opts2?.body) ? new DataView(await opts2.body.arrayBuffer()) : opts2?.body instanceof DataView ? opts2.body : opts2?.body instanceof ArrayBuffer ? new DataView(opts2.body) : opts2 && ArrayBuffer.isView(opts2?.body) ? new DataView(opts2.body.buffer) : opts2?.body;
          return { method, path, ...opts2, body };
        }));
      }
      getAPIList(path, Page2, opts) {
        return this.requestAPIList(Page2, { method: "get", path, ...opts });
      }
      calculateContentLength(body) {
        if (typeof body === "string") {
          if (typeof Buffer !== "undefined") {
            return Buffer.byteLength(body, "utf8").toString();
          }
          if (typeof TextEncoder !== "undefined") {
            const encoder = new TextEncoder();
            const encoded = encoder.encode(body);
            return encoded.length.toString();
          }
        } else if (ArrayBuffer.isView(body)) {
          return body.byteLength.toString();
        }
        return null;
      }
      buildRequest(inputOptions, { retryCount = 0 } = {}) {
        const options = { ...inputOptions };
        const { method, path, query, headers = {} } = options;
        const body = ArrayBuffer.isView(options.body) || options.__binaryRequest && typeof options.body === "string" ? options.body : isMultipartBody(options.body) ? options.body.body : options.body ? JSON.stringify(options.body, null, 2) : null;
        const contentLength = this.calculateContentLength(body);
        const url = this.buildURL(path, query);
        if ("timeout" in options)
          validatePositiveInteger("timeout", options.timeout);
        options.timeout = options.timeout ?? this.timeout;
        const httpAgent = options.httpAgent ?? this.httpAgent ?? getDefaultAgent(url);
        const minAgentTimeout = options.timeout + 1e3;
        if (typeof httpAgent?.options?.timeout === "number" && minAgentTimeout > (httpAgent.options.timeout ?? 0)) {
          httpAgent.options.timeout = minAgentTimeout;
        }
        if (this.idempotencyHeader && method !== "get") {
          if (!inputOptions.idempotencyKey)
            inputOptions.idempotencyKey = this.defaultIdempotencyKey();
          headers[this.idempotencyHeader] = inputOptions.idempotencyKey;
        }
        const reqHeaders = this.buildHeaders({ options, headers, contentLength, retryCount });
        const req = {
          method,
          ...body && { body },
          headers: reqHeaders,
          ...httpAgent && { agent: httpAgent },
          // @ts-ignore node-fetch uses a custom AbortSignal type that is
          // not compatible with standard web types
          signal: options.signal ?? null
        };
        return { req, url, timeout: options.timeout };
      }
      buildHeaders({ options, headers, contentLength, retryCount }) {
        const reqHeaders = {};
        if (contentLength) {
          reqHeaders["content-length"] = contentLength;
        }
        const defaultHeaders = this.defaultHeaders(options);
        applyHeadersMut(reqHeaders, defaultHeaders);
        applyHeadersMut(reqHeaders, headers);
        if (isMultipartBody(options.body) && kind !== "node") {
          delete reqHeaders["content-type"];
        }
        if (getHeader(defaultHeaders, "x-stainless-retry-count") === void 0 && getHeader(headers, "x-stainless-retry-count") === void 0) {
          reqHeaders["x-stainless-retry-count"] = String(retryCount);
        }
        if (getHeader(defaultHeaders, "x-stainless-timeout") === void 0 && getHeader(headers, "x-stainless-timeout") === void 0 && options.timeout) {
          reqHeaders["x-stainless-timeout"] = String(Math.trunc(options.timeout / 1e3));
        }
        this.validateHeaders(reqHeaders, headers);
        return reqHeaders;
      }
      /**
       * Used as a callback for mutating the given `FinalRequestOptions` object.
       */
      async prepareOptions(options) {
      }
      /**
       * Used as a callback for mutating the given `RequestInit` object.
       *
       * This is useful for cases where you want to add certain headers based off of
       * the request properties, e.g. `method` or `url`.
       */
      async prepareRequest(request, { url, options }) {
      }
      parseHeaders(headers) {
        return !headers ? {} : Symbol.iterator in headers ? Object.fromEntries(Array.from(headers).map((header) => [...header])) : { ...headers };
      }
      makeStatusError(status, error32, message, headers) {
        return APIError.generate(status, error32, message, headers);
      }
      request(options, remainingRetries = null) {
        return new APIPromise(this.makeRequest(options, remainingRetries));
      }
      async makeRequest(optionsInput, retriesRemaining) {
        const options = await optionsInput;
        const maxRetries = options.maxRetries ?? this.maxRetries;
        if (retriesRemaining == null) {
          retriesRemaining = maxRetries;
        }
        await this.prepareOptions(options);
        const { req, url, timeout } = this.buildRequest(options, { retryCount: maxRetries - retriesRemaining });
        await this.prepareRequest(req, { url, options });
        debug32("request", url, options, req.headers);
        if (options.signal?.aborted) {
          throw new APIUserAbortError();
        }
        const controller = new AbortController();
        const response = await this.fetchWithTimeout(url, req, timeout, controller).catch(castToError);
        if (response instanceof Error) {
          if (options.signal?.aborted) {
            throw new APIUserAbortError();
          }
          if (retriesRemaining) {
            return this.retryRequest(options, retriesRemaining);
          }
          if (response.name === "AbortError") {
            throw new APIConnectionTimeoutError();
          }
          throw new APIConnectionError({ cause: response });
        }
        const responseHeaders = createResponseHeaders(response.headers);
        if (!response.ok) {
          if (retriesRemaining && this.shouldRetry(response)) {
            const retryMessage2 = `retrying, ${retriesRemaining} attempts remaining`;
            debug32(`response (error; ${retryMessage2})`, response.status, url, responseHeaders);
            return this.retryRequest(options, retriesRemaining, responseHeaders);
          }
          const errText = await response.text().catch((e) => castToError(e).message);
          const errJSON = safeJSON(errText);
          const errMessage = errJSON ? void 0 : errText;
          const retryMessage = retriesRemaining ? `(error; no more retries left)` : `(error; not retryable)`;
          debug32(`response (error; ${retryMessage})`, response.status, url, responseHeaders, errMessage);
          const err = this.makeStatusError(response.status, errJSON, errMessage, responseHeaders);
          throw err;
        }
        return { response, options, controller };
      }
      requestAPIList(Page2, options) {
        const request = this.makeRequest(options, null);
        return new PagePromise(this, request, Page2);
      }
      buildURL(path, query) {
        const url = isAbsoluteURL(path) ? new URL(path) : new URL(this.baseURL + (this.baseURL.endsWith("/") && path.startsWith("/") ? path.slice(1) : path));
        const defaultQuery = this.defaultQuery();
        if (!isEmptyObj(defaultQuery)) {
          query = { ...defaultQuery, ...query };
        }
        if (typeof query === "object" && query && !Array.isArray(query)) {
          url.search = this.stringifyQuery(query);
        }
        return url.toString();
      }
      stringifyQuery(query) {
        return Object.entries(query).filter(([_, value]) => typeof value !== "undefined").map(([key, value]) => {
          if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
          }
          if (value === null) {
            return `${encodeURIComponent(key)}=`;
          }
          throw new OpenAIError(`Cannot stringify type ${typeof value}; Expected string, number, boolean, or null. If you need to pass nested query parameters, you can manually encode them, e.g. { query: { 'foo[key1]': value1, 'foo[key2]': value2 } }, and please open a GitHub issue requesting better support for your use case.`);
        }).join("&");
      }
      async fetchWithTimeout(url, init2, ms, controller) {
        const { signal, ...options } = init2 || {};
        if (signal)
          signal.addEventListener("abort", () => controller.abort());
        const timeout = setTimeout(() => controller.abort(), ms);
        const fetchOptions = {
          signal: controller.signal,
          ...options
        };
        if (fetchOptions.method) {
          fetchOptions.method = fetchOptions.method.toUpperCase();
        }
        return (
          // use undefined this binding; fetch errors if bound to something else in browser/cloudflare
          this.fetch.call(void 0, url, fetchOptions).finally(() => {
            clearTimeout(timeout);
          })
        );
      }
      shouldRetry(response) {
        const shouldRetryHeader = response.headers.get("x-should-retry");
        if (shouldRetryHeader === "true")
          return true;
        if (shouldRetryHeader === "false")
          return false;
        if (response.status === 408)
          return true;
        if (response.status === 409)
          return true;
        if (response.status === 429)
          return true;
        if (response.status >= 500)
          return true;
        return false;
      }
      async retryRequest(options, retriesRemaining, responseHeaders) {
        let timeoutMillis;
        const retryAfterMillisHeader = responseHeaders?.["retry-after-ms"];
        if (retryAfterMillisHeader) {
          const timeoutMs = parseFloat(retryAfterMillisHeader);
          if (!Number.isNaN(timeoutMs)) {
            timeoutMillis = timeoutMs;
          }
        }
        const retryAfterHeader = responseHeaders?.["retry-after"];
        if (retryAfterHeader && !timeoutMillis) {
          const timeoutSeconds = parseFloat(retryAfterHeader);
          if (!Number.isNaN(timeoutSeconds)) {
            timeoutMillis = timeoutSeconds * 1e3;
          } else {
            timeoutMillis = Date.parse(retryAfterHeader) - Date.now();
          }
        }
        if (!(timeoutMillis && 0 <= timeoutMillis && timeoutMillis < 60 * 1e3)) {
          const maxRetries = options.maxRetries ?? this.maxRetries;
          timeoutMillis = this.calculateDefaultRetryTimeoutMillis(retriesRemaining, maxRetries);
        }
        await sleep(timeoutMillis);
        return this.makeRequest(options, retriesRemaining - 1);
      }
      calculateDefaultRetryTimeoutMillis(retriesRemaining, maxRetries) {
        const initialRetryDelay = 0.5;
        const maxRetryDelay = 8;
        const numRetries = maxRetries - retriesRemaining;
        const sleepSeconds = Math.min(initialRetryDelay * Math.pow(2, numRetries), maxRetryDelay);
        const jitter = 1 - Math.random() * 0.25;
        return sleepSeconds * jitter * 1e3;
      }
      getUserAgent() {
        return `${this.constructor.name}/JS ${VERSION}`;
      }
    };
    AbstractPage = class {
      static {
        __name(this, "AbstractPage");
      }
      static {
        __name2(this, "AbstractPage");
      }
      constructor(client, response, body, options) {
        _AbstractPage_client.set(this, void 0);
        __classPrivateFieldSet2(this, _AbstractPage_client, client, "f");
        this.options = options;
        this.response = response;
        this.body = body;
      }
      hasNextPage() {
        const items = this.getPaginatedItems();
        if (!items.length)
          return false;
        return this.nextPageInfo() != null;
      }
      async getNextPage() {
        const nextInfo = this.nextPageInfo();
        if (!nextInfo) {
          throw new OpenAIError("No next page expected; please check `.hasNextPage()` before calling `.getNextPage()`.");
        }
        const nextOptions = { ...this.options };
        if ("params" in nextInfo && typeof nextOptions.query === "object") {
          nextOptions.query = { ...nextOptions.query, ...nextInfo.params };
        } else if ("url" in nextInfo) {
          const params = [...Object.entries(nextOptions.query || {}), ...nextInfo.url.searchParams.entries()];
          for (const [key, value] of params) {
            nextInfo.url.searchParams.set(key, value);
          }
          nextOptions.query = void 0;
          nextOptions.path = nextInfo.url.toString();
        }
        return await __classPrivateFieldGet2(this, _AbstractPage_client, "f").requestAPIList(this.constructor, nextOptions);
      }
      async *iterPages() {
        let page = this;
        yield page;
        while (page.hasNextPage()) {
          page = await page.getNextPage();
          yield page;
        }
      }
      async *[(_AbstractPage_client = /* @__PURE__ */ new WeakMap(), Symbol.asyncIterator)]() {
        for await (const page of this.iterPages()) {
          for (const item of page.getPaginatedItems()) {
            yield item;
          }
        }
      }
    };
    PagePromise = class extends APIPromise {
      static {
        __name(this, "PagePromise");
      }
      static {
        __name2(this, "PagePromise");
      }
      constructor(client, request, Page2) {
        super(request, async (props) => new Page2(client, props.response, await defaultParseResponse(props), props.options));
      }
      /**
       * Allow auto-paginating iteration on an unawaited list call, eg:
       *
       *    for await (const item of client.items.list()) {
       *      console.log(item)
       *    }
       */
      async *[Symbol.asyncIterator]() {
        const page = await this;
        for await (const item of page) {
          yield item;
        }
      }
    };
    createResponseHeaders = /* @__PURE__ */ __name2((headers) => {
      return new Proxy(Object.fromEntries(
        // @ts-ignore
        headers.entries()
      ), {
        get(target, name) {
          const key = name.toString();
          return target[key.toLowerCase()] || target[key];
        }
      });
    }, "createResponseHeaders");
    requestOptionsKeys = {
      method: true,
      path: true,
      query: true,
      body: true,
      headers: true,
      maxRetries: true,
      stream: true,
      timeout: true,
      httpAgent: true,
      signal: true,
      idempotencyKey: true,
      __metadata: true,
      __binaryRequest: true,
      __binaryResponse: true,
      __streamClass: true
    };
    isRequestOptions = /* @__PURE__ */ __name2((obj) => {
      return typeof obj === "object" && obj !== null && !isEmptyObj(obj) && Object.keys(obj).every((k) => hasOwn(requestOptionsKeys, k));
    }, "isRequestOptions");
    getPlatformProperties = /* @__PURE__ */ __name2(() => {
      if (typeof Deno !== "undefined" && Deno.build != null) {
        return {
          "X-Stainless-Lang": "js",
          "X-Stainless-Package-Version": VERSION,
          "X-Stainless-OS": normalizePlatform(Deno.build.os),
          "X-Stainless-Arch": normalizeArch(Deno.build.arch),
          "X-Stainless-Runtime": "deno",
          "X-Stainless-Runtime-Version": typeof Deno.version === "string" ? Deno.version : Deno.version?.deno ?? "unknown"
        };
      }
      if (typeof EdgeRuntime !== "undefined") {
        return {
          "X-Stainless-Lang": "js",
          "X-Stainless-Package-Version": VERSION,
          "X-Stainless-OS": "Unknown",
          "X-Stainless-Arch": `other:${EdgeRuntime}`,
          "X-Stainless-Runtime": "edge",
          "X-Stainless-Runtime-Version": process.version
        };
      }
      if (Object.prototype.toString.call(typeof process !== "undefined" ? process : 0) === "[object process]") {
        return {
          "X-Stainless-Lang": "js",
          "X-Stainless-Package-Version": VERSION,
          "X-Stainless-OS": normalizePlatform(process.platform),
          "X-Stainless-Arch": normalizeArch(process.arch),
          "X-Stainless-Runtime": "node",
          "X-Stainless-Runtime-Version": process.version
        };
      }
      const browserInfo = getBrowserInfo();
      if (browserInfo) {
        return {
          "X-Stainless-Lang": "js",
          "X-Stainless-Package-Version": VERSION,
          "X-Stainless-OS": "Unknown",
          "X-Stainless-Arch": "unknown",
          "X-Stainless-Runtime": `browser:${browserInfo.browser}`,
          "X-Stainless-Runtime-Version": browserInfo.version
        };
      }
      return {
        "X-Stainless-Lang": "js",
        "X-Stainless-Package-Version": VERSION,
        "X-Stainless-OS": "Unknown",
        "X-Stainless-Arch": "unknown",
        "X-Stainless-Runtime": "unknown",
        "X-Stainless-Runtime-Version": "unknown"
      };
    }, "getPlatformProperties");
    __name2(getBrowserInfo, "getBrowserInfo");
    normalizeArch = /* @__PURE__ */ __name2((arch22) => {
      if (arch22 === "x32")
        return "x32";
      if (arch22 === "x86_64" || arch22 === "x64")
        return "x64";
      if (arch22 === "arm")
        return "arm";
      if (arch22 === "aarch64" || arch22 === "arm64")
        return "arm64";
      if (arch22)
        return `other:${arch22}`;
      return "unknown";
    }, "normalizeArch");
    normalizePlatform = /* @__PURE__ */ __name2((platform22) => {
      platform22 = platform22.toLowerCase();
      if (platform22.includes("ios"))
        return "iOS";
      if (platform22 === "android")
        return "Android";
      if (platform22 === "darwin")
        return "MacOS";
      if (platform22 === "win32")
        return "Windows";
      if (platform22 === "freebsd")
        return "FreeBSD";
      if (platform22 === "openbsd")
        return "OpenBSD";
      if (platform22 === "linux")
        return "Linux";
      if (platform22)
        return `Other:${platform22}`;
      return "Unknown";
    }, "normalizePlatform");
    getPlatformHeaders = /* @__PURE__ */ __name2(() => {
      return _platformHeaders ?? (_platformHeaders = getPlatformProperties());
    }, "getPlatformHeaders");
    safeJSON = /* @__PURE__ */ __name2((text) => {
      try {
        return JSON.parse(text);
      } catch (err) {
        return void 0;
      }
    }, "safeJSON");
    startsWithSchemeRegexp = /^[a-z][a-z0-9+.-]*:/i;
    isAbsoluteURL = /* @__PURE__ */ __name2((url) => {
      return startsWithSchemeRegexp.test(url);
    }, "isAbsoluteURL");
    sleep = /* @__PURE__ */ __name2((ms) => new Promise((resolve) => setTimeout(resolve, ms)), "sleep");
    validatePositiveInteger = /* @__PURE__ */ __name2((name, n) => {
      if (typeof n !== "number" || !Number.isInteger(n)) {
        throw new OpenAIError(`${name} must be an integer`);
      }
      if (n < 0) {
        throw new OpenAIError(`${name} must be a positive integer`);
      }
      return n;
    }, "validatePositiveInteger");
    castToError = /* @__PURE__ */ __name2((err) => {
      if (err instanceof Error)
        return err;
      if (typeof err === "object" && err !== null) {
        try {
          return new Error(JSON.stringify(err));
        } catch {
        }
      }
      return new Error(err);
    }, "castToError");
    readEnv = /* @__PURE__ */ __name2((env22) => {
      if (typeof process !== "undefined") {
        return process.env?.[env22]?.trim() ?? void 0;
      }
      if (typeof Deno !== "undefined") {
        return Deno.env?.get?.(env22)?.trim();
      }
      return void 0;
    }, "readEnv");
    __name2(isEmptyObj, "isEmptyObj");
    __name2(hasOwn, "hasOwn");
    __name2(applyHeadersMut, "applyHeadersMut");
    SENSITIVE_HEADERS = /* @__PURE__ */ new Set(["authorization", "api-key"]);
    __name2(debug32, "debug");
    uuid4 = /* @__PURE__ */ __name2(() => {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === "x" ? r : r & 3 | 8;
        return v.toString(16);
      });
    }, "uuid4");
    isRunningInBrowser = /* @__PURE__ */ __name2(() => {
      return (
        // @ts-ignore
        typeof window !== "undefined" && // @ts-ignore
        typeof window.document !== "undefined" && // @ts-ignore
        typeof navigator !== "undefined"
      );
    }, "isRunningInBrowser");
    isHeadersProtocol = /* @__PURE__ */ __name2((headers) => {
      return typeof headers?.get === "function";
    }, "isHeadersProtocol");
    getHeader = /* @__PURE__ */ __name2((headers, header) => {
      const lowerCasedHeader = header.toLowerCase();
      if (isHeadersProtocol(headers)) {
        const intercapsHeader = header[0]?.toUpperCase() + header.substring(1).replace(/([^\w])(\w)/g, (_m, g1, g2) => g1 + g2.toUpperCase());
        for (const key of [header, lowerCasedHeader, header.toUpperCase(), intercapsHeader]) {
          const value = headers.get(key);
          if (value) {
            return value;
          }
        }
      }
      for (const [key, value] of Object.entries(headers)) {
        if (key.toLowerCase() === lowerCasedHeader) {
          if (Array.isArray(value)) {
            if (value.length <= 1)
              return value[0];
            console.warn(`Received ${value.length} entries for the ${header} header, using the first entry.`);
            return value[0];
          }
          return value;
        }
      }
      return void 0;
    }, "getHeader");
    toFloat32Array = /* @__PURE__ */ __name2((base64Str) => {
      if (typeof Buffer !== "undefined") {
        const buf = Buffer.from(base64Str, "base64");
        return Array.from(new Float32Array(buf.buffer, buf.byteOffset, buf.length / Float32Array.BYTES_PER_ELEMENT));
      } else {
        const binaryStr = atob(base64Str);
        const len = binaryStr.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryStr.charCodeAt(i);
        }
        return Array.from(new Float32Array(bytes.buffer));
      }
    }, "toFloat32Array");
    __name2(isObj, "isObj");
  }
});
var Page;
var CursorPage;
var init_pagination = __esm({
  "../node_modules/openai/pagination.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_core();
    Page = class extends AbstractPage {
      static {
        __name(this, "Page");
      }
      static {
        __name2(this, "Page");
      }
      constructor(client, response, body, options) {
        super(client, response, body, options);
        this.data = body.data || [];
        this.object = body.object;
      }
      getPaginatedItems() {
        return this.data ?? [];
      }
      // @deprecated Please use `nextPageInfo()` instead
      /**
       * This page represents a response that isn't actually paginated at the API level
       * so there will never be any next page params.
       */
      nextPageParams() {
        return null;
      }
      nextPageInfo() {
        return null;
      }
    };
    CursorPage = class extends AbstractPage {
      static {
        __name(this, "CursorPage");
      }
      static {
        __name2(this, "CursorPage");
      }
      constructor(client, response, body, options) {
        super(client, response, body, options);
        this.data = body.data || [];
        this.has_more = body.has_more || false;
      }
      getPaginatedItems() {
        return this.data ?? [];
      }
      hasNextPage() {
        if (this.has_more === false) {
          return false;
        }
        return super.hasNextPage();
      }
      // @deprecated Please use `nextPageInfo()` instead
      nextPageParams() {
        const info32 = this.nextPageInfo();
        if (!info32)
          return null;
        if ("params" in info32)
          return info32.params;
        const params = Object.fromEntries(info32.url.searchParams);
        if (!Object.keys(params).length)
          return null;
        return params;
      }
      nextPageInfo() {
        const data = this.getPaginatedItems();
        if (!data.length) {
          return null;
        }
        const id = data[data.length - 1]?.id;
        if (!id) {
          return null;
        }
        return { params: { after: id } };
      }
    };
  }
});
var APIResource;
var init_resource = __esm({
  "../node_modules/openai/resource.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    APIResource = class {
      static {
        __name(this, "APIResource");
      }
      static {
        __name2(this, "APIResource");
      }
      constructor(client) {
        this._client = client;
      }
    };
  }
});
var Messages;
var init_messages = __esm({
  "../node_modules/openai/resources/chat/completions/messages.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_resource();
    init_core();
    init_completions();
    Messages = class extends APIResource {
      static {
        __name(this, "Messages");
      }
      static {
        __name2(this, "Messages");
      }
      list(completionId, query = {}, options) {
        if (isRequestOptions(query)) {
          return this.list(completionId, {}, query);
        }
        return this._client.getAPIList(`/chat/completions/${completionId}/messages`, ChatCompletionStoreMessagesPage, { query, ...options });
      }
    };
  }
});
var Completions;
var ChatCompletionsPage;
var ChatCompletionStoreMessagesPage;
var init_completions = __esm({
  "../node_modules/openai/resources/chat/completions/completions.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_resource();
    init_core();
    init_messages();
    init_messages();
    init_pagination();
    Completions = class extends APIResource {
      static {
        __name(this, "Completions");
      }
      static {
        __name2(this, "Completions");
      }
      constructor() {
        super(...arguments);
        this.messages = new Messages(this._client);
      }
      create(body, options) {
        return this._client.post("/chat/completions", { body, ...options, stream: body.stream ?? false });
      }
      /**
       * Get a stored chat completion. Only Chat Completions that have been created with
       * the `store` parameter set to `true` will be returned.
       *
       * @example
       * ```ts
       * const chatCompletion =
       *   await client.chat.completions.retrieve('completion_id');
       * ```
       */
      retrieve(completionId, options) {
        return this._client.get(`/chat/completions/${completionId}`, options);
      }
      /**
       * Modify a stored chat completion. Only Chat Completions that have been created
       * with the `store` parameter set to `true` can be modified. Currently, the only
       * supported modification is to update the `metadata` field.
       *
       * @example
       * ```ts
       * const chatCompletion = await client.chat.completions.update(
       *   'completion_id',
       *   { metadata: { foo: 'string' } },
       * );
       * ```
       */
      update(completionId, body, options) {
        return this._client.post(`/chat/completions/${completionId}`, { body, ...options });
      }
      list(query = {}, options) {
        if (isRequestOptions(query)) {
          return this.list({}, query);
        }
        return this._client.getAPIList("/chat/completions", ChatCompletionsPage, { query, ...options });
      }
      /**
       * Delete a stored chat completion. Only Chat Completions that have been created
       * with the `store` parameter set to `true` can be deleted.
       *
       * @example
       * ```ts
       * const chatCompletionDeleted =
       *   await client.chat.completions.del('completion_id');
       * ```
       */
      del(completionId, options) {
        return this._client.delete(`/chat/completions/${completionId}`, options);
      }
    };
    ChatCompletionsPage = class extends CursorPage {
      static {
        __name(this, "ChatCompletionsPage");
      }
      static {
        __name2(this, "ChatCompletionsPage");
      }
    };
    ChatCompletionStoreMessagesPage = class extends CursorPage {
      static {
        __name(this, "ChatCompletionStoreMessagesPage");
      }
      static {
        __name2(this, "ChatCompletionStoreMessagesPage");
      }
    };
    Completions.ChatCompletionsPage = ChatCompletionsPage;
    Completions.Messages = Messages;
  }
});
var Chat;
var init_chat = __esm({
  "../node_modules/openai/resources/chat/chat.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_resource();
    init_completions();
    init_completions();
    Chat = class extends APIResource {
      static {
        __name(this, "Chat");
      }
      static {
        __name2(this, "Chat");
      }
      constructor() {
        super(...arguments);
        this.completions = new Completions(this._client);
      }
    };
    Chat.Completions = Completions;
    Chat.ChatCompletionsPage = ChatCompletionsPage;
  }
});
var init_chat2 = __esm({
  "../node_modules/openai/resources/chat/index.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_chat();
  }
});
var init_shared = __esm({
  "../node_modules/openai/resources/shared.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
  }
});
var Speech;
var init_speech = __esm({
  "../node_modules/openai/resources/audio/speech.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_resource();
    Speech = class extends APIResource {
      static {
        __name(this, "Speech");
      }
      static {
        __name2(this, "Speech");
      }
      /**
       * Generates audio from the input text.
       *
       * @example
       * ```ts
       * const speech = await client.audio.speech.create({
       *   input: 'input',
       *   model: 'string',
       *   voice: 'ash',
       * });
       *
       * const content = await speech.blob();
       * console.log(content);
       * ```
       */
      create(body, options) {
        return this._client.post("/audio/speech", {
          body,
          ...options,
          headers: { Accept: "application/octet-stream", ...options?.headers },
          __binaryResponse: true
        });
      }
    };
  }
});
var Transcriptions;
var init_transcriptions = __esm({
  "../node_modules/openai/resources/audio/transcriptions.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_resource();
    init_core();
    Transcriptions = class extends APIResource {
      static {
        __name(this, "Transcriptions");
      }
      static {
        __name2(this, "Transcriptions");
      }
      create(body, options) {
        return this._client.post("/audio/transcriptions", multipartFormRequestOptions({
          body,
          ...options,
          stream: body.stream ?? false,
          __metadata: { model: body.model }
        }));
      }
    };
  }
});
var Translations;
var init_translations = __esm({
  "../node_modules/openai/resources/audio/translations.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_resource();
    init_core();
    Translations = class extends APIResource {
      static {
        __name(this, "Translations");
      }
      static {
        __name2(this, "Translations");
      }
      create(body, options) {
        return this._client.post("/audio/translations", multipartFormRequestOptions({ body, ...options, __metadata: { model: body.model } }));
      }
    };
  }
});
var Audio;
var init_audio = __esm({
  "../node_modules/openai/resources/audio/audio.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_resource();
    init_speech();
    init_speech();
    init_transcriptions();
    init_transcriptions();
    init_translations();
    init_translations();
    Audio = class extends APIResource {
      static {
        __name(this, "Audio");
      }
      static {
        __name2(this, "Audio");
      }
      constructor() {
        super(...arguments);
        this.transcriptions = new Transcriptions(this._client);
        this.translations = new Translations(this._client);
        this.speech = new Speech(this._client);
      }
    };
    Audio.Transcriptions = Transcriptions;
    Audio.Translations = Translations;
    Audio.Speech = Speech;
  }
});
var Batches;
var BatchesPage;
var init_batches = __esm({
  "../node_modules/openai/resources/batches.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_resource();
    init_core();
    init_pagination();
    Batches = class extends APIResource {
      static {
        __name(this, "Batches");
      }
      static {
        __name2(this, "Batches");
      }
      /**
       * Creates and executes a batch from an uploaded file of requests
       */
      create(body, options) {
        return this._client.post("/batches", { body, ...options });
      }
      /**
       * Retrieves a batch.
       */
      retrieve(batchId, options) {
        return this._client.get(`/batches/${batchId}`, options);
      }
      list(query = {}, options) {
        if (isRequestOptions(query)) {
          return this.list({}, query);
        }
        return this._client.getAPIList("/batches", BatchesPage, { query, ...options });
      }
      /**
       * Cancels an in-progress batch. The batch will be in status `cancelling` for up to
       * 10 minutes, before changing to `cancelled`, where it will have partial results
       * (if any) available in the output file.
       */
      cancel(batchId, options) {
        return this._client.post(`/batches/${batchId}/cancel`, options);
      }
    };
    BatchesPage = class extends CursorPage {
      static {
        __name(this, "BatchesPage");
      }
      static {
        __name2(this, "BatchesPage");
      }
    };
    Batches.BatchesPage = BatchesPage;
  }
});
var __classPrivateFieldSet3;
var __classPrivateFieldGet3;
var _EventStream_instances;
var _EventStream_connectedPromise;
var _EventStream_resolveConnectedPromise;
var _EventStream_rejectConnectedPromise;
var _EventStream_endPromise;
var _EventStream_resolveEndPromise;
var _EventStream_rejectEndPromise;
var _EventStream_listeners;
var _EventStream_ended;
var _EventStream_errored;
var _EventStream_aborted;
var _EventStream_catchingPromiseCreated;
var _EventStream_handleError;
var EventStream;
var init_EventStream = __esm({
  "../node_modules/openai/lib/EventStream.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_error();
    __classPrivateFieldSet3 = /* @__PURE__ */ __name(function(receiver, state, value, kind2, f) {
      if (kind2 === "m") throw new TypeError("Private method is not writable");
      if (kind2 === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind2 === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
    }, "__classPrivateFieldSet3");
    __classPrivateFieldGet3 = /* @__PURE__ */ __name(function(receiver, state, kind2, f) {
      if (kind2 === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind2 === "m" ? f : kind2 === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }, "__classPrivateFieldGet3");
    EventStream = class {
      static {
        __name(this, "EventStream");
      }
      static {
        __name2(this, "EventStream");
      }
      constructor() {
        _EventStream_instances.add(this);
        this.controller = new AbortController();
        _EventStream_connectedPromise.set(this, void 0);
        _EventStream_resolveConnectedPromise.set(this, () => {
        });
        _EventStream_rejectConnectedPromise.set(this, () => {
        });
        _EventStream_endPromise.set(this, void 0);
        _EventStream_resolveEndPromise.set(this, () => {
        });
        _EventStream_rejectEndPromise.set(this, () => {
        });
        _EventStream_listeners.set(this, {});
        _EventStream_ended.set(this, false);
        _EventStream_errored.set(this, false);
        _EventStream_aborted.set(this, false);
        _EventStream_catchingPromiseCreated.set(this, false);
        __classPrivateFieldSet3(this, _EventStream_connectedPromise, new Promise((resolve, reject) => {
          __classPrivateFieldSet3(this, _EventStream_resolveConnectedPromise, resolve, "f");
          __classPrivateFieldSet3(this, _EventStream_rejectConnectedPromise, reject, "f");
        }), "f");
        __classPrivateFieldSet3(this, _EventStream_endPromise, new Promise((resolve, reject) => {
          __classPrivateFieldSet3(this, _EventStream_resolveEndPromise, resolve, "f");
          __classPrivateFieldSet3(this, _EventStream_rejectEndPromise, reject, "f");
        }), "f");
        __classPrivateFieldGet3(this, _EventStream_connectedPromise, "f").catch(() => {
        });
        __classPrivateFieldGet3(this, _EventStream_endPromise, "f").catch(() => {
        });
      }
      _run(executor) {
        setTimeout(() => {
          executor().then(() => {
            this._emitFinal();
            this._emit("end");
          }, __classPrivateFieldGet3(this, _EventStream_instances, "m", _EventStream_handleError).bind(this));
        }, 0);
      }
      _connected() {
        if (this.ended)
          return;
        __classPrivateFieldGet3(this, _EventStream_resolveConnectedPromise, "f").call(this);
        this._emit("connect");
      }
      get ended() {
        return __classPrivateFieldGet3(this, _EventStream_ended, "f");
      }
      get errored() {
        return __classPrivateFieldGet3(this, _EventStream_errored, "f");
      }
      get aborted() {
        return __classPrivateFieldGet3(this, _EventStream_aborted, "f");
      }
      abort() {
        this.controller.abort();
      }
      /**
       * Adds the listener function to the end of the listeners array for the event.
       * No checks are made to see if the listener has already been added. Multiple calls passing
       * the same combination of event and listener will result in the listener being added, and
       * called, multiple times.
       * @returns this ChatCompletionStream, so that calls can be chained
       */
      on(event, listener) {
        const listeners22 = __classPrivateFieldGet3(this, _EventStream_listeners, "f")[event] || (__classPrivateFieldGet3(this, _EventStream_listeners, "f")[event] = []);
        listeners22.push({ listener });
        return this;
      }
      /**
       * Removes the specified listener from the listener array for the event.
       * off() will remove, at most, one instance of a listener from the listener array. If any single
       * listener has been added multiple times to the listener array for the specified event, then
       * off() must be called multiple times to remove each instance.
       * @returns this ChatCompletionStream, so that calls can be chained
       */
      off(event, listener) {
        const listeners22 = __classPrivateFieldGet3(this, _EventStream_listeners, "f")[event];
        if (!listeners22)
          return this;
        const index = listeners22.findIndex((l) => l.listener === listener);
        if (index >= 0)
          listeners22.splice(index, 1);
        return this;
      }
      /**
       * Adds a one-time listener function for the event. The next time the event is triggered,
       * this listener is removed and then invoked.
       * @returns this ChatCompletionStream, so that calls can be chained
       */
      once(event, listener) {
        const listeners22 = __classPrivateFieldGet3(this, _EventStream_listeners, "f")[event] || (__classPrivateFieldGet3(this, _EventStream_listeners, "f")[event] = []);
        listeners22.push({ listener, once: true });
        return this;
      }
      /**
       * This is similar to `.once()`, but returns a Promise that resolves the next time
       * the event is triggered, instead of calling a listener callback.
       * @returns a Promise that resolves the next time given event is triggered,
       * or rejects if an error is emitted.  (If you request the 'error' event,
       * returns a promise that resolves with the error).
       *
       * Example:
       *
       *   const message = await stream.emitted('message') // rejects if the stream errors
       */
      emitted(event) {
        return new Promise((resolve, reject) => {
          __classPrivateFieldSet3(this, _EventStream_catchingPromiseCreated, true, "f");
          if (event !== "error")
            this.once("error", reject);
          this.once(event, resolve);
        });
      }
      async done() {
        __classPrivateFieldSet3(this, _EventStream_catchingPromiseCreated, true, "f");
        await __classPrivateFieldGet3(this, _EventStream_endPromise, "f");
      }
      _emit(event, ...args) {
        if (__classPrivateFieldGet3(this, _EventStream_ended, "f")) {
          return;
        }
        if (event === "end") {
          __classPrivateFieldSet3(this, _EventStream_ended, true, "f");
          __classPrivateFieldGet3(this, _EventStream_resolveEndPromise, "f").call(this);
        }
        const listeners22 = __classPrivateFieldGet3(this, _EventStream_listeners, "f")[event];
        if (listeners22) {
          __classPrivateFieldGet3(this, _EventStream_listeners, "f")[event] = listeners22.filter((l) => !l.once);
          listeners22.forEach(({ listener }) => listener(...args));
        }
        if (event === "abort") {
          const error32 = args[0];
          if (!__classPrivateFieldGet3(this, _EventStream_catchingPromiseCreated, "f") && !listeners22?.length) {
            Promise.reject(error32);
          }
          __classPrivateFieldGet3(this, _EventStream_rejectConnectedPromise, "f").call(this, error32);
          __classPrivateFieldGet3(this, _EventStream_rejectEndPromise, "f").call(this, error32);
          this._emit("end");
          return;
        }
        if (event === "error") {
          const error32 = args[0];
          if (!__classPrivateFieldGet3(this, _EventStream_catchingPromiseCreated, "f") && !listeners22?.length) {
            Promise.reject(error32);
          }
          __classPrivateFieldGet3(this, _EventStream_rejectConnectedPromise, "f").call(this, error32);
          __classPrivateFieldGet3(this, _EventStream_rejectEndPromise, "f").call(this, error32);
          this._emit("end");
        }
      }
      _emitFinal() {
      }
    };
    _EventStream_connectedPromise = /* @__PURE__ */ new WeakMap(), _EventStream_resolveConnectedPromise = /* @__PURE__ */ new WeakMap(), _EventStream_rejectConnectedPromise = /* @__PURE__ */ new WeakMap(), _EventStream_endPromise = /* @__PURE__ */ new WeakMap(), _EventStream_resolveEndPromise = /* @__PURE__ */ new WeakMap(), _EventStream_rejectEndPromise = /* @__PURE__ */ new WeakMap(), _EventStream_listeners = /* @__PURE__ */ new WeakMap(), _EventStream_ended = /* @__PURE__ */ new WeakMap(), _EventStream_errored = /* @__PURE__ */ new WeakMap(), _EventStream_aborted = /* @__PURE__ */ new WeakMap(), _EventStream_catchingPromiseCreated = /* @__PURE__ */ new WeakMap(), _EventStream_instances = /* @__PURE__ */ new WeakSet(), _EventStream_handleError = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function _EventStream_handleError2(error32) {
      __classPrivateFieldSet3(this, _EventStream_errored, true, "f");
      if (error32 instanceof Error && error32.name === "AbortError") {
        error32 = new APIUserAbortError();
      }
      if (error32 instanceof APIUserAbortError) {
        __classPrivateFieldSet3(this, _EventStream_aborted, true, "f");
        return this._emit("abort", error32);
      }
      if (error32 instanceof OpenAIError) {
        return this._emit("error", error32);
      }
      if (error32 instanceof Error) {
        const openAIError = new OpenAIError(error32.message);
        openAIError.cause = error32;
        return this._emit("error", openAIError);
      }
      return this._emit("error", new OpenAIError(String(error32)));
    }, "_EventStream_handleError2"), "_EventStream_handleError");
  }
});
function assertNever(_x) {
}
__name(assertNever, "assertNever");
var __classPrivateFieldGet4;
var __classPrivateFieldSet4;
var _AssistantStream_instances;
var _AssistantStream_events;
var _AssistantStream_runStepSnapshots;
var _AssistantStream_messageSnapshots;
var _AssistantStream_messageSnapshot;
var _AssistantStream_finalRun;
var _AssistantStream_currentContentIndex;
var _AssistantStream_currentContent;
var _AssistantStream_currentToolCallIndex;
var _AssistantStream_currentToolCall;
var _AssistantStream_currentEvent;
var _AssistantStream_currentRunSnapshot;
var _AssistantStream_currentRunStepSnapshot;
var _AssistantStream_addEvent;
var _AssistantStream_endRequest;
var _AssistantStream_handleMessage;
var _AssistantStream_handleRunStep;
var _AssistantStream_handleEvent;
var _AssistantStream_accumulateRunStep;
var _AssistantStream_accumulateMessage;
var _AssistantStream_accumulateContent;
var _AssistantStream_handleRun;
var AssistantStream;
var init_AssistantStream = __esm({
  "../node_modules/openai/lib/AssistantStream.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_core();
    init_streaming();
    init_error();
    init_EventStream();
    __classPrivateFieldGet4 = /* @__PURE__ */ __name(function(receiver, state, kind2, f) {
      if (kind2 === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind2 === "m" ? f : kind2 === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }, "__classPrivateFieldGet4");
    __classPrivateFieldSet4 = /* @__PURE__ */ __name(function(receiver, state, value, kind2, f) {
      if (kind2 === "m") throw new TypeError("Private method is not writable");
      if (kind2 === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind2 === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
    }, "__classPrivateFieldSet4");
    AssistantStream = class _AssistantStream extends EventStream {
      static {
        __name(this, "_AssistantStream");
      }
      static {
        __name2(this, "AssistantStream");
      }
      constructor() {
        super(...arguments);
        _AssistantStream_instances.add(this);
        _AssistantStream_events.set(this, []);
        _AssistantStream_runStepSnapshots.set(this, {});
        _AssistantStream_messageSnapshots.set(this, {});
        _AssistantStream_messageSnapshot.set(this, void 0);
        _AssistantStream_finalRun.set(this, void 0);
        _AssistantStream_currentContentIndex.set(this, void 0);
        _AssistantStream_currentContent.set(this, void 0);
        _AssistantStream_currentToolCallIndex.set(this, void 0);
        _AssistantStream_currentToolCall.set(this, void 0);
        _AssistantStream_currentEvent.set(this, void 0);
        _AssistantStream_currentRunSnapshot.set(this, void 0);
        _AssistantStream_currentRunStepSnapshot.set(this, void 0);
      }
      [(_AssistantStream_events = /* @__PURE__ */ new WeakMap(), _AssistantStream_runStepSnapshots = /* @__PURE__ */ new WeakMap(), _AssistantStream_messageSnapshots = /* @__PURE__ */ new WeakMap(), _AssistantStream_messageSnapshot = /* @__PURE__ */ new WeakMap(), _AssistantStream_finalRun = /* @__PURE__ */ new WeakMap(), _AssistantStream_currentContentIndex = /* @__PURE__ */ new WeakMap(), _AssistantStream_currentContent = /* @__PURE__ */ new WeakMap(), _AssistantStream_currentToolCallIndex = /* @__PURE__ */ new WeakMap(), _AssistantStream_currentToolCall = /* @__PURE__ */ new WeakMap(), _AssistantStream_currentEvent = /* @__PURE__ */ new WeakMap(), _AssistantStream_currentRunSnapshot = /* @__PURE__ */ new WeakMap(), _AssistantStream_currentRunStepSnapshot = /* @__PURE__ */ new WeakMap(), _AssistantStream_instances = /* @__PURE__ */ new WeakSet(), Symbol.asyncIterator)]() {
        const pushQueue = [];
        const readQueue = [];
        let done = false;
        this.on("event", (event) => {
          const reader = readQueue.shift();
          if (reader) {
            reader.resolve(event);
          } else {
            pushQueue.push(event);
          }
        });
        this.on("end", () => {
          done = true;
          for (const reader of readQueue) {
            reader.resolve(void 0);
          }
          readQueue.length = 0;
        });
        this.on("abort", (err) => {
          done = true;
          for (const reader of readQueue) {
            reader.reject(err);
          }
          readQueue.length = 0;
        });
        this.on("error", (err) => {
          done = true;
          for (const reader of readQueue) {
            reader.reject(err);
          }
          readQueue.length = 0;
        });
        return {
          next: /* @__PURE__ */ __name2(async () => {
            if (!pushQueue.length) {
              if (done) {
                return { value: void 0, done: true };
              }
              return new Promise((resolve, reject) => readQueue.push({ resolve, reject })).then((chunk2) => chunk2 ? { value: chunk2, done: false } : { value: void 0, done: true });
            }
            const chunk = pushQueue.shift();
            return { value: chunk, done: false };
          }, "next"),
          return: /* @__PURE__ */ __name2(async () => {
            this.abort();
            return { value: void 0, done: true };
          }, "return")
        };
      }
      static fromReadableStream(stream) {
        const runner = new _AssistantStream();
        runner._run(() => runner._fromReadableStream(stream));
        return runner;
      }
      async _fromReadableStream(readableStream, options) {
        const signal = options?.signal;
        if (signal) {
          if (signal.aborted)
            this.controller.abort();
          signal.addEventListener("abort", () => this.controller.abort());
        }
        this._connected();
        const stream = Stream.fromReadableStream(readableStream, this.controller);
        for await (const event of stream) {
          __classPrivateFieldGet4(this, _AssistantStream_instances, "m", _AssistantStream_addEvent).call(this, event);
        }
        if (stream.controller.signal?.aborted) {
          throw new APIUserAbortError();
        }
        return this._addRun(__classPrivateFieldGet4(this, _AssistantStream_instances, "m", _AssistantStream_endRequest).call(this));
      }
      toReadableStream() {
        const stream = new Stream(this[Symbol.asyncIterator].bind(this), this.controller);
        return stream.toReadableStream();
      }
      static createToolAssistantStream(threadId, runId, runs, params, options) {
        const runner = new _AssistantStream();
        runner._run(() => runner._runToolAssistantStream(threadId, runId, runs, params, {
          ...options,
          headers: { ...options?.headers, "X-Stainless-Helper-Method": "stream" }
        }));
        return runner;
      }
      async _createToolAssistantStream(run, threadId, runId, params, options) {
        const signal = options?.signal;
        if (signal) {
          if (signal.aborted)
            this.controller.abort();
          signal.addEventListener("abort", () => this.controller.abort());
        }
        const body = { ...params, stream: true };
        const stream = await run.submitToolOutputs(threadId, runId, body, {
          ...options,
          signal: this.controller.signal
        });
        this._connected();
        for await (const event of stream) {
          __classPrivateFieldGet4(this, _AssistantStream_instances, "m", _AssistantStream_addEvent).call(this, event);
        }
        if (stream.controller.signal?.aborted) {
          throw new APIUserAbortError();
        }
        return this._addRun(__classPrivateFieldGet4(this, _AssistantStream_instances, "m", _AssistantStream_endRequest).call(this));
      }
      static createThreadAssistantStream(params, thread, options) {
        const runner = new _AssistantStream();
        runner._run(() => runner._threadAssistantStream(params, thread, {
          ...options,
          headers: { ...options?.headers, "X-Stainless-Helper-Method": "stream" }
        }));
        return runner;
      }
      static createAssistantStream(threadId, runs, params, options) {
        const runner = new _AssistantStream();
        runner._run(() => runner._runAssistantStream(threadId, runs, params, {
          ...options,
          headers: { ...options?.headers, "X-Stainless-Helper-Method": "stream" }
        }));
        return runner;
      }
      currentEvent() {
        return __classPrivateFieldGet4(this, _AssistantStream_currentEvent, "f");
      }
      currentRun() {
        return __classPrivateFieldGet4(this, _AssistantStream_currentRunSnapshot, "f");
      }
      currentMessageSnapshot() {
        return __classPrivateFieldGet4(this, _AssistantStream_messageSnapshot, "f");
      }
      currentRunStepSnapshot() {
        return __classPrivateFieldGet4(this, _AssistantStream_currentRunStepSnapshot, "f");
      }
      async finalRunSteps() {
        await this.done();
        return Object.values(__classPrivateFieldGet4(this, _AssistantStream_runStepSnapshots, "f"));
      }
      async finalMessages() {
        await this.done();
        return Object.values(__classPrivateFieldGet4(this, _AssistantStream_messageSnapshots, "f"));
      }
      async finalRun() {
        await this.done();
        if (!__classPrivateFieldGet4(this, _AssistantStream_finalRun, "f"))
          throw Error("Final run was not received.");
        return __classPrivateFieldGet4(this, _AssistantStream_finalRun, "f");
      }
      async _createThreadAssistantStream(thread, params, options) {
        const signal = options?.signal;
        if (signal) {
          if (signal.aborted)
            this.controller.abort();
          signal.addEventListener("abort", () => this.controller.abort());
        }
        const body = { ...params, stream: true };
        const stream = await thread.createAndRun(body, { ...options, signal: this.controller.signal });
        this._connected();
        for await (const event of stream) {
          __classPrivateFieldGet4(this, _AssistantStream_instances, "m", _AssistantStream_addEvent).call(this, event);
        }
        if (stream.controller.signal?.aborted) {
          throw new APIUserAbortError();
        }
        return this._addRun(__classPrivateFieldGet4(this, _AssistantStream_instances, "m", _AssistantStream_endRequest).call(this));
      }
      async _createAssistantStream(run, threadId, params, options) {
        const signal = options?.signal;
        if (signal) {
          if (signal.aborted)
            this.controller.abort();
          signal.addEventListener("abort", () => this.controller.abort());
        }
        const body = { ...params, stream: true };
        const stream = await run.create(threadId, body, { ...options, signal: this.controller.signal });
        this._connected();
        for await (const event of stream) {
          __classPrivateFieldGet4(this, _AssistantStream_instances, "m", _AssistantStream_addEvent).call(this, event);
        }
        if (stream.controller.signal?.aborted) {
          throw new APIUserAbortError();
        }
        return this._addRun(__classPrivateFieldGet4(this, _AssistantStream_instances, "m", _AssistantStream_endRequest).call(this));
      }
      static accumulateDelta(acc, delta) {
        for (const [key, deltaValue] of Object.entries(delta)) {
          if (!acc.hasOwnProperty(key)) {
            acc[key] = deltaValue;
            continue;
          }
          let accValue = acc[key];
          if (accValue === null || accValue === void 0) {
            acc[key] = deltaValue;
            continue;
          }
          if (key === "index" || key === "type") {
            acc[key] = deltaValue;
            continue;
          }
          if (typeof accValue === "string" && typeof deltaValue === "string") {
            accValue += deltaValue;
          } else if (typeof accValue === "number" && typeof deltaValue === "number") {
            accValue += deltaValue;
          } else if (isObj(accValue) && isObj(deltaValue)) {
            accValue = this.accumulateDelta(accValue, deltaValue);
          } else if (Array.isArray(accValue) && Array.isArray(deltaValue)) {
            if (accValue.every((x) => typeof x === "string" || typeof x === "number")) {
              accValue.push(...deltaValue);
              continue;
            }
            for (const deltaEntry of deltaValue) {
              if (!isObj(deltaEntry)) {
                throw new Error(`Expected array delta entry to be an object but got: ${deltaEntry}`);
              }
              const index = deltaEntry["index"];
              if (index == null) {
                console.error(deltaEntry);
                throw new Error("Expected array delta entry to have an `index` property");
              }
              if (typeof index !== "number") {
                throw new Error(`Expected array delta entry \`index\` property to be a number but got ${index}`);
              }
              const accEntry = accValue[index];
              if (accEntry == null) {
                accValue.push(deltaEntry);
              } else {
                accValue[index] = this.accumulateDelta(accEntry, deltaEntry);
              }
            }
            continue;
          } else {
            throw Error(`Unhandled record type: ${key}, deltaValue: ${deltaValue}, accValue: ${accValue}`);
          }
          acc[key] = accValue;
        }
        return acc;
      }
      _addRun(run) {
        return run;
      }
      async _threadAssistantStream(params, thread, options) {
        return await this._createThreadAssistantStream(thread, params, options);
      }
      async _runAssistantStream(threadId, runs, params, options) {
        return await this._createAssistantStream(runs, threadId, params, options);
      }
      async _runToolAssistantStream(threadId, runId, runs, params, options) {
        return await this._createToolAssistantStream(runs, threadId, runId, params, options);
      }
    };
    _AssistantStream_addEvent = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function _AssistantStream_addEvent2(event) {
      if (this.ended)
        return;
      __classPrivateFieldSet4(this, _AssistantStream_currentEvent, event, "f");
      __classPrivateFieldGet4(this, _AssistantStream_instances, "m", _AssistantStream_handleEvent).call(this, event);
      switch (event.event) {
        case "thread.created":
          break;
        case "thread.run.created":
        case "thread.run.queued":
        case "thread.run.in_progress":
        case "thread.run.requires_action":
        case "thread.run.completed":
        case "thread.run.incomplete":
        case "thread.run.failed":
        case "thread.run.cancelling":
        case "thread.run.cancelled":
        case "thread.run.expired":
          __classPrivateFieldGet4(this, _AssistantStream_instances, "m", _AssistantStream_handleRun).call(this, event);
          break;
        case "thread.run.step.created":
        case "thread.run.step.in_progress":
        case "thread.run.step.delta":
        case "thread.run.step.completed":
        case "thread.run.step.failed":
        case "thread.run.step.cancelled":
        case "thread.run.step.expired":
          __classPrivateFieldGet4(this, _AssistantStream_instances, "m", _AssistantStream_handleRunStep).call(this, event);
          break;
        case "thread.message.created":
        case "thread.message.in_progress":
        case "thread.message.delta":
        case "thread.message.completed":
        case "thread.message.incomplete":
          __classPrivateFieldGet4(this, _AssistantStream_instances, "m", _AssistantStream_handleMessage).call(this, event);
          break;
        case "error":
          throw new Error("Encountered an error event in event processing - errors should be processed earlier");
        default:
          assertNever(event);
      }
    }, "_AssistantStream_addEvent2"), "_AssistantStream_addEvent"), _AssistantStream_endRequest = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function _AssistantStream_endRequest2() {
      if (this.ended) {
        throw new OpenAIError(`stream has ended, this shouldn't happen`);
      }
      if (!__classPrivateFieldGet4(this, _AssistantStream_finalRun, "f"))
        throw Error("Final run has not been received");
      return __classPrivateFieldGet4(this, _AssistantStream_finalRun, "f");
    }, "_AssistantStream_endRequest2"), "_AssistantStream_endRequest"), _AssistantStream_handleMessage = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function _AssistantStream_handleMessage2(event) {
      const [accumulatedMessage, newContent] = __classPrivateFieldGet4(this, _AssistantStream_instances, "m", _AssistantStream_accumulateMessage).call(this, event, __classPrivateFieldGet4(this, _AssistantStream_messageSnapshot, "f"));
      __classPrivateFieldSet4(this, _AssistantStream_messageSnapshot, accumulatedMessage, "f");
      __classPrivateFieldGet4(this, _AssistantStream_messageSnapshots, "f")[accumulatedMessage.id] = accumulatedMessage;
      for (const content of newContent) {
        const snapshotContent = accumulatedMessage.content[content.index];
        if (snapshotContent?.type == "text") {
          this._emit("textCreated", snapshotContent.text);
        }
      }
      switch (event.event) {
        case "thread.message.created":
          this._emit("messageCreated", event.data);
          break;
        case "thread.message.in_progress":
          break;
        case "thread.message.delta":
          this._emit("messageDelta", event.data.delta, accumulatedMessage);
          if (event.data.delta.content) {
            for (const content of event.data.delta.content) {
              if (content.type == "text" && content.text) {
                let textDelta = content.text;
                let snapshot = accumulatedMessage.content[content.index];
                if (snapshot && snapshot.type == "text") {
                  this._emit("textDelta", textDelta, snapshot.text);
                } else {
                  throw Error("The snapshot associated with this text delta is not text or missing");
                }
              }
              if (content.index != __classPrivateFieldGet4(this, _AssistantStream_currentContentIndex, "f")) {
                if (__classPrivateFieldGet4(this, _AssistantStream_currentContent, "f")) {
                  switch (__classPrivateFieldGet4(this, _AssistantStream_currentContent, "f").type) {
                    case "text":
                      this._emit("textDone", __classPrivateFieldGet4(this, _AssistantStream_currentContent, "f").text, __classPrivateFieldGet4(this, _AssistantStream_messageSnapshot, "f"));
                      break;
                    case "image_file":
                      this._emit("imageFileDone", __classPrivateFieldGet4(this, _AssistantStream_currentContent, "f").image_file, __classPrivateFieldGet4(this, _AssistantStream_messageSnapshot, "f"));
                      break;
                  }
                }
                __classPrivateFieldSet4(this, _AssistantStream_currentContentIndex, content.index, "f");
              }
              __classPrivateFieldSet4(this, _AssistantStream_currentContent, accumulatedMessage.content[content.index], "f");
            }
          }
          break;
        case "thread.message.completed":
        case "thread.message.incomplete":
          if (__classPrivateFieldGet4(this, _AssistantStream_currentContentIndex, "f") !== void 0) {
            const currentContent = event.data.content[__classPrivateFieldGet4(this, _AssistantStream_currentContentIndex, "f")];
            if (currentContent) {
              switch (currentContent.type) {
                case "image_file":
                  this._emit("imageFileDone", currentContent.image_file, __classPrivateFieldGet4(this, _AssistantStream_messageSnapshot, "f"));
                  break;
                case "text":
                  this._emit("textDone", currentContent.text, __classPrivateFieldGet4(this, _AssistantStream_messageSnapshot, "f"));
                  break;
              }
            }
          }
          if (__classPrivateFieldGet4(this, _AssistantStream_messageSnapshot, "f")) {
            this._emit("messageDone", event.data);
          }
          __classPrivateFieldSet4(this, _AssistantStream_messageSnapshot, void 0, "f");
      }
    }, "_AssistantStream_handleMessage2"), "_AssistantStream_handleMessage"), _AssistantStream_handleRunStep = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function _AssistantStream_handleRunStep2(event) {
      const accumulatedRunStep = __classPrivateFieldGet4(this, _AssistantStream_instances, "m", _AssistantStream_accumulateRunStep).call(this, event);
      __classPrivateFieldSet4(this, _AssistantStream_currentRunStepSnapshot, accumulatedRunStep, "f");
      switch (event.event) {
        case "thread.run.step.created":
          this._emit("runStepCreated", event.data);
          break;
        case "thread.run.step.delta":
          const delta = event.data.delta;
          if (delta.step_details && delta.step_details.type == "tool_calls" && delta.step_details.tool_calls && accumulatedRunStep.step_details.type == "tool_calls") {
            for (const toolCall of delta.step_details.tool_calls) {
              if (toolCall.index == __classPrivateFieldGet4(this, _AssistantStream_currentToolCallIndex, "f")) {
                this._emit("toolCallDelta", toolCall, accumulatedRunStep.step_details.tool_calls[toolCall.index]);
              } else {
                if (__classPrivateFieldGet4(this, _AssistantStream_currentToolCall, "f")) {
                  this._emit("toolCallDone", __classPrivateFieldGet4(this, _AssistantStream_currentToolCall, "f"));
                }
                __classPrivateFieldSet4(this, _AssistantStream_currentToolCallIndex, toolCall.index, "f");
                __classPrivateFieldSet4(this, _AssistantStream_currentToolCall, accumulatedRunStep.step_details.tool_calls[toolCall.index], "f");
                if (__classPrivateFieldGet4(this, _AssistantStream_currentToolCall, "f"))
                  this._emit("toolCallCreated", __classPrivateFieldGet4(this, _AssistantStream_currentToolCall, "f"));
              }
            }
          }
          this._emit("runStepDelta", event.data.delta, accumulatedRunStep);
          break;
        case "thread.run.step.completed":
        case "thread.run.step.failed":
        case "thread.run.step.cancelled":
        case "thread.run.step.expired":
          __classPrivateFieldSet4(this, _AssistantStream_currentRunStepSnapshot, void 0, "f");
          const details = event.data.step_details;
          if (details.type == "tool_calls") {
            if (__classPrivateFieldGet4(this, _AssistantStream_currentToolCall, "f")) {
              this._emit("toolCallDone", __classPrivateFieldGet4(this, _AssistantStream_currentToolCall, "f"));
              __classPrivateFieldSet4(this, _AssistantStream_currentToolCall, void 0, "f");
            }
          }
          this._emit("runStepDone", event.data, accumulatedRunStep);
          break;
        case "thread.run.step.in_progress":
          break;
      }
    }, "_AssistantStream_handleRunStep2"), "_AssistantStream_handleRunStep"), _AssistantStream_handleEvent = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function _AssistantStream_handleEvent2(event) {
      __classPrivateFieldGet4(this, _AssistantStream_events, "f").push(event);
      this._emit("event", event);
    }, "_AssistantStream_handleEvent2"), "_AssistantStream_handleEvent"), _AssistantStream_accumulateRunStep = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function _AssistantStream_accumulateRunStep2(event) {
      switch (event.event) {
        case "thread.run.step.created":
          __classPrivateFieldGet4(this, _AssistantStream_runStepSnapshots, "f")[event.data.id] = event.data;
          return event.data;
        case "thread.run.step.delta":
          let snapshot = __classPrivateFieldGet4(this, _AssistantStream_runStepSnapshots, "f")[event.data.id];
          if (!snapshot) {
            throw Error("Received a RunStepDelta before creation of a snapshot");
          }
          let data = event.data;
          if (data.delta) {
            const accumulated = AssistantStream.accumulateDelta(snapshot, data.delta);
            __classPrivateFieldGet4(this, _AssistantStream_runStepSnapshots, "f")[event.data.id] = accumulated;
          }
          return __classPrivateFieldGet4(this, _AssistantStream_runStepSnapshots, "f")[event.data.id];
        case "thread.run.step.completed":
        case "thread.run.step.failed":
        case "thread.run.step.cancelled":
        case "thread.run.step.expired":
        case "thread.run.step.in_progress":
          __classPrivateFieldGet4(this, _AssistantStream_runStepSnapshots, "f")[event.data.id] = event.data;
          break;
      }
      if (__classPrivateFieldGet4(this, _AssistantStream_runStepSnapshots, "f")[event.data.id])
        return __classPrivateFieldGet4(this, _AssistantStream_runStepSnapshots, "f")[event.data.id];
      throw new Error("No snapshot available");
    }, "_AssistantStream_accumulateRunStep2"), "_AssistantStream_accumulateRunStep"), _AssistantStream_accumulateMessage = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function _AssistantStream_accumulateMessage2(event, snapshot) {
      let newContent = [];
      switch (event.event) {
        case "thread.message.created":
          return [event.data, newContent];
        case "thread.message.delta":
          if (!snapshot) {
            throw Error("Received a delta with no existing snapshot (there should be one from message creation)");
          }
          let data = event.data;
          if (data.delta.content) {
            for (const contentElement of data.delta.content) {
              if (contentElement.index in snapshot.content) {
                let currentContent = snapshot.content[contentElement.index];
                snapshot.content[contentElement.index] = __classPrivateFieldGet4(this, _AssistantStream_instances, "m", _AssistantStream_accumulateContent).call(this, contentElement, currentContent);
              } else {
                snapshot.content[contentElement.index] = contentElement;
                newContent.push(contentElement);
              }
            }
          }
          return [snapshot, newContent];
        case "thread.message.in_progress":
        case "thread.message.completed":
        case "thread.message.incomplete":
          if (snapshot) {
            return [snapshot, newContent];
          } else {
            throw Error("Received thread message event with no existing snapshot");
          }
      }
      throw Error("Tried to accumulate a non-message event");
    }, "_AssistantStream_accumulateMessage2"), "_AssistantStream_accumulateMessage"), _AssistantStream_accumulateContent = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function _AssistantStream_accumulateContent2(contentElement, currentContent) {
      return AssistantStream.accumulateDelta(currentContent, contentElement);
    }, "_AssistantStream_accumulateContent2"), "_AssistantStream_accumulateContent"), _AssistantStream_handleRun = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function _AssistantStream_handleRun2(event) {
      __classPrivateFieldSet4(this, _AssistantStream_currentRunSnapshot, event.data, "f");
      switch (event.event) {
        case "thread.run.created":
          break;
        case "thread.run.queued":
          break;
        case "thread.run.in_progress":
          break;
        case "thread.run.requires_action":
        case "thread.run.cancelled":
        case "thread.run.failed":
        case "thread.run.completed":
        case "thread.run.expired":
          __classPrivateFieldSet4(this, _AssistantStream_finalRun, event.data, "f");
          if (__classPrivateFieldGet4(this, _AssistantStream_currentToolCall, "f")) {
            this._emit("toolCallDone", __classPrivateFieldGet4(this, _AssistantStream_currentToolCall, "f"));
            __classPrivateFieldSet4(this, _AssistantStream_currentToolCall, void 0, "f");
          }
          break;
        case "thread.run.cancelling":
          break;
      }
    }, "_AssistantStream_handleRun2"), "_AssistantStream_handleRun");
    __name2(assertNever, "assertNever");
  }
});
var Assistants;
var AssistantsPage;
var init_assistants = __esm({
  "../node_modules/openai/resources/beta/assistants.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_resource();
    init_core();
    init_pagination();
    Assistants = class extends APIResource {
      static {
        __name(this, "Assistants");
      }
      static {
        __name2(this, "Assistants");
      }
      /**
       * Create an assistant with a model and instructions.
       *
       * @example
       * ```ts
       * const assistant = await client.beta.assistants.create({
       *   model: 'gpt-4o',
       * });
       * ```
       */
      create(body, options) {
        return this._client.post("/assistants", {
          body,
          ...options,
          headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
        });
      }
      /**
       * Retrieves an assistant.
       *
       * @example
       * ```ts
       * const assistant = await client.beta.assistants.retrieve(
       *   'assistant_id',
       * );
       * ```
       */
      retrieve(assistantId, options) {
        return this._client.get(`/assistants/${assistantId}`, {
          ...options,
          headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
        });
      }
      /**
       * Modifies an assistant.
       *
       * @example
       * ```ts
       * const assistant = await client.beta.assistants.update(
       *   'assistant_id',
       * );
       * ```
       */
      update(assistantId, body, options) {
        return this._client.post(`/assistants/${assistantId}`, {
          body,
          ...options,
          headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
        });
      }
      list(query = {}, options) {
        if (isRequestOptions(query)) {
          return this.list({}, query);
        }
        return this._client.getAPIList("/assistants", AssistantsPage, {
          query,
          ...options,
          headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
        });
      }
      /**
       * Delete an assistant.
       *
       * @example
       * ```ts
       * const assistantDeleted = await client.beta.assistants.del(
       *   'assistant_id',
       * );
       * ```
       */
      del(assistantId, options) {
        return this._client.delete(`/assistants/${assistantId}`, {
          ...options,
          headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
        });
      }
    };
    AssistantsPage = class extends CursorPage {
      static {
        __name(this, "AssistantsPage");
      }
      static {
        __name2(this, "AssistantsPage");
      }
    };
    Assistants.AssistantsPage = AssistantsPage;
  }
});
function isRunnableFunctionWithParse(fn) {
  return typeof fn.parse === "function";
}
__name(isRunnableFunctionWithParse, "isRunnableFunctionWithParse");
var init_RunnableFunction = __esm({
  "../node_modules/openai/lib/RunnableFunction.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    __name2(isRunnableFunctionWithParse, "isRunnableFunctionWithParse");
  }
});
var isAssistantMessage;
var isFunctionMessage;
var isToolMessage;
var init_chatCompletionUtils = __esm({
  "../node_modules/openai/lib/chatCompletionUtils.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    isAssistantMessage = /* @__PURE__ */ __name2((message) => {
      return message?.role === "assistant";
    }, "isAssistantMessage");
    isFunctionMessage = /* @__PURE__ */ __name2((message) => {
      return message?.role === "function";
    }, "isFunctionMessage");
    isToolMessage = /* @__PURE__ */ __name2((message) => {
      return message?.role === "tool";
    }, "isToolMessage");
  }
});
function isAutoParsableResponseFormat(response_format) {
  return response_format?.["$brand"] === "auto-parseable-response-format";
}
__name(isAutoParsableResponseFormat, "isAutoParsableResponseFormat");
function isAutoParsableTool(tool) {
  return tool?.["$brand"] === "auto-parseable-tool";
}
__name(isAutoParsableTool, "isAutoParsableTool");
function maybeParseChatCompletion(completion, params) {
  if (!params || !hasAutoParseableInput(params)) {
    return {
      ...completion,
      choices: completion.choices.map((choice) => ({
        ...choice,
        message: {
          ...choice.message,
          parsed: null,
          ...choice.message.tool_calls ? {
            tool_calls: choice.message.tool_calls
          } : void 0
        }
      }))
    };
  }
  return parseChatCompletion(completion, params);
}
__name(maybeParseChatCompletion, "maybeParseChatCompletion");
function parseChatCompletion(completion, params) {
  const choices = completion.choices.map((choice) => {
    if (choice.finish_reason === "length") {
      throw new LengthFinishReasonError();
    }
    if (choice.finish_reason === "content_filter") {
      throw new ContentFilterFinishReasonError();
    }
    return {
      ...choice,
      message: {
        ...choice.message,
        ...choice.message.tool_calls ? {
          tool_calls: choice.message.tool_calls?.map((toolCall) => parseToolCall(params, toolCall)) ?? void 0
        } : void 0,
        parsed: choice.message.content && !choice.message.refusal ? parseResponseFormat(params, choice.message.content) : null
      }
    };
  });
  return { ...completion, choices };
}
__name(parseChatCompletion, "parseChatCompletion");
function parseResponseFormat(params, content) {
  if (params.response_format?.type !== "json_schema") {
    return null;
  }
  if (params.response_format?.type === "json_schema") {
    if ("$parseRaw" in params.response_format) {
      const response_format = params.response_format;
      return response_format.$parseRaw(content);
    }
    return JSON.parse(content);
  }
  return null;
}
__name(parseResponseFormat, "parseResponseFormat");
function parseToolCall(params, toolCall) {
  const inputTool = params.tools?.find((inputTool2) => inputTool2.function?.name === toolCall.function.name);
  return {
    ...toolCall,
    function: {
      ...toolCall.function,
      parsed_arguments: isAutoParsableTool(inputTool) ? inputTool.$parseRaw(toolCall.function.arguments) : inputTool?.function.strict ? JSON.parse(toolCall.function.arguments) : null
    }
  };
}
__name(parseToolCall, "parseToolCall");
function shouldParseToolCall(params, toolCall) {
  if (!params) {
    return false;
  }
  const inputTool = params.tools?.find((inputTool2) => inputTool2.function?.name === toolCall.function.name);
  return isAutoParsableTool(inputTool) || inputTool?.function.strict || false;
}
__name(shouldParseToolCall, "shouldParseToolCall");
function hasAutoParseableInput(params) {
  if (isAutoParsableResponseFormat(params.response_format)) {
    return true;
  }
  return params.tools?.some((t) => isAutoParsableTool(t) || t.type === "function" && t.function.strict === true) ?? false;
}
__name(hasAutoParseableInput, "hasAutoParseableInput");
function validateInputTools(tools) {
  for (const tool of tools ?? []) {
    if (tool.type !== "function") {
      throw new OpenAIError(`Currently only \`function\` tool types support auto-parsing; Received \`${tool.type}\``);
    }
    if (tool.function.strict !== true) {
      throw new OpenAIError(`The \`${tool.function.name}\` tool is not marked with \`strict: true\`. Only strict function tools can be auto-parsed`);
    }
  }
}
__name(validateInputTools, "validateInputTools");
var init_parser = __esm({
  "../node_modules/openai/lib/parser.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_error();
    __name2(isAutoParsableResponseFormat, "isAutoParsableResponseFormat");
    __name2(isAutoParsableTool, "isAutoParsableTool");
    __name2(maybeParseChatCompletion, "maybeParseChatCompletion");
    __name2(parseChatCompletion, "parseChatCompletion");
    __name2(parseResponseFormat, "parseResponseFormat");
    __name2(parseToolCall, "parseToolCall");
    __name2(shouldParseToolCall, "shouldParseToolCall");
    __name2(hasAutoParseableInput, "hasAutoParseableInput");
    __name2(validateInputTools, "validateInputTools");
  }
});
var __classPrivateFieldGet5;
var _AbstractChatCompletionRunner_instances;
var _AbstractChatCompletionRunner_getFinalContent;
var _AbstractChatCompletionRunner_getFinalMessage;
var _AbstractChatCompletionRunner_getFinalFunctionCall;
var _AbstractChatCompletionRunner_getFinalFunctionCallResult;
var _AbstractChatCompletionRunner_calculateTotalUsage;
var _AbstractChatCompletionRunner_validateParams;
var _AbstractChatCompletionRunner_stringifyFunctionCallResult;
var DEFAULT_MAX_CHAT_COMPLETIONS;
var AbstractChatCompletionRunner;
var init_AbstractChatCompletionRunner = __esm({
  "../node_modules/openai/lib/AbstractChatCompletionRunner.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_error();
    init_RunnableFunction();
    init_chatCompletionUtils();
    init_EventStream();
    init_parser();
    __classPrivateFieldGet5 = /* @__PURE__ */ __name(function(receiver, state, kind2, f) {
      if (kind2 === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind2 === "m" ? f : kind2 === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }, "__classPrivateFieldGet5");
    DEFAULT_MAX_CHAT_COMPLETIONS = 10;
    AbstractChatCompletionRunner = class extends EventStream {
      static {
        __name(this, "AbstractChatCompletionRunner");
      }
      static {
        __name2(this, "AbstractChatCompletionRunner");
      }
      constructor() {
        super(...arguments);
        _AbstractChatCompletionRunner_instances.add(this);
        this._chatCompletions = [];
        this.messages = [];
      }
      _addChatCompletion(chatCompletion) {
        this._chatCompletions.push(chatCompletion);
        this._emit("chatCompletion", chatCompletion);
        const message = chatCompletion.choices[0]?.message;
        if (message)
          this._addMessage(message);
        return chatCompletion;
      }
      _addMessage(message, emit22 = true) {
        if (!("content" in message))
          message.content = null;
        this.messages.push(message);
        if (emit22) {
          this._emit("message", message);
          if ((isFunctionMessage(message) || isToolMessage(message)) && message.content) {
            this._emit("functionCallResult", message.content);
          } else if (isAssistantMessage(message) && message.function_call) {
            this._emit("functionCall", message.function_call);
          } else if (isAssistantMessage(message) && message.tool_calls) {
            for (const tool_call of message.tool_calls) {
              if (tool_call.type === "function") {
                this._emit("functionCall", tool_call.function);
              }
            }
          }
        }
      }
      /**
       * @returns a promise that resolves with the final ChatCompletion, or rejects
       * if an error occurred or the stream ended prematurely without producing a ChatCompletion.
       */
      async finalChatCompletion() {
        await this.done();
        const completion = this._chatCompletions[this._chatCompletions.length - 1];
        if (!completion)
          throw new OpenAIError("stream ended without producing a ChatCompletion");
        return completion;
      }
      /**
       * @returns a promise that resolves with the content of the final ChatCompletionMessage, or rejects
       * if an error occurred or the stream ended prematurely without producing a ChatCompletionMessage.
       */
      async finalContent() {
        await this.done();
        return __classPrivateFieldGet5(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalContent).call(this);
      }
      /**
       * @returns a promise that resolves with the the final assistant ChatCompletionMessage response,
       * or rejects if an error occurred or the stream ended prematurely without producing a ChatCompletionMessage.
       */
      async finalMessage() {
        await this.done();
        return __classPrivateFieldGet5(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalMessage).call(this);
      }
      /**
       * @returns a promise that resolves with the content of the final FunctionCall, or rejects
       * if an error occurred or the stream ended prematurely without producing a ChatCompletionMessage.
       */
      async finalFunctionCall() {
        await this.done();
        return __classPrivateFieldGet5(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalFunctionCall).call(this);
      }
      async finalFunctionCallResult() {
        await this.done();
        return __classPrivateFieldGet5(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalFunctionCallResult).call(this);
      }
      async totalUsage() {
        await this.done();
        return __classPrivateFieldGet5(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_calculateTotalUsage).call(this);
      }
      allChatCompletions() {
        return [...this._chatCompletions];
      }
      _emitFinal() {
        const completion = this._chatCompletions[this._chatCompletions.length - 1];
        if (completion)
          this._emit("finalChatCompletion", completion);
        const finalMessage = __classPrivateFieldGet5(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalMessage).call(this);
        if (finalMessage)
          this._emit("finalMessage", finalMessage);
        const finalContent = __classPrivateFieldGet5(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalContent).call(this);
        if (finalContent)
          this._emit("finalContent", finalContent);
        const finalFunctionCall = __classPrivateFieldGet5(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalFunctionCall).call(this);
        if (finalFunctionCall)
          this._emit("finalFunctionCall", finalFunctionCall);
        const finalFunctionCallResult = __classPrivateFieldGet5(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalFunctionCallResult).call(this);
        if (finalFunctionCallResult != null)
          this._emit("finalFunctionCallResult", finalFunctionCallResult);
        if (this._chatCompletions.some((c) => c.usage)) {
          this._emit("totalUsage", __classPrivateFieldGet5(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_calculateTotalUsage).call(this));
        }
      }
      async _createChatCompletion(client, params, options) {
        const signal = options?.signal;
        if (signal) {
          if (signal.aborted)
            this.controller.abort();
          signal.addEventListener("abort", () => this.controller.abort());
        }
        __classPrivateFieldGet5(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_validateParams).call(this, params);
        const chatCompletion = await client.chat.completions.create({ ...params, stream: false }, { ...options, signal: this.controller.signal });
        this._connected();
        return this._addChatCompletion(parseChatCompletion(chatCompletion, params));
      }
      async _runChatCompletion(client, params, options) {
        for (const message of params.messages) {
          this._addMessage(message, false);
        }
        return await this._createChatCompletion(client, params, options);
      }
      async _runFunctions(client, params, options) {
        const role = "function";
        const { function_call = "auto", stream, ...restParams } = params;
        const singleFunctionToCall = typeof function_call !== "string" && function_call?.name;
        const { maxChatCompletions = DEFAULT_MAX_CHAT_COMPLETIONS } = options || {};
        const functionsByName = {};
        for (const f of params.functions) {
          functionsByName[f.name || f.function.name] = f;
        }
        const functions = params.functions.map((f) => ({
          name: f.name || f.function.name,
          parameters: f.parameters,
          description: f.description
        }));
        for (const message of params.messages) {
          this._addMessage(message, false);
        }
        for (let i = 0; i < maxChatCompletions; ++i) {
          const chatCompletion = await this._createChatCompletion(client, {
            ...restParams,
            function_call,
            functions,
            messages: [...this.messages]
          }, options);
          const message = chatCompletion.choices[0]?.message;
          if (!message) {
            throw new OpenAIError(`missing message in ChatCompletion response`);
          }
          if (!message.function_call)
            return;
          const { name, arguments: args } = message.function_call;
          const fn = functionsByName[name];
          if (!fn) {
            const content2 = `Invalid function_call: ${JSON.stringify(name)}. Available options are: ${functions.map((f) => JSON.stringify(f.name)).join(", ")}. Please try again`;
            this._addMessage({ role, name, content: content2 });
            continue;
          } else if (singleFunctionToCall && singleFunctionToCall !== name) {
            const content2 = `Invalid function_call: ${JSON.stringify(name)}. ${JSON.stringify(singleFunctionToCall)} requested. Please try again`;
            this._addMessage({ role, name, content: content2 });
            continue;
          }
          let parsed;
          try {
            parsed = isRunnableFunctionWithParse(fn) ? await fn.parse(args) : args;
          } catch (error32) {
            this._addMessage({
              role,
              name,
              content: error32 instanceof Error ? error32.message : String(error32)
            });
            continue;
          }
          const rawContent = await fn.function(parsed, this);
          const content = __classPrivateFieldGet5(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_stringifyFunctionCallResult).call(this, rawContent);
          this._addMessage({ role, name, content });
          if (singleFunctionToCall)
            return;
        }
      }
      async _runTools(client, params, options) {
        const role = "tool";
        const { tool_choice = "auto", stream, ...restParams } = params;
        const singleFunctionToCall = typeof tool_choice !== "string" && tool_choice?.function?.name;
        const { maxChatCompletions = DEFAULT_MAX_CHAT_COMPLETIONS } = options || {};
        const inputTools = params.tools.map((tool) => {
          if (isAutoParsableTool(tool)) {
            if (!tool.$callback) {
              throw new OpenAIError("Tool given to `.runTools()` that does not have an associated function");
            }
            return {
              type: "function",
              function: {
                function: tool.$callback,
                name: tool.function.name,
                description: tool.function.description || "",
                parameters: tool.function.parameters,
                parse: tool.$parseRaw,
                strict: true
              }
            };
          }
          return tool;
        });
        const functionsByName = {};
        for (const f of inputTools) {
          if (f.type === "function") {
            functionsByName[f.function.name || f.function.function.name] = f.function;
          }
        }
        const tools = "tools" in params ? inputTools.map((t) => t.type === "function" ? {
          type: "function",
          function: {
            name: t.function.name || t.function.function.name,
            parameters: t.function.parameters,
            description: t.function.description,
            strict: t.function.strict
          }
        } : t) : void 0;
        for (const message of params.messages) {
          this._addMessage(message, false);
        }
        for (let i = 0; i < maxChatCompletions; ++i) {
          const chatCompletion = await this._createChatCompletion(client, {
            ...restParams,
            tool_choice,
            tools,
            messages: [...this.messages]
          }, options);
          const message = chatCompletion.choices[0]?.message;
          if (!message) {
            throw new OpenAIError(`missing message in ChatCompletion response`);
          }
          if (!message.tool_calls?.length) {
            return;
          }
          for (const tool_call of message.tool_calls) {
            if (tool_call.type !== "function")
              continue;
            const tool_call_id = tool_call.id;
            const { name, arguments: args } = tool_call.function;
            const fn = functionsByName[name];
            if (!fn) {
              const content2 = `Invalid tool_call: ${JSON.stringify(name)}. Available options are: ${Object.keys(functionsByName).map((name2) => JSON.stringify(name2)).join(", ")}. Please try again`;
              this._addMessage({ role, tool_call_id, content: content2 });
              continue;
            } else if (singleFunctionToCall && singleFunctionToCall !== name) {
              const content2 = `Invalid tool_call: ${JSON.stringify(name)}. ${JSON.stringify(singleFunctionToCall)} requested. Please try again`;
              this._addMessage({ role, tool_call_id, content: content2 });
              continue;
            }
            let parsed;
            try {
              parsed = isRunnableFunctionWithParse(fn) ? await fn.parse(args) : args;
            } catch (error32) {
              const content2 = error32 instanceof Error ? error32.message : String(error32);
              this._addMessage({ role, tool_call_id, content: content2 });
              continue;
            }
            const rawContent = await fn.function(parsed, this);
            const content = __classPrivateFieldGet5(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_stringifyFunctionCallResult).call(this, rawContent);
            this._addMessage({ role, tool_call_id, content });
            if (singleFunctionToCall) {
              return;
            }
          }
        }
        return;
      }
    };
    _AbstractChatCompletionRunner_instances = /* @__PURE__ */ new WeakSet(), _AbstractChatCompletionRunner_getFinalContent = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function _AbstractChatCompletionRunner_getFinalContent2() {
      return __classPrivateFieldGet5(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalMessage).call(this).content ?? null;
    }, "_AbstractChatCompletionRunner_getFinalContent2"), "_AbstractChatCompletionRunner_getFinalContent"), _AbstractChatCompletionRunner_getFinalMessage = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function _AbstractChatCompletionRunner_getFinalMessage2() {
      let i = this.messages.length;
      while (i-- > 0) {
        const message = this.messages[i];
        if (isAssistantMessage(message)) {
          const { function_call, ...rest } = message;
          const ret = {
            ...rest,
            content: message.content ?? null,
            refusal: message.refusal ?? null
          };
          if (function_call) {
            ret.function_call = function_call;
          }
          return ret;
        }
      }
      throw new OpenAIError("stream ended without producing a ChatCompletionMessage with role=assistant");
    }, "_AbstractChatCompletionRunner_getFinalMessage2"), "_AbstractChatCompletionRunner_getFinalMessage"), _AbstractChatCompletionRunner_getFinalFunctionCall = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function _AbstractChatCompletionRunner_getFinalFunctionCall2() {
      for (let i = this.messages.length - 1; i >= 0; i--) {
        const message = this.messages[i];
        if (isAssistantMessage(message) && message?.function_call) {
          return message.function_call;
        }
        if (isAssistantMessage(message) && message?.tool_calls?.length) {
          return message.tool_calls.at(-1)?.function;
        }
      }
      return;
    }, "_AbstractChatCompletionRunner_getFinalFunctionCall2"), "_AbstractChatCompletionRunner_getFinalFunctionCall"), _AbstractChatCompletionRunner_getFinalFunctionCallResult = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function _AbstractChatCompletionRunner_getFinalFunctionCallResult2() {
      for (let i = this.messages.length - 1; i >= 0; i--) {
        const message = this.messages[i];
        if (isFunctionMessage(message) && message.content != null) {
          return message.content;
        }
        if (isToolMessage(message) && message.content != null && typeof message.content === "string" && this.messages.some((x) => x.role === "assistant" && x.tool_calls?.some((y) => y.type === "function" && y.id === message.tool_call_id))) {
          return message.content;
        }
      }
      return;
    }, "_AbstractChatCompletionRunner_getFinalFunctionCallResult2"), "_AbstractChatCompletionRunner_getFinalFunctionCallResult"), _AbstractChatCompletionRunner_calculateTotalUsage = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function _AbstractChatCompletionRunner_calculateTotalUsage2() {
      const total = {
        completion_tokens: 0,
        prompt_tokens: 0,
        total_tokens: 0
      };
      for (const { usage } of this._chatCompletions) {
        if (usage) {
          total.completion_tokens += usage.completion_tokens;
          total.prompt_tokens += usage.prompt_tokens;
          total.total_tokens += usage.total_tokens;
        }
      }
      return total;
    }, "_AbstractChatCompletionRunner_calculateTotalUsage2"), "_AbstractChatCompletionRunner_calculateTotalUsage"), _AbstractChatCompletionRunner_validateParams = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function _AbstractChatCompletionRunner_validateParams2(params) {
      if (params.n != null && params.n > 1) {
        throw new OpenAIError("ChatCompletion convenience helpers only support n=1 at this time. To use n>1, please use chat.completions.create() directly.");
      }
    }, "_AbstractChatCompletionRunner_validateParams2"), "_AbstractChatCompletionRunner_validateParams"), _AbstractChatCompletionRunner_stringifyFunctionCallResult = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function _AbstractChatCompletionRunner_stringifyFunctionCallResult2(rawContent) {
      return typeof rawContent === "string" ? rawContent : rawContent === void 0 ? "undefined" : JSON.stringify(rawContent);
    }, "_AbstractChatCompletionRunner_stringifyFunctionCallResult2"), "_AbstractChatCompletionRunner_stringifyFunctionCallResult");
  }
});
var ChatCompletionRunner;
var init_ChatCompletionRunner = __esm({
  "../node_modules/openai/lib/ChatCompletionRunner.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_AbstractChatCompletionRunner();
    init_chatCompletionUtils();
    ChatCompletionRunner = class _ChatCompletionRunner extends AbstractChatCompletionRunner {
      static {
        __name(this, "_ChatCompletionRunner");
      }
      static {
        __name2(this, "ChatCompletionRunner");
      }
      /** @deprecated - please use `runTools` instead. */
      static runFunctions(client, params, options) {
        const runner = new _ChatCompletionRunner();
        const opts = {
          ...options,
          headers: { ...options?.headers, "X-Stainless-Helper-Method": "runFunctions" }
        };
        runner._run(() => runner._runFunctions(client, params, opts));
        return runner;
      }
      static runTools(client, params, options) {
        const runner = new _ChatCompletionRunner();
        const opts = {
          ...options,
          headers: { ...options?.headers, "X-Stainless-Helper-Method": "runTools" }
        };
        runner._run(() => runner._runTools(client, params, opts));
        return runner;
      }
      _addMessage(message, emit22 = true) {
        super._addMessage(message, emit22);
        if (isAssistantMessage(message) && message.content) {
          this._emit("content", message.content);
        }
      }
    };
  }
});
function parseJSON(jsonString, allowPartial = Allow.ALL) {
  if (typeof jsonString !== "string") {
    throw new TypeError(`expecting str, got ${typeof jsonString}`);
  }
  if (!jsonString.trim()) {
    throw new Error(`${jsonString} is empty`);
  }
  return _parseJSON(jsonString.trim(), allowPartial);
}
__name(parseJSON, "parseJSON");
var STR;
var NUM;
var ARR;
var OBJ;
var NULL;
var BOOL;
var NAN;
var INFINITY;
var MINUS_INFINITY;
var INF;
var SPECIAL;
var ATOM;
var COLLECTION;
var ALL;
var Allow;
var PartialJSON;
var MalformedJSON;
var _parseJSON;
var partialParse;
var init_parser2 = __esm({
  "../node_modules/openai/_vendor/partial-json-parser/parser.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    STR = 1;
    NUM = 2;
    ARR = 4;
    OBJ = 8;
    NULL = 16;
    BOOL = 32;
    NAN = 64;
    INFINITY = 128;
    MINUS_INFINITY = 256;
    INF = INFINITY | MINUS_INFINITY;
    SPECIAL = NULL | BOOL | INF | NAN;
    ATOM = STR | NUM | SPECIAL;
    COLLECTION = ARR | OBJ;
    ALL = ATOM | COLLECTION;
    Allow = {
      STR,
      NUM,
      ARR,
      OBJ,
      NULL,
      BOOL,
      NAN,
      INFINITY,
      MINUS_INFINITY,
      INF,
      SPECIAL,
      ATOM,
      COLLECTION,
      ALL
    };
    PartialJSON = class extends Error {
      static {
        __name(this, "PartialJSON");
      }
      static {
        __name2(this, "PartialJSON");
      }
    };
    MalformedJSON = class extends Error {
      static {
        __name(this, "MalformedJSON");
      }
      static {
        __name2(this, "MalformedJSON");
      }
    };
    __name2(parseJSON, "parseJSON");
    _parseJSON = /* @__PURE__ */ __name2((jsonString, allow) => {
      const length = jsonString.length;
      let index = 0;
      const markPartialJSON = /* @__PURE__ */ __name2((msg) => {
        throw new PartialJSON(`${msg} at position ${index}`);
      }, "markPartialJSON");
      const throwMalformedError = /* @__PURE__ */ __name2((msg) => {
        throw new MalformedJSON(`${msg} at position ${index}`);
      }, "throwMalformedError");
      const parseAny = /* @__PURE__ */ __name2(() => {
        skipBlank();
        if (index >= length)
          markPartialJSON("Unexpected end of input");
        if (jsonString[index] === '"')
          return parseStr();
        if (jsonString[index] === "{")
          return parseObj();
        if (jsonString[index] === "[")
          return parseArr();
        if (jsonString.substring(index, index + 4) === "null" || Allow.NULL & allow && length - index < 4 && "null".startsWith(jsonString.substring(index))) {
          index += 4;
          return null;
        }
        if (jsonString.substring(index, index + 4) === "true" || Allow.BOOL & allow && length - index < 4 && "true".startsWith(jsonString.substring(index))) {
          index += 4;
          return true;
        }
        if (jsonString.substring(index, index + 5) === "false" || Allow.BOOL & allow && length - index < 5 && "false".startsWith(jsonString.substring(index))) {
          index += 5;
          return false;
        }
        if (jsonString.substring(index, index + 8) === "Infinity" || Allow.INFINITY & allow && length - index < 8 && "Infinity".startsWith(jsonString.substring(index))) {
          index += 8;
          return Infinity;
        }
        if (jsonString.substring(index, index + 9) === "-Infinity" || Allow.MINUS_INFINITY & allow && 1 < length - index && length - index < 9 && "-Infinity".startsWith(jsonString.substring(index))) {
          index += 9;
          return -Infinity;
        }
        if (jsonString.substring(index, index + 3) === "NaN" || Allow.NAN & allow && length - index < 3 && "NaN".startsWith(jsonString.substring(index))) {
          index += 3;
          return NaN;
        }
        return parseNum();
      }, "parseAny");
      const parseStr = /* @__PURE__ */ __name2(() => {
        const start = index;
        let escape2 = false;
        index++;
        while (index < length && (jsonString[index] !== '"' || escape2 && jsonString[index - 1] === "\\")) {
          escape2 = jsonString[index] === "\\" ? !escape2 : false;
          index++;
        }
        if (jsonString.charAt(index) == '"') {
          try {
            return JSON.parse(jsonString.substring(start, ++index - Number(escape2)));
          } catch (e) {
            throwMalformedError(String(e));
          }
        } else if (Allow.STR & allow) {
          try {
            return JSON.parse(jsonString.substring(start, index - Number(escape2)) + '"');
          } catch (e) {
            return JSON.parse(jsonString.substring(start, jsonString.lastIndexOf("\\")) + '"');
          }
        }
        markPartialJSON("Unterminated string literal");
      }, "parseStr");
      const parseObj = /* @__PURE__ */ __name2(() => {
        index++;
        skipBlank();
        const obj = {};
        try {
          while (jsonString[index] !== "}") {
            skipBlank();
            if (index >= length && Allow.OBJ & allow)
              return obj;
            const key = parseStr();
            skipBlank();
            index++;
            try {
              const value = parseAny();
              Object.defineProperty(obj, key, { value, writable: true, enumerable: true, configurable: true });
            } catch (e) {
              if (Allow.OBJ & allow)
                return obj;
              else
                throw e;
            }
            skipBlank();
            if (jsonString[index] === ",")
              index++;
          }
        } catch (e) {
          if (Allow.OBJ & allow)
            return obj;
          else
            markPartialJSON("Expected '}' at end of object");
        }
        index++;
        return obj;
      }, "parseObj");
      const parseArr = /* @__PURE__ */ __name2(() => {
        index++;
        const arr = [];
        try {
          while (jsonString[index] !== "]") {
            arr.push(parseAny());
            skipBlank();
            if (jsonString[index] === ",") {
              index++;
            }
          }
        } catch (e) {
          if (Allow.ARR & allow) {
            return arr;
          }
          markPartialJSON("Expected ']' at end of array");
        }
        index++;
        return arr;
      }, "parseArr");
      const parseNum = /* @__PURE__ */ __name2(() => {
        if (index === 0) {
          if (jsonString === "-" && Allow.NUM & allow)
            markPartialJSON("Not sure what '-' is");
          try {
            return JSON.parse(jsonString);
          } catch (e) {
            if (Allow.NUM & allow) {
              try {
                if ("." === jsonString[jsonString.length - 1])
                  return JSON.parse(jsonString.substring(0, jsonString.lastIndexOf(".")));
                return JSON.parse(jsonString.substring(0, jsonString.lastIndexOf("e")));
              } catch (e2) {
              }
            }
            throwMalformedError(String(e));
          }
        }
        const start = index;
        if (jsonString[index] === "-")
          index++;
        while (jsonString[index] && !",]}".includes(jsonString[index]))
          index++;
        if (index == length && !(Allow.NUM & allow))
          markPartialJSON("Unterminated number literal");
        try {
          return JSON.parse(jsonString.substring(start, index));
        } catch (e) {
          if (jsonString.substring(start, index) === "-" && Allow.NUM & allow)
            markPartialJSON("Not sure what '-' is");
          try {
            return JSON.parse(jsonString.substring(start, jsonString.lastIndexOf("e")));
          } catch (e2) {
            throwMalformedError(String(e2));
          }
        }
      }, "parseNum");
      const skipBlank = /* @__PURE__ */ __name2(() => {
        while (index < length && " \n\r	".includes(jsonString[index])) {
          index++;
        }
      }, "skipBlank");
      return parseAny();
    }, "_parseJSON");
    partialParse = /* @__PURE__ */ __name2((input) => parseJSON(input, Allow.ALL ^ Allow.NUM), "partialParse");
  }
});
function finalizeChatCompletion(snapshot, params) {
  const { id, choices, created, model, system_fingerprint, ...rest } = snapshot;
  const completion = {
    ...rest,
    id,
    choices: choices.map(({ message, finish_reason, index, logprobs, ...choiceRest }) => {
      if (!finish_reason) {
        throw new OpenAIError(`missing finish_reason for choice ${index}`);
      }
      const { content = null, function_call, tool_calls, ...messageRest } = message;
      const role = message.role;
      if (!role) {
        throw new OpenAIError(`missing role for choice ${index}`);
      }
      if (function_call) {
        const { arguments: args, name } = function_call;
        if (args == null) {
          throw new OpenAIError(`missing function_call.arguments for choice ${index}`);
        }
        if (!name) {
          throw new OpenAIError(`missing function_call.name for choice ${index}`);
        }
        return {
          ...choiceRest,
          message: {
            content,
            function_call: { arguments: args, name },
            role,
            refusal: message.refusal ?? null
          },
          finish_reason,
          index,
          logprobs
        };
      }
      if (tool_calls) {
        return {
          ...choiceRest,
          index,
          finish_reason,
          logprobs,
          message: {
            ...messageRest,
            role,
            content,
            refusal: message.refusal ?? null,
            tool_calls: tool_calls.map((tool_call, i) => {
              const { function: fn, type, id: id2, ...toolRest } = tool_call;
              const { arguments: args, name, ...fnRest } = fn || {};
              if (id2 == null) {
                throw new OpenAIError(`missing choices[${index}].tool_calls[${i}].id
${str(snapshot)}`);
              }
              if (type == null) {
                throw new OpenAIError(`missing choices[${index}].tool_calls[${i}].type
${str(snapshot)}`);
              }
              if (name == null) {
                throw new OpenAIError(`missing choices[${index}].tool_calls[${i}].function.name
${str(snapshot)}`);
              }
              if (args == null) {
                throw new OpenAIError(`missing choices[${index}].tool_calls[${i}].function.arguments
${str(snapshot)}`);
              }
              return { ...toolRest, id: id2, type, function: { ...fnRest, name, arguments: args } };
            })
          }
        };
      }
      return {
        ...choiceRest,
        message: { ...messageRest, content, role, refusal: message.refusal ?? null },
        finish_reason,
        index,
        logprobs
      };
    }),
    created,
    model,
    object: "chat.completion",
    ...system_fingerprint ? { system_fingerprint } : {}
  };
  return maybeParseChatCompletion(completion, params);
}
__name(finalizeChatCompletion, "finalizeChatCompletion");
function str(x) {
  return JSON.stringify(x);
}
__name(str, "str");
function assertIsEmpty(obj) {
  return;
}
__name(assertIsEmpty, "assertIsEmpty");
function assertNever2(_x) {
}
__name(assertNever2, "assertNever2");
var __classPrivateFieldSet5;
var __classPrivateFieldGet6;
var _ChatCompletionStream_instances;
var _ChatCompletionStream_params;
var _ChatCompletionStream_choiceEventStates;
var _ChatCompletionStream_currentChatCompletionSnapshot;
var _ChatCompletionStream_beginRequest;
var _ChatCompletionStream_getChoiceEventState;
var _ChatCompletionStream_addChunk;
var _ChatCompletionStream_emitToolCallDoneEvent;
var _ChatCompletionStream_emitContentDoneEvents;
var _ChatCompletionStream_endRequest;
var _ChatCompletionStream_getAutoParseableResponseFormat;
var _ChatCompletionStream_accumulateChatCompletion;
var ChatCompletionStream;
var init_ChatCompletionStream = __esm({
  "../node_modules/openai/lib/ChatCompletionStream.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_error();
    init_AbstractChatCompletionRunner();
    init_streaming();
    init_parser();
    init_parser2();
    __classPrivateFieldSet5 = /* @__PURE__ */ __name(function(receiver, state, value, kind2, f) {
      if (kind2 === "m") throw new TypeError("Private method is not writable");
      if (kind2 === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind2 === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
    }, "__classPrivateFieldSet5");
    __classPrivateFieldGet6 = /* @__PURE__ */ __name(function(receiver, state, kind2, f) {
      if (kind2 === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind2 === "m" ? f : kind2 === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }, "__classPrivateFieldGet6");
    ChatCompletionStream = class _ChatCompletionStream extends AbstractChatCompletionRunner {
      static {
        __name(this, "_ChatCompletionStream");
      }
      static {
        __name2(this, "ChatCompletionStream");
      }
      constructor(params) {
        super();
        _ChatCompletionStream_instances.add(this);
        _ChatCompletionStream_params.set(this, void 0);
        _ChatCompletionStream_choiceEventStates.set(this, void 0);
        _ChatCompletionStream_currentChatCompletionSnapshot.set(this, void 0);
        __classPrivateFieldSet5(this, _ChatCompletionStream_params, params, "f");
        __classPrivateFieldSet5(this, _ChatCompletionStream_choiceEventStates, [], "f");
      }
      get currentChatCompletionSnapshot() {
        return __classPrivateFieldGet6(this, _ChatCompletionStream_currentChatCompletionSnapshot, "f");
      }
      /**
       * Intended for use on the frontend, consuming a stream produced with
       * `.toReadableStream()` on the backend.
       *
       * Note that messages sent to the model do not appear in `.on('message')`
       * in this context.
       */
      static fromReadableStream(stream) {
        const runner = new _ChatCompletionStream(null);
        runner._run(() => runner._fromReadableStream(stream));
        return runner;
      }
      static createChatCompletion(client, params, options) {
        const runner = new _ChatCompletionStream(params);
        runner._run(() => runner._runChatCompletion(client, { ...params, stream: true }, { ...options, headers: { ...options?.headers, "X-Stainless-Helper-Method": "stream" } }));
        return runner;
      }
      async _createChatCompletion(client, params, options) {
        super._createChatCompletion;
        const signal = options?.signal;
        if (signal) {
          if (signal.aborted)
            this.controller.abort();
          signal.addEventListener("abort", () => this.controller.abort());
        }
        __classPrivateFieldGet6(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_beginRequest).call(this);
        const stream = await client.chat.completions.create({ ...params, stream: true }, { ...options, signal: this.controller.signal });
        this._connected();
        for await (const chunk of stream) {
          __classPrivateFieldGet6(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_addChunk).call(this, chunk);
        }
        if (stream.controller.signal?.aborted) {
          throw new APIUserAbortError();
        }
        return this._addChatCompletion(__classPrivateFieldGet6(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_endRequest).call(this));
      }
      async _fromReadableStream(readableStream, options) {
        const signal = options?.signal;
        if (signal) {
          if (signal.aborted)
            this.controller.abort();
          signal.addEventListener("abort", () => this.controller.abort());
        }
        __classPrivateFieldGet6(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_beginRequest).call(this);
        this._connected();
        const stream = Stream.fromReadableStream(readableStream, this.controller);
        let chatId;
        for await (const chunk of stream) {
          if (chatId && chatId !== chunk.id) {
            this._addChatCompletion(__classPrivateFieldGet6(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_endRequest).call(this));
          }
          __classPrivateFieldGet6(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_addChunk).call(this, chunk);
          chatId = chunk.id;
        }
        if (stream.controller.signal?.aborted) {
          throw new APIUserAbortError();
        }
        return this._addChatCompletion(__classPrivateFieldGet6(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_endRequest).call(this));
      }
      [(_ChatCompletionStream_params = /* @__PURE__ */ new WeakMap(), _ChatCompletionStream_choiceEventStates = /* @__PURE__ */ new WeakMap(), _ChatCompletionStream_currentChatCompletionSnapshot = /* @__PURE__ */ new WeakMap(), _ChatCompletionStream_instances = /* @__PURE__ */ new WeakSet(), _ChatCompletionStream_beginRequest = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function _ChatCompletionStream_beginRequest2() {
        if (this.ended)
          return;
        __classPrivateFieldSet5(this, _ChatCompletionStream_currentChatCompletionSnapshot, void 0, "f");
      }, "_ChatCompletionStream_beginRequest2"), "_ChatCompletionStream_beginRequest"), _ChatCompletionStream_getChoiceEventState = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function _ChatCompletionStream_getChoiceEventState2(choice) {
        let state = __classPrivateFieldGet6(this, _ChatCompletionStream_choiceEventStates, "f")[choice.index];
        if (state) {
          return state;
        }
        state = {
          content_done: false,
          refusal_done: false,
          logprobs_content_done: false,
          logprobs_refusal_done: false,
          done_tool_calls: /* @__PURE__ */ new Set(),
          current_tool_call_index: null
        };
        __classPrivateFieldGet6(this, _ChatCompletionStream_choiceEventStates, "f")[choice.index] = state;
        return state;
      }, "_ChatCompletionStream_getChoiceEventState2"), "_ChatCompletionStream_getChoiceEventState"), _ChatCompletionStream_addChunk = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function _ChatCompletionStream_addChunk2(chunk) {
        if (this.ended)
          return;
        const completion = __classPrivateFieldGet6(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_accumulateChatCompletion).call(this, chunk);
        this._emit("chunk", chunk, completion);
        for (const choice of chunk.choices) {
          const choiceSnapshot = completion.choices[choice.index];
          if (choice.delta.content != null && choiceSnapshot.message?.role === "assistant" && choiceSnapshot.message?.content) {
            this._emit("content", choice.delta.content, choiceSnapshot.message.content);
            this._emit("content.delta", {
              delta: choice.delta.content,
              snapshot: choiceSnapshot.message.content,
              parsed: choiceSnapshot.message.parsed
            });
          }
          if (choice.delta.refusal != null && choiceSnapshot.message?.role === "assistant" && choiceSnapshot.message?.refusal) {
            this._emit("refusal.delta", {
              delta: choice.delta.refusal,
              snapshot: choiceSnapshot.message.refusal
            });
          }
          if (choice.logprobs?.content != null && choiceSnapshot.message?.role === "assistant") {
            this._emit("logprobs.content.delta", {
              content: choice.logprobs?.content,
              snapshot: choiceSnapshot.logprobs?.content ?? []
            });
          }
          if (choice.logprobs?.refusal != null && choiceSnapshot.message?.role === "assistant") {
            this._emit("logprobs.refusal.delta", {
              refusal: choice.logprobs?.refusal,
              snapshot: choiceSnapshot.logprobs?.refusal ?? []
            });
          }
          const state = __classPrivateFieldGet6(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_getChoiceEventState).call(this, choiceSnapshot);
          if (choiceSnapshot.finish_reason) {
            __classPrivateFieldGet6(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_emitContentDoneEvents).call(this, choiceSnapshot);
            if (state.current_tool_call_index != null) {
              __classPrivateFieldGet6(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_emitToolCallDoneEvent).call(this, choiceSnapshot, state.current_tool_call_index);
            }
          }
          for (const toolCall of choice.delta.tool_calls ?? []) {
            if (state.current_tool_call_index !== toolCall.index) {
              __classPrivateFieldGet6(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_emitContentDoneEvents).call(this, choiceSnapshot);
              if (state.current_tool_call_index != null) {
                __classPrivateFieldGet6(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_emitToolCallDoneEvent).call(this, choiceSnapshot, state.current_tool_call_index);
              }
            }
            state.current_tool_call_index = toolCall.index;
          }
          for (const toolCallDelta of choice.delta.tool_calls ?? []) {
            const toolCallSnapshot = choiceSnapshot.message.tool_calls?.[toolCallDelta.index];
            if (!toolCallSnapshot?.type) {
              continue;
            }
            if (toolCallSnapshot?.type === "function") {
              this._emit("tool_calls.function.arguments.delta", {
                name: toolCallSnapshot.function?.name,
                index: toolCallDelta.index,
                arguments: toolCallSnapshot.function.arguments,
                parsed_arguments: toolCallSnapshot.function.parsed_arguments,
                arguments_delta: toolCallDelta.function?.arguments ?? ""
              });
            } else {
              assertNever2(toolCallSnapshot?.type);
            }
          }
        }
      }, "_ChatCompletionStream_addChunk2"), "_ChatCompletionStream_addChunk"), _ChatCompletionStream_emitToolCallDoneEvent = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function _ChatCompletionStream_emitToolCallDoneEvent2(choiceSnapshot, toolCallIndex) {
        const state = __classPrivateFieldGet6(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_getChoiceEventState).call(this, choiceSnapshot);
        if (state.done_tool_calls.has(toolCallIndex)) {
          return;
        }
        const toolCallSnapshot = choiceSnapshot.message.tool_calls?.[toolCallIndex];
        if (!toolCallSnapshot) {
          throw new Error("no tool call snapshot");
        }
        if (!toolCallSnapshot.type) {
          throw new Error("tool call snapshot missing `type`");
        }
        if (toolCallSnapshot.type === "function") {
          const inputTool = __classPrivateFieldGet6(this, _ChatCompletionStream_params, "f")?.tools?.find((tool) => tool.type === "function" && tool.function.name === toolCallSnapshot.function.name);
          this._emit("tool_calls.function.arguments.done", {
            name: toolCallSnapshot.function.name,
            index: toolCallIndex,
            arguments: toolCallSnapshot.function.arguments,
            parsed_arguments: isAutoParsableTool(inputTool) ? inputTool.$parseRaw(toolCallSnapshot.function.arguments) : inputTool?.function.strict ? JSON.parse(toolCallSnapshot.function.arguments) : null
          });
        } else {
          assertNever2(toolCallSnapshot.type);
        }
      }, "_ChatCompletionStream_emitToolCallDoneEvent2"), "_ChatCompletionStream_emitToolCallDoneEvent"), _ChatCompletionStream_emitContentDoneEvents = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function _ChatCompletionStream_emitContentDoneEvents2(choiceSnapshot) {
        const state = __classPrivateFieldGet6(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_getChoiceEventState).call(this, choiceSnapshot);
        if (choiceSnapshot.message.content && !state.content_done) {
          state.content_done = true;
          const responseFormat = __classPrivateFieldGet6(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_getAutoParseableResponseFormat).call(this);
          this._emit("content.done", {
            content: choiceSnapshot.message.content,
            parsed: responseFormat ? responseFormat.$parseRaw(choiceSnapshot.message.content) : null
          });
        }
        if (choiceSnapshot.message.refusal && !state.refusal_done) {
          state.refusal_done = true;
          this._emit("refusal.done", { refusal: choiceSnapshot.message.refusal });
        }
        if (choiceSnapshot.logprobs?.content && !state.logprobs_content_done) {
          state.logprobs_content_done = true;
          this._emit("logprobs.content.done", { content: choiceSnapshot.logprobs.content });
        }
        if (choiceSnapshot.logprobs?.refusal && !state.logprobs_refusal_done) {
          state.logprobs_refusal_done = true;
          this._emit("logprobs.refusal.done", { refusal: choiceSnapshot.logprobs.refusal });
        }
      }, "_ChatCompletionStream_emitContentDoneEvents2"), "_ChatCompletionStream_emitContentDoneEvents"), _ChatCompletionStream_endRequest = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function _ChatCompletionStream_endRequest2() {
        if (this.ended) {
          throw new OpenAIError(`stream has ended, this shouldn't happen`);
        }
        const snapshot = __classPrivateFieldGet6(this, _ChatCompletionStream_currentChatCompletionSnapshot, "f");
        if (!snapshot) {
          throw new OpenAIError(`request ended without sending any chunks`);
        }
        __classPrivateFieldSet5(this, _ChatCompletionStream_currentChatCompletionSnapshot, void 0, "f");
        __classPrivateFieldSet5(this, _ChatCompletionStream_choiceEventStates, [], "f");
        return finalizeChatCompletion(snapshot, __classPrivateFieldGet6(this, _ChatCompletionStream_params, "f"));
      }, "_ChatCompletionStream_endRequest2"), "_ChatCompletionStream_endRequest"), _ChatCompletionStream_getAutoParseableResponseFormat = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function _ChatCompletionStream_getAutoParseableResponseFormat2() {
        const responseFormat = __classPrivateFieldGet6(this, _ChatCompletionStream_params, "f")?.response_format;
        if (isAutoParsableResponseFormat(responseFormat)) {
          return responseFormat;
        }
        return null;
      }, "_ChatCompletionStream_getAutoParseableResponseFormat2"), "_ChatCompletionStream_getAutoParseableResponseFormat"), _ChatCompletionStream_accumulateChatCompletion = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function _ChatCompletionStream_accumulateChatCompletion2(chunk) {
        var _a2, _b, _c, _d;
        let snapshot = __classPrivateFieldGet6(this, _ChatCompletionStream_currentChatCompletionSnapshot, "f");
        const { choices, ...rest } = chunk;
        if (!snapshot) {
          snapshot = __classPrivateFieldSet5(this, _ChatCompletionStream_currentChatCompletionSnapshot, {
            ...rest,
            choices: []
          }, "f");
        } else {
          Object.assign(snapshot, rest);
        }
        for (const { delta, finish_reason, index, logprobs = null, ...other } of chunk.choices) {
          let choice = snapshot.choices[index];
          if (!choice) {
            choice = snapshot.choices[index] = { finish_reason, index, message: {}, logprobs, ...other };
          }
          if (logprobs) {
            if (!choice.logprobs) {
              choice.logprobs = Object.assign({}, logprobs);
            } else {
              const { content: content2, refusal: refusal2, ...rest3 } = logprobs;
              assertIsEmpty(rest3);
              Object.assign(choice.logprobs, rest3);
              if (content2) {
                (_a2 = choice.logprobs).content ?? (_a2.content = []);
                choice.logprobs.content.push(...content2);
              }
              if (refusal2) {
                (_b = choice.logprobs).refusal ?? (_b.refusal = []);
                choice.logprobs.refusal.push(...refusal2);
              }
            }
          }
          if (finish_reason) {
            choice.finish_reason = finish_reason;
            if (__classPrivateFieldGet6(this, _ChatCompletionStream_params, "f") && hasAutoParseableInput(__classPrivateFieldGet6(this, _ChatCompletionStream_params, "f"))) {
              if (finish_reason === "length") {
                throw new LengthFinishReasonError();
              }
              if (finish_reason === "content_filter") {
                throw new ContentFilterFinishReasonError();
              }
            }
          }
          Object.assign(choice, other);
          if (!delta)
            continue;
          const { content, refusal, function_call, role, tool_calls, ...rest2 } = delta;
          assertIsEmpty(rest2);
          Object.assign(choice.message, rest2);
          if (refusal) {
            choice.message.refusal = (choice.message.refusal || "") + refusal;
          }
          if (role)
            choice.message.role = role;
          if (function_call) {
            if (!choice.message.function_call) {
              choice.message.function_call = function_call;
            } else {
              if (function_call.name)
                choice.message.function_call.name = function_call.name;
              if (function_call.arguments) {
                (_c = choice.message.function_call).arguments ?? (_c.arguments = "");
                choice.message.function_call.arguments += function_call.arguments;
              }
            }
          }
          if (content) {
            choice.message.content = (choice.message.content || "") + content;
            if (!choice.message.refusal && __classPrivateFieldGet6(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_getAutoParseableResponseFormat).call(this)) {
              choice.message.parsed = partialParse(choice.message.content);
            }
          }
          if (tool_calls) {
            if (!choice.message.tool_calls)
              choice.message.tool_calls = [];
            for (const { index: index2, id, type, function: fn, ...rest3 } of tool_calls) {
              const tool_call = (_d = choice.message.tool_calls)[index2] ?? (_d[index2] = {});
              Object.assign(tool_call, rest3);
              if (id)
                tool_call.id = id;
              if (type)
                tool_call.type = type;
              if (fn)
                tool_call.function ?? (tool_call.function = { name: fn.name ?? "", arguments: "" });
              if (fn?.name)
                tool_call.function.name = fn.name;
              if (fn?.arguments) {
                tool_call.function.arguments += fn.arguments;
                if (shouldParseToolCall(__classPrivateFieldGet6(this, _ChatCompletionStream_params, "f"), tool_call)) {
                  tool_call.function.parsed_arguments = partialParse(tool_call.function.arguments);
                }
              }
            }
          }
        }
        return snapshot;
      }, "_ChatCompletionStream_accumulateChatCompletion2"), "_ChatCompletionStream_accumulateChatCompletion"), Symbol.asyncIterator)]() {
        const pushQueue = [];
        const readQueue = [];
        let done = false;
        this.on("chunk", (chunk) => {
          const reader = readQueue.shift();
          if (reader) {
            reader.resolve(chunk);
          } else {
            pushQueue.push(chunk);
          }
        });
        this.on("end", () => {
          done = true;
          for (const reader of readQueue) {
            reader.resolve(void 0);
          }
          readQueue.length = 0;
        });
        this.on("abort", (err) => {
          done = true;
          for (const reader of readQueue) {
            reader.reject(err);
          }
          readQueue.length = 0;
        });
        this.on("error", (err) => {
          done = true;
          for (const reader of readQueue) {
            reader.reject(err);
          }
          readQueue.length = 0;
        });
        return {
          next: /* @__PURE__ */ __name2(async () => {
            if (!pushQueue.length) {
              if (done) {
                return { value: void 0, done: true };
              }
              return new Promise((resolve, reject) => readQueue.push({ resolve, reject })).then((chunk2) => chunk2 ? { value: chunk2, done: false } : { value: void 0, done: true });
            }
            const chunk = pushQueue.shift();
            return { value: chunk, done: false };
          }, "next"),
          return: /* @__PURE__ */ __name2(async () => {
            this.abort();
            return { value: void 0, done: true };
          }, "return")
        };
      }
      toReadableStream() {
        const stream = new Stream(this[Symbol.asyncIterator].bind(this), this.controller);
        return stream.toReadableStream();
      }
    };
    __name2(finalizeChatCompletion, "finalizeChatCompletion");
    __name2(str, "str");
    __name2(assertIsEmpty, "assertIsEmpty");
    __name2(assertNever2, "assertNever");
  }
});
var ChatCompletionStreamingRunner;
var init_ChatCompletionStreamingRunner = __esm({
  "../node_modules/openai/lib/ChatCompletionStreamingRunner.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_ChatCompletionStream();
    ChatCompletionStreamingRunner = class _ChatCompletionStreamingRunner extends ChatCompletionStream {
      static {
        __name(this, "_ChatCompletionStreamingRunner");
      }
      static {
        __name2(this, "ChatCompletionStreamingRunner");
      }
      static fromReadableStream(stream) {
        const runner = new _ChatCompletionStreamingRunner(null);
        runner._run(() => runner._fromReadableStream(stream));
        return runner;
      }
      /** @deprecated - please use `runTools` instead. */
      static runFunctions(client, params, options) {
        const runner = new _ChatCompletionStreamingRunner(null);
        const opts = {
          ...options,
          headers: { ...options?.headers, "X-Stainless-Helper-Method": "runFunctions" }
        };
        runner._run(() => runner._runFunctions(client, params, opts));
        return runner;
      }
      static runTools(client, params, options) {
        const runner = new _ChatCompletionStreamingRunner(
          // @ts-expect-error TODO these types are incompatible
          params
        );
        const opts = {
          ...options,
          headers: { ...options?.headers, "X-Stainless-Helper-Method": "runTools" }
        };
        runner._run(() => runner._runTools(client, params, opts));
        return runner;
      }
    };
  }
});
var Completions2;
var init_completions2 = __esm({
  "../node_modules/openai/resources/beta/chat/completions.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_resource();
    init_ChatCompletionRunner();
    init_ChatCompletionStreamingRunner();
    init_ChatCompletionStream();
    init_parser();
    Completions2 = class extends APIResource {
      static {
        __name(this, "Completions2");
      }
      static {
        __name2(this, "Completions");
      }
      parse(body, options) {
        validateInputTools(body.tools);
        return this._client.chat.completions.create(body, {
          ...options,
          headers: {
            ...options?.headers,
            "X-Stainless-Helper-Method": "beta.chat.completions.parse"
          }
        })._thenUnwrap((completion) => parseChatCompletion(completion, body));
      }
      runFunctions(body, options) {
        if (body.stream) {
          return ChatCompletionStreamingRunner.runFunctions(this._client, body, options);
        }
        return ChatCompletionRunner.runFunctions(this._client, body, options);
      }
      runTools(body, options) {
        if (body.stream) {
          return ChatCompletionStreamingRunner.runTools(this._client, body, options);
        }
        return ChatCompletionRunner.runTools(this._client, body, options);
      }
      /**
       * Creates a chat completion stream
       */
      stream(body, options) {
        return ChatCompletionStream.createChatCompletion(this._client, body, options);
      }
    };
  }
});
var Chat2;
var init_chat3 = __esm({
  "../node_modules/openai/resources/beta/chat/chat.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_resource();
    init_completions2();
    Chat2 = class extends APIResource {
      static {
        __name(this, "Chat2");
      }
      static {
        __name2(this, "Chat");
      }
      constructor() {
        super(...arguments);
        this.completions = new Completions2(this._client);
      }
    };
    (function(Chat3) {
      Chat3.Completions = Completions2;
    })(Chat2 || (Chat2 = {}));
  }
});
var Sessions;
var init_sessions = __esm({
  "../node_modules/openai/resources/beta/realtime/sessions.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_resource();
    Sessions = class extends APIResource {
      static {
        __name(this, "Sessions");
      }
      static {
        __name2(this, "Sessions");
      }
      /**
       * Create an ephemeral API token for use in client-side applications with the
       * Realtime API. Can be configured with the same session parameters as the
       * `session.update` client event.
       *
       * It responds with a session object, plus a `client_secret` key which contains a
       * usable ephemeral API token that can be used to authenticate browser clients for
       * the Realtime API.
       *
       * @example
       * ```ts
       * const session =
       *   await client.beta.realtime.sessions.create();
       * ```
       */
      create(body, options) {
        return this._client.post("/realtime/sessions", {
          body,
          ...options,
          headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
        });
      }
    };
  }
});
var TranscriptionSessions;
var init_transcription_sessions = __esm({
  "../node_modules/openai/resources/beta/realtime/transcription-sessions.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_resource();
    TranscriptionSessions = class extends APIResource {
      static {
        __name(this, "TranscriptionSessions");
      }
      static {
        __name2(this, "TranscriptionSessions");
      }
      /**
       * Create an ephemeral API token for use in client-side applications with the
       * Realtime API specifically for realtime transcriptions. Can be configured with
       * the same session parameters as the `transcription_session.update` client event.
       *
       * It responds with a session object, plus a `client_secret` key which contains a
       * usable ephemeral API token that can be used to authenticate browser clients for
       * the Realtime API.
       *
       * @example
       * ```ts
       * const transcriptionSession =
       *   await client.beta.realtime.transcriptionSessions.create();
       * ```
       */
      create(body, options) {
        return this._client.post("/realtime/transcription_sessions", {
          body,
          ...options,
          headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
        });
      }
    };
  }
});
var Realtime;
var init_realtime = __esm({
  "../node_modules/openai/resources/beta/realtime/realtime.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_resource();
    init_sessions();
    init_sessions();
    init_transcription_sessions();
    init_transcription_sessions();
    Realtime = class extends APIResource {
      static {
        __name(this, "Realtime");
      }
      static {
        __name2(this, "Realtime");
      }
      constructor() {
        super(...arguments);
        this.sessions = new Sessions(this._client);
        this.transcriptionSessions = new TranscriptionSessions(this._client);
      }
    };
    Realtime.Sessions = Sessions;
    Realtime.TranscriptionSessions = TranscriptionSessions;
  }
});
var Messages2;
var MessagesPage;
var init_messages2 = __esm({
  "../node_modules/openai/resources/beta/threads/messages.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_resource();
    init_core();
    init_pagination();
    Messages2 = class extends APIResource {
      static {
        __name(this, "Messages2");
      }
      static {
        __name2(this, "Messages");
      }
      /**
       * Create a message.
       *
       * @deprecated The Assistants API is deprecated in favor of the Responses API
       */
      create(threadId, body, options) {
        return this._client.post(`/threads/${threadId}/messages`, {
          body,
          ...options,
          headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
        });
      }
      /**
       * Retrieve a message.
       *
       * @deprecated The Assistants API is deprecated in favor of the Responses API
       */
      retrieve(threadId, messageId, options) {
        return this._client.get(`/threads/${threadId}/messages/${messageId}`, {
          ...options,
          headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
        });
      }
      /**
       * Modifies a message.
       *
       * @deprecated The Assistants API is deprecated in favor of the Responses API
       */
      update(threadId, messageId, body, options) {
        return this._client.post(`/threads/${threadId}/messages/${messageId}`, {
          body,
          ...options,
          headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
        });
      }
      list(threadId, query = {}, options) {
        if (isRequestOptions(query)) {
          return this.list(threadId, {}, query);
        }
        return this._client.getAPIList(`/threads/${threadId}/messages`, MessagesPage, {
          query,
          ...options,
          headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
        });
      }
      /**
       * Deletes a message.
       *
       * @deprecated The Assistants API is deprecated in favor of the Responses API
       */
      del(threadId, messageId, options) {
        return this._client.delete(`/threads/${threadId}/messages/${messageId}`, {
          ...options,
          headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
        });
      }
    };
    MessagesPage = class extends CursorPage {
      static {
        __name(this, "MessagesPage");
      }
      static {
        __name2(this, "MessagesPage");
      }
    };
    Messages2.MessagesPage = MessagesPage;
  }
});
var Steps;
var RunStepsPage;
var init_steps = __esm({
  "../node_modules/openai/resources/beta/threads/runs/steps.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_resource();
    init_core();
    init_pagination();
    Steps = class extends APIResource {
      static {
        __name(this, "Steps");
      }
      static {
        __name2(this, "Steps");
      }
      retrieve(threadId, runId, stepId, query = {}, options) {
        if (isRequestOptions(query)) {
          return this.retrieve(threadId, runId, stepId, {}, query);
        }
        return this._client.get(`/threads/${threadId}/runs/${runId}/steps/${stepId}`, {
          query,
          ...options,
          headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
        });
      }
      list(threadId, runId, query = {}, options) {
        if (isRequestOptions(query)) {
          return this.list(threadId, runId, {}, query);
        }
        return this._client.getAPIList(`/threads/${threadId}/runs/${runId}/steps`, RunStepsPage, {
          query,
          ...options,
          headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
        });
      }
    };
    RunStepsPage = class extends CursorPage {
      static {
        __name(this, "RunStepsPage");
      }
      static {
        __name2(this, "RunStepsPage");
      }
    };
    Steps.RunStepsPage = RunStepsPage;
  }
});
var Runs;
var RunsPage;
var init_runs = __esm({
  "../node_modules/openai/resources/beta/threads/runs/runs.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_resource();
    init_core();
    init_AssistantStream();
    init_core();
    init_steps();
    init_steps();
    init_pagination();
    Runs = class extends APIResource {
      static {
        __name(this, "Runs");
      }
      static {
        __name2(this, "Runs");
      }
      constructor() {
        super(...arguments);
        this.steps = new Steps(this._client);
      }
      create(threadId, params, options) {
        const { include, ...body } = params;
        return this._client.post(`/threads/${threadId}/runs`, {
          query: { include },
          body,
          ...options,
          headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers },
          stream: params.stream ?? false
        });
      }
      /**
       * Retrieves a run.
       *
       * @deprecated The Assistants API is deprecated in favor of the Responses API
       */
      retrieve(threadId, runId, options) {
        return this._client.get(`/threads/${threadId}/runs/${runId}`, {
          ...options,
          headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
        });
      }
      /**
       * Modifies a run.
       *
       * @deprecated The Assistants API is deprecated in favor of the Responses API
       */
      update(threadId, runId, body, options) {
        return this._client.post(`/threads/${threadId}/runs/${runId}`, {
          body,
          ...options,
          headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
        });
      }
      list(threadId, query = {}, options) {
        if (isRequestOptions(query)) {
          return this.list(threadId, {}, query);
        }
        return this._client.getAPIList(`/threads/${threadId}/runs`, RunsPage, {
          query,
          ...options,
          headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
        });
      }
      /**
       * Cancels a run that is `in_progress`.
       *
       * @deprecated The Assistants API is deprecated in favor of the Responses API
       */
      cancel(threadId, runId, options) {
        return this._client.post(`/threads/${threadId}/runs/${runId}/cancel`, {
          ...options,
          headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
        });
      }
      /**
       * A helper to create a run an poll for a terminal state. More information on Run
       * lifecycles can be found here:
       * https://platform.openai.com/docs/assistants/how-it-works/runs-and-run-steps
       */
      async createAndPoll(threadId, body, options) {
        const run = await this.create(threadId, body, options);
        return await this.poll(threadId, run.id, options);
      }
      /**
       * Create a Run stream
       *
       * @deprecated use `stream` instead
       */
      createAndStream(threadId, body, options) {
        return AssistantStream.createAssistantStream(threadId, this._client.beta.threads.runs, body, options);
      }
      /**
       * A helper to poll a run status until it reaches a terminal state. More
       * information on Run lifecycles can be found here:
       * https://platform.openai.com/docs/assistants/how-it-works/runs-and-run-steps
       */
      async poll(threadId, runId, options) {
        const headers = { ...options?.headers, "X-Stainless-Poll-Helper": "true" };
        if (options?.pollIntervalMs) {
          headers["X-Stainless-Custom-Poll-Interval"] = options.pollIntervalMs.toString();
        }
        while (true) {
          const { data: run, response } = await this.retrieve(threadId, runId, {
            ...options,
            headers: { ...options?.headers, ...headers }
          }).withResponse();
          switch (run.status) {
            //If we are in any sort of intermediate state we poll
            case "queued":
            case "in_progress":
            case "cancelling":
              let sleepInterval = 5e3;
              if (options?.pollIntervalMs) {
                sleepInterval = options.pollIntervalMs;
              } else {
                const headerInterval = response.headers.get("openai-poll-after-ms");
                if (headerInterval) {
                  const headerIntervalMs = parseInt(headerInterval);
                  if (!isNaN(headerIntervalMs)) {
                    sleepInterval = headerIntervalMs;
                  }
                }
              }
              await sleep(sleepInterval);
              break;
            //We return the run in any terminal state.
            case "requires_action":
            case "incomplete":
            case "cancelled":
            case "completed":
            case "failed":
            case "expired":
              return run;
          }
        }
      }
      /**
       * Create a Run stream
       */
      stream(threadId, body, options) {
        return AssistantStream.createAssistantStream(threadId, this._client.beta.threads.runs, body, options);
      }
      submitToolOutputs(threadId, runId, body, options) {
        return this._client.post(`/threads/${threadId}/runs/${runId}/submit_tool_outputs`, {
          body,
          ...options,
          headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers },
          stream: body.stream ?? false
        });
      }
      /**
       * A helper to submit a tool output to a run and poll for a terminal run state.
       * More information on Run lifecycles can be found here:
       * https://platform.openai.com/docs/assistants/how-it-works/runs-and-run-steps
       */
      async submitToolOutputsAndPoll(threadId, runId, body, options) {
        const run = await this.submitToolOutputs(threadId, runId, body, options);
        return await this.poll(threadId, run.id, options);
      }
      /**
       * Submit the tool outputs from a previous run and stream the run to a terminal
       * state. More information on Run lifecycles can be found here:
       * https://platform.openai.com/docs/assistants/how-it-works/runs-and-run-steps
       */
      submitToolOutputsStream(threadId, runId, body, options) {
        return AssistantStream.createToolAssistantStream(threadId, runId, this._client.beta.threads.runs, body, options);
      }
    };
    RunsPage = class extends CursorPage {
      static {
        __name(this, "RunsPage");
      }
      static {
        __name2(this, "RunsPage");
      }
    };
    Runs.RunsPage = RunsPage;
    Runs.Steps = Steps;
    Runs.RunStepsPage = RunStepsPage;
  }
});
var Threads;
var init_threads = __esm({
  "../node_modules/openai/resources/beta/threads/threads.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_resource();
    init_core();
    init_AssistantStream();
    init_messages2();
    init_messages2();
    init_runs();
    init_runs();
    Threads = class extends APIResource {
      static {
        __name(this, "Threads");
      }
      static {
        __name2(this, "Threads");
      }
      constructor() {
        super(...arguments);
        this.runs = new Runs(this._client);
        this.messages = new Messages2(this._client);
      }
      create(body = {}, options) {
        if (isRequestOptions(body)) {
          return this.create({}, body);
        }
        return this._client.post("/threads", {
          body,
          ...options,
          headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
        });
      }
      /**
       * Retrieves a thread.
       *
       * @deprecated The Assistants API is deprecated in favor of the Responses API
       */
      retrieve(threadId, options) {
        return this._client.get(`/threads/${threadId}`, {
          ...options,
          headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
        });
      }
      /**
       * Modifies a thread.
       *
       * @deprecated The Assistants API is deprecated in favor of the Responses API
       */
      update(threadId, body, options) {
        return this._client.post(`/threads/${threadId}`, {
          body,
          ...options,
          headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
        });
      }
      /**
       * Delete a thread.
       *
       * @deprecated The Assistants API is deprecated in favor of the Responses API
       */
      del(threadId, options) {
        return this._client.delete(`/threads/${threadId}`, {
          ...options,
          headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
        });
      }
      createAndRun(body, options) {
        return this._client.post("/threads/runs", {
          body,
          ...options,
          headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers },
          stream: body.stream ?? false
        });
      }
      /**
       * A helper to create a thread, start a run and then poll for a terminal state.
       * More information on Run lifecycles can be found here:
       * https://platform.openai.com/docs/assistants/how-it-works/runs-and-run-steps
       */
      async createAndRunPoll(body, options) {
        const run = await this.createAndRun(body, options);
        return await this.runs.poll(run.thread_id, run.id, options);
      }
      /**
       * Create a thread and stream the run back
       */
      createAndRunStream(body, options) {
        return AssistantStream.createThreadAssistantStream(body, this._client.beta.threads, options);
      }
    };
    Threads.Runs = Runs;
    Threads.RunsPage = RunsPage;
    Threads.Messages = Messages2;
    Threads.MessagesPage = MessagesPage;
  }
});
var Beta;
var init_beta = __esm({
  "../node_modules/openai/resources/beta/beta.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_resource();
    init_assistants();
    init_chat3();
    init_assistants();
    init_realtime();
    init_realtime();
    init_threads();
    init_threads();
    Beta = class extends APIResource {
      static {
        __name(this, "Beta");
      }
      static {
        __name2(this, "Beta");
      }
      constructor() {
        super(...arguments);
        this.realtime = new Realtime(this._client);
        this.chat = new Chat2(this._client);
        this.assistants = new Assistants(this._client);
        this.threads = new Threads(this._client);
      }
    };
    Beta.Realtime = Realtime;
    Beta.Assistants = Assistants;
    Beta.AssistantsPage = AssistantsPage;
    Beta.Threads = Threads;
  }
});
var Completions3;
var init_completions3 = __esm({
  "../node_modules/openai/resources/completions.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_resource();
    Completions3 = class extends APIResource {
      static {
        __name(this, "Completions3");
      }
      static {
        __name2(this, "Completions");
      }
      create(body, options) {
        return this._client.post("/completions", { body, ...options, stream: body.stream ?? false });
      }
    };
  }
});
var Content;
var init_content = __esm({
  "../node_modules/openai/resources/containers/files/content.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_resource();
    Content = class extends APIResource {
      static {
        __name(this, "Content");
      }
      static {
        __name2(this, "Content");
      }
      /**
       * Retrieve Container File Content
       */
      retrieve(containerId, fileId, options) {
        return this._client.get(`/containers/${containerId}/files/${fileId}/content`, {
          ...options,
          headers: { Accept: "application/binary", ...options?.headers },
          __binaryResponse: true
        });
      }
    };
  }
});
var Files;
var FileListResponsesPage;
var init_files = __esm({
  "../node_modules/openai/resources/containers/files/files.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_resource();
    init_core();
    init_core();
    init_content();
    init_content();
    init_pagination();
    Files = class extends APIResource {
      static {
        __name(this, "Files");
      }
      static {
        __name2(this, "Files");
      }
      constructor() {
        super(...arguments);
        this.content = new Content(this._client);
      }
      /**
       * Create a Container File
       *
       * You can send either a multipart/form-data request with the raw file content, or
       * a JSON request with a file ID.
       */
      create(containerId, body, options) {
        return this._client.post(`/containers/${containerId}/files`, multipartFormRequestOptions({ body, ...options }));
      }
      /**
       * Retrieve Container File
       */
      retrieve(containerId, fileId, options) {
        return this._client.get(`/containers/${containerId}/files/${fileId}`, options);
      }
      list(containerId, query = {}, options) {
        if (isRequestOptions(query)) {
          return this.list(containerId, {}, query);
        }
        return this._client.getAPIList(`/containers/${containerId}/files`, FileListResponsesPage, {
          query,
          ...options
        });
      }
      /**
       * Delete Container File
       */
      del(containerId, fileId, options) {
        return this._client.delete(`/containers/${containerId}/files/${fileId}`, {
          ...options,
          headers: { Accept: "*/*", ...options?.headers }
        });
      }
    };
    FileListResponsesPage = class extends CursorPage {
      static {
        __name(this, "FileListResponsesPage");
      }
      static {
        __name2(this, "FileListResponsesPage");
      }
    };
    Files.FileListResponsesPage = FileListResponsesPage;
    Files.Content = Content;
  }
});
var Containers;
var ContainerListResponsesPage;
var init_containers = __esm({
  "../node_modules/openai/resources/containers/containers.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_resource();
    init_core();
    init_files();
    init_files();
    init_pagination();
    Containers = class extends APIResource {
      static {
        __name(this, "Containers");
      }
      static {
        __name2(this, "Containers");
      }
      constructor() {
        super(...arguments);
        this.files = new Files(this._client);
      }
      /**
       * Create Container
       */
      create(body, options) {
        return this._client.post("/containers", { body, ...options });
      }
      /**
       * Retrieve Container
       */
      retrieve(containerId, options) {
        return this._client.get(`/containers/${containerId}`, options);
      }
      list(query = {}, options) {
        if (isRequestOptions(query)) {
          return this.list({}, query);
        }
        return this._client.getAPIList("/containers", ContainerListResponsesPage, { query, ...options });
      }
      /**
       * Delete Container
       */
      del(containerId, options) {
        return this._client.delete(`/containers/${containerId}`, {
          ...options,
          headers: { Accept: "*/*", ...options?.headers }
        });
      }
    };
    ContainerListResponsesPage = class extends CursorPage {
      static {
        __name(this, "ContainerListResponsesPage");
      }
      static {
        __name2(this, "ContainerListResponsesPage");
      }
    };
    Containers.ContainerListResponsesPage = ContainerListResponsesPage;
    Containers.Files = Files;
    Containers.FileListResponsesPage = FileListResponsesPage;
  }
});
var Embeddings;
var init_embeddings = __esm({
  "../node_modules/openai/resources/embeddings.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_resource();
    init_core();
    Embeddings = class extends APIResource {
      static {
        __name(this, "Embeddings");
      }
      static {
        __name2(this, "Embeddings");
      }
      /**
       * Creates an embedding vector representing the input text.
       *
       * @example
       * ```ts
       * const createEmbeddingResponse =
       *   await client.embeddings.create({
       *     input: 'The quick brown fox jumped over the lazy dog',
       *     model: 'text-embedding-3-small',
       *   });
       * ```
       */
      create(body, options) {
        const hasUserProvidedEncodingFormat = !!body.encoding_format;
        let encoding_format = hasUserProvidedEncodingFormat ? body.encoding_format : "base64";
        if (hasUserProvidedEncodingFormat) {
          debug32("Request", "User defined encoding_format:", body.encoding_format);
        }
        const response = this._client.post("/embeddings", {
          body: {
            ...body,
            encoding_format
          },
          ...options
        });
        if (hasUserProvidedEncodingFormat) {
          return response;
        }
        debug32("response", "Decoding base64 embeddings to float32 array");
        return response._thenUnwrap((response2) => {
          if (response2 && response2.data) {
            response2.data.forEach((embeddingBase64Obj) => {
              const embeddingBase64Str = embeddingBase64Obj.embedding;
              embeddingBase64Obj.embedding = toFloat32Array(embeddingBase64Str);
            });
          }
          return response2;
        });
      }
    };
  }
});
var OutputItems;
var OutputItemListResponsesPage;
var init_output_items = __esm({
  "../node_modules/openai/resources/evals/runs/output-items.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_resource();
    init_core();
    init_pagination();
    OutputItems = class extends APIResource {
      static {
        __name(this, "OutputItems");
      }
      static {
        __name2(this, "OutputItems");
      }
      /**
       * Get an evaluation run output item by ID.
       */
      retrieve(evalId, runId, outputItemId, options) {
        return this._client.get(`/evals/${evalId}/runs/${runId}/output_items/${outputItemId}`, options);
      }
      list(evalId, runId, query = {}, options) {
        if (isRequestOptions(query)) {
          return this.list(evalId, runId, {}, query);
        }
        return this._client.getAPIList(`/evals/${evalId}/runs/${runId}/output_items`, OutputItemListResponsesPage, { query, ...options });
      }
    };
    OutputItemListResponsesPage = class extends CursorPage {
      static {
        __name(this, "OutputItemListResponsesPage");
      }
      static {
        __name2(this, "OutputItemListResponsesPage");
      }
    };
    OutputItems.OutputItemListResponsesPage = OutputItemListResponsesPage;
  }
});
var Runs2;
var RunListResponsesPage;
var init_runs2 = __esm({
  "../node_modules/openai/resources/evals/runs/runs.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_resource();
    init_core();
    init_output_items();
    init_output_items();
    init_pagination();
    Runs2 = class extends APIResource {
      static {
        __name(this, "Runs2");
      }
      static {
        __name2(this, "Runs");
      }
      constructor() {
        super(...arguments);
        this.outputItems = new OutputItems(this._client);
      }
      /**
       * Kicks off a new run for a given evaluation, specifying the data source, and what
       * model configuration to use to test. The datasource will be validated against the
       * schema specified in the config of the evaluation.
       */
      create(evalId, body, options) {
        return this._client.post(`/evals/${evalId}/runs`, { body, ...options });
      }
      /**
       * Get an evaluation run by ID.
       */
      retrieve(evalId, runId, options) {
        return this._client.get(`/evals/${evalId}/runs/${runId}`, options);
      }
      list(evalId, query = {}, options) {
        if (isRequestOptions(query)) {
          return this.list(evalId, {}, query);
        }
        return this._client.getAPIList(`/evals/${evalId}/runs`, RunListResponsesPage, { query, ...options });
      }
      /**
       * Delete an eval run.
       */
      del(evalId, runId, options) {
        return this._client.delete(`/evals/${evalId}/runs/${runId}`, options);
      }
      /**
       * Cancel an ongoing evaluation run.
       */
      cancel(evalId, runId, options) {
        return this._client.post(`/evals/${evalId}/runs/${runId}`, options);
      }
    };
    RunListResponsesPage = class extends CursorPage {
      static {
        __name(this, "RunListResponsesPage");
      }
      static {
        __name2(this, "RunListResponsesPage");
      }
    };
    Runs2.RunListResponsesPage = RunListResponsesPage;
    Runs2.OutputItems = OutputItems;
    Runs2.OutputItemListResponsesPage = OutputItemListResponsesPage;
  }
});
var Evals;
var EvalListResponsesPage;
var init_evals = __esm({
  "../node_modules/openai/resources/evals/evals.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_resource();
    init_core();
    init_runs2();
    init_runs2();
    init_pagination();
    Evals = class extends APIResource {
      static {
        __name(this, "Evals");
      }
      static {
        __name2(this, "Evals");
      }
      constructor() {
        super(...arguments);
        this.runs = new Runs2(this._client);
      }
      /**
       * Create the structure of an evaluation that can be used to test a model's
       * performance. An evaluation is a set of testing criteria and the config for a
       * data source, which dictates the schema of the data used in the evaluation. After
       * creating an evaluation, you can run it on different models and model parameters.
       * We support several types of graders and datasources. For more information, see
       * the [Evals guide](https://platform.openai.com/docs/guides/evals).
       */
      create(body, options) {
        return this._client.post("/evals", { body, ...options });
      }
      /**
       * Get an evaluation by ID.
       */
      retrieve(evalId, options) {
        return this._client.get(`/evals/${evalId}`, options);
      }
      /**
       * Update certain properties of an evaluation.
       */
      update(evalId, body, options) {
        return this._client.post(`/evals/${evalId}`, { body, ...options });
      }
      list(query = {}, options) {
        if (isRequestOptions(query)) {
          return this.list({}, query);
        }
        return this._client.getAPIList("/evals", EvalListResponsesPage, { query, ...options });
      }
      /**
       * Delete an evaluation.
       */
      del(evalId, options) {
        return this._client.delete(`/evals/${evalId}`, options);
      }
    };
    EvalListResponsesPage = class extends CursorPage {
      static {
        __name(this, "EvalListResponsesPage");
      }
      static {
        __name2(this, "EvalListResponsesPage");
      }
    };
    Evals.EvalListResponsesPage = EvalListResponsesPage;
    Evals.Runs = Runs2;
    Evals.RunListResponsesPage = RunListResponsesPage;
  }
});
var Files2;
var FileObjectsPage;
var init_files2 = __esm({
  "../node_modules/openai/resources/files.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_resource();
    init_core();
    init_core();
    init_error();
    init_core();
    init_pagination();
    Files2 = class extends APIResource {
      static {
        __name(this, "Files2");
      }
      static {
        __name2(this, "Files");
      }
      /**
       * Upload a file that can be used across various endpoints. Individual files can be
       * up to 512 MB, and the size of all files uploaded by one organization can be up
       * to 100 GB.
       *
       * The Assistants API supports files up to 2 million tokens and of specific file
       * types. See the
       * [Assistants Tools guide](https://platform.openai.com/docs/assistants/tools) for
       * details.
       *
       * The Fine-tuning API only supports `.jsonl` files. The input also has certain
       * required formats for fine-tuning
       * [chat](https://platform.openai.com/docs/api-reference/fine-tuning/chat-input) or
       * [completions](https://platform.openai.com/docs/api-reference/fine-tuning/completions-input)
       * models.
       *
       * The Batch API only supports `.jsonl` files up to 200 MB in size. The input also
       * has a specific required
       * [format](https://platform.openai.com/docs/api-reference/batch/request-input).
       *
       * Please [contact us](https://help.openai.com/) if you need to increase these
       * storage limits.
       */
      create(body, options) {
        return this._client.post("/files", multipartFormRequestOptions({ body, ...options }));
      }
      /**
       * Returns information about a specific file.
       */
      retrieve(fileId, options) {
        return this._client.get(`/files/${fileId}`, options);
      }
      list(query = {}, options) {
        if (isRequestOptions(query)) {
          return this.list({}, query);
        }
        return this._client.getAPIList("/files", FileObjectsPage, { query, ...options });
      }
      /**
       * Delete a file.
       */
      del(fileId, options) {
        return this._client.delete(`/files/${fileId}`, options);
      }
      /**
       * Returns the contents of the specified file.
       */
      content(fileId, options) {
        return this._client.get(`/files/${fileId}/content`, {
          ...options,
          headers: { Accept: "application/binary", ...options?.headers },
          __binaryResponse: true
        });
      }
      /**
       * Returns the contents of the specified file.
       *
       * @deprecated The `.content()` method should be used instead
       */
      retrieveContent(fileId, options) {
        return this._client.get(`/files/${fileId}/content`, options);
      }
      /**
       * Waits for the given file to be processed, default timeout is 30 mins.
       */
      async waitForProcessing(id, { pollInterval = 5e3, maxWait = 30 * 60 * 1e3 } = {}) {
        const TERMINAL_STATES = /* @__PURE__ */ new Set(["processed", "error", "deleted"]);
        const start = Date.now();
        let file = await this.retrieve(id);
        while (!file.status || !TERMINAL_STATES.has(file.status)) {
          await sleep(pollInterval);
          file = await this.retrieve(id);
          if (Date.now() - start > maxWait) {
            throw new APIConnectionTimeoutError({
              message: `Giving up on waiting for file ${id} to finish processing after ${maxWait} milliseconds.`
            });
          }
        }
        return file;
      }
    };
    FileObjectsPage = class extends CursorPage {
      static {
        __name(this, "FileObjectsPage");
      }
      static {
        __name2(this, "FileObjectsPage");
      }
    };
    Files2.FileObjectsPage = FileObjectsPage;
  }
});
var Methods;
var init_methods = __esm({
  "../node_modules/openai/resources/fine-tuning/methods.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_resource();
    Methods = class extends APIResource {
      static {
        __name(this, "Methods");
      }
      static {
        __name2(this, "Methods");
      }
    };
  }
});
var Graders;
var init_graders = __esm({
  "../node_modules/openai/resources/fine-tuning/alpha/graders.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_resource();
    Graders = class extends APIResource {
      static {
        __name(this, "Graders");
      }
      static {
        __name2(this, "Graders");
      }
      /**
       * Run a grader.
       *
       * @example
       * ```ts
       * const response = await client.fineTuning.alpha.graders.run({
       *   grader: {
       *     input: 'input',
       *     name: 'name',
       *     operation: 'eq',
       *     reference: 'reference',
       *     type: 'string_check',
       *   },
       *   model_sample: 'model_sample',
       *   reference_answer: 'string',
       * });
       * ```
       */
      run(body, options) {
        return this._client.post("/fine_tuning/alpha/graders/run", { body, ...options });
      }
      /**
       * Validate a grader.
       *
       * @example
       * ```ts
       * const response =
       *   await client.fineTuning.alpha.graders.validate({
       *     grader: {
       *       input: 'input',
       *       name: 'name',
       *       operation: 'eq',
       *       reference: 'reference',
       *       type: 'string_check',
       *     },
       *   });
       * ```
       */
      validate(body, options) {
        return this._client.post("/fine_tuning/alpha/graders/validate", { body, ...options });
      }
    };
  }
});
var Alpha;
var init_alpha = __esm({
  "../node_modules/openai/resources/fine-tuning/alpha/alpha.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_resource();
    init_graders();
    init_graders();
    Alpha = class extends APIResource {
      static {
        __name(this, "Alpha");
      }
      static {
        __name2(this, "Alpha");
      }
      constructor() {
        super(...arguments);
        this.graders = new Graders(this._client);
      }
    };
    Alpha.Graders = Graders;
  }
});
var Permissions;
var PermissionCreateResponsesPage;
var init_permissions = __esm({
  "../node_modules/openai/resources/fine-tuning/checkpoints/permissions.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_resource();
    init_core();
    init_pagination();
    Permissions = class extends APIResource {
      static {
        __name(this, "Permissions");
      }
      static {
        __name2(this, "Permissions");
      }
      /**
       * **NOTE:** Calling this endpoint requires an [admin API key](../admin-api-keys).
       *
       * This enables organization owners to share fine-tuned models with other projects
       * in their organization.
       *
       * @example
       * ```ts
       * // Automatically fetches more pages as needed.
       * for await (const permissionCreateResponse of client.fineTuning.checkpoints.permissions.create(
       *   'ft:gpt-4o-mini-2024-07-18:org:weather:B7R9VjQd',
       *   { project_ids: ['string'] },
       * )) {
       *   // ...
       * }
       * ```
       */
      create(fineTunedModelCheckpoint, body, options) {
        return this._client.getAPIList(`/fine_tuning/checkpoints/${fineTunedModelCheckpoint}/permissions`, PermissionCreateResponsesPage, { body, method: "post", ...options });
      }
      retrieve(fineTunedModelCheckpoint, query = {}, options) {
        if (isRequestOptions(query)) {
          return this.retrieve(fineTunedModelCheckpoint, {}, query);
        }
        return this._client.get(`/fine_tuning/checkpoints/${fineTunedModelCheckpoint}/permissions`, {
          query,
          ...options
        });
      }
      /**
       * **NOTE:** This endpoint requires an [admin API key](../admin-api-keys).
       *
       * Organization owners can use this endpoint to delete a permission for a
       * fine-tuned model checkpoint.
       *
       * @example
       * ```ts
       * const permission =
       *   await client.fineTuning.checkpoints.permissions.del(
       *     'ft:gpt-4o-mini-2024-07-18:org:weather:B7R9VjQd',
       *     'cp_zc4Q7MP6XxulcVzj4MZdwsAB',
       *   );
       * ```
       */
      del(fineTunedModelCheckpoint, permissionId, options) {
        return this._client.delete(`/fine_tuning/checkpoints/${fineTunedModelCheckpoint}/permissions/${permissionId}`, options);
      }
    };
    PermissionCreateResponsesPage = class extends Page {
      static {
        __name(this, "PermissionCreateResponsesPage");
      }
      static {
        __name2(this, "PermissionCreateResponsesPage");
      }
    };
    Permissions.PermissionCreateResponsesPage = PermissionCreateResponsesPage;
  }
});
var Checkpoints;
var init_checkpoints = __esm({
  "../node_modules/openai/resources/fine-tuning/checkpoints/checkpoints.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_resource();
    init_permissions();
    init_permissions();
    Checkpoints = class extends APIResource {
      static {
        __name(this, "Checkpoints");
      }
      static {
        __name2(this, "Checkpoints");
      }
      constructor() {
        super(...arguments);
        this.permissions = new Permissions(this._client);
      }
    };
    Checkpoints.Permissions = Permissions;
    Checkpoints.PermissionCreateResponsesPage = PermissionCreateResponsesPage;
  }
});
var Checkpoints2;
var FineTuningJobCheckpointsPage;
var init_checkpoints2 = __esm({
  "../node_modules/openai/resources/fine-tuning/jobs/checkpoints.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_resource();
    init_core();
    init_pagination();
    Checkpoints2 = class extends APIResource {
      static {
        __name(this, "Checkpoints2");
      }
      static {
        __name2(this, "Checkpoints");
      }
      list(fineTuningJobId, query = {}, options) {
        if (isRequestOptions(query)) {
          return this.list(fineTuningJobId, {}, query);
        }
        return this._client.getAPIList(`/fine_tuning/jobs/${fineTuningJobId}/checkpoints`, FineTuningJobCheckpointsPage, { query, ...options });
      }
    };
    FineTuningJobCheckpointsPage = class extends CursorPage {
      static {
        __name(this, "FineTuningJobCheckpointsPage");
      }
      static {
        __name2(this, "FineTuningJobCheckpointsPage");
      }
    };
    Checkpoints2.FineTuningJobCheckpointsPage = FineTuningJobCheckpointsPage;
  }
});
var Jobs;
var FineTuningJobsPage;
var FineTuningJobEventsPage;
var init_jobs = __esm({
  "../node_modules/openai/resources/fine-tuning/jobs/jobs.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_resource();
    init_core();
    init_checkpoints2();
    init_checkpoints2();
    init_pagination();
    Jobs = class extends APIResource {
      static {
        __name(this, "Jobs");
      }
      static {
        __name2(this, "Jobs");
      }
      constructor() {
        super(...arguments);
        this.checkpoints = new Checkpoints2(this._client);
      }
      /**
       * Creates a fine-tuning job which begins the process of creating a new model from
       * a given dataset.
       *
       * Response includes details of the enqueued job including job status and the name
       * of the fine-tuned models once complete.
       *
       * [Learn more about fine-tuning](https://platform.openai.com/docs/guides/fine-tuning)
       *
       * @example
       * ```ts
       * const fineTuningJob = await client.fineTuning.jobs.create({
       *   model: 'gpt-4o-mini',
       *   training_file: 'file-abc123',
       * });
       * ```
       */
      create(body, options) {
        return this._client.post("/fine_tuning/jobs", { body, ...options });
      }
      /**
       * Get info about a fine-tuning job.
       *
       * [Learn more about fine-tuning](https://platform.openai.com/docs/guides/fine-tuning)
       *
       * @example
       * ```ts
       * const fineTuningJob = await client.fineTuning.jobs.retrieve(
       *   'ft-AF1WoRqd3aJAHsqc9NY7iL8F',
       * );
       * ```
       */
      retrieve(fineTuningJobId, options) {
        return this._client.get(`/fine_tuning/jobs/${fineTuningJobId}`, options);
      }
      list(query = {}, options) {
        if (isRequestOptions(query)) {
          return this.list({}, query);
        }
        return this._client.getAPIList("/fine_tuning/jobs", FineTuningJobsPage, { query, ...options });
      }
      /**
       * Immediately cancel a fine-tune job.
       *
       * @example
       * ```ts
       * const fineTuningJob = await client.fineTuning.jobs.cancel(
       *   'ft-AF1WoRqd3aJAHsqc9NY7iL8F',
       * );
       * ```
       */
      cancel(fineTuningJobId, options) {
        return this._client.post(`/fine_tuning/jobs/${fineTuningJobId}/cancel`, options);
      }
      listEvents(fineTuningJobId, query = {}, options) {
        if (isRequestOptions(query)) {
          return this.listEvents(fineTuningJobId, {}, query);
        }
        return this._client.getAPIList(`/fine_tuning/jobs/${fineTuningJobId}/events`, FineTuningJobEventsPage, {
          query,
          ...options
        });
      }
      /**
       * Pause a fine-tune job.
       *
       * @example
       * ```ts
       * const fineTuningJob = await client.fineTuning.jobs.pause(
       *   'ft-AF1WoRqd3aJAHsqc9NY7iL8F',
       * );
       * ```
       */
      pause(fineTuningJobId, options) {
        return this._client.post(`/fine_tuning/jobs/${fineTuningJobId}/pause`, options);
      }
      /**
       * Resume a fine-tune job.
       *
       * @example
       * ```ts
       * const fineTuningJob = await client.fineTuning.jobs.resume(
       *   'ft-AF1WoRqd3aJAHsqc9NY7iL8F',
       * );
       * ```
       */
      resume(fineTuningJobId, options) {
        return this._client.post(`/fine_tuning/jobs/${fineTuningJobId}/resume`, options);
      }
    };
    FineTuningJobsPage = class extends CursorPage {
      static {
        __name(this, "FineTuningJobsPage");
      }
      static {
        __name2(this, "FineTuningJobsPage");
      }
    };
    FineTuningJobEventsPage = class extends CursorPage {
      static {
        __name(this, "FineTuningJobEventsPage");
      }
      static {
        __name2(this, "FineTuningJobEventsPage");
      }
    };
    Jobs.FineTuningJobsPage = FineTuningJobsPage;
    Jobs.FineTuningJobEventsPage = FineTuningJobEventsPage;
    Jobs.Checkpoints = Checkpoints2;
    Jobs.FineTuningJobCheckpointsPage = FineTuningJobCheckpointsPage;
  }
});
var FineTuning;
var init_fine_tuning = __esm({
  "../node_modules/openai/resources/fine-tuning/fine-tuning.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_resource();
    init_methods();
    init_methods();
    init_alpha();
    init_alpha();
    init_checkpoints();
    init_checkpoints();
    init_jobs();
    init_jobs();
    FineTuning = class extends APIResource {
      static {
        __name(this, "FineTuning");
      }
      static {
        __name2(this, "FineTuning");
      }
      constructor() {
        super(...arguments);
        this.methods = new Methods(this._client);
        this.jobs = new Jobs(this._client);
        this.checkpoints = new Checkpoints(this._client);
        this.alpha = new Alpha(this._client);
      }
    };
    FineTuning.Methods = Methods;
    FineTuning.Jobs = Jobs;
    FineTuning.FineTuningJobsPage = FineTuningJobsPage;
    FineTuning.FineTuningJobEventsPage = FineTuningJobEventsPage;
    FineTuning.Checkpoints = Checkpoints;
    FineTuning.Alpha = Alpha;
  }
});
var GraderModels;
var init_grader_models = __esm({
  "../node_modules/openai/resources/graders/grader-models.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_resource();
    GraderModels = class extends APIResource {
      static {
        __name(this, "GraderModels");
      }
      static {
        __name2(this, "GraderModels");
      }
    };
  }
});
var Graders2;
var init_graders2 = __esm({
  "../node_modules/openai/resources/graders/graders.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_resource();
    init_grader_models();
    init_grader_models();
    Graders2 = class extends APIResource {
      static {
        __name(this, "Graders2");
      }
      static {
        __name2(this, "Graders");
      }
      constructor() {
        super(...arguments);
        this.graderModels = new GraderModels(this._client);
      }
    };
    Graders2.GraderModels = GraderModels;
  }
});
var Images;
var init_images = __esm({
  "../node_modules/openai/resources/images.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_resource();
    init_core();
    Images = class extends APIResource {
      static {
        __name(this, "Images");
      }
      static {
        __name2(this, "Images");
      }
      /**
       * Creates a variation of a given image. This endpoint only supports `dall-e-2`.
       *
       * @example
       * ```ts
       * const imagesResponse = await client.images.createVariation({
       *   image: fs.createReadStream('otter.png'),
       * });
       * ```
       */
      createVariation(body, options) {
        return this._client.post("/images/variations", multipartFormRequestOptions({ body, ...options }));
      }
      /**
       * Creates an edited or extended image given one or more source images and a
       * prompt. This endpoint only supports `gpt-image-1` and `dall-e-2`.
       *
       * @example
       * ```ts
       * const imagesResponse = await client.images.edit({
       *   image: fs.createReadStream('path/to/file'),
       *   prompt: 'A cute baby sea otter wearing a beret',
       * });
       * ```
       */
      edit(body, options) {
        return this._client.post("/images/edits", multipartFormRequestOptions({ body, ...options }));
      }
      /**
       * Creates an image given a prompt.
       * [Learn more](https://platform.openai.com/docs/guides/images).
       *
       * @example
       * ```ts
       * const imagesResponse = await client.images.generate({
       *   prompt: 'A cute baby sea otter',
       * });
       * ```
       */
      generate(body, options) {
        return this._client.post("/images/generations", { body, ...options });
      }
    };
  }
});
var Models;
var ModelsPage;
var init_models = __esm({
  "../node_modules/openai/resources/models.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_resource();
    init_pagination();
    Models = class extends APIResource {
      static {
        __name(this, "Models");
      }
      static {
        __name2(this, "Models");
      }
      /**
       * Retrieves a model instance, providing basic information about the model such as
       * the owner and permissioning.
       */
      retrieve(model, options) {
        return this._client.get(`/models/${model}`, options);
      }
      /**
       * Lists the currently available models, and provides basic information about each
       * one such as the owner and availability.
       */
      list(options) {
        return this._client.getAPIList("/models", ModelsPage, options);
      }
      /**
       * Delete a fine-tuned model. You must have the Owner role in your organization to
       * delete a model.
       */
      del(model, options) {
        return this._client.delete(`/models/${model}`, options);
      }
    };
    ModelsPage = class extends Page {
      static {
        __name(this, "ModelsPage");
      }
      static {
        __name2(this, "ModelsPage");
      }
    };
    Models.ModelsPage = ModelsPage;
  }
});
var Moderations;
var init_moderations = __esm({
  "../node_modules/openai/resources/moderations.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_resource();
    Moderations = class extends APIResource {
      static {
        __name(this, "Moderations");
      }
      static {
        __name2(this, "Moderations");
      }
      /**
       * Classifies if text and/or image inputs are potentially harmful. Learn more in
       * the [moderation guide](https://platform.openai.com/docs/guides/moderation).
       */
      create(body, options) {
        return this._client.post("/moderations", { body, ...options });
      }
    };
  }
});
function maybeParseResponse(response, params) {
  if (!params || !hasAutoParseableInput2(params)) {
    return {
      ...response,
      output_parsed: null,
      output: response.output.map((item) => {
        if (item.type === "function_call") {
          return {
            ...item,
            parsed_arguments: null
          };
        }
        if (item.type === "message") {
          return {
            ...item,
            content: item.content.map((content) => ({
              ...content,
              parsed: null
            }))
          };
        } else {
          return item;
        }
      })
    };
  }
  return parseResponse(response, params);
}
__name(maybeParseResponse, "maybeParseResponse");
function parseResponse(response, params) {
  const output = response.output.map((item) => {
    if (item.type === "function_call") {
      return {
        ...item,
        parsed_arguments: parseToolCall2(params, item)
      };
    }
    if (item.type === "message") {
      const content = item.content.map((content2) => {
        if (content2.type === "output_text") {
          return {
            ...content2,
            parsed: parseTextFormat(params, content2.text)
          };
        }
        return content2;
      });
      return {
        ...item,
        content
      };
    }
    return item;
  });
  const parsed = Object.assign({}, response, { output });
  if (!Object.getOwnPropertyDescriptor(response, "output_text")) {
    addOutputText(parsed);
  }
  Object.defineProperty(parsed, "output_parsed", {
    enumerable: true,
    get() {
      for (const output2 of parsed.output) {
        if (output2.type !== "message") {
          continue;
        }
        for (const content of output2.content) {
          if (content.type === "output_text" && content.parsed !== null) {
            return content.parsed;
          }
        }
      }
      return null;
    }
  });
  return parsed;
}
__name(parseResponse, "parseResponse");
function parseTextFormat(params, content) {
  if (params.text?.format?.type !== "json_schema") {
    return null;
  }
  if ("$parseRaw" in params.text?.format) {
    const text_format = params.text?.format;
    return text_format.$parseRaw(content);
  }
  return JSON.parse(content);
}
__name(parseTextFormat, "parseTextFormat");
function hasAutoParseableInput2(params) {
  if (isAutoParsableResponseFormat(params.text?.format)) {
    return true;
  }
  return false;
}
__name(hasAutoParseableInput2, "hasAutoParseableInput2");
function isAutoParsableTool2(tool) {
  return tool?.["$brand"] === "auto-parseable-tool";
}
__name(isAutoParsableTool2, "isAutoParsableTool2");
function getInputToolByName(input_tools, name) {
  return input_tools.find((tool) => tool.type === "function" && tool.name === name);
}
__name(getInputToolByName, "getInputToolByName");
function parseToolCall2(params, toolCall) {
  const inputTool = getInputToolByName(params.tools ?? [], toolCall.name);
  return {
    ...toolCall,
    ...toolCall,
    parsed_arguments: isAutoParsableTool2(inputTool) ? inputTool.$parseRaw(toolCall.arguments) : inputTool?.strict ? JSON.parse(toolCall.arguments) : null
  };
}
__name(parseToolCall2, "parseToolCall2");
function addOutputText(rsp) {
  const texts = [];
  for (const output of rsp.output) {
    if (output.type !== "message") {
      continue;
    }
    for (const content of output.content) {
      if (content.type === "output_text") {
        texts.push(content.text);
      }
    }
  }
  rsp.output_text = texts.join("");
}
__name(addOutputText, "addOutputText");
var init_ResponsesParser = __esm({
  "../node_modules/openai/lib/ResponsesParser.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_parser();
    __name2(maybeParseResponse, "maybeParseResponse");
    __name2(parseResponse, "parseResponse");
    __name2(parseTextFormat, "parseTextFormat");
    __name2(hasAutoParseableInput2, "hasAutoParseableInput");
    __name2(isAutoParsableTool2, "isAutoParsableTool");
    __name2(getInputToolByName, "getInputToolByName");
    __name2(parseToolCall2, "parseToolCall");
    __name2(addOutputText, "addOutputText");
  }
});
var InputItems;
var init_input_items = __esm({
  "../node_modules/openai/resources/responses/input-items.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_resource();
    init_core();
    init_responses();
    InputItems = class extends APIResource {
      static {
        __name(this, "InputItems");
      }
      static {
        __name2(this, "InputItems");
      }
      list(responseId, query = {}, options) {
        if (isRequestOptions(query)) {
          return this.list(responseId, {}, query);
        }
        return this._client.getAPIList(`/responses/${responseId}/input_items`, ResponseItemsPage, {
          query,
          ...options
        });
      }
    };
  }
});
function finalizeResponse(snapshot, params) {
  return maybeParseResponse(snapshot, params);
}
__name(finalizeResponse, "finalizeResponse");
var __classPrivateFieldSet6;
var __classPrivateFieldGet7;
var _ResponseStream_instances;
var _ResponseStream_params;
var _ResponseStream_currentResponseSnapshot;
var _ResponseStream_finalResponse;
var _ResponseStream_beginRequest;
var _ResponseStream_addEvent;
var _ResponseStream_endRequest;
var _ResponseStream_accumulateResponse;
var ResponseStream;
var init_ResponseStream = __esm({
  "../node_modules/openai/lib/responses/ResponseStream.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_error();
    init_EventStream();
    init_ResponsesParser();
    __classPrivateFieldSet6 = /* @__PURE__ */ __name(function(receiver, state, value, kind2, f) {
      if (kind2 === "m") throw new TypeError("Private method is not writable");
      if (kind2 === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind2 === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
    }, "__classPrivateFieldSet6");
    __classPrivateFieldGet7 = /* @__PURE__ */ __name(function(receiver, state, kind2, f) {
      if (kind2 === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind2 === "m" ? f : kind2 === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }, "__classPrivateFieldGet7");
    ResponseStream = class _ResponseStream extends EventStream {
      static {
        __name(this, "_ResponseStream");
      }
      static {
        __name2(this, "ResponseStream");
      }
      constructor(params) {
        super();
        _ResponseStream_instances.add(this);
        _ResponseStream_params.set(this, void 0);
        _ResponseStream_currentResponseSnapshot.set(this, void 0);
        _ResponseStream_finalResponse.set(this, void 0);
        __classPrivateFieldSet6(this, _ResponseStream_params, params, "f");
      }
      static createResponse(client, params, options) {
        const runner = new _ResponseStream(params);
        runner._run(() => runner._createOrRetrieveResponse(client, params, {
          ...options,
          headers: { ...options?.headers, "X-Stainless-Helper-Method": "stream" }
        }));
        return runner;
      }
      async _createOrRetrieveResponse(client, params, options) {
        const signal = options?.signal;
        if (signal) {
          if (signal.aborted)
            this.controller.abort();
          signal.addEventListener("abort", () => this.controller.abort());
        }
        __classPrivateFieldGet7(this, _ResponseStream_instances, "m", _ResponseStream_beginRequest).call(this);
        let stream;
        let starting_after = null;
        if ("response_id" in params) {
          stream = await client.responses.retrieve(params.response_id, { stream: true }, { ...options, signal: this.controller.signal, stream: true });
          starting_after = params.starting_after ?? null;
        } else {
          stream = await client.responses.create({ ...params, stream: true }, { ...options, signal: this.controller.signal });
        }
        this._connected();
        for await (const event of stream) {
          __classPrivateFieldGet7(this, _ResponseStream_instances, "m", _ResponseStream_addEvent).call(this, event, starting_after);
        }
        if (stream.controller.signal?.aborted) {
          throw new APIUserAbortError();
        }
        return __classPrivateFieldGet7(this, _ResponseStream_instances, "m", _ResponseStream_endRequest).call(this);
      }
      [(_ResponseStream_params = /* @__PURE__ */ new WeakMap(), _ResponseStream_currentResponseSnapshot = /* @__PURE__ */ new WeakMap(), _ResponseStream_finalResponse = /* @__PURE__ */ new WeakMap(), _ResponseStream_instances = /* @__PURE__ */ new WeakSet(), _ResponseStream_beginRequest = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function _ResponseStream_beginRequest2() {
        if (this.ended)
          return;
        __classPrivateFieldSet6(this, _ResponseStream_currentResponseSnapshot, void 0, "f");
      }, "_ResponseStream_beginRequest2"), "_ResponseStream_beginRequest"), _ResponseStream_addEvent = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function _ResponseStream_addEvent2(event, starting_after) {
        if (this.ended)
          return;
        const maybeEmit = /* @__PURE__ */ __name2((name, event2) => {
          if (starting_after == null || event2.sequence_number > starting_after) {
            this._emit(name, event2);
          }
        }, "maybeEmit");
        const response = __classPrivateFieldGet7(this, _ResponseStream_instances, "m", _ResponseStream_accumulateResponse).call(this, event);
        maybeEmit("event", event);
        switch (event.type) {
          case "response.output_text.delta": {
            const output = response.output[event.output_index];
            if (!output) {
              throw new OpenAIError(`missing output at index ${event.output_index}`);
            }
            if (output.type === "message") {
              const content = output.content[event.content_index];
              if (!content) {
                throw new OpenAIError(`missing content at index ${event.content_index}`);
              }
              if (content.type !== "output_text") {
                throw new OpenAIError(`expected content to be 'output_text', got ${content.type}`);
              }
              maybeEmit("response.output_text.delta", {
                ...event,
                snapshot: content.text
              });
            }
            break;
          }
          case "response.function_call_arguments.delta": {
            const output = response.output[event.output_index];
            if (!output) {
              throw new OpenAIError(`missing output at index ${event.output_index}`);
            }
            if (output.type === "function_call") {
              maybeEmit("response.function_call_arguments.delta", {
                ...event,
                snapshot: output.arguments
              });
            }
            break;
          }
          default:
            maybeEmit(event.type, event);
            break;
        }
      }, "_ResponseStream_addEvent2"), "_ResponseStream_addEvent"), _ResponseStream_endRequest = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function _ResponseStream_endRequest2() {
        if (this.ended) {
          throw new OpenAIError(`stream has ended, this shouldn't happen`);
        }
        const snapshot = __classPrivateFieldGet7(this, _ResponseStream_currentResponseSnapshot, "f");
        if (!snapshot) {
          throw new OpenAIError(`request ended without sending any events`);
        }
        __classPrivateFieldSet6(this, _ResponseStream_currentResponseSnapshot, void 0, "f");
        const parsedResponse = finalizeResponse(snapshot, __classPrivateFieldGet7(this, _ResponseStream_params, "f"));
        __classPrivateFieldSet6(this, _ResponseStream_finalResponse, parsedResponse, "f");
        return parsedResponse;
      }, "_ResponseStream_endRequest2"), "_ResponseStream_endRequest"), _ResponseStream_accumulateResponse = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function _ResponseStream_accumulateResponse2(event) {
        let snapshot = __classPrivateFieldGet7(this, _ResponseStream_currentResponseSnapshot, "f");
        if (!snapshot) {
          if (event.type !== "response.created") {
            throw new OpenAIError(`When snapshot hasn't been set yet, expected 'response.created' event, got ${event.type}`);
          }
          snapshot = __classPrivateFieldSet6(this, _ResponseStream_currentResponseSnapshot, event.response, "f");
          return snapshot;
        }
        switch (event.type) {
          case "response.output_item.added": {
            snapshot.output.push(event.item);
            break;
          }
          case "response.content_part.added": {
            const output = snapshot.output[event.output_index];
            if (!output) {
              throw new OpenAIError(`missing output at index ${event.output_index}`);
            }
            if (output.type === "message") {
              output.content.push(event.part);
            }
            break;
          }
          case "response.output_text.delta": {
            const output = snapshot.output[event.output_index];
            if (!output) {
              throw new OpenAIError(`missing output at index ${event.output_index}`);
            }
            if (output.type === "message") {
              const content = output.content[event.content_index];
              if (!content) {
                throw new OpenAIError(`missing content at index ${event.content_index}`);
              }
              if (content.type !== "output_text") {
                throw new OpenAIError(`expected content to be 'output_text', got ${content.type}`);
              }
              content.text += event.delta;
            }
            break;
          }
          case "response.function_call_arguments.delta": {
            const output = snapshot.output[event.output_index];
            if (!output) {
              throw new OpenAIError(`missing output at index ${event.output_index}`);
            }
            if (output.type === "function_call") {
              output.arguments += event.delta;
            }
            break;
          }
          case "response.completed": {
            __classPrivateFieldSet6(this, _ResponseStream_currentResponseSnapshot, event.response, "f");
            break;
          }
        }
        return snapshot;
      }, "_ResponseStream_accumulateResponse2"), "_ResponseStream_accumulateResponse"), Symbol.asyncIterator)]() {
        const pushQueue = [];
        const readQueue = [];
        let done = false;
        this.on("event", (event) => {
          const reader = readQueue.shift();
          if (reader) {
            reader.resolve(event);
          } else {
            pushQueue.push(event);
          }
        });
        this.on("end", () => {
          done = true;
          for (const reader of readQueue) {
            reader.resolve(void 0);
          }
          readQueue.length = 0;
        });
        this.on("abort", (err) => {
          done = true;
          for (const reader of readQueue) {
            reader.reject(err);
          }
          readQueue.length = 0;
        });
        this.on("error", (err) => {
          done = true;
          for (const reader of readQueue) {
            reader.reject(err);
          }
          readQueue.length = 0;
        });
        return {
          next: /* @__PURE__ */ __name2(async () => {
            if (!pushQueue.length) {
              if (done) {
                return { value: void 0, done: true };
              }
              return new Promise((resolve, reject) => readQueue.push({ resolve, reject })).then((event2) => event2 ? { value: event2, done: false } : { value: void 0, done: true });
            }
            const event = pushQueue.shift();
            return { value: event, done: false };
          }, "next"),
          return: /* @__PURE__ */ __name2(async () => {
            this.abort();
            return { value: void 0, done: true };
          }, "return")
        };
      }
      /**
       * @returns a promise that resolves with the final Response, or rejects
       * if an error occurred or the stream ended prematurely without producing a REsponse.
       */
      async finalResponse() {
        await this.done();
        const response = __classPrivateFieldGet7(this, _ResponseStream_finalResponse, "f");
        if (!response)
          throw new OpenAIError("stream ended without producing a ChatCompletion");
        return response;
      }
    };
    __name2(finalizeResponse, "finalizeResponse");
  }
});
var Responses;
var ResponseItemsPage;
var init_responses = __esm({
  "../node_modules/openai/resources/responses/responses.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_ResponsesParser();
    init_resource();
    init_input_items();
    init_input_items();
    init_ResponseStream();
    init_pagination();
    Responses = class extends APIResource {
      static {
        __name(this, "Responses");
      }
      static {
        __name2(this, "Responses");
      }
      constructor() {
        super(...arguments);
        this.inputItems = new InputItems(this._client);
      }
      create(body, options) {
        return this._client.post("/responses", { body, ...options, stream: body.stream ?? false })._thenUnwrap((rsp) => {
          if ("object" in rsp && rsp.object === "response") {
            addOutputText(rsp);
          }
          return rsp;
        });
      }
      retrieve(responseId, query = {}, options) {
        return this._client.get(`/responses/${responseId}`, {
          query,
          ...options,
          stream: query?.stream ?? false
        });
      }
      /**
       * Deletes a model response with the given ID.
       *
       * @example
       * ```ts
       * await client.responses.del(
       *   'resp_677efb5139a88190b512bc3fef8e535d',
       * );
       * ```
       */
      del(responseId, options) {
        return this._client.delete(`/responses/${responseId}`, {
          ...options,
          headers: { Accept: "*/*", ...options?.headers }
        });
      }
      parse(body, options) {
        return this._client.responses.create(body, options)._thenUnwrap((response) => parseResponse(response, body));
      }
      /**
       * Creates a model response stream
       */
      stream(body, options) {
        return ResponseStream.createResponse(this._client, body, options);
      }
      /**
       * Cancels a model response with the given ID. Only responses created with the
       * `background` parameter set to `true` can be cancelled.
       * [Learn more](https://platform.openai.com/docs/guides/background).
       *
       * @example
       * ```ts
       * await client.responses.cancel(
       *   'resp_677efb5139a88190b512bc3fef8e535d',
       * );
       * ```
       */
      cancel(responseId, options) {
        return this._client.post(`/responses/${responseId}/cancel`, {
          ...options,
          headers: { Accept: "*/*", ...options?.headers }
        });
      }
    };
    ResponseItemsPage = class extends CursorPage {
      static {
        __name(this, "ResponseItemsPage");
      }
      static {
        __name2(this, "ResponseItemsPage");
      }
    };
    Responses.InputItems = InputItems;
  }
});
var Parts;
var init_parts = __esm({
  "../node_modules/openai/resources/uploads/parts.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_resource();
    init_core();
    Parts = class extends APIResource {
      static {
        __name(this, "Parts");
      }
      static {
        __name2(this, "Parts");
      }
      /**
       * Adds a
       * [Part](https://platform.openai.com/docs/api-reference/uploads/part-object) to an
       * [Upload](https://platform.openai.com/docs/api-reference/uploads/object) object.
       * A Part represents a chunk of bytes from the file you are trying to upload.
       *
       * Each Part can be at most 64 MB, and you can add Parts until you hit the Upload
       * maximum of 8 GB.
       *
       * It is possible to add multiple Parts in parallel. You can decide the intended
       * order of the Parts when you
       * [complete the Upload](https://platform.openai.com/docs/api-reference/uploads/complete).
       */
      create(uploadId, body, options) {
        return this._client.post(`/uploads/${uploadId}/parts`, multipartFormRequestOptions({ body, ...options }));
      }
    };
  }
});
var Uploads;
var init_uploads2 = __esm({
  "../node_modules/openai/resources/uploads/uploads.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_resource();
    init_parts();
    init_parts();
    Uploads = class extends APIResource {
      static {
        __name(this, "Uploads");
      }
      static {
        __name2(this, "Uploads");
      }
      constructor() {
        super(...arguments);
        this.parts = new Parts(this._client);
      }
      /**
       * Creates an intermediate
       * [Upload](https://platform.openai.com/docs/api-reference/uploads/object) object
       * that you can add
       * [Parts](https://platform.openai.com/docs/api-reference/uploads/part-object) to.
       * Currently, an Upload can accept at most 8 GB in total and expires after an hour
       * after you create it.
       *
       * Once you complete the Upload, we will create a
       * [File](https://platform.openai.com/docs/api-reference/files/object) object that
       * contains all the parts you uploaded. This File is usable in the rest of our
       * platform as a regular File object.
       *
       * For certain `purpose` values, the correct `mime_type` must be specified. Please
       * refer to documentation for the
       * [supported MIME types for your use case](https://platform.openai.com/docs/assistants/tools/file-search#supported-files).
       *
       * For guidance on the proper filename extensions for each purpose, please follow
       * the documentation on
       * [creating a File](https://platform.openai.com/docs/api-reference/files/create).
       */
      create(body, options) {
        return this._client.post("/uploads", { body, ...options });
      }
      /**
       * Cancels the Upload. No Parts may be added after an Upload is cancelled.
       */
      cancel(uploadId, options) {
        return this._client.post(`/uploads/${uploadId}/cancel`, options);
      }
      /**
       * Completes the
       * [Upload](https://platform.openai.com/docs/api-reference/uploads/object).
       *
       * Within the returned Upload object, there is a nested
       * [File](https://platform.openai.com/docs/api-reference/files/object) object that
       * is ready to use in the rest of the platform.
       *
       * You can specify the order of the Parts by passing in an ordered list of the Part
       * IDs.
       *
       * The number of bytes uploaded upon completion must match the number of bytes
       * initially specified when creating the Upload object. No Parts may be added after
       * an Upload is completed.
       */
      complete(uploadId, body, options) {
        return this._client.post(`/uploads/${uploadId}/complete`, { body, ...options });
      }
    };
    Uploads.Parts = Parts;
  }
});
var allSettledWithThrow;
var init_Util = __esm({
  "../node_modules/openai/lib/Util.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    allSettledWithThrow = /* @__PURE__ */ __name2(async (promises) => {
      const results = await Promise.allSettled(promises);
      const rejected = results.filter((result) => result.status === "rejected");
      if (rejected.length) {
        for (const result of rejected) {
          console.error(result.reason);
        }
        throw new Error(`${rejected.length} promise(s) failed - see the above errors`);
      }
      const values = [];
      for (const result of results) {
        if (result.status === "fulfilled") {
          values.push(result.value);
        }
      }
      return values;
    }, "allSettledWithThrow");
  }
});
var Files3;
var VectorStoreFilesPage;
var FileContentResponsesPage;
var init_files3 = __esm({
  "../node_modules/openai/resources/vector-stores/files.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_resource();
    init_core();
    init_pagination();
    Files3 = class extends APIResource {
      static {
        __name(this, "Files3");
      }
      static {
        __name2(this, "Files");
      }
      /**
       * Create a vector store file by attaching a
       * [File](https://platform.openai.com/docs/api-reference/files) to a
       * [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object).
       */
      create(vectorStoreId, body, options) {
        return this._client.post(`/vector_stores/${vectorStoreId}/files`, {
          body,
          ...options,
          headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
        });
      }
      /**
       * Retrieves a vector store file.
       */
      retrieve(vectorStoreId, fileId, options) {
        return this._client.get(`/vector_stores/${vectorStoreId}/files/${fileId}`, {
          ...options,
          headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
        });
      }
      /**
       * Update attributes on a vector store file.
       */
      update(vectorStoreId, fileId, body, options) {
        return this._client.post(`/vector_stores/${vectorStoreId}/files/${fileId}`, {
          body,
          ...options,
          headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
        });
      }
      list(vectorStoreId, query = {}, options) {
        if (isRequestOptions(query)) {
          return this.list(vectorStoreId, {}, query);
        }
        return this._client.getAPIList(`/vector_stores/${vectorStoreId}/files`, VectorStoreFilesPage, {
          query,
          ...options,
          headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
        });
      }
      /**
       * Delete a vector store file. This will remove the file from the vector store but
       * the file itself will not be deleted. To delete the file, use the
       * [delete file](https://platform.openai.com/docs/api-reference/files/delete)
       * endpoint.
       */
      del(vectorStoreId, fileId, options) {
        return this._client.delete(`/vector_stores/${vectorStoreId}/files/${fileId}`, {
          ...options,
          headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
        });
      }
      /**
       * Attach a file to the given vector store and wait for it to be processed.
       */
      async createAndPoll(vectorStoreId, body, options) {
        const file = await this.create(vectorStoreId, body, options);
        return await this.poll(vectorStoreId, file.id, options);
      }
      /**
       * Wait for the vector store file to finish processing.
       *
       * Note: this will return even if the file failed to process, you need to check
       * file.last_error and file.status to handle these cases
       */
      async poll(vectorStoreId, fileId, options) {
        const headers = { ...options?.headers, "X-Stainless-Poll-Helper": "true" };
        if (options?.pollIntervalMs) {
          headers["X-Stainless-Custom-Poll-Interval"] = options.pollIntervalMs.toString();
        }
        while (true) {
          const fileResponse = await this.retrieve(vectorStoreId, fileId, {
            ...options,
            headers
          }).withResponse();
          const file = fileResponse.data;
          switch (file.status) {
            case "in_progress":
              let sleepInterval = 5e3;
              if (options?.pollIntervalMs) {
                sleepInterval = options.pollIntervalMs;
              } else {
                const headerInterval = fileResponse.response.headers.get("openai-poll-after-ms");
                if (headerInterval) {
                  const headerIntervalMs = parseInt(headerInterval);
                  if (!isNaN(headerIntervalMs)) {
                    sleepInterval = headerIntervalMs;
                  }
                }
              }
              await sleep(sleepInterval);
              break;
            case "failed":
            case "completed":
              return file;
          }
        }
      }
      /**
       * Upload a file to the `files` API and then attach it to the given vector store.
       *
       * Note the file will be asynchronously processed (you can use the alternative
       * polling helper method to wait for processing to complete).
       */
      async upload(vectorStoreId, file, options) {
        const fileInfo = await this._client.files.create({ file, purpose: "assistants" }, options);
        return this.create(vectorStoreId, { file_id: fileInfo.id }, options);
      }
      /**
       * Add a file to a vector store and poll until processing is complete.
       */
      async uploadAndPoll(vectorStoreId, file, options) {
        const fileInfo = await this.upload(vectorStoreId, file, options);
        return await this.poll(vectorStoreId, fileInfo.id, options);
      }
      /**
       * Retrieve the parsed contents of a vector store file.
       */
      content(vectorStoreId, fileId, options) {
        return this._client.getAPIList(`/vector_stores/${vectorStoreId}/files/${fileId}/content`, FileContentResponsesPage, { ...options, headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers } });
      }
    };
    VectorStoreFilesPage = class extends CursorPage {
      static {
        __name(this, "VectorStoreFilesPage");
      }
      static {
        __name2(this, "VectorStoreFilesPage");
      }
    };
    FileContentResponsesPage = class extends Page {
      static {
        __name(this, "FileContentResponsesPage");
      }
      static {
        __name2(this, "FileContentResponsesPage");
      }
    };
    Files3.VectorStoreFilesPage = VectorStoreFilesPage;
    Files3.FileContentResponsesPage = FileContentResponsesPage;
  }
});
var FileBatches;
var init_file_batches = __esm({
  "../node_modules/openai/resources/vector-stores/file-batches.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_resource();
    init_core();
    init_core();
    init_Util();
    init_files3();
    FileBatches = class extends APIResource {
      static {
        __name(this, "FileBatches");
      }
      static {
        __name2(this, "FileBatches");
      }
      /**
       * Create a vector store file batch.
       */
      create(vectorStoreId, body, options) {
        return this._client.post(`/vector_stores/${vectorStoreId}/file_batches`, {
          body,
          ...options,
          headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
        });
      }
      /**
       * Retrieves a vector store file batch.
       */
      retrieve(vectorStoreId, batchId, options) {
        return this._client.get(`/vector_stores/${vectorStoreId}/file_batches/${batchId}`, {
          ...options,
          headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
        });
      }
      /**
       * Cancel a vector store file batch. This attempts to cancel the processing of
       * files in this batch as soon as possible.
       */
      cancel(vectorStoreId, batchId, options) {
        return this._client.post(`/vector_stores/${vectorStoreId}/file_batches/${batchId}/cancel`, {
          ...options,
          headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
        });
      }
      /**
       * Create a vector store batch and poll until all files have been processed.
       */
      async createAndPoll(vectorStoreId, body, options) {
        const batch = await this.create(vectorStoreId, body);
        return await this.poll(vectorStoreId, batch.id, options);
      }
      listFiles(vectorStoreId, batchId, query = {}, options) {
        if (isRequestOptions(query)) {
          return this.listFiles(vectorStoreId, batchId, {}, query);
        }
        return this._client.getAPIList(`/vector_stores/${vectorStoreId}/file_batches/${batchId}/files`, VectorStoreFilesPage, { query, ...options, headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers } });
      }
      /**
       * Wait for the given file batch to be processed.
       *
       * Note: this will return even if one of the files failed to process, you need to
       * check batch.file_counts.failed_count to handle this case.
       */
      async poll(vectorStoreId, batchId, options) {
        const headers = { ...options?.headers, "X-Stainless-Poll-Helper": "true" };
        if (options?.pollIntervalMs) {
          headers["X-Stainless-Custom-Poll-Interval"] = options.pollIntervalMs.toString();
        }
        while (true) {
          const { data: batch, response } = await this.retrieve(vectorStoreId, batchId, {
            ...options,
            headers
          }).withResponse();
          switch (batch.status) {
            case "in_progress":
              let sleepInterval = 5e3;
              if (options?.pollIntervalMs) {
                sleepInterval = options.pollIntervalMs;
              } else {
                const headerInterval = response.headers.get("openai-poll-after-ms");
                if (headerInterval) {
                  const headerIntervalMs = parseInt(headerInterval);
                  if (!isNaN(headerIntervalMs)) {
                    sleepInterval = headerIntervalMs;
                  }
                }
              }
              await sleep(sleepInterval);
              break;
            case "failed":
            case "cancelled":
            case "completed":
              return batch;
          }
        }
      }
      /**
       * Uploads the given files concurrently and then creates a vector store file batch.
       *
       * The concurrency limit is configurable using the `maxConcurrency` parameter.
       */
      async uploadAndPoll(vectorStoreId, { files, fileIds = [] }, options) {
        if (files == null || files.length == 0) {
          throw new Error(`No \`files\` provided to process. If you've already uploaded files you should use \`.createAndPoll()\` instead`);
        }
        const configuredConcurrency = options?.maxConcurrency ?? 5;
        const concurrencyLimit = Math.min(configuredConcurrency, files.length);
        const client = this._client;
        const fileIterator = files.values();
        const allFileIds = [...fileIds];
        async function processFiles(iterator) {
          for (let item of iterator) {
            const fileObj = await client.files.create({ file: item, purpose: "assistants" }, options);
            allFileIds.push(fileObj.id);
          }
        }
        __name(processFiles, "processFiles");
        __name2(processFiles, "processFiles");
        const workers = Array(concurrencyLimit).fill(fileIterator).map(processFiles);
        await allSettledWithThrow(workers);
        return await this.createAndPoll(vectorStoreId, {
          file_ids: allFileIds
        });
      }
    };
  }
});
var VectorStores;
var VectorStoresPage;
var VectorStoreSearchResponsesPage;
var init_vector_stores = __esm({
  "../node_modules/openai/resources/vector-stores/vector-stores.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_resource();
    init_core();
    init_file_batches();
    init_file_batches();
    init_files3();
    init_files3();
    init_pagination();
    VectorStores = class extends APIResource {
      static {
        __name(this, "VectorStores");
      }
      static {
        __name2(this, "VectorStores");
      }
      constructor() {
        super(...arguments);
        this.files = new Files3(this._client);
        this.fileBatches = new FileBatches(this._client);
      }
      /**
       * Create a vector store.
       */
      create(body, options) {
        return this._client.post("/vector_stores", {
          body,
          ...options,
          headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
        });
      }
      /**
       * Retrieves a vector store.
       */
      retrieve(vectorStoreId, options) {
        return this._client.get(`/vector_stores/${vectorStoreId}`, {
          ...options,
          headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
        });
      }
      /**
       * Modifies a vector store.
       */
      update(vectorStoreId, body, options) {
        return this._client.post(`/vector_stores/${vectorStoreId}`, {
          body,
          ...options,
          headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
        });
      }
      list(query = {}, options) {
        if (isRequestOptions(query)) {
          return this.list({}, query);
        }
        return this._client.getAPIList("/vector_stores", VectorStoresPage, {
          query,
          ...options,
          headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
        });
      }
      /**
       * Delete a vector store.
       */
      del(vectorStoreId, options) {
        return this._client.delete(`/vector_stores/${vectorStoreId}`, {
          ...options,
          headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
        });
      }
      /**
       * Search a vector store for relevant chunks based on a query and file attributes
       * filter.
       */
      search(vectorStoreId, body, options) {
        return this._client.getAPIList(`/vector_stores/${vectorStoreId}/search`, VectorStoreSearchResponsesPage, {
          body,
          method: "post",
          ...options,
          headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
        });
      }
    };
    VectorStoresPage = class extends CursorPage {
      static {
        __name(this, "VectorStoresPage");
      }
      static {
        __name2(this, "VectorStoresPage");
      }
    };
    VectorStoreSearchResponsesPage = class extends Page {
      static {
        __name(this, "VectorStoreSearchResponsesPage");
      }
      static {
        __name2(this, "VectorStoreSearchResponsesPage");
      }
    };
    VectorStores.VectorStoresPage = VectorStoresPage;
    VectorStores.VectorStoreSearchResponsesPage = VectorStoreSearchResponsesPage;
    VectorStores.Files = Files3;
    VectorStores.VectorStoreFilesPage = VectorStoreFilesPage;
    VectorStores.FileContentResponsesPage = FileContentResponsesPage;
    VectorStores.FileBatches = FileBatches;
  }
});
var init_resources = __esm({
  "../node_modules/openai/resources/index.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_chat2();
    init_shared();
    init_audio();
    init_batches();
    init_beta();
    init_completions3();
    init_containers();
    init_embeddings();
    init_evals();
    init_files2();
    init_fine_tuning();
    init_graders2();
    init_images();
    init_models();
    init_moderations();
    init_responses();
    init_uploads2();
    init_vector_stores();
  }
});
var _a;
var OpenAI;
var openai_default;
var init_openai = __esm({
  "../node_modules/openai/index.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_qs();
    init_core();
    init_error();
    init_uploads();
    init_resources();
    init_batches();
    init_completions3();
    init_embeddings();
    init_files2();
    init_images();
    init_models();
    init_moderations();
    init_audio();
    init_beta();
    init_chat();
    init_containers();
    init_evals();
    init_fine_tuning();
    init_graders2();
    init_responses();
    init_uploads2();
    init_vector_stores();
    init_completions();
    OpenAI = class extends APIClient {
      static {
        __name(this, "OpenAI");
      }
      static {
        __name2(this, "OpenAI");
      }
      /**
       * API Client for interfacing with the OpenAI API.
       *
       * @param {string | undefined} [opts.apiKey=process.env['OPENAI_API_KEY'] ?? undefined]
       * @param {string | null | undefined} [opts.organization=process.env['OPENAI_ORG_ID'] ?? null]
       * @param {string | null | undefined} [opts.project=process.env['OPENAI_PROJECT_ID'] ?? null]
       * @param {string} [opts.baseURL=process.env['OPENAI_BASE_URL'] ?? https://api.openai.com/v1] - Override the default base URL for the API.
       * @param {number} [opts.timeout=10 minutes] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
       * @param {number} [opts.httpAgent] - An HTTP agent used to manage HTTP(s) connections.
       * @param {Core.Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
       * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
       * @param {Core.Headers} opts.defaultHeaders - Default headers to include with every request to the API.
       * @param {Core.DefaultQuery} opts.defaultQuery - Default query parameters to include with every request to the API.
       * @param {boolean} [opts.dangerouslyAllowBrowser=false] - By default, client-side use of this library is not allowed, as it risks exposing your secret API credentials to attackers.
       */
      constructor({ baseURL = readEnv("OPENAI_BASE_URL"), apiKey = readEnv("OPENAI_API_KEY"), organization = readEnv("OPENAI_ORG_ID") ?? null, project = readEnv("OPENAI_PROJECT_ID") ?? null, ...opts } = {}) {
        if (apiKey === void 0) {
          throw new OpenAIError("The OPENAI_API_KEY environment variable is missing or empty; either provide it, or instantiate the OpenAI client with an apiKey option, like new OpenAI({ apiKey: 'My API Key' }).");
        }
        const options = {
          apiKey,
          organization,
          project,
          ...opts,
          baseURL: baseURL || `https://api.openai.com/v1`
        };
        if (!options.dangerouslyAllowBrowser && isRunningInBrowser()) {
          throw new OpenAIError("It looks like you're running in a browser-like environment.\n\nThis is disabled by default, as it risks exposing your secret API credentials to attackers.\nIf you understand the risks and have appropriate mitigations in place,\nyou can set the `dangerouslyAllowBrowser` option to `true`, e.g.,\n\nnew OpenAI({ apiKey, dangerouslyAllowBrowser: true });\n\nhttps://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety\n");
        }
        super({
          baseURL: options.baseURL,
          timeout: options.timeout ?? 6e5,
          httpAgent: options.httpAgent,
          maxRetries: options.maxRetries,
          fetch: options.fetch
        });
        this.completions = new Completions3(this);
        this.chat = new Chat(this);
        this.embeddings = new Embeddings(this);
        this.files = new Files2(this);
        this.images = new Images(this);
        this.audio = new Audio(this);
        this.moderations = new Moderations(this);
        this.models = new Models(this);
        this.fineTuning = new FineTuning(this);
        this.graders = new Graders2(this);
        this.vectorStores = new VectorStores(this);
        this.beta = new Beta(this);
        this.batches = new Batches(this);
        this.uploads = new Uploads(this);
        this.responses = new Responses(this);
        this.evals = new Evals(this);
        this.containers = new Containers(this);
        this._options = options;
        this.apiKey = apiKey;
        this.organization = organization;
        this.project = project;
      }
      defaultQuery() {
        return this._options.defaultQuery;
      }
      defaultHeaders(opts) {
        return {
          ...super.defaultHeaders(opts),
          "OpenAI-Organization": this.organization,
          "OpenAI-Project": this.project,
          ...this._options.defaultHeaders
        };
      }
      authHeaders(opts) {
        return { Authorization: `Bearer ${this.apiKey}` };
      }
      stringifyQuery(query) {
        return stringify(query, { arrayFormat: "brackets" });
      }
    };
    _a = OpenAI;
    OpenAI.OpenAI = _a;
    OpenAI.DEFAULT_TIMEOUT = 6e5;
    OpenAI.OpenAIError = OpenAIError;
    OpenAI.APIError = APIError;
    OpenAI.APIConnectionError = APIConnectionError;
    OpenAI.APIConnectionTimeoutError = APIConnectionTimeoutError;
    OpenAI.APIUserAbortError = APIUserAbortError;
    OpenAI.NotFoundError = NotFoundError;
    OpenAI.ConflictError = ConflictError;
    OpenAI.RateLimitError = RateLimitError;
    OpenAI.BadRequestError = BadRequestError;
    OpenAI.AuthenticationError = AuthenticationError;
    OpenAI.InternalServerError = InternalServerError;
    OpenAI.PermissionDeniedError = PermissionDeniedError;
    OpenAI.UnprocessableEntityError = UnprocessableEntityError;
    OpenAI.toFile = toFile;
    OpenAI.fileFromPath = fileFromPath;
    OpenAI.Completions = Completions3;
    OpenAI.Chat = Chat;
    OpenAI.ChatCompletionsPage = ChatCompletionsPage;
    OpenAI.Embeddings = Embeddings;
    OpenAI.Files = Files2;
    OpenAI.FileObjectsPage = FileObjectsPage;
    OpenAI.Images = Images;
    OpenAI.Audio = Audio;
    OpenAI.Moderations = Moderations;
    OpenAI.Models = Models;
    OpenAI.ModelsPage = ModelsPage;
    OpenAI.FineTuning = FineTuning;
    OpenAI.Graders = Graders2;
    OpenAI.VectorStores = VectorStores;
    OpenAI.VectorStoresPage = VectorStoresPage;
    OpenAI.VectorStoreSearchResponsesPage = VectorStoreSearchResponsesPage;
    OpenAI.Beta = Beta;
    OpenAI.Batches = Batches;
    OpenAI.BatchesPage = BatchesPage;
    OpenAI.Uploads = Uploads;
    OpenAI.Responses = Responses;
    OpenAI.Evals = Evals;
    OpenAI.EvalListResponsesPage = EvalListResponsesPage;
    OpenAI.Containers = Containers;
    OpenAI.ContainerListResponsesPage = ContainerListResponsesPage;
    openai_default = OpenAI;
  }
});
function extractOpenAIImage(response) {
  if (!response || !Array.isArray(response.output)) return null;
  for (const item of response.output) {
    for (const part of item?.content || []) {
      if (typeof part.image_url === "string" && part.image_url) {
        return part.image_url;
      }
      if (typeof part.url === "string" && part.url) {
        return part.url;
      }
      const image = part.image || {};
      if (typeof image.url === "string" && image.url) {
        return image.url;
      }
      const base64 = part.b64_json || image.b64_json || part.image_base64;
      if (typeof base64 === "string" && base64) {
        return `data:image/png;base64,${base64}`;
      }
    }
  }
  return null;
}
__name(extractOpenAIImage, "extractOpenAIImage");
async function generateWithOpenAI(topic, env22) {
  const apiKey = env22.OPENAI_API_KEY;
  if (!apiKey) {
    return { status: 500, body: JSON.stringify({ error: "OPENAI_API_KEY not set" }) };
  }
  const client = new openai_default({ apiKey });
  const prompt = `Skapa en visuellt slagkraftig bild (fotorealistisk eller digital illustration) som passar till en nyhetsartikel om "${topic}". Returnera endast bilden.`;
  let response;
  try {
    response = await client.responses.create({
      prompt: OPENAI_PROMPT,
      input: [
        {
          role: "user",
          content: [
            { type: "input_text", text: prompt }
          ]
        }
      ],
      reasoning: { summary: "auto" },
      tools: [
        {
          type: "web_search",
          filters: null,
          search_context_size: "high",
          user_location: { type: "approximate", city: "stockholm", country: "SE", region: null, timezone: null }
        },
        {
          type: "image_generation",
          background: "auto",
          moderation: "low",
          output_compression: 100,
          output_format: "png",
          quality: "auto",
          size: "1536x1024"
        }
      ],
      store: true,
      include: ["reasoning.encrypted_content"]
    });
  } catch (error32) {
    console.error("OpenAI image generation failed:", error32);
    const message = error32?.error?.message || error32?.message || "OpenAI request failed";
    return { status: 502, body: JSON.stringify({ error: message }) };
  }
  const imageUrl = extractOpenAIImage(response);
  if (!imageUrl) {
    console.error("OpenAI custom prompt returned no image payload");
    return { status: 502, body: JSON.stringify({ error: "Ingen bild genererades av OpenAI" }) };
  }
  return { status: 200, body: JSON.stringify({ imageUrl }) };
}
__name(generateWithOpenAI, "generateWithOpenAI");
function generateWithUnsplash(topic) {
  const query = encodeURIComponent(topic || "technology privacy");
  const imageUrl = `https://source.unsplash.com/featured/?${query}`;
  return { status: 200, body: JSON.stringify({ imageUrl }) };
}
__name(generateWithUnsplash, "generateWithUnsplash");
async function onRequest(context22) {
  const { request, env: env22 } = context22;
  if (request.method === "OPTIONS") {
    return new Response("", { status: 200, headers: HEADERS });
  }
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: HEADERS });
  }
  try {
    const { topic, provider } = await request.json().catch(() => ({}));
    if ((provider || "").toLowerCase() === "openai") {
      const r2 = await generateWithOpenAI((topic || "").trim(), env22);
      return new Response(r2.body, { status: r2.status, headers: HEADERS });
    }
    const r = generateWithUnsplash(topic);
    return new Response(r.body, { status: r.status, headers: HEADERS });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "Image generation failed" }), { status: 500, headers: HEADERS });
  }
}
__name(onRequest, "onRequest");
var HEADERS;
var OPENAI_PROMPT;
var init_image_generate = __esm({
  "api/image-generate.js"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_openai();
    HEADERS = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, X-Admin-Token",
      "Access-Control-Allow-Methods": "POST,OPTIONS"
    };
    OPENAI_PROMPT = { id: "pmpt_68dd621211e48194a9bcb0f3b88f51c40c83dce5f116999b", version: "1" };
    __name2(extractOpenAIImage, "extractOpenAIImage");
    __name2(generateWithOpenAI, "generateWithOpenAI");
    __name2(generateWithUnsplash, "generateWithUnsplash");
    __name2(onRequest, "onRequest");
  }
});
var require_events = __commonJS({
  "node-built-in-modules:events"(exports, module) {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault;
  }
});
var require_postgres_array = __commonJS({
  "../node_modules/postgres-array/index.js"(exports) {
    "use strict";
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    exports.parse = function(source, transform) {
      return new ArrayParser(source, transform).parse();
    };
    var ArrayParser = class _ArrayParser {
      static {
        __name(this, "_ArrayParser");
      }
      static {
        __name2(this, "ArrayParser");
      }
      constructor(source, transform) {
        this.source = source;
        this.transform = transform || identity;
        this.position = 0;
        this.entries = [];
        this.recorded = [];
        this.dimension = 0;
      }
      isEof() {
        return this.position >= this.source.length;
      }
      nextCharacter() {
        var character = this.source[this.position++];
        if (character === "\\") {
          return {
            value: this.source[this.position++],
            escaped: true
          };
        }
        return {
          value: character,
          escaped: false
        };
      }
      record(character) {
        this.recorded.push(character);
      }
      newEntry(includeEmpty) {
        var entry;
        if (this.recorded.length > 0 || includeEmpty) {
          entry = this.recorded.join("");
          if (entry === "NULL" && !includeEmpty) {
            entry = null;
          }
          if (entry !== null) entry = this.transform(entry);
          this.entries.push(entry);
          this.recorded = [];
        }
      }
      consumeDimensions() {
        if (this.source[0] === "[") {
          while (!this.isEof()) {
            var char = this.nextCharacter();
            if (char.value === "=") break;
          }
        }
      }
      parse(nested) {
        var character, parser, quote;
        this.consumeDimensions();
        while (!this.isEof()) {
          character = this.nextCharacter();
          if (character.value === "{" && !quote) {
            this.dimension++;
            if (this.dimension > 1) {
              parser = new _ArrayParser(this.source.substr(this.position - 1), this.transform);
              this.entries.push(parser.parse(true));
              this.position += parser.position - 2;
            }
          } else if (character.value === "}" && !quote) {
            this.dimension--;
            if (!this.dimension) {
              this.newEntry();
              if (nested) return this.entries;
            }
          } else if (character.value === '"' && !character.escaped) {
            if (quote) this.newEntry(true);
            quote = !quote;
          } else if (character.value === "," && !quote) {
            this.newEntry();
          } else {
            this.record(character.value);
          }
        }
        if (this.dimension !== 0) {
          throw new Error("array dimension not balanced");
        }
        return this.entries;
      }
    };
    function identity(value) {
      return value;
    }
    __name(identity, "identity");
    __name2(identity, "identity");
  }
});
var require_arrayParser = __commonJS({
  "../node_modules/pg-types/lib/arrayParser.js"(exports, module) {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var array = require_postgres_array();
    module.exports = {
      create: /* @__PURE__ */ __name2(function(source, transform) {
        return {
          parse: /* @__PURE__ */ __name2(function() {
            return array.parse(source, transform);
          }, "parse")
        };
      }, "create")
    };
  }
});
var require_postgres_date = __commonJS({
  "../node_modules/postgres-date/index.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var DATE_TIME = /(\d{1,})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})(\.\d{1,})?.*?( BC)?$/;
    var DATE = /^(\d{1,})-(\d{2})-(\d{2})( BC)?$/;
    var TIME_ZONE = /([Z+-])(\d{2})?:?(\d{2})?:?(\d{2})?/;
    var INFINITY2 = /^-?infinity$/;
    module.exports = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function parseDate(isoDate) {
      if (INFINITY2.test(isoDate)) {
        return Number(isoDate.replace("i", "I"));
      }
      var matches = DATE_TIME.exec(isoDate);
      if (!matches) {
        return getDate(isoDate) || null;
      }
      var isBC = !!matches[8];
      var year = parseInt(matches[1], 10);
      if (isBC) {
        year = bcYearToNegativeYear(year);
      }
      var month = parseInt(matches[2], 10) - 1;
      var day = matches[3];
      var hour = parseInt(matches[4], 10);
      var minute = parseInt(matches[5], 10);
      var second = parseInt(matches[6], 10);
      var ms = matches[7];
      ms = ms ? 1e3 * parseFloat(ms) : 0;
      var date;
      var offset = timeZoneOffset(isoDate);
      if (offset != null) {
        date = new Date(Date.UTC(year, month, day, hour, minute, second, ms));
        if (is0To99(year)) {
          date.setUTCFullYear(year);
        }
        if (offset !== 0) {
          date.setTime(date.getTime() - offset);
        }
      } else {
        date = new Date(year, month, day, hour, minute, second, ms);
        if (is0To99(year)) {
          date.setFullYear(year);
        }
      }
      return date;
    }, "parseDate"), "parseDate");
    function getDate(isoDate) {
      var matches = DATE.exec(isoDate);
      if (!matches) {
        return;
      }
      var year = parseInt(matches[1], 10);
      var isBC = !!matches[4];
      if (isBC) {
        year = bcYearToNegativeYear(year);
      }
      var month = parseInt(matches[2], 10) - 1;
      var day = matches[3];
      var date = new Date(year, month, day);
      if (is0To99(year)) {
        date.setFullYear(year);
      }
      return date;
    }
    __name(getDate, "getDate");
    __name2(getDate, "getDate");
    function timeZoneOffset(isoDate) {
      if (isoDate.endsWith("+00")) {
        return 0;
      }
      var zone = TIME_ZONE.exec(isoDate.split(" ")[1]);
      if (!zone) return;
      var type = zone[1];
      if (type === "Z") {
        return 0;
      }
      var sign = type === "-" ? -1 : 1;
      var offset = parseInt(zone[2], 10) * 3600 + parseInt(zone[3] || 0, 10) * 60 + parseInt(zone[4] || 0, 10);
      return offset * sign * 1e3;
    }
    __name(timeZoneOffset, "timeZoneOffset");
    __name2(timeZoneOffset, "timeZoneOffset");
    function bcYearToNegativeYear(year) {
      return -(year - 1);
    }
    __name(bcYearToNegativeYear, "bcYearToNegativeYear");
    __name2(bcYearToNegativeYear, "bcYearToNegativeYear");
    function is0To99(num) {
      return num >= 0 && num < 100;
    }
    __name(is0To99, "is0To99");
    __name2(is0To99, "is0To99");
  }
});
var require_mutable = __commonJS({
  "../node_modules/xtend/mutable.js"(exports, module) {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = extend;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    function extend(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    }
    __name(extend, "extend");
    __name2(extend, "extend");
  }
});
var require_postgres_interval = __commonJS({
  "../node_modules/postgres-interval/index.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var extend = require_mutable();
    module.exports = PostgresInterval;
    function PostgresInterval(raw) {
      if (!(this instanceof PostgresInterval)) {
        return new PostgresInterval(raw);
      }
      extend(this, parse2(raw));
    }
    __name(PostgresInterval, "PostgresInterval");
    __name2(PostgresInterval, "PostgresInterval");
    var properties = ["seconds", "minutes", "hours", "days", "months", "years"];
    PostgresInterval.prototype.toPostgres = function() {
      var filtered = properties.filter(this.hasOwnProperty, this);
      if (this.milliseconds && filtered.indexOf("seconds") < 0) {
        filtered.push("seconds");
      }
      if (filtered.length === 0) return "0";
      return filtered.map(function(property) {
        var value = this[property] || 0;
        if (property === "seconds" && this.milliseconds) {
          value = (value + this.milliseconds / 1e3).toFixed(6).replace(/\.?0+$/, "");
        }
        return value + " " + property;
      }, this).join(" ");
    };
    var propertiesISOEquivalent = {
      years: "Y",
      months: "M",
      days: "D",
      hours: "H",
      minutes: "M",
      seconds: "S"
    };
    var dateProperties = ["years", "months", "days"];
    var timeProperties = ["hours", "minutes", "seconds"];
    PostgresInterval.prototype.toISOString = PostgresInterval.prototype.toISO = function() {
      var datePart = dateProperties.map(buildProperty, this).join("");
      var timePart = timeProperties.map(buildProperty, this).join("");
      return "P" + datePart + "T" + timePart;
      function buildProperty(property) {
        var value = this[property] || 0;
        if (property === "seconds" && this.milliseconds) {
          value = (value + this.milliseconds / 1e3).toFixed(6).replace(/0+$/, "");
        }
        return value + propertiesISOEquivalent[property];
      }
      __name(buildProperty, "buildProperty");
      __name2(buildProperty, "buildProperty");
    };
    var NUMBER = "([+-]?\\d+)";
    var YEAR = NUMBER + "\\s+years?";
    var MONTH = NUMBER + "\\s+mons?";
    var DAY = NUMBER + "\\s+days?";
    var TIME = "([+-])?([\\d]*):(\\d\\d):(\\d\\d)\\.?(\\d{1,6})?";
    var INTERVAL = new RegExp([YEAR, MONTH, DAY, TIME].map(function(regexString) {
      return "(" + regexString + ")?";
    }).join("\\s*"));
    var positions = {
      years: 2,
      months: 4,
      days: 6,
      hours: 9,
      minutes: 10,
      seconds: 11,
      milliseconds: 12
    };
    var negatives = ["hours", "minutes", "seconds", "milliseconds"];
    function parseMilliseconds(fraction) {
      var microseconds = fraction + "000000".slice(fraction.length);
      return parseInt(microseconds, 10) / 1e3;
    }
    __name(parseMilliseconds, "parseMilliseconds");
    __name2(parseMilliseconds, "parseMilliseconds");
    function parse2(interval) {
      if (!interval) return {};
      var matches = INTERVAL.exec(interval);
      var isNegative = matches[8] === "-";
      return Object.keys(positions).reduce(function(parsed, property) {
        var position = positions[property];
        var value = matches[position];
        if (!value) return parsed;
        value = property === "milliseconds" ? parseMilliseconds(value) : parseInt(value, 10);
        if (!value) return parsed;
        if (isNegative && ~negatives.indexOf(property)) {
          value *= -1;
        }
        parsed[property] = value;
        return parsed;
      }, {});
    }
    __name(parse2, "parse2");
    __name2(parse2, "parse");
  }
});
var require_postgres_bytea = __commonJS({
  "../node_modules/postgres-bytea/index.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function parseBytea(input) {
      if (/^\\x/.test(input)) {
        return new Buffer(input.substr(2), "hex");
      }
      var output = "";
      var i = 0;
      while (i < input.length) {
        if (input[i] !== "\\") {
          output += input[i];
          ++i;
        } else {
          if (/[0-7]{3}/.test(input.substr(i + 1, 3))) {
            output += String.fromCharCode(parseInt(input.substr(i + 1, 3), 8));
            i += 4;
          } else {
            var backslashes = 1;
            while (i + backslashes < input.length && input[i + backslashes] === "\\") {
              backslashes++;
            }
            for (var k = 0; k < Math.floor(backslashes / 2); ++k) {
              output += "\\";
            }
            i += Math.floor(backslashes / 2) * 2;
          }
        }
      }
      return new Buffer(output, "binary");
    }, "parseBytea"), "parseBytea");
  }
});
var require_textParsers = __commonJS({
  "../node_modules/pg-types/lib/textParsers.js"(exports, module) {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var array = require_postgres_array();
    var arrayParser = require_arrayParser();
    var parseDate = require_postgres_date();
    var parseInterval = require_postgres_interval();
    var parseByteA = require_postgres_bytea();
    function allowNull(fn) {
      return /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function nullAllowed(value) {
        if (value === null) return value;
        return fn(value);
      }, "nullAllowed"), "nullAllowed");
    }
    __name(allowNull, "allowNull");
    __name2(allowNull, "allowNull");
    function parseBool(value) {
      if (value === null) return value;
      return value === "TRUE" || value === "t" || value === "true" || value === "y" || value === "yes" || value === "on" || value === "1";
    }
    __name(parseBool, "parseBool");
    __name2(parseBool, "parseBool");
    function parseBoolArray(value) {
      if (!value) return null;
      return array.parse(value, parseBool);
    }
    __name(parseBoolArray, "parseBoolArray");
    __name2(parseBoolArray, "parseBoolArray");
    function parseBaseTenInt(string) {
      return parseInt(string, 10);
    }
    __name(parseBaseTenInt, "parseBaseTenInt");
    __name2(parseBaseTenInt, "parseBaseTenInt");
    function parseIntegerArray(value) {
      if (!value) return null;
      return array.parse(value, allowNull(parseBaseTenInt));
    }
    __name(parseIntegerArray, "parseIntegerArray");
    __name2(parseIntegerArray, "parseIntegerArray");
    function parseBigIntegerArray(value) {
      if (!value) return null;
      return array.parse(value, allowNull(function(entry) {
        return parseBigInteger(entry).trim();
      }));
    }
    __name(parseBigIntegerArray, "parseBigIntegerArray");
    __name2(parseBigIntegerArray, "parseBigIntegerArray");
    var parsePointArray = /* @__PURE__ */ __name2(function(value) {
      if (!value) {
        return null;
      }
      var p = arrayParser.create(value, function(entry) {
        if (entry !== null) {
          entry = parsePoint(entry);
        }
        return entry;
      });
      return p.parse();
    }, "parsePointArray");
    var parseFloatArray = /* @__PURE__ */ __name2(function(value) {
      if (!value) {
        return null;
      }
      var p = arrayParser.create(value, function(entry) {
        if (entry !== null) {
          entry = parseFloat(entry);
        }
        return entry;
      });
      return p.parse();
    }, "parseFloatArray");
    var parseStringArray = /* @__PURE__ */ __name2(function(value) {
      if (!value) {
        return null;
      }
      var p = arrayParser.create(value);
      return p.parse();
    }, "parseStringArray");
    var parseDateArray = /* @__PURE__ */ __name2(function(value) {
      if (!value) {
        return null;
      }
      var p = arrayParser.create(value, function(entry) {
        if (entry !== null) {
          entry = parseDate(entry);
        }
        return entry;
      });
      return p.parse();
    }, "parseDateArray");
    var parseIntervalArray = /* @__PURE__ */ __name2(function(value) {
      if (!value) {
        return null;
      }
      var p = arrayParser.create(value, function(entry) {
        if (entry !== null) {
          entry = parseInterval(entry);
        }
        return entry;
      });
      return p.parse();
    }, "parseIntervalArray");
    var parseByteAArray = /* @__PURE__ */ __name2(function(value) {
      if (!value) {
        return null;
      }
      return array.parse(value, allowNull(parseByteA));
    }, "parseByteAArray");
    var parseInteger = /* @__PURE__ */ __name2(function(value) {
      return parseInt(value, 10);
    }, "parseInteger");
    var parseBigInteger = /* @__PURE__ */ __name2(function(value) {
      var valStr = String(value);
      if (/^\d+$/.test(valStr)) {
        return valStr;
      }
      return value;
    }, "parseBigInteger");
    var parseJsonArray = /* @__PURE__ */ __name2(function(value) {
      if (!value) {
        return null;
      }
      return array.parse(value, allowNull(JSON.parse));
    }, "parseJsonArray");
    var parsePoint = /* @__PURE__ */ __name2(function(value) {
      if (value[0] !== "(") {
        return null;
      }
      value = value.substring(1, value.length - 1).split(",");
      return {
        x: parseFloat(value[0]),
        y: parseFloat(value[1])
      };
    }, "parsePoint");
    var parseCircle = /* @__PURE__ */ __name2(function(value) {
      if (value[0] !== "<" && value[1] !== "(") {
        return null;
      }
      var point = "(";
      var radius = "";
      var pointParsed = false;
      for (var i = 2; i < value.length - 1; i++) {
        if (!pointParsed) {
          point += value[i];
        }
        if (value[i] === ")") {
          pointParsed = true;
          continue;
        } else if (!pointParsed) {
          continue;
        }
        if (value[i] === ",") {
          continue;
        }
        radius += value[i];
      }
      var result = parsePoint(point);
      result.radius = parseFloat(radius);
      return result;
    }, "parseCircle");
    var init2 = /* @__PURE__ */ __name2(function(register) {
      register(20, parseBigInteger);
      register(21, parseInteger);
      register(23, parseInteger);
      register(26, parseInteger);
      register(700, parseFloat);
      register(701, parseFloat);
      register(16, parseBool);
      register(1082, parseDate);
      register(1114, parseDate);
      register(1184, parseDate);
      register(600, parsePoint);
      register(651, parseStringArray);
      register(718, parseCircle);
      register(1e3, parseBoolArray);
      register(1001, parseByteAArray);
      register(1005, parseIntegerArray);
      register(1007, parseIntegerArray);
      register(1028, parseIntegerArray);
      register(1016, parseBigIntegerArray);
      register(1017, parsePointArray);
      register(1021, parseFloatArray);
      register(1022, parseFloatArray);
      register(1231, parseFloatArray);
      register(1014, parseStringArray);
      register(1015, parseStringArray);
      register(1008, parseStringArray);
      register(1009, parseStringArray);
      register(1040, parseStringArray);
      register(1041, parseStringArray);
      register(1115, parseDateArray);
      register(1182, parseDateArray);
      register(1185, parseDateArray);
      register(1186, parseInterval);
      register(1187, parseIntervalArray);
      register(17, parseByteA);
      register(114, JSON.parse.bind(JSON));
      register(3802, JSON.parse.bind(JSON));
      register(199, parseJsonArray);
      register(3807, parseJsonArray);
      register(3907, parseStringArray);
      register(2951, parseStringArray);
      register(791, parseStringArray);
      register(1183, parseStringArray);
      register(1270, parseStringArray);
    }, "init");
    module.exports = {
      init: init2
    };
  }
});
var require_pg_int8 = __commonJS({
  "../node_modules/pg-int8/index.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var BASE = 1e6;
    function readInt8(buffer) {
      var high = buffer.readInt32BE(0);
      var low = buffer.readUInt32BE(4);
      var sign = "";
      if (high < 0) {
        high = ~high + (low === 0);
        low = ~low + 1 >>> 0;
        sign = "-";
      }
      var result = "";
      var carry;
      var t;
      var digits;
      var pad;
      var l;
      var i;
      {
        carry = high % BASE;
        high = high / BASE >>> 0;
        t = 4294967296 * carry + low;
        low = t / BASE >>> 0;
        digits = "" + (t - BASE * low);
        if (low === 0 && high === 0) {
          return sign + digits + result;
        }
        pad = "";
        l = 6 - digits.length;
        for (i = 0; i < l; i++) {
          pad += "0";
        }
        result = pad + digits + result;
      }
      {
        carry = high % BASE;
        high = high / BASE >>> 0;
        t = 4294967296 * carry + low;
        low = t / BASE >>> 0;
        digits = "" + (t - BASE * low);
        if (low === 0 && high === 0) {
          return sign + digits + result;
        }
        pad = "";
        l = 6 - digits.length;
        for (i = 0; i < l; i++) {
          pad += "0";
        }
        result = pad + digits + result;
      }
      {
        carry = high % BASE;
        high = high / BASE >>> 0;
        t = 4294967296 * carry + low;
        low = t / BASE >>> 0;
        digits = "" + (t - BASE * low);
        if (low === 0 && high === 0) {
          return sign + digits + result;
        }
        pad = "";
        l = 6 - digits.length;
        for (i = 0; i < l; i++) {
          pad += "0";
        }
        result = pad + digits + result;
      }
      {
        carry = high % BASE;
        t = 4294967296 * carry + low;
        digits = "" + t % BASE;
        return sign + digits + result;
      }
    }
    __name(readInt8, "readInt8");
    __name2(readInt8, "readInt8");
    module.exports = readInt8;
  }
});
var require_binaryParsers = __commonJS({
  "../node_modules/pg-types/lib/binaryParsers.js"(exports, module) {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var parseInt64 = require_pg_int8();
    var parseBits = /* @__PURE__ */ __name2(function(data, bits, offset, invert, callback) {
      offset = offset || 0;
      invert = invert || false;
      callback = callback || function(lastValue, newValue, bits2) {
        return lastValue * Math.pow(2, bits2) + newValue;
      };
      var offsetBytes = offset >> 3;
      var inv = /* @__PURE__ */ __name2(function(value) {
        if (invert) {
          return ~value & 255;
        }
        return value;
      }, "inv");
      var mask = 255;
      var firstBits = 8 - offset % 8;
      if (bits < firstBits) {
        mask = 255 << 8 - bits & 255;
        firstBits = bits;
      }
      if (offset) {
        mask = mask >> offset % 8;
      }
      var result = 0;
      if (offset % 8 + bits >= 8) {
        result = callback(0, inv(data[offsetBytes]) & mask, firstBits);
      }
      var bytes = bits + offset >> 3;
      for (var i = offsetBytes + 1; i < bytes; i++) {
        result = callback(result, inv(data[i]), 8);
      }
      var lastBits = (bits + offset) % 8;
      if (lastBits > 0) {
        result = callback(result, inv(data[bytes]) >> 8 - lastBits, lastBits);
      }
      return result;
    }, "parseBits");
    var parseFloatFromBits = /* @__PURE__ */ __name2(function(data, precisionBits, exponentBits) {
      var bias = Math.pow(2, exponentBits - 1) - 1;
      var sign = parseBits(data, 1);
      var exponent = parseBits(data, exponentBits, 1);
      if (exponent === 0) {
        return 0;
      }
      var precisionBitsCounter = 1;
      var parsePrecisionBits = /* @__PURE__ */ __name2(function(lastValue, newValue, bits) {
        if (lastValue === 0) {
          lastValue = 1;
        }
        for (var i = 1; i <= bits; i++) {
          precisionBitsCounter /= 2;
          if ((newValue & 1 << bits - i) > 0) {
            lastValue += precisionBitsCounter;
          }
        }
        return lastValue;
      }, "parsePrecisionBits");
      var mantissa = parseBits(data, precisionBits, exponentBits + 1, false, parsePrecisionBits);
      if (exponent == Math.pow(2, exponentBits + 1) - 1) {
        if (mantissa === 0) {
          return sign === 0 ? Infinity : -Infinity;
        }
        return NaN;
      }
      return (sign === 0 ? 1 : -1) * Math.pow(2, exponent - bias) * mantissa;
    }, "parseFloatFromBits");
    var parseInt16 = /* @__PURE__ */ __name2(function(value) {
      if (parseBits(value, 1) == 1) {
        return -1 * (parseBits(value, 15, 1, true) + 1);
      }
      return parseBits(value, 15, 1);
    }, "parseInt16");
    var parseInt32 = /* @__PURE__ */ __name2(function(value) {
      if (parseBits(value, 1) == 1) {
        return -1 * (parseBits(value, 31, 1, true) + 1);
      }
      return parseBits(value, 31, 1);
    }, "parseInt32");
    var parseFloat32 = /* @__PURE__ */ __name2(function(value) {
      return parseFloatFromBits(value, 23, 8);
    }, "parseFloat32");
    var parseFloat64 = /* @__PURE__ */ __name2(function(value) {
      return parseFloatFromBits(value, 52, 11);
    }, "parseFloat64");
    var parseNumeric = /* @__PURE__ */ __name2(function(value) {
      var sign = parseBits(value, 16, 32);
      if (sign == 49152) {
        return NaN;
      }
      var weight = Math.pow(1e4, parseBits(value, 16, 16));
      var result = 0;
      var digits = [];
      var ndigits = parseBits(value, 16);
      for (var i = 0; i < ndigits; i++) {
        result += parseBits(value, 16, 64 + 16 * i) * weight;
        weight /= 1e4;
      }
      var scale = Math.pow(10, parseBits(value, 16, 48));
      return (sign === 0 ? 1 : -1) * Math.round(result * scale) / scale;
    }, "parseNumeric");
    var parseDate = /* @__PURE__ */ __name2(function(isUTC, value) {
      var sign = parseBits(value, 1);
      var rawValue = parseBits(value, 63, 1);
      var result = new Date((sign === 0 ? 1 : -1) * rawValue / 1e3 + 9466848e5);
      if (!isUTC) {
        result.setTime(result.getTime() + result.getTimezoneOffset() * 6e4);
      }
      result.usec = rawValue % 1e3;
      result.getMicroSeconds = function() {
        return this.usec;
      };
      result.setMicroSeconds = function(value2) {
        this.usec = value2;
      };
      result.getUTCMicroSeconds = function() {
        return this.usec;
      };
      return result;
    }, "parseDate");
    var parseArray = /* @__PURE__ */ __name2(function(value) {
      var dim = parseBits(value, 32);
      var flags2 = parseBits(value, 32, 32);
      var elementType = parseBits(value, 32, 64);
      var offset = 96;
      var dims = [];
      for (var i = 0; i < dim; i++) {
        dims[i] = parseBits(value, 32, offset);
        offset += 32;
        offset += 32;
      }
      var parseElement = /* @__PURE__ */ __name2(function(elementType2) {
        var length = parseBits(value, 32, offset);
        offset += 32;
        if (length == 4294967295) {
          return null;
        }
        var result;
        if (elementType2 == 23 || elementType2 == 20) {
          result = parseBits(value, length * 8, offset);
          offset += length * 8;
          return result;
        } else if (elementType2 == 25) {
          result = value.toString(this.encoding, offset >> 3, (offset += length << 3) >> 3);
          return result;
        } else {
          console.log("ERROR: ElementType not implemented: " + elementType2);
        }
      }, "parseElement");
      var parse2 = /* @__PURE__ */ __name2(function(dimension, elementType2) {
        var array = [];
        var i2;
        if (dimension.length > 1) {
          var count32 = dimension.shift();
          for (i2 = 0; i2 < count32; i2++) {
            array[i2] = parse2(dimension, elementType2);
          }
          dimension.unshift(count32);
        } else {
          for (i2 = 0; i2 < dimension[0]; i2++) {
            array[i2] = parseElement(elementType2);
          }
        }
        return array;
      }, "parse");
      return parse2(dims, elementType);
    }, "parseArray");
    var parseText = /* @__PURE__ */ __name2(function(value) {
      return value.toString("utf8");
    }, "parseText");
    var parseBool = /* @__PURE__ */ __name2(function(value) {
      if (value === null) return null;
      return parseBits(value, 8) > 0;
    }, "parseBool");
    var init2 = /* @__PURE__ */ __name2(function(register) {
      register(20, parseInt64);
      register(21, parseInt16);
      register(23, parseInt32);
      register(26, parseInt32);
      register(1700, parseNumeric);
      register(700, parseFloat32);
      register(701, parseFloat64);
      register(16, parseBool);
      register(1114, parseDate.bind(null, false));
      register(1184, parseDate.bind(null, true));
      register(1e3, parseArray);
      register(1007, parseArray);
      register(1016, parseArray);
      register(1008, parseArray);
      register(1009, parseArray);
      register(25, parseText);
    }, "init");
    module.exports = {
      init: init2
    };
  }
});
var require_builtins = __commonJS({
  "../node_modules/pg-types/lib/builtins.js"(exports, module) {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = {
      BOOL: 16,
      BYTEA: 17,
      CHAR: 18,
      INT8: 20,
      INT2: 21,
      INT4: 23,
      REGPROC: 24,
      TEXT: 25,
      OID: 26,
      TID: 27,
      XID: 28,
      CID: 29,
      JSON: 114,
      XML: 142,
      PG_NODE_TREE: 194,
      SMGR: 210,
      PATH: 602,
      POLYGON: 604,
      CIDR: 650,
      FLOAT4: 700,
      FLOAT8: 701,
      ABSTIME: 702,
      RELTIME: 703,
      TINTERVAL: 704,
      CIRCLE: 718,
      MACADDR8: 774,
      MONEY: 790,
      MACADDR: 829,
      INET: 869,
      ACLITEM: 1033,
      BPCHAR: 1042,
      VARCHAR: 1043,
      DATE: 1082,
      TIME: 1083,
      TIMESTAMP: 1114,
      TIMESTAMPTZ: 1184,
      INTERVAL: 1186,
      TIMETZ: 1266,
      BIT: 1560,
      VARBIT: 1562,
      NUMERIC: 1700,
      REFCURSOR: 1790,
      REGPROCEDURE: 2202,
      REGOPER: 2203,
      REGOPERATOR: 2204,
      REGCLASS: 2205,
      REGTYPE: 2206,
      UUID: 2950,
      TXID_SNAPSHOT: 2970,
      PG_LSN: 3220,
      PG_NDISTINCT: 3361,
      PG_DEPENDENCIES: 3402,
      TSVECTOR: 3614,
      TSQUERY: 3615,
      GTSVECTOR: 3642,
      REGCONFIG: 3734,
      REGDICTIONARY: 3769,
      JSONB: 3802,
      REGNAMESPACE: 4089,
      REGROLE: 4096
    };
  }
});
var require_pg_types = __commonJS({
  "../node_modules/pg-types/index.js"(exports) {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var textParsers = require_textParsers();
    var binaryParsers = require_binaryParsers();
    var arrayParser = require_arrayParser();
    var builtinTypes = require_builtins();
    exports.getTypeParser = getTypeParser;
    exports.setTypeParser = setTypeParser;
    exports.arrayParser = arrayParser;
    exports.builtins = builtinTypes;
    var typeParsers = {
      text: {},
      binary: {}
    };
    function noParse(val) {
      return String(val);
    }
    __name(noParse, "noParse");
    __name2(noParse, "noParse");
    function getTypeParser(oid, format) {
      format = format || "text";
      if (!typeParsers[format]) {
        return noParse;
      }
      return typeParsers[format][oid] || noParse;
    }
    __name(getTypeParser, "getTypeParser");
    __name2(getTypeParser, "getTypeParser");
    function setTypeParser(oid, format, parseFn) {
      if (typeof format == "function") {
        parseFn = format;
        format = "text";
      }
      typeParsers[format][oid] = parseFn;
    }
    __name(setTypeParser, "setTypeParser");
    __name2(setTypeParser, "setTypeParser");
    textParsers.init(function(oid, converter) {
      typeParsers.text[oid] = converter;
    });
    binaryParsers.init(function(oid, converter) {
      typeParsers.binary[oid] = converter;
    });
  }
});
var require_defaults = __commonJS({
  "../node_modules/pg/lib/defaults.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = {
      // database host. defaults to localhost
      host: "localhost",
      // database user's name
      user: process.platform === "win32" ? process.env.USERNAME : process.env.USER,
      // name of database to connect
      database: void 0,
      // database user's password
      password: null,
      // a Postgres connection string to be used instead of setting individual connection items
      // NOTE:  Setting this value will cause it to override any other value (such as database or user) defined
      // in the defaults object.
      connectionString: void 0,
      // database port
      port: 5432,
      // number of rows to return at a time from a prepared statement's
      // portal. 0 will return all rows at once
      rows: 0,
      // binary result mode
      binary: false,
      // Connection pool options - see https://github.com/brianc/node-pg-pool
      // number of connections to use in connection pool
      // 0 will disable connection pooling
      max: 10,
      // max milliseconds a client can go unused before it is removed
      // from the pool and destroyed
      idleTimeoutMillis: 3e4,
      client_encoding: "",
      ssl: false,
      application_name: void 0,
      fallback_application_name: void 0,
      options: void 0,
      parseInputDatesAsUTC: false,
      // max milliseconds any query using this connection will execute for before timing out in error.
      // false=unlimited
      statement_timeout: false,
      // Abort any statement that waits longer than the specified duration in milliseconds while attempting to acquire a lock.
      // false=unlimited
      lock_timeout: false,
      // Terminate any session with an open transaction that has been idle for longer than the specified duration in milliseconds
      // false=unlimited
      idle_in_transaction_session_timeout: false,
      // max milliseconds to wait for query to complete (client side)
      query_timeout: false,
      connect_timeout: 0,
      keepalives: 1,
      keepalives_idle: 0
    };
    var pgTypes = require_pg_types();
    var parseBigInteger = pgTypes.getTypeParser(20, "text");
    var parseBigIntegerArray = pgTypes.getTypeParser(1016, "text");
    module.exports.__defineSetter__("parseInt8", function(val) {
      pgTypes.setTypeParser(20, "text", val ? pgTypes.getTypeParser(23, "text") : parseBigInteger);
      pgTypes.setTypeParser(1016, "text", val ? pgTypes.getTypeParser(1007, "text") : parseBigIntegerArray);
    });
  }
});
var require_util = __commonJS({
  "node-built-in-modules:util"(exports, module) {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault2;
  }
});
var require_utils = __commonJS({
  "../node_modules/pg/lib/utils.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var defaults3 = require_defaults();
    var util = require_util();
    var { isDate } = util.types || util;
    function escapeElement(elementRepresentation) {
      const escaped = elementRepresentation.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
      return '"' + escaped + '"';
    }
    __name(escapeElement, "escapeElement");
    __name2(escapeElement, "escapeElement");
    function arrayString(val) {
      let result = "{";
      for (let i = 0; i < val.length; i++) {
        if (i > 0) {
          result = result + ",";
        }
        if (val[i] === null || typeof val[i] === "undefined") {
          result = result + "NULL";
        } else if (Array.isArray(val[i])) {
          result = result + arrayString(val[i]);
        } else if (ArrayBuffer.isView(val[i])) {
          let item = val[i];
          if (!(item instanceof Buffer)) {
            const buf = Buffer.from(item.buffer, item.byteOffset, item.byteLength);
            if (buf.length === item.byteLength) {
              item = buf;
            } else {
              item = buf.slice(item.byteOffset, item.byteOffset + item.byteLength);
            }
          }
          result += "\\\\x" + item.toString("hex");
        } else {
          result += escapeElement(prepareValue(val[i]));
        }
      }
      result = result + "}";
      return result;
    }
    __name(arrayString, "arrayString");
    __name2(arrayString, "arrayString");
    var prepareValue = /* @__PURE__ */ __name2(function(val, seen) {
      if (val == null) {
        return null;
      }
      if (typeof val === "object") {
        if (val instanceof Buffer) {
          return val;
        }
        if (ArrayBuffer.isView(val)) {
          const buf = Buffer.from(val.buffer, val.byteOffset, val.byteLength);
          if (buf.length === val.byteLength) {
            return buf;
          }
          return buf.slice(val.byteOffset, val.byteOffset + val.byteLength);
        }
        if (isDate(val)) {
          if (defaults3.parseInputDatesAsUTC) {
            return dateToStringUTC(val);
          } else {
            return dateToString(val);
          }
        }
        if (Array.isArray(val)) {
          return arrayString(val);
        }
        return prepareObject(val, seen);
      }
      return val.toString();
    }, "prepareValue");
    function prepareObject(val, seen) {
      if (val && typeof val.toPostgres === "function") {
        seen = seen || [];
        if (seen.indexOf(val) !== -1) {
          throw new Error('circular reference detected while preparing "' + val + '" for query');
        }
        seen.push(val);
        return prepareValue(val.toPostgres(prepareValue), seen);
      }
      return JSON.stringify(val);
    }
    __name(prepareObject, "prepareObject");
    __name2(prepareObject, "prepareObject");
    function dateToString(date) {
      let offset = -date.getTimezoneOffset();
      let year = date.getFullYear();
      const isBCYear = year < 1;
      if (isBCYear) year = Math.abs(year) + 1;
      let ret = String(year).padStart(4, "0") + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0") + "T" + String(date.getHours()).padStart(2, "0") + ":" + String(date.getMinutes()).padStart(2, "0") + ":" + String(date.getSeconds()).padStart(2, "0") + "." + String(date.getMilliseconds()).padStart(3, "0");
      if (offset < 0) {
        ret += "-";
        offset *= -1;
      } else {
        ret += "+";
      }
      ret += String(Math.floor(offset / 60)).padStart(2, "0") + ":" + String(offset % 60).padStart(2, "0");
      if (isBCYear) ret += " BC";
      return ret;
    }
    __name(dateToString, "dateToString");
    __name2(dateToString, "dateToString");
    function dateToStringUTC(date) {
      let year = date.getUTCFullYear();
      const isBCYear = year < 1;
      if (isBCYear) year = Math.abs(year) + 1;
      let ret = String(year).padStart(4, "0") + "-" + String(date.getUTCMonth() + 1).padStart(2, "0") + "-" + String(date.getUTCDate()).padStart(2, "0") + "T" + String(date.getUTCHours()).padStart(2, "0") + ":" + String(date.getUTCMinutes()).padStart(2, "0") + ":" + String(date.getUTCSeconds()).padStart(2, "0") + "." + String(date.getUTCMilliseconds()).padStart(3, "0");
      ret += "+00:00";
      if (isBCYear) ret += " BC";
      return ret;
    }
    __name(dateToStringUTC, "dateToStringUTC");
    __name2(dateToStringUTC, "dateToStringUTC");
    function normalizeQueryConfig(config22, values, callback) {
      config22 = typeof config22 === "string" ? { text: config22 } : config22;
      if (values) {
        if (typeof values === "function") {
          config22.callback = values;
        } else {
          config22.values = values;
        }
      }
      if (callback) {
        config22.callback = callback;
      }
      return config22;
    }
    __name(normalizeQueryConfig, "normalizeQueryConfig");
    __name2(normalizeQueryConfig, "normalizeQueryConfig");
    var escapeIdentifier2 = /* @__PURE__ */ __name2(function(str2) {
      return '"' + str2.replace(/"/g, '""') + '"';
    }, "escapeIdentifier");
    var escapeLiteral2 = /* @__PURE__ */ __name2(function(str2) {
      let hasBackslash = false;
      let escaped = "'";
      if (str2 == null) {
        return "''";
      }
      if (typeof str2 !== "string") {
        return "''";
      }
      for (let i = 0; i < str2.length; i++) {
        const c = str2[i];
        if (c === "'") {
          escaped += c + c;
        } else if (c === "\\") {
          escaped += c + c;
          hasBackslash = true;
        } else {
          escaped += c;
        }
      }
      escaped += "'";
      if (hasBackslash === true) {
        escaped = " E" + escaped;
      }
      return escaped;
    }, "escapeLiteral");
    module.exports = {
      prepareValue: /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function prepareValueWrapper(value) {
        return prepareValue(value);
      }, "prepareValueWrapper"), "prepareValueWrapper"),
      normalizeQueryConfig,
      escapeIdentifier: escapeIdentifier2,
      escapeLiteral: escapeLiteral2
    };
  }
});
var require_crypto = __commonJS({
  "node-built-in-modules:crypto"(exports, module) {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault3;
  }
});
var require_utils_legacy = __commonJS({
  "../node_modules/pg/lib/crypto/utils-legacy.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var nodeCrypto = require_crypto();
    function md5(string) {
      return nodeCrypto.createHash("md5").update(string, "utf-8").digest("hex");
    }
    __name(md5, "md5");
    __name2(md5, "md5");
    function postgresMd5PasswordHash(user, password, salt) {
      const inner = md5(password + user);
      const outer = md5(Buffer.concat([Buffer.from(inner), salt]));
      return "md5" + outer;
    }
    __name(postgresMd5PasswordHash, "postgresMd5PasswordHash");
    __name2(postgresMd5PasswordHash, "postgresMd5PasswordHash");
    function sha256(text) {
      return nodeCrypto.createHash("sha256").update(text).digest();
    }
    __name(sha256, "sha256");
    __name2(sha256, "sha256");
    function hashByName(hashName, text) {
      hashName = hashName.replace(/(\D)-/, "$1");
      return nodeCrypto.createHash(hashName).update(text).digest();
    }
    __name(hashByName, "hashByName");
    __name2(hashByName, "hashByName");
    function hmacSha256(key, msg) {
      return nodeCrypto.createHmac("sha256", key).update(msg).digest();
    }
    __name(hmacSha256, "hmacSha256");
    __name2(hmacSha256, "hmacSha256");
    async function deriveKey(password, salt, iterations) {
      return nodeCrypto.pbkdf2Sync(password, salt, iterations, 32, "sha256");
    }
    __name(deriveKey, "deriveKey");
    __name2(deriveKey, "deriveKey");
    module.exports = {
      postgresMd5PasswordHash,
      randomBytes: nodeCrypto.randomBytes,
      deriveKey,
      sha256,
      hashByName,
      hmacSha256,
      md5
    };
  }
});
var require_utils_webcrypto = __commonJS({
  "../node_modules/pg/lib/crypto/utils-webcrypto.js"(exports, module) {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var nodeCrypto = require_crypto();
    module.exports = {
      postgresMd5PasswordHash,
      randomBytes,
      deriveKey,
      sha256,
      hashByName,
      hmacSha256,
      md5
    };
    var webCrypto = nodeCrypto.webcrypto || globalThis.crypto;
    var subtleCrypto = webCrypto.subtle;
    var textEncoder = new TextEncoder();
    function randomBytes(length) {
      return webCrypto.getRandomValues(Buffer.alloc(length));
    }
    __name(randomBytes, "randomBytes");
    __name2(randomBytes, "randomBytes");
    async function md5(string) {
      try {
        return nodeCrypto.createHash("md5").update(string, "utf-8").digest("hex");
      } catch (e) {
        const data = typeof string === "string" ? textEncoder.encode(string) : string;
        const hash = await subtleCrypto.digest("MD5", data);
        return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, "0")).join("");
      }
    }
    __name(md5, "md5");
    __name2(md5, "md5");
    async function postgresMd5PasswordHash(user, password, salt) {
      const inner = await md5(password + user);
      const outer = await md5(Buffer.concat([Buffer.from(inner), salt]));
      return "md5" + outer;
    }
    __name(postgresMd5PasswordHash, "postgresMd5PasswordHash");
    __name2(postgresMd5PasswordHash, "postgresMd5PasswordHash");
    async function sha256(text) {
      return await subtleCrypto.digest("SHA-256", text);
    }
    __name(sha256, "sha256");
    __name2(sha256, "sha256");
    async function hashByName(hashName, text) {
      return await subtleCrypto.digest(hashName, text);
    }
    __name(hashByName, "hashByName");
    __name2(hashByName, "hashByName");
    async function hmacSha256(keyBuffer, msg) {
      const key = await subtleCrypto.importKey("raw", keyBuffer, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
      return await subtleCrypto.sign("HMAC", key, textEncoder.encode(msg));
    }
    __name(hmacSha256, "hmacSha256");
    __name2(hmacSha256, "hmacSha256");
    async function deriveKey(password, salt, iterations) {
      const key = await subtleCrypto.importKey("raw", textEncoder.encode(password), "PBKDF2", false, ["deriveBits"]);
      const params = { name: "PBKDF2", hash: "SHA-256", salt, iterations };
      return await subtleCrypto.deriveBits(params, key, 32 * 8, ["deriveBits"]);
    }
    __name(deriveKey, "deriveKey");
    __name2(deriveKey, "deriveKey");
  }
});
var require_utils2 = __commonJS({
  "../node_modules/pg/lib/crypto/utils.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var useLegacyCrypto = parseInt(process.versions && process.versions.node && process.versions.node.split(".")[0]) < 15;
    if (useLegacyCrypto) {
      module.exports = require_utils_legacy();
    } else {
      module.exports = require_utils_webcrypto();
    }
  }
});
var require_cert_signatures = __commonJS({
  "../node_modules/pg/lib/crypto/cert-signatures.js"(exports, module) {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    function x509Error(msg, cert) {
      return new Error("SASL channel binding: " + msg + " when parsing public certificate " + cert.toString("base64"));
    }
    __name(x509Error, "x509Error");
    __name2(x509Error, "x509Error");
    function readASN1Length(data, index) {
      let length = data[index++];
      if (length < 128) return { length, index };
      const lengthBytes = length & 127;
      if (lengthBytes > 4) throw x509Error("bad length", data);
      length = 0;
      for (let i = 0; i < lengthBytes; i++) {
        length = length << 8 | data[index++];
      }
      return { length, index };
    }
    __name(readASN1Length, "readASN1Length");
    __name2(readASN1Length, "readASN1Length");
    function readASN1OID(data, index) {
      if (data[index++] !== 6) throw x509Error("non-OID data", data);
      const { length: OIDLength, index: indexAfterOIDLength } = readASN1Length(data, index);
      index = indexAfterOIDLength;
      const lastIndex = index + OIDLength;
      const byte1 = data[index++];
      let oid = (byte1 / 40 >> 0) + "." + byte1 % 40;
      while (index < lastIndex) {
        let value = 0;
        while (index < lastIndex) {
          const nextByte = data[index++];
          value = value << 7 | nextByte & 127;
          if (nextByte < 128) break;
        }
        oid += "." + value;
      }
      return { oid, index };
    }
    __name(readASN1OID, "readASN1OID");
    __name2(readASN1OID, "readASN1OID");
    function expectASN1Seq(data, index) {
      if (data[index++] !== 48) throw x509Error("non-sequence data", data);
      return readASN1Length(data, index);
    }
    __name(expectASN1Seq, "expectASN1Seq");
    __name2(expectASN1Seq, "expectASN1Seq");
    function signatureAlgorithmHashFromCertificate(data, index) {
      if (index === void 0) index = 0;
      index = expectASN1Seq(data, index).index;
      const { length: certInfoLength, index: indexAfterCertInfoLength } = expectASN1Seq(data, index);
      index = indexAfterCertInfoLength + certInfoLength;
      index = expectASN1Seq(data, index).index;
      const { oid, index: indexAfterOID } = readASN1OID(data, index);
      switch (oid) {
        // RSA
        case "1.2.840.113549.1.1.4":
          return "MD5";
        case "1.2.840.113549.1.1.5":
          return "SHA-1";
        case "1.2.840.113549.1.1.11":
          return "SHA-256";
        case "1.2.840.113549.1.1.12":
          return "SHA-384";
        case "1.2.840.113549.1.1.13":
          return "SHA-512";
        case "1.2.840.113549.1.1.14":
          return "SHA-224";
        case "1.2.840.113549.1.1.15":
          return "SHA512-224";
        case "1.2.840.113549.1.1.16":
          return "SHA512-256";
        // ECDSA
        case "1.2.840.10045.4.1":
          return "SHA-1";
        case "1.2.840.10045.4.3.1":
          return "SHA-224";
        case "1.2.840.10045.4.3.2":
          return "SHA-256";
        case "1.2.840.10045.4.3.3":
          return "SHA-384";
        case "1.2.840.10045.4.3.4":
          return "SHA-512";
        // RSASSA-PSS: hash is indicated separately
        case "1.2.840.113549.1.1.10": {
          index = indexAfterOID;
          index = expectASN1Seq(data, index).index;
          if (data[index++] !== 160) throw x509Error("non-tag data", data);
          index = readASN1Length(data, index).index;
          index = expectASN1Seq(data, index).index;
          const { oid: hashOID } = readASN1OID(data, index);
          switch (hashOID) {
            // standalone hash OIDs
            case "1.2.840.113549.2.5":
              return "MD5";
            case "1.3.14.3.2.26":
              return "SHA-1";
            case "2.16.840.1.101.3.4.2.1":
              return "SHA-256";
            case "2.16.840.1.101.3.4.2.2":
              return "SHA-384";
            case "2.16.840.1.101.3.4.2.3":
              return "SHA-512";
          }
          throw x509Error("unknown hash OID " + hashOID, data);
        }
        // Ed25519 -- see https: return//github.com/openssl/openssl/issues/15477
        case "1.3.101.110":
        case "1.3.101.112":
          return "SHA-512";
        // Ed448 -- still not in pg 17.2 (if supported, digest would be SHAKE256 x 64 bytes)
        case "1.3.101.111":
        case "1.3.101.113":
          throw x509Error("Ed448 certificate channel binding is not currently supported by Postgres");
      }
      throw x509Error("unknown OID " + oid, data);
    }
    __name(signatureAlgorithmHashFromCertificate, "signatureAlgorithmHashFromCertificate");
    __name2(signatureAlgorithmHashFromCertificate, "signatureAlgorithmHashFromCertificate");
    module.exports = { signatureAlgorithmHashFromCertificate };
  }
});
var require_sasl = __commonJS({
  "../node_modules/pg/lib/crypto/sasl.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var crypto = require_utils2();
    var { signatureAlgorithmHashFromCertificate } = require_cert_signatures();
    function startSession(mechanisms, stream) {
      const candidates = ["SCRAM-SHA-256"];
      if (stream) candidates.unshift("SCRAM-SHA-256-PLUS");
      const mechanism = candidates.find((candidate) => mechanisms.includes(candidate));
      if (!mechanism) {
        throw new Error("SASL: Only mechanism(s) " + candidates.join(" and ") + " are supported");
      }
      if (mechanism === "SCRAM-SHA-256-PLUS" && typeof stream.getPeerCertificate !== "function") {
        throw new Error("SASL: Mechanism SCRAM-SHA-256-PLUS requires a certificate");
      }
      const clientNonce = crypto.randomBytes(18).toString("base64");
      const gs2Header = mechanism === "SCRAM-SHA-256-PLUS" ? "p=tls-server-end-point" : stream ? "y" : "n";
      return {
        mechanism,
        clientNonce,
        response: gs2Header + ",,n=*,r=" + clientNonce,
        message: "SASLInitialResponse"
      };
    }
    __name(startSession, "startSession");
    __name2(startSession, "startSession");
    async function continueSession(session, password, serverData, stream) {
      if (session.message !== "SASLInitialResponse") {
        throw new Error("SASL: Last message was not SASLInitialResponse");
      }
      if (typeof password !== "string") {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string");
      }
      if (password === "") {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a non-empty string");
      }
      if (typeof serverData !== "string") {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: serverData must be a string");
      }
      const sv = parseServerFirstMessage(serverData);
      if (!sv.nonce.startsWith(session.clientNonce)) {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce does not start with client nonce");
      } else if (sv.nonce.length === session.clientNonce.length) {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce is too short");
      }
      const clientFirstMessageBare = "n=*,r=" + session.clientNonce;
      const serverFirstMessage = "r=" + sv.nonce + ",s=" + sv.salt + ",i=" + sv.iteration;
      let channelBinding = stream ? "eSws" : "biws";
      if (session.mechanism === "SCRAM-SHA-256-PLUS") {
        const peerCert = stream.getPeerCertificate().raw;
        let hashName = signatureAlgorithmHashFromCertificate(peerCert);
        if (hashName === "MD5" || hashName === "SHA-1") hashName = "SHA-256";
        const certHash = await crypto.hashByName(hashName, peerCert);
        const bindingData = Buffer.concat([Buffer.from("p=tls-server-end-point,,"), Buffer.from(certHash)]);
        channelBinding = bindingData.toString("base64");
      }
      const clientFinalMessageWithoutProof = "c=" + channelBinding + ",r=" + sv.nonce;
      const authMessage = clientFirstMessageBare + "," + serverFirstMessage + "," + clientFinalMessageWithoutProof;
      const saltBytes = Buffer.from(sv.salt, "base64");
      const saltedPassword = await crypto.deriveKey(password, saltBytes, sv.iteration);
      const clientKey = await crypto.hmacSha256(saltedPassword, "Client Key");
      const storedKey = await crypto.sha256(clientKey);
      const clientSignature = await crypto.hmacSha256(storedKey, authMessage);
      const clientProof = xorBuffers(Buffer.from(clientKey), Buffer.from(clientSignature)).toString("base64");
      const serverKey = await crypto.hmacSha256(saltedPassword, "Server Key");
      const serverSignatureBytes = await crypto.hmacSha256(serverKey, authMessage);
      session.message = "SASLResponse";
      session.serverSignature = Buffer.from(serverSignatureBytes).toString("base64");
      session.response = clientFinalMessageWithoutProof + ",p=" + clientProof;
    }
    __name(continueSession, "continueSession");
    __name2(continueSession, "continueSession");
    function finalizeSession(session, serverData) {
      if (session.message !== "SASLResponse") {
        throw new Error("SASL: Last message was not SASLResponse");
      }
      if (typeof serverData !== "string") {
        throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: serverData must be a string");
      }
      const { serverSignature } = parseServerFinalMessage(serverData);
      if (serverSignature !== session.serverSignature) {
        throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature does not match");
      }
    }
    __name(finalizeSession, "finalizeSession");
    __name2(finalizeSession, "finalizeSession");
    function isPrintableChars(text) {
      if (typeof text !== "string") {
        throw new TypeError("SASL: text must be a string");
      }
      return text.split("").map((_, i) => text.charCodeAt(i)).every((c) => c >= 33 && c <= 43 || c >= 45 && c <= 126);
    }
    __name(isPrintableChars, "isPrintableChars");
    __name2(isPrintableChars, "isPrintableChars");
    function isBase64(text) {
      return /^(?:[a-zA-Z0-9+/]{4})*(?:[a-zA-Z0-9+/]{2}==|[a-zA-Z0-9+/]{3}=)?$/.test(text);
    }
    __name(isBase64, "isBase64");
    __name2(isBase64, "isBase64");
    function parseAttributePairs(text) {
      if (typeof text !== "string") {
        throw new TypeError("SASL: attribute pairs text must be a string");
      }
      return new Map(
        text.split(",").map((attrValue) => {
          if (!/^.=/.test(attrValue)) {
            throw new Error("SASL: Invalid attribute pair entry");
          }
          const name = attrValue[0];
          const value = attrValue.substring(2);
          return [name, value];
        })
      );
    }
    __name(parseAttributePairs, "parseAttributePairs");
    __name2(parseAttributePairs, "parseAttributePairs");
    function parseServerFirstMessage(data) {
      const attrPairs = parseAttributePairs(data);
      const nonce = attrPairs.get("r");
      if (!nonce) {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce missing");
      } else if (!isPrintableChars(nonce)) {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce must only contain printable characters");
      }
      const salt = attrPairs.get("s");
      if (!salt) {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: salt missing");
      } else if (!isBase64(salt)) {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: salt must be base64");
      }
      const iterationText = attrPairs.get("i");
      if (!iterationText) {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: iteration missing");
      } else if (!/^[1-9][0-9]*$/.test(iterationText)) {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: invalid iteration count");
      }
      const iteration = parseInt(iterationText, 10);
      return {
        nonce,
        salt,
        iteration
      };
    }
    __name(parseServerFirstMessage, "parseServerFirstMessage");
    __name2(parseServerFirstMessage, "parseServerFirstMessage");
    function parseServerFinalMessage(serverData) {
      const attrPairs = parseAttributePairs(serverData);
      const serverSignature = attrPairs.get("v");
      if (!serverSignature) {
        throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature is missing");
      } else if (!isBase64(serverSignature)) {
        throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature must be base64");
      }
      return {
        serverSignature
      };
    }
    __name(parseServerFinalMessage, "parseServerFinalMessage");
    __name2(parseServerFinalMessage, "parseServerFinalMessage");
    function xorBuffers(a, b) {
      if (!Buffer.isBuffer(a)) {
        throw new TypeError("first argument must be a Buffer");
      }
      if (!Buffer.isBuffer(b)) {
        throw new TypeError("second argument must be a Buffer");
      }
      if (a.length !== b.length) {
        throw new Error("Buffer lengths must match");
      }
      if (a.length === 0) {
        throw new Error("Buffers cannot be empty");
      }
      return Buffer.from(a.map((_, i) => a[i] ^ b[i]));
    }
    __name(xorBuffers, "xorBuffers");
    __name2(xorBuffers, "xorBuffers");
    module.exports = {
      startSession,
      continueSession,
      finalizeSession
    };
  }
});
var require_type_overrides = __commonJS({
  "../node_modules/pg/lib/type-overrides.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var types2 = require_pg_types();
    function TypeOverrides2(userTypes) {
      this._types = userTypes || types2;
      this.text = {};
      this.binary = {};
    }
    __name(TypeOverrides2, "TypeOverrides2");
    __name2(TypeOverrides2, "TypeOverrides");
    TypeOverrides2.prototype.getOverrides = function(format) {
      switch (format) {
        case "text":
          return this.text;
        case "binary":
          return this.binary;
        default:
          return {};
      }
    };
    TypeOverrides2.prototype.setTypeParser = function(oid, format, parseFn) {
      if (typeof format === "function") {
        parseFn = format;
        format = "text";
      }
      this.getOverrides(format)[oid] = parseFn;
    };
    TypeOverrides2.prototype.getTypeParser = function(oid, format) {
      format = format || "text";
      return this.getOverrides(format)[oid] || this._types.getTypeParser(oid, format);
    };
    module.exports = TypeOverrides2;
  }
});
var require_dns = __commonJS({
  "node-built-in-modules:dns"(exports, module) {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault4;
  }
});
var access;
var copyFile;
var cp;
var open;
var opendir;
var rename;
var truncate;
var rm;
var rmdir;
var mkdir;
var readdir;
var readlink;
var symlink;
var lstat;
var stat;
var link;
var unlink;
var chmod;
var lchmod;
var lchown;
var chown;
var utimes;
var lutimes;
var realpath;
var mkdtemp;
var writeFile;
var appendFile;
var readFile;
var watch;
var statfs;
var glob;
var init_promises = __esm({
  "../../../.nvm/versions/node/v22.18.0/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/fs/promises.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    access = /* @__PURE__ */ notImplemented2("fs.access");
    copyFile = /* @__PURE__ */ notImplemented2("fs.copyFile");
    cp = /* @__PURE__ */ notImplemented2("fs.cp");
    open = /* @__PURE__ */ notImplemented2("fs.open");
    opendir = /* @__PURE__ */ notImplemented2("fs.opendir");
    rename = /* @__PURE__ */ notImplemented2("fs.rename");
    truncate = /* @__PURE__ */ notImplemented2("fs.truncate");
    rm = /* @__PURE__ */ notImplemented2("fs.rm");
    rmdir = /* @__PURE__ */ notImplemented2("fs.rmdir");
    mkdir = /* @__PURE__ */ notImplemented2("fs.mkdir");
    readdir = /* @__PURE__ */ notImplemented2("fs.readdir");
    readlink = /* @__PURE__ */ notImplemented2("fs.readlink");
    symlink = /* @__PURE__ */ notImplemented2("fs.symlink");
    lstat = /* @__PURE__ */ notImplemented2("fs.lstat");
    stat = /* @__PURE__ */ notImplemented2("fs.stat");
    link = /* @__PURE__ */ notImplemented2("fs.link");
    unlink = /* @__PURE__ */ notImplemented2("fs.unlink");
    chmod = /* @__PURE__ */ notImplemented2("fs.chmod");
    lchmod = /* @__PURE__ */ notImplemented2("fs.lchmod");
    lchown = /* @__PURE__ */ notImplemented2("fs.lchown");
    chown = /* @__PURE__ */ notImplemented2("fs.chown");
    utimes = /* @__PURE__ */ notImplemented2("fs.utimes");
    lutimes = /* @__PURE__ */ notImplemented2("fs.lutimes");
    realpath = /* @__PURE__ */ notImplemented2("fs.realpath");
    mkdtemp = /* @__PURE__ */ notImplemented2("fs.mkdtemp");
    writeFile = /* @__PURE__ */ notImplemented2("fs.writeFile");
    appendFile = /* @__PURE__ */ notImplemented2("fs.appendFile");
    readFile = /* @__PURE__ */ notImplemented2("fs.readFile");
    watch = /* @__PURE__ */ notImplemented2("fs.watch");
    statfs = /* @__PURE__ */ notImplemented2("fs.statfs");
    glob = /* @__PURE__ */ notImplemented2("fs.glob");
  }
});
var constants_exports = {};
__export(constants_exports, {
  COPYFILE_EXCL: /* @__PURE__ */ __name(() => COPYFILE_EXCL, "COPYFILE_EXCL"),
  COPYFILE_FICLONE: /* @__PURE__ */ __name(() => COPYFILE_FICLONE, "COPYFILE_FICLONE"),
  COPYFILE_FICLONE_FORCE: /* @__PURE__ */ __name(() => COPYFILE_FICLONE_FORCE, "COPYFILE_FICLONE_FORCE"),
  EXTENSIONLESS_FORMAT_JAVASCRIPT: /* @__PURE__ */ __name(() => EXTENSIONLESS_FORMAT_JAVASCRIPT, "EXTENSIONLESS_FORMAT_JAVASCRIPT"),
  EXTENSIONLESS_FORMAT_WASM: /* @__PURE__ */ __name(() => EXTENSIONLESS_FORMAT_WASM, "EXTENSIONLESS_FORMAT_WASM"),
  F_OK: /* @__PURE__ */ __name(() => F_OK, "F_OK"),
  O_APPEND: /* @__PURE__ */ __name(() => O_APPEND, "O_APPEND"),
  O_CREAT: /* @__PURE__ */ __name(() => O_CREAT, "O_CREAT"),
  O_DIRECT: /* @__PURE__ */ __name(() => O_DIRECT, "O_DIRECT"),
  O_DIRECTORY: /* @__PURE__ */ __name(() => O_DIRECTORY, "O_DIRECTORY"),
  O_DSYNC: /* @__PURE__ */ __name(() => O_DSYNC, "O_DSYNC"),
  O_EXCL: /* @__PURE__ */ __name(() => O_EXCL, "O_EXCL"),
  O_NOATIME: /* @__PURE__ */ __name(() => O_NOATIME, "O_NOATIME"),
  O_NOCTTY: /* @__PURE__ */ __name(() => O_NOCTTY, "O_NOCTTY"),
  O_NOFOLLOW: /* @__PURE__ */ __name(() => O_NOFOLLOW, "O_NOFOLLOW"),
  O_NONBLOCK: /* @__PURE__ */ __name(() => O_NONBLOCK, "O_NONBLOCK"),
  O_RDONLY: /* @__PURE__ */ __name(() => O_RDONLY, "O_RDONLY"),
  O_RDWR: /* @__PURE__ */ __name(() => O_RDWR, "O_RDWR"),
  O_SYNC: /* @__PURE__ */ __name(() => O_SYNC, "O_SYNC"),
  O_TRUNC: /* @__PURE__ */ __name(() => O_TRUNC, "O_TRUNC"),
  O_WRONLY: /* @__PURE__ */ __name(() => O_WRONLY, "O_WRONLY"),
  R_OK: /* @__PURE__ */ __name(() => R_OK, "R_OK"),
  S_IFBLK: /* @__PURE__ */ __name(() => S_IFBLK, "S_IFBLK"),
  S_IFCHR: /* @__PURE__ */ __name(() => S_IFCHR, "S_IFCHR"),
  S_IFDIR: /* @__PURE__ */ __name(() => S_IFDIR, "S_IFDIR"),
  S_IFIFO: /* @__PURE__ */ __name(() => S_IFIFO, "S_IFIFO"),
  S_IFLNK: /* @__PURE__ */ __name(() => S_IFLNK, "S_IFLNK"),
  S_IFMT: /* @__PURE__ */ __name(() => S_IFMT, "S_IFMT"),
  S_IFREG: /* @__PURE__ */ __name(() => S_IFREG, "S_IFREG"),
  S_IFSOCK: /* @__PURE__ */ __name(() => S_IFSOCK, "S_IFSOCK"),
  S_IRGRP: /* @__PURE__ */ __name(() => S_IRGRP, "S_IRGRP"),
  S_IROTH: /* @__PURE__ */ __name(() => S_IROTH, "S_IROTH"),
  S_IRUSR: /* @__PURE__ */ __name(() => S_IRUSR, "S_IRUSR"),
  S_IRWXG: /* @__PURE__ */ __name(() => S_IRWXG, "S_IRWXG"),
  S_IRWXO: /* @__PURE__ */ __name(() => S_IRWXO, "S_IRWXO"),
  S_IRWXU: /* @__PURE__ */ __name(() => S_IRWXU, "S_IRWXU"),
  S_IWGRP: /* @__PURE__ */ __name(() => S_IWGRP, "S_IWGRP"),
  S_IWOTH: /* @__PURE__ */ __name(() => S_IWOTH, "S_IWOTH"),
  S_IWUSR: /* @__PURE__ */ __name(() => S_IWUSR, "S_IWUSR"),
  S_IXGRP: /* @__PURE__ */ __name(() => S_IXGRP, "S_IXGRP"),
  S_IXOTH: /* @__PURE__ */ __name(() => S_IXOTH, "S_IXOTH"),
  S_IXUSR: /* @__PURE__ */ __name(() => S_IXUSR, "S_IXUSR"),
  UV_DIRENT_BLOCK: /* @__PURE__ */ __name(() => UV_DIRENT_BLOCK, "UV_DIRENT_BLOCK"),
  UV_DIRENT_CHAR: /* @__PURE__ */ __name(() => UV_DIRENT_CHAR, "UV_DIRENT_CHAR"),
  UV_DIRENT_DIR: /* @__PURE__ */ __name(() => UV_DIRENT_DIR, "UV_DIRENT_DIR"),
  UV_DIRENT_FIFO: /* @__PURE__ */ __name(() => UV_DIRENT_FIFO, "UV_DIRENT_FIFO"),
  UV_DIRENT_FILE: /* @__PURE__ */ __name(() => UV_DIRENT_FILE, "UV_DIRENT_FILE"),
  UV_DIRENT_LINK: /* @__PURE__ */ __name(() => UV_DIRENT_LINK, "UV_DIRENT_LINK"),
  UV_DIRENT_SOCKET: /* @__PURE__ */ __name(() => UV_DIRENT_SOCKET, "UV_DIRENT_SOCKET"),
  UV_DIRENT_UNKNOWN: /* @__PURE__ */ __name(() => UV_DIRENT_UNKNOWN, "UV_DIRENT_UNKNOWN"),
  UV_FS_COPYFILE_EXCL: /* @__PURE__ */ __name(() => UV_FS_COPYFILE_EXCL, "UV_FS_COPYFILE_EXCL"),
  UV_FS_COPYFILE_FICLONE: /* @__PURE__ */ __name(() => UV_FS_COPYFILE_FICLONE, "UV_FS_COPYFILE_FICLONE"),
  UV_FS_COPYFILE_FICLONE_FORCE: /* @__PURE__ */ __name(() => UV_FS_COPYFILE_FICLONE_FORCE, "UV_FS_COPYFILE_FICLONE_FORCE"),
  UV_FS_O_FILEMAP: /* @__PURE__ */ __name(() => UV_FS_O_FILEMAP, "UV_FS_O_FILEMAP"),
  UV_FS_SYMLINK_DIR: /* @__PURE__ */ __name(() => UV_FS_SYMLINK_DIR, "UV_FS_SYMLINK_DIR"),
  UV_FS_SYMLINK_JUNCTION: /* @__PURE__ */ __name(() => UV_FS_SYMLINK_JUNCTION, "UV_FS_SYMLINK_JUNCTION"),
  W_OK: /* @__PURE__ */ __name(() => W_OK, "W_OK"),
  X_OK: /* @__PURE__ */ __name(() => X_OK, "X_OK")
});
var UV_FS_SYMLINK_DIR;
var UV_FS_SYMLINK_JUNCTION;
var O_RDONLY;
var O_WRONLY;
var O_RDWR;
var UV_DIRENT_UNKNOWN;
var UV_DIRENT_FILE;
var UV_DIRENT_DIR;
var UV_DIRENT_LINK;
var UV_DIRENT_FIFO;
var UV_DIRENT_SOCKET;
var UV_DIRENT_CHAR;
var UV_DIRENT_BLOCK;
var EXTENSIONLESS_FORMAT_JAVASCRIPT;
var EXTENSIONLESS_FORMAT_WASM;
var S_IFMT;
var S_IFREG;
var S_IFDIR;
var S_IFCHR;
var S_IFBLK;
var S_IFIFO;
var S_IFLNK;
var S_IFSOCK;
var O_CREAT;
var O_EXCL;
var UV_FS_O_FILEMAP;
var O_NOCTTY;
var O_TRUNC;
var O_APPEND;
var O_DIRECTORY;
var O_NOATIME;
var O_NOFOLLOW;
var O_SYNC;
var O_DSYNC;
var O_DIRECT;
var O_NONBLOCK;
var S_IRWXU;
var S_IRUSR;
var S_IWUSR;
var S_IXUSR;
var S_IRWXG;
var S_IRGRP;
var S_IWGRP;
var S_IXGRP;
var S_IRWXO;
var S_IROTH;
var S_IWOTH;
var S_IXOTH;
var F_OK;
var R_OK;
var W_OK;
var X_OK;
var UV_FS_COPYFILE_EXCL;
var COPYFILE_EXCL;
var UV_FS_COPYFILE_FICLONE;
var COPYFILE_FICLONE;
var UV_FS_COPYFILE_FICLONE_FORCE;
var COPYFILE_FICLONE_FORCE;
var init_constants = __esm({
  "../../../.nvm/versions/node/v22.18.0/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/fs/constants.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    UV_FS_SYMLINK_DIR = 1;
    UV_FS_SYMLINK_JUNCTION = 2;
    O_RDONLY = 0;
    O_WRONLY = 1;
    O_RDWR = 2;
    UV_DIRENT_UNKNOWN = 0;
    UV_DIRENT_FILE = 1;
    UV_DIRENT_DIR = 2;
    UV_DIRENT_LINK = 3;
    UV_DIRENT_FIFO = 4;
    UV_DIRENT_SOCKET = 5;
    UV_DIRENT_CHAR = 6;
    UV_DIRENT_BLOCK = 7;
    EXTENSIONLESS_FORMAT_JAVASCRIPT = 0;
    EXTENSIONLESS_FORMAT_WASM = 1;
    S_IFMT = 61440;
    S_IFREG = 32768;
    S_IFDIR = 16384;
    S_IFCHR = 8192;
    S_IFBLK = 24576;
    S_IFIFO = 4096;
    S_IFLNK = 40960;
    S_IFSOCK = 49152;
    O_CREAT = 64;
    O_EXCL = 128;
    UV_FS_O_FILEMAP = 0;
    O_NOCTTY = 256;
    O_TRUNC = 512;
    O_APPEND = 1024;
    O_DIRECTORY = 65536;
    O_NOATIME = 262144;
    O_NOFOLLOW = 131072;
    O_SYNC = 1052672;
    O_DSYNC = 4096;
    O_DIRECT = 16384;
    O_NONBLOCK = 2048;
    S_IRWXU = 448;
    S_IRUSR = 256;
    S_IWUSR = 128;
    S_IXUSR = 64;
    S_IRWXG = 56;
    S_IRGRP = 32;
    S_IWGRP = 16;
    S_IXGRP = 8;
    S_IRWXO = 7;
    S_IROTH = 4;
    S_IWOTH = 2;
    S_IXOTH = 1;
    F_OK = 0;
    R_OK = 4;
    W_OK = 2;
    X_OK = 1;
    UV_FS_COPYFILE_EXCL = 1;
    COPYFILE_EXCL = 1;
    UV_FS_COPYFILE_FICLONE = 2;
    COPYFILE_FICLONE = 2;
    UV_FS_COPYFILE_FICLONE_FORCE = 4;
    COPYFILE_FICLONE_FORCE = 4;
  }
});
var promises_default;
var init_promises2 = __esm({
  "../../../.nvm/versions/node/v22.18.0/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/fs/promises.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_promises();
    init_constants();
    init_promises();
    promises_default = {
      constants: constants_exports,
      access,
      appendFile,
      chmod,
      chown,
      copyFile,
      cp,
      glob,
      lchmod,
      lchown,
      link,
      lstat,
      lutimes,
      mkdir,
      mkdtemp,
      open,
      opendir,
      readFile,
      readdir,
      readlink,
      realpath,
      rename,
      rm,
      rmdir,
      stat,
      statfs,
      symlink,
      truncate,
      unlink,
      utimes,
      watch,
      writeFile
    };
  }
});
var Dir;
var Dirent;
var Stats;
var ReadStream22;
var WriteStream22;
var FileReadStream;
var FileWriteStream;
var init_classes = __esm({
  "../../../.nvm/versions/node/v22.18.0/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/fs/classes.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    Dir = /* @__PURE__ */ notImplementedClass2("fs.Dir");
    Dirent = /* @__PURE__ */ notImplementedClass2("fs.Dirent");
    Stats = /* @__PURE__ */ notImplementedClass2("fs.Stats");
    ReadStream22 = /* @__PURE__ */ notImplementedClass2("fs.ReadStream");
    WriteStream22 = /* @__PURE__ */ notImplementedClass2("fs.WriteStream");
    FileReadStream = ReadStream22;
    FileWriteStream = WriteStream22;
  }
});
function callbackify(fn) {
  const fnc = /* @__PURE__ */ __name2(function(...args) {
    const cb = args.pop();
    fn().catch((error32) => cb(error32)).then((val) => cb(void 0, val));
  }, "fnc");
  fnc.__promisify__ = fn;
  fnc.native = fnc;
  return fnc;
}
__name(callbackify, "callbackify");
var access2;
var appendFile2;
var chown2;
var chmod2;
var copyFile2;
var cp2;
var lchown2;
var lchmod2;
var link2;
var lstat2;
var lutimes2;
var mkdir2;
var mkdtemp2;
var realpath2;
var open2;
var opendir2;
var readdir2;
var readFile2;
var readlink2;
var rename2;
var rm2;
var rmdir2;
var stat2;
var symlink2;
var truncate2;
var unlink2;
var utimes2;
var writeFile2;
var statfs2;
var close;
var createReadStream;
var createWriteStream;
var exists;
var fchown;
var fchmod;
var fdatasync;
var fstat;
var fsync;
var ftruncate;
var futimes;
var lstatSync;
var read;
var readv;
var realpathSync;
var statSync;
var unwatchFile;
var watch2;
var watchFile;
var write;
var writev;
var _toUnixTimestamp;
var openAsBlob;
var glob2;
var appendFileSync;
var accessSync;
var chownSync;
var chmodSync;
var closeSync;
var copyFileSync;
var cpSync;
var existsSync;
var fchownSync;
var fchmodSync;
var fdatasyncSync;
var fstatSync;
var fsyncSync;
var ftruncateSync;
var futimesSync;
var lchownSync;
var lchmodSync;
var linkSync;
var lutimesSync;
var mkdirSync;
var mkdtempSync;
var openSync;
var opendirSync;
var readdirSync;
var readSync;
var readvSync;
var readFileSync;
var readlinkSync;
var renameSync;
var rmSync;
var rmdirSync;
var symlinkSync;
var truncateSync;
var unlinkSync;
var utimesSync;
var writeFileSync;
var writeSync;
var writevSync;
var statfsSync;
var globSync;
var init_fs = __esm({
  "../../../.nvm/versions/node/v22.18.0/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/fs/fs.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    init_promises();
    __name2(callbackify, "callbackify");
    access2 = callbackify(access);
    appendFile2 = callbackify(appendFile);
    chown2 = callbackify(chown);
    chmod2 = callbackify(chmod);
    copyFile2 = callbackify(copyFile);
    cp2 = callbackify(cp);
    lchown2 = callbackify(lchown);
    lchmod2 = callbackify(lchmod);
    link2 = callbackify(link);
    lstat2 = callbackify(lstat);
    lutimes2 = callbackify(lutimes);
    mkdir2 = callbackify(mkdir);
    mkdtemp2 = callbackify(mkdtemp);
    realpath2 = callbackify(realpath);
    open2 = callbackify(open);
    opendir2 = callbackify(opendir);
    readdir2 = callbackify(readdir);
    readFile2 = callbackify(readFile);
    readlink2 = callbackify(readlink);
    rename2 = callbackify(rename);
    rm2 = callbackify(rm);
    rmdir2 = callbackify(rmdir);
    stat2 = callbackify(stat);
    symlink2 = callbackify(symlink);
    truncate2 = callbackify(truncate);
    unlink2 = callbackify(unlink);
    utimes2 = callbackify(utimes);
    writeFile2 = callbackify(writeFile);
    statfs2 = callbackify(statfs);
    close = /* @__PURE__ */ notImplementedAsync("fs.close");
    createReadStream = /* @__PURE__ */ notImplementedAsync("fs.createReadStream");
    createWriteStream = /* @__PURE__ */ notImplementedAsync("fs.createWriteStream");
    exists = /* @__PURE__ */ notImplementedAsync("fs.exists");
    fchown = /* @__PURE__ */ notImplementedAsync("fs.fchown");
    fchmod = /* @__PURE__ */ notImplementedAsync("fs.fchmod");
    fdatasync = /* @__PURE__ */ notImplementedAsync("fs.fdatasync");
    fstat = /* @__PURE__ */ notImplementedAsync("fs.fstat");
    fsync = /* @__PURE__ */ notImplementedAsync("fs.fsync");
    ftruncate = /* @__PURE__ */ notImplementedAsync("fs.ftruncate");
    futimes = /* @__PURE__ */ notImplementedAsync("fs.futimes");
    lstatSync = /* @__PURE__ */ notImplementedAsync("fs.lstatSync");
    read = /* @__PURE__ */ notImplementedAsync("fs.read");
    readv = /* @__PURE__ */ notImplementedAsync("fs.readv");
    realpathSync = /* @__PURE__ */ notImplementedAsync("fs.realpathSync");
    statSync = /* @__PURE__ */ notImplementedAsync("fs.statSync");
    unwatchFile = /* @__PURE__ */ notImplementedAsync("fs.unwatchFile");
    watch2 = /* @__PURE__ */ notImplementedAsync("fs.watch");
    watchFile = /* @__PURE__ */ notImplementedAsync("fs.watchFile");
    write = /* @__PURE__ */ notImplementedAsync("fs.write");
    writev = /* @__PURE__ */ notImplementedAsync("fs.writev");
    _toUnixTimestamp = /* @__PURE__ */ notImplementedAsync("fs._toUnixTimestamp");
    openAsBlob = /* @__PURE__ */ notImplementedAsync("fs.openAsBlob");
    glob2 = /* @__PURE__ */ notImplementedAsync("fs.glob");
    appendFileSync = /* @__PURE__ */ notImplemented2("fs.appendFileSync");
    accessSync = /* @__PURE__ */ notImplemented2("fs.accessSync");
    chownSync = /* @__PURE__ */ notImplemented2("fs.chownSync");
    chmodSync = /* @__PURE__ */ notImplemented2("fs.chmodSync");
    closeSync = /* @__PURE__ */ notImplemented2("fs.closeSync");
    copyFileSync = /* @__PURE__ */ notImplemented2("fs.copyFileSync");
    cpSync = /* @__PURE__ */ notImplemented2("fs.cpSync");
    existsSync = /* @__PURE__ */ __name2(() => false, "existsSync");
    fchownSync = /* @__PURE__ */ notImplemented2("fs.fchownSync");
    fchmodSync = /* @__PURE__ */ notImplemented2("fs.fchmodSync");
    fdatasyncSync = /* @__PURE__ */ notImplemented2("fs.fdatasyncSync");
    fstatSync = /* @__PURE__ */ notImplemented2("fs.fstatSync");
    fsyncSync = /* @__PURE__ */ notImplemented2("fs.fsyncSync");
    ftruncateSync = /* @__PURE__ */ notImplemented2("fs.ftruncateSync");
    futimesSync = /* @__PURE__ */ notImplemented2("fs.futimesSync");
    lchownSync = /* @__PURE__ */ notImplemented2("fs.lchownSync");
    lchmodSync = /* @__PURE__ */ notImplemented2("fs.lchmodSync");
    linkSync = /* @__PURE__ */ notImplemented2("fs.linkSync");
    lutimesSync = /* @__PURE__ */ notImplemented2("fs.lutimesSync");
    mkdirSync = /* @__PURE__ */ notImplemented2("fs.mkdirSync");
    mkdtempSync = /* @__PURE__ */ notImplemented2("fs.mkdtempSync");
    openSync = /* @__PURE__ */ notImplemented2("fs.openSync");
    opendirSync = /* @__PURE__ */ notImplemented2("fs.opendirSync");
    readdirSync = /* @__PURE__ */ notImplemented2("fs.readdirSync");
    readSync = /* @__PURE__ */ notImplemented2("fs.readSync");
    readvSync = /* @__PURE__ */ notImplemented2("fs.readvSync");
    readFileSync = /* @__PURE__ */ notImplemented2("fs.readFileSync");
    readlinkSync = /* @__PURE__ */ notImplemented2("fs.readlinkSync");
    renameSync = /* @__PURE__ */ notImplemented2("fs.renameSync");
    rmSync = /* @__PURE__ */ notImplemented2("fs.rmSync");
    rmdirSync = /* @__PURE__ */ notImplemented2("fs.rmdirSync");
    symlinkSync = /* @__PURE__ */ notImplemented2("fs.symlinkSync");
    truncateSync = /* @__PURE__ */ notImplemented2("fs.truncateSync");
    unlinkSync = /* @__PURE__ */ notImplemented2("fs.unlinkSync");
    utimesSync = /* @__PURE__ */ notImplemented2("fs.utimesSync");
    writeFileSync = /* @__PURE__ */ notImplemented2("fs.writeFileSync");
    writeSync = /* @__PURE__ */ notImplemented2("fs.writeSync");
    writevSync = /* @__PURE__ */ notImplemented2("fs.writevSync");
    statfsSync = /* @__PURE__ */ notImplemented2("fs.statfsSync");
    globSync = /* @__PURE__ */ notImplemented2("fs.globSync");
  }
});
var fs_default;
var init_fs2 = __esm({
  "../../../.nvm/versions/node/v22.18.0/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/fs.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_promises2();
    init_classes();
    init_fs();
    init_constants();
    init_constants();
    init_fs();
    init_classes();
    fs_default = {
      F_OK,
      R_OK,
      W_OK,
      X_OK,
      constants: constants_exports,
      promises: promises_default,
      Dir,
      Dirent,
      FileReadStream,
      FileWriteStream,
      ReadStream: ReadStream22,
      Stats,
      WriteStream: WriteStream22,
      _toUnixTimestamp,
      access: access2,
      accessSync,
      appendFile: appendFile2,
      appendFileSync,
      chmod: chmod2,
      chmodSync,
      chown: chown2,
      chownSync,
      close,
      closeSync,
      copyFile: copyFile2,
      copyFileSync,
      cp: cp2,
      cpSync,
      createReadStream,
      createWriteStream,
      exists,
      existsSync,
      fchmod,
      fchmodSync,
      fchown,
      fchownSync,
      fdatasync,
      fdatasyncSync,
      fstat,
      fstatSync,
      fsync,
      fsyncSync,
      ftruncate,
      ftruncateSync,
      futimes,
      futimesSync,
      glob: glob2,
      lchmod: lchmod2,
      globSync,
      lchmodSync,
      lchown: lchown2,
      lchownSync,
      link: link2,
      linkSync,
      lstat: lstat2,
      lstatSync,
      lutimes: lutimes2,
      lutimesSync,
      mkdir: mkdir2,
      mkdirSync,
      mkdtemp: mkdtemp2,
      mkdtempSync,
      open: open2,
      openAsBlob,
      openSync,
      opendir: opendir2,
      opendirSync,
      read,
      readFile: readFile2,
      readFileSync,
      readSync,
      readdir: readdir2,
      readdirSync,
      readlink: readlink2,
      readlinkSync,
      readv,
      readvSync,
      realpath: realpath2,
      realpathSync,
      rename: rename2,
      renameSync,
      rm: rm2,
      rmSync,
      rmdir: rmdir2,
      rmdirSync,
      stat: stat2,
      statSync,
      statfs: statfs2,
      statfsSync,
      symlink: symlink2,
      symlinkSync,
      truncate: truncate2,
      truncateSync,
      unlink: unlink2,
      unlinkSync,
      unwatchFile,
      utimes: utimes2,
      utimesSync,
      watch: watch2,
      watchFile,
      write,
      writeFile: writeFile2,
      writeFileSync,
      writeSync,
      writev,
      writevSync
    };
  }
});
var require_fs = __commonJS({
  "node-built-in-modules:fs"(exports, module) {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_fs2();
    module.exports = fs_default;
  }
});
var require_pg_connection_string = __commonJS({
  "../node_modules/pg-connection-string/index.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    function parse2(str2, options = {}) {
      if (str2.charAt(0) === "/") {
        const config3 = str2.split(" ");
        return { host: config3[0], database: config3[1] };
      }
      const config22 = {};
      let result;
      let dummyHost = false;
      if (/ |%[^a-f0-9]|%[a-f0-9][^a-f0-9]/i.test(str2)) {
        str2 = encodeURI(str2).replace(/%25(\d\d)/g, "%$1");
      }
      try {
        try {
          result = new URL(str2, "postgres://base");
        } catch (e) {
          result = new URL(str2.replace("@/", "@___DUMMY___/"), "postgres://base");
          dummyHost = true;
        }
      } catch (err) {
        err.input && (err.input = "*****REDACTED*****");
      }
      for (const entry of result.searchParams.entries()) {
        config22[entry[0]] = entry[1];
      }
      config22.user = config22.user || decodeURIComponent(result.username);
      config22.password = config22.password || decodeURIComponent(result.password);
      if (result.protocol == "socket:") {
        config22.host = decodeURI(result.pathname);
        config22.database = result.searchParams.get("db");
        config22.client_encoding = result.searchParams.get("encoding");
        return config22;
      }
      const hostname = dummyHost ? "" : result.hostname;
      if (!config22.host) {
        config22.host = decodeURIComponent(hostname);
      } else if (hostname && /^%2f/i.test(hostname)) {
        result.pathname = hostname + result.pathname;
      }
      if (!config22.port) {
        config22.port = result.port;
      }
      const pathname = result.pathname.slice(1) || null;
      config22.database = pathname ? decodeURI(pathname) : null;
      if (config22.ssl === "true" || config22.ssl === "1") {
        config22.ssl = true;
      }
      if (config22.ssl === "0") {
        config22.ssl = false;
      }
      if (config22.sslcert || config22.sslkey || config22.sslrootcert || config22.sslmode) {
        config22.ssl = {};
      }
      const fs = config22.sslcert || config22.sslkey || config22.sslrootcert ? require_fs() : null;
      if (config22.sslcert) {
        config22.ssl.cert = fs.readFileSync(config22.sslcert).toString();
      }
      if (config22.sslkey) {
        config22.ssl.key = fs.readFileSync(config22.sslkey).toString();
      }
      if (config22.sslrootcert) {
        config22.ssl.ca = fs.readFileSync(config22.sslrootcert).toString();
      }
      if (options.useLibpqCompat && config22.uselibpqcompat) {
        throw new Error("Both useLibpqCompat and uselibpqcompat are set. Please use only one of them.");
      }
      if (config22.uselibpqcompat === "true" || options.useLibpqCompat) {
        switch (config22.sslmode) {
          case "disable": {
            config22.ssl = false;
            break;
          }
          case "prefer": {
            config22.ssl.rejectUnauthorized = false;
            break;
          }
          case "require": {
            if (config22.sslrootcert) {
              config22.ssl.checkServerIdentity = function() {
              };
            } else {
              config22.ssl.rejectUnauthorized = false;
            }
            break;
          }
          case "verify-ca": {
            if (!config22.ssl.ca) {
              throw new Error(
                "SECURITY WARNING: Using sslmode=verify-ca requires specifying a CA with sslrootcert. If a public CA is used, verify-ca allows connections to a server that somebody else may have registered with the CA, making you vulnerable to Man-in-the-Middle attacks. Either specify a custom CA certificate with sslrootcert parameter or use sslmode=verify-full for proper security."
              );
            }
            config22.ssl.checkServerIdentity = function() {
            };
            break;
          }
          case "verify-full": {
            break;
          }
        }
      } else {
        switch (config22.sslmode) {
          case "disable": {
            config22.ssl = false;
            break;
          }
          case "prefer":
          case "require":
          case "verify-ca":
          case "verify-full": {
            break;
          }
          case "no-verify": {
            config22.ssl.rejectUnauthorized = false;
            break;
          }
        }
      }
      return config22;
    }
    __name(parse2, "parse2");
    __name2(parse2, "parse");
    function toConnectionOptions(sslConfig) {
      const connectionOptions = Object.entries(sslConfig).reduce((c, [key, value]) => {
        if (value !== void 0 && value !== null) {
          c[key] = value;
        }
        return c;
      }, {});
      return connectionOptions;
    }
    __name(toConnectionOptions, "toConnectionOptions");
    __name2(toConnectionOptions, "toConnectionOptions");
    function toClientConfig(config22) {
      const poolConfig = Object.entries(config22).reduce((c, [key, value]) => {
        if (key === "ssl") {
          const sslConfig = value;
          if (typeof sslConfig === "boolean") {
            c[key] = sslConfig;
          }
          if (typeof sslConfig === "object") {
            c[key] = toConnectionOptions(sslConfig);
          }
        } else if (value !== void 0 && value !== null) {
          if (key === "port") {
            if (value !== "") {
              const v = parseInt(value, 10);
              if (isNaN(v)) {
                throw new Error(`Invalid ${key}: ${value}`);
              }
              c[key] = v;
            }
          } else {
            c[key] = value;
          }
        }
        return c;
      }, {});
      return poolConfig;
    }
    __name(toClientConfig, "toClientConfig");
    __name2(toClientConfig, "toClientConfig");
    function parseIntoClientConfig(str2) {
      return toClientConfig(parse2(str2));
    }
    __name(parseIntoClientConfig, "parseIntoClientConfig");
    __name2(parseIntoClientConfig, "parseIntoClientConfig");
    module.exports = parse2;
    parse2.parse = parse2;
    parse2.toClientConfig = toClientConfig;
    parse2.parseIntoClientConfig = parseIntoClientConfig;
  }
});
var require_connection_parameters = __commonJS({
  "../node_modules/pg/lib/connection-parameters.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var dns = require_dns();
    var defaults3 = require_defaults();
    var parse2 = require_pg_connection_string().parse;
    var val = /* @__PURE__ */ __name2(function(key, config22, envVar) {
      if (envVar === void 0) {
        envVar = process.env["PG" + key.toUpperCase()];
      } else if (envVar === false) {
      } else {
        envVar = process.env[envVar];
      }
      return config22[key] || envVar || defaults3[key];
    }, "val");
    var readSSLConfigFromEnvironment = /* @__PURE__ */ __name2(function() {
      switch (process.env.PGSSLMODE) {
        case "disable":
          return false;
        case "prefer":
        case "require":
        case "verify-ca":
        case "verify-full":
          return true;
        case "no-verify":
          return { rejectUnauthorized: false };
      }
      return defaults3.ssl;
    }, "readSSLConfigFromEnvironment");
    var quoteParamValue = /* @__PURE__ */ __name2(function(value) {
      return "'" + ("" + value).replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "'";
    }, "quoteParamValue");
    var add = /* @__PURE__ */ __name2(function(params, config22, paramName) {
      const value = config22[paramName];
      if (value !== void 0 && value !== null) {
        params.push(paramName + "=" + quoteParamValue(value));
      }
    }, "add");
    var ConnectionParameters = class {
      static {
        __name(this, "ConnectionParameters");
      }
      static {
        __name2(this, "ConnectionParameters");
      }
      constructor(config22) {
        config22 = typeof config22 === "string" ? parse2(config22) : config22 || {};
        if (config22.connectionString) {
          config22 = Object.assign({}, config22, parse2(config22.connectionString));
        }
        this.user = val("user", config22);
        this.database = val("database", config22);
        if (this.database === void 0) {
          this.database = this.user;
        }
        this.port = parseInt(val("port", config22), 10);
        this.host = val("host", config22);
        Object.defineProperty(this, "password", {
          configurable: true,
          enumerable: false,
          writable: true,
          value: val("password", config22)
        });
        this.binary = val("binary", config22);
        this.options = val("options", config22);
        this.ssl = typeof config22.ssl === "undefined" ? readSSLConfigFromEnvironment() : config22.ssl;
        if (typeof this.ssl === "string") {
          if (this.ssl === "true") {
            this.ssl = true;
          }
        }
        if (this.ssl === "no-verify") {
          this.ssl = { rejectUnauthorized: false };
        }
        if (this.ssl && this.ssl.key) {
          Object.defineProperty(this.ssl, "key", {
            enumerable: false
          });
        }
        this.client_encoding = val("client_encoding", config22);
        this.replication = val("replication", config22);
        this.isDomainSocket = !(this.host || "").indexOf("/");
        this.application_name = val("application_name", config22, "PGAPPNAME");
        this.fallback_application_name = val("fallback_application_name", config22, false);
        this.statement_timeout = val("statement_timeout", config22, false);
        this.lock_timeout = val("lock_timeout", config22, false);
        this.idle_in_transaction_session_timeout = val("idle_in_transaction_session_timeout", config22, false);
        this.query_timeout = val("query_timeout", config22, false);
        if (config22.connectionTimeoutMillis === void 0) {
          this.connect_timeout = process.env.PGCONNECT_TIMEOUT || 0;
        } else {
          this.connect_timeout = Math.floor(config22.connectionTimeoutMillis / 1e3);
        }
        if (config22.keepAlive === false) {
          this.keepalives = 0;
        } else if (config22.keepAlive === true) {
          this.keepalives = 1;
        }
        if (typeof config22.keepAliveInitialDelayMillis === "number") {
          this.keepalives_idle = Math.floor(config22.keepAliveInitialDelayMillis / 1e3);
        }
      }
      getLibpqConnectionString(cb) {
        const params = [];
        add(params, this, "user");
        add(params, this, "password");
        add(params, this, "port");
        add(params, this, "application_name");
        add(params, this, "fallback_application_name");
        add(params, this, "connect_timeout");
        add(params, this, "options");
        const ssl = typeof this.ssl === "object" ? this.ssl : this.ssl ? { sslmode: this.ssl } : {};
        add(params, ssl, "sslmode");
        add(params, ssl, "sslca");
        add(params, ssl, "sslkey");
        add(params, ssl, "sslcert");
        add(params, ssl, "sslrootcert");
        if (this.database) {
          params.push("dbname=" + quoteParamValue(this.database));
        }
        if (this.replication) {
          params.push("replication=" + quoteParamValue(this.replication));
        }
        if (this.host) {
          params.push("host=" + quoteParamValue(this.host));
        }
        if (this.isDomainSocket) {
          return cb(null, params.join(" "));
        }
        if (this.client_encoding) {
          params.push("client_encoding=" + quoteParamValue(this.client_encoding));
        }
        dns.lookup(this.host, function(err, address) {
          if (err) return cb(err, null);
          params.push("hostaddr=" + quoteParamValue(address));
          return cb(null, params.join(" "));
        });
      }
    };
    module.exports = ConnectionParameters;
  }
});
var require_result = __commonJS({
  "../node_modules/pg/lib/result.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var types2 = require_pg_types();
    var matchRegexp = /^([A-Za-z]+)(?: (\d+))?(?: (\d+))?/;
    var Result2 = class {
      static {
        __name(this, "Result2");
      }
      static {
        __name2(this, "Result");
      }
      constructor(rowMode, types3) {
        this.command = null;
        this.rowCount = null;
        this.oid = null;
        this.rows = [];
        this.fields = [];
        this._parsers = void 0;
        this._types = types3;
        this.RowCtor = null;
        this.rowAsArray = rowMode === "array";
        if (this.rowAsArray) {
          this.parseRow = this._parseRowAsArray;
        }
        this._prebuiltEmptyResultObject = null;
      }
      // adds a command complete message
      addCommandComplete(msg) {
        let match2;
        if (msg.text) {
          match2 = matchRegexp.exec(msg.text);
        } else {
          match2 = matchRegexp.exec(msg.command);
        }
        if (match2) {
          this.command = match2[1];
          if (match2[3]) {
            this.oid = parseInt(match2[2], 10);
            this.rowCount = parseInt(match2[3], 10);
          } else if (match2[2]) {
            this.rowCount = parseInt(match2[2], 10);
          }
        }
      }
      _parseRowAsArray(rowData) {
        const row = new Array(rowData.length);
        for (let i = 0, len = rowData.length; i < len; i++) {
          const rawValue = rowData[i];
          if (rawValue !== null) {
            row[i] = this._parsers[i](rawValue);
          } else {
            row[i] = null;
          }
        }
        return row;
      }
      parseRow(rowData) {
        const row = { ...this._prebuiltEmptyResultObject };
        for (let i = 0, len = rowData.length; i < len; i++) {
          const rawValue = rowData[i];
          const field = this.fields[i].name;
          if (rawValue !== null) {
            const v = this.fields[i].format === "binary" ? Buffer.from(rawValue) : rawValue;
            row[field] = this._parsers[i](v);
          } else {
            row[field] = null;
          }
        }
        return row;
      }
      addRow(row) {
        this.rows.push(row);
      }
      addFields(fieldDescriptions) {
        this.fields = fieldDescriptions;
        if (this.fields.length) {
          this._parsers = new Array(fieldDescriptions.length);
        }
        const row = {};
        for (let i = 0; i < fieldDescriptions.length; i++) {
          const desc = fieldDescriptions[i];
          row[desc.name] = null;
          if (this._types) {
            this._parsers[i] = this._types.getTypeParser(desc.dataTypeID, desc.format || "text");
          } else {
            this._parsers[i] = types2.getTypeParser(desc.dataTypeID, desc.format || "text");
          }
        }
        this._prebuiltEmptyResultObject = { ...row };
      }
    };
    module.exports = Result2;
  }
});
var require_query = __commonJS({
  "../node_modules/pg/lib/query.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var { EventEmitter: EventEmitter22 } = require_events();
    var Result2 = require_result();
    var utils = require_utils();
    var Query2 = class extends EventEmitter22 {
      static {
        __name(this, "Query2");
      }
      static {
        __name2(this, "Query");
      }
      constructor(config22, values, callback) {
        super();
        config22 = utils.normalizeQueryConfig(config22, values, callback);
        this.text = config22.text;
        this.values = config22.values;
        this.rows = config22.rows;
        this.types = config22.types;
        this.name = config22.name;
        this.queryMode = config22.queryMode;
        this.binary = config22.binary;
        this.portal = config22.portal || "";
        this.callback = config22.callback;
        this._rowMode = config22.rowMode;
        if (process.domain && config22.callback) {
          this.callback = process.domain.bind(config22.callback);
        }
        this._result = new Result2(this._rowMode, this.types);
        this._results = this._result;
        this._canceledDueToError = false;
      }
      requiresPreparation() {
        if (this.queryMode === "extended") {
          return true;
        }
        if (this.name) {
          return true;
        }
        if (this.rows) {
          return true;
        }
        if (!this.text) {
          return false;
        }
        if (!this.values) {
          return false;
        }
        return this.values.length > 0;
      }
      _checkForMultirow() {
        if (this._result.command) {
          if (!Array.isArray(this._results)) {
            this._results = [this._result];
          }
          this._result = new Result2(this._rowMode, this._result._types);
          this._results.push(this._result);
        }
      }
      // associates row metadata from the supplied
      // message with this query object
      // metadata used when parsing row results
      handleRowDescription(msg) {
        this._checkForMultirow();
        this._result.addFields(msg.fields);
        this._accumulateRows = this.callback || !this.listeners("row").length;
      }
      handleDataRow(msg) {
        let row;
        if (this._canceledDueToError) {
          return;
        }
        try {
          row = this._result.parseRow(msg.fields);
        } catch (err) {
          this._canceledDueToError = err;
          return;
        }
        this.emit("row", row, this._result);
        if (this._accumulateRows) {
          this._result.addRow(row);
        }
      }
      handleCommandComplete(msg, connection) {
        this._checkForMultirow();
        this._result.addCommandComplete(msg);
        if (this.rows) {
          connection.sync();
        }
      }
      // if a named prepared statement is created with empty query text
      // the backend will send an emptyQuery message but *not* a command complete message
      // since we pipeline sync immediately after execute we don't need to do anything here
      // unless we have rows specified, in which case we did not pipeline the initial sync call
      handleEmptyQuery(connection) {
        if (this.rows) {
          connection.sync();
        }
      }
      handleError(err, connection) {
        if (this._canceledDueToError) {
          err = this._canceledDueToError;
          this._canceledDueToError = false;
        }
        if (this.callback) {
          return this.callback(err);
        }
        this.emit("error", err);
      }
      handleReadyForQuery(con) {
        if (this._canceledDueToError) {
          return this.handleError(this._canceledDueToError, con);
        }
        if (this.callback) {
          try {
            this.callback(null, this._results);
          } catch (err) {
            process.nextTick(() => {
              throw err;
            });
          }
        }
        this.emit("end", this._results);
      }
      submit(connection) {
        if (typeof this.text !== "string" && typeof this.name !== "string") {
          return new Error("A query must have either text or a name. Supplying neither is unsupported.");
        }
        const previous = connection.parsedStatements[this.name];
        if (this.text && previous && this.text !== previous) {
          return new Error(`Prepared statements must be unique - '${this.name}' was used for a different statement`);
        }
        if (this.values && !Array.isArray(this.values)) {
          return new Error("Query values must be an array");
        }
        if (this.requiresPreparation()) {
          connection.stream.cork && connection.stream.cork();
          try {
            this.prepare(connection);
          } finally {
            connection.stream.uncork && connection.stream.uncork();
          }
        } else {
          connection.query(this.text);
        }
        return null;
      }
      hasBeenParsed(connection) {
        return this.name && connection.parsedStatements[this.name];
      }
      handlePortalSuspended(connection) {
        this._getRows(connection, this.rows);
      }
      _getRows(connection, rows) {
        connection.execute({
          portal: this.portal,
          rows
        });
        if (!rows) {
          connection.sync();
        } else {
          connection.flush();
        }
      }
      // http://developer.postgresql.org/pgdocs/postgres/protocol-flow.html#PROTOCOL-FLOW-EXT-QUERY
      prepare(connection) {
        if (!this.hasBeenParsed(connection)) {
          connection.parse({
            text: this.text,
            name: this.name,
            types: this.types
          });
        }
        try {
          connection.bind({
            portal: this.portal,
            statement: this.name,
            values: this.values,
            binary: this.binary,
            valueMapper: utils.prepareValue
          });
        } catch (err) {
          this.handleError(err, connection);
          return;
        }
        connection.describe({
          type: "P",
          name: this.portal || ""
        });
        this._getRows(connection, this.rows);
      }
      handleCopyInResponse(connection) {
        connection.sendCopyFail("No source stream defined");
      }
      handleCopyData(msg, connection) {
      }
    };
    module.exports = Query2;
  }
});
var require_messages = __commonJS({
  "../node_modules/pg-protocol/dist/messages.js"(exports) {
    "use strict";
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NoticeMessage = exports.DataRowMessage = exports.CommandCompleteMessage = exports.ReadyForQueryMessage = exports.NotificationResponseMessage = exports.BackendKeyDataMessage = exports.AuthenticationMD5Password = exports.ParameterStatusMessage = exports.ParameterDescriptionMessage = exports.RowDescriptionMessage = exports.Field = exports.CopyResponse = exports.CopyDataMessage = exports.DatabaseError = exports.copyDone = exports.emptyQuery = exports.replicationStart = exports.portalSuspended = exports.noData = exports.closeComplete = exports.bindComplete = exports.parseComplete = void 0;
    exports.parseComplete = {
      name: "parseComplete",
      length: 5
    };
    exports.bindComplete = {
      name: "bindComplete",
      length: 5
    };
    exports.closeComplete = {
      name: "closeComplete",
      length: 5
    };
    exports.noData = {
      name: "noData",
      length: 5
    };
    exports.portalSuspended = {
      name: "portalSuspended",
      length: 5
    };
    exports.replicationStart = {
      name: "replicationStart",
      length: 4
    };
    exports.emptyQuery = {
      name: "emptyQuery",
      length: 4
    };
    exports.copyDone = {
      name: "copyDone",
      length: 4
    };
    var DatabaseError2 = class extends Error {
      static {
        __name(this, "DatabaseError2");
      }
      static {
        __name2(this, "DatabaseError");
      }
      constructor(message, length, name) {
        super(message);
        this.length = length;
        this.name = name;
      }
    };
    exports.DatabaseError = DatabaseError2;
    var CopyDataMessage = class {
      static {
        __name(this, "CopyDataMessage");
      }
      static {
        __name2(this, "CopyDataMessage");
      }
      constructor(length, chunk) {
        this.length = length;
        this.chunk = chunk;
        this.name = "copyData";
      }
    };
    exports.CopyDataMessage = CopyDataMessage;
    var CopyResponse = class {
      static {
        __name(this, "CopyResponse");
      }
      static {
        __name2(this, "CopyResponse");
      }
      constructor(length, name, binary, columnCount) {
        this.length = length;
        this.name = name;
        this.binary = binary;
        this.columnTypes = new Array(columnCount);
      }
    };
    exports.CopyResponse = CopyResponse;
    var Field = class {
      static {
        __name(this, "Field");
      }
      static {
        __name2(this, "Field");
      }
      constructor(name, tableID, columnID, dataTypeID, dataTypeSize, dataTypeModifier, format) {
        this.name = name;
        this.tableID = tableID;
        this.columnID = columnID;
        this.dataTypeID = dataTypeID;
        this.dataTypeSize = dataTypeSize;
        this.dataTypeModifier = dataTypeModifier;
        this.format = format;
      }
    };
    exports.Field = Field;
    var RowDescriptionMessage = class {
      static {
        __name(this, "RowDescriptionMessage");
      }
      static {
        __name2(this, "RowDescriptionMessage");
      }
      constructor(length, fieldCount) {
        this.length = length;
        this.fieldCount = fieldCount;
        this.name = "rowDescription";
        this.fields = new Array(this.fieldCount);
      }
    };
    exports.RowDescriptionMessage = RowDescriptionMessage;
    var ParameterDescriptionMessage = class {
      static {
        __name(this, "ParameterDescriptionMessage");
      }
      static {
        __name2(this, "ParameterDescriptionMessage");
      }
      constructor(length, parameterCount) {
        this.length = length;
        this.parameterCount = parameterCount;
        this.name = "parameterDescription";
        this.dataTypeIDs = new Array(this.parameterCount);
      }
    };
    exports.ParameterDescriptionMessage = ParameterDescriptionMessage;
    var ParameterStatusMessage = class {
      static {
        __name(this, "ParameterStatusMessage");
      }
      static {
        __name2(this, "ParameterStatusMessage");
      }
      constructor(length, parameterName, parameterValue) {
        this.length = length;
        this.parameterName = parameterName;
        this.parameterValue = parameterValue;
        this.name = "parameterStatus";
      }
    };
    exports.ParameterStatusMessage = ParameterStatusMessage;
    var AuthenticationMD5Password = class {
      static {
        __name(this, "AuthenticationMD5Password");
      }
      static {
        __name2(this, "AuthenticationMD5Password");
      }
      constructor(length, salt) {
        this.length = length;
        this.salt = salt;
        this.name = "authenticationMD5Password";
      }
    };
    exports.AuthenticationMD5Password = AuthenticationMD5Password;
    var BackendKeyDataMessage = class {
      static {
        __name(this, "BackendKeyDataMessage");
      }
      static {
        __name2(this, "BackendKeyDataMessage");
      }
      constructor(length, processID, secretKey) {
        this.length = length;
        this.processID = processID;
        this.secretKey = secretKey;
        this.name = "backendKeyData";
      }
    };
    exports.BackendKeyDataMessage = BackendKeyDataMessage;
    var NotificationResponseMessage = class {
      static {
        __name(this, "NotificationResponseMessage");
      }
      static {
        __name2(this, "NotificationResponseMessage");
      }
      constructor(length, processId, channel22, payload) {
        this.length = length;
        this.processId = processId;
        this.channel = channel22;
        this.payload = payload;
        this.name = "notification";
      }
    };
    exports.NotificationResponseMessage = NotificationResponseMessage;
    var ReadyForQueryMessage = class {
      static {
        __name(this, "ReadyForQueryMessage");
      }
      static {
        __name2(this, "ReadyForQueryMessage");
      }
      constructor(length, status) {
        this.length = length;
        this.status = status;
        this.name = "readyForQuery";
      }
    };
    exports.ReadyForQueryMessage = ReadyForQueryMessage;
    var CommandCompleteMessage = class {
      static {
        __name(this, "CommandCompleteMessage");
      }
      static {
        __name2(this, "CommandCompleteMessage");
      }
      constructor(length, text) {
        this.length = length;
        this.text = text;
        this.name = "commandComplete";
      }
    };
    exports.CommandCompleteMessage = CommandCompleteMessage;
    var DataRowMessage = class {
      static {
        __name(this, "DataRowMessage");
      }
      static {
        __name2(this, "DataRowMessage");
      }
      constructor(length, fields) {
        this.length = length;
        this.fields = fields;
        this.name = "dataRow";
        this.fieldCount = fields.length;
      }
    };
    exports.DataRowMessage = DataRowMessage;
    var NoticeMessage = class {
      static {
        __name(this, "NoticeMessage");
      }
      static {
        __name2(this, "NoticeMessage");
      }
      constructor(length, message) {
        this.length = length;
        this.message = message;
        this.name = "notice";
      }
    };
    exports.NoticeMessage = NoticeMessage;
  }
});
var require_buffer_writer = __commonJS({
  "../node_modules/pg-protocol/dist/buffer-writer.js"(exports) {
    "use strict";
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Writer = void 0;
    var Writer = class {
      static {
        __name(this, "Writer");
      }
      static {
        __name2(this, "Writer");
      }
      constructor(size = 256) {
        this.size = size;
        this.offset = 5;
        this.headerPosition = 0;
        this.buffer = Buffer.allocUnsafe(size);
      }
      ensure(size) {
        const remaining = this.buffer.length - this.offset;
        if (remaining < size) {
          const oldBuffer = this.buffer;
          const newSize = oldBuffer.length + (oldBuffer.length >> 1) + size;
          this.buffer = Buffer.allocUnsafe(newSize);
          oldBuffer.copy(this.buffer);
        }
      }
      addInt32(num) {
        this.ensure(4);
        this.buffer[this.offset++] = num >>> 24 & 255;
        this.buffer[this.offset++] = num >>> 16 & 255;
        this.buffer[this.offset++] = num >>> 8 & 255;
        this.buffer[this.offset++] = num >>> 0 & 255;
        return this;
      }
      addInt16(num) {
        this.ensure(2);
        this.buffer[this.offset++] = num >>> 8 & 255;
        this.buffer[this.offset++] = num >>> 0 & 255;
        return this;
      }
      addCString(string) {
        if (!string) {
          this.ensure(1);
        } else {
          const len = Buffer.byteLength(string);
          this.ensure(len + 1);
          this.buffer.write(string, this.offset, "utf-8");
          this.offset += len;
        }
        this.buffer[this.offset++] = 0;
        return this;
      }
      addString(string = "") {
        const len = Buffer.byteLength(string);
        this.ensure(len);
        this.buffer.write(string, this.offset);
        this.offset += len;
        return this;
      }
      add(otherBuffer) {
        this.ensure(otherBuffer.length);
        otherBuffer.copy(this.buffer, this.offset);
        this.offset += otherBuffer.length;
        return this;
      }
      join(code) {
        if (code) {
          this.buffer[this.headerPosition] = code;
          const length = this.offset - (this.headerPosition + 1);
          this.buffer.writeInt32BE(length, this.headerPosition + 1);
        }
        return this.buffer.slice(code ? 0 : 5, this.offset);
      }
      flush(code) {
        const result = this.join(code);
        this.offset = 5;
        this.headerPosition = 0;
        this.buffer = Buffer.allocUnsafe(this.size);
        return result;
      }
    };
    exports.Writer = Writer;
  }
});
var require_serializer = __commonJS({
  "../node_modules/pg-protocol/dist/serializer.js"(exports) {
    "use strict";
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.serialize = void 0;
    var buffer_writer_1 = require_buffer_writer();
    var writer = new buffer_writer_1.Writer();
    var startup = /* @__PURE__ */ __name2((opts) => {
      writer.addInt16(3).addInt16(0);
      for (const key of Object.keys(opts)) {
        writer.addCString(key).addCString(opts[key]);
      }
      writer.addCString("client_encoding").addCString("UTF8");
      const bodyBuffer = writer.addCString("").flush();
      const length = bodyBuffer.length + 4;
      return new buffer_writer_1.Writer().addInt32(length).add(bodyBuffer).flush();
    }, "startup");
    var requestSsl = /* @__PURE__ */ __name2(() => {
      const response = Buffer.allocUnsafe(8);
      response.writeInt32BE(8, 0);
      response.writeInt32BE(80877103, 4);
      return response;
    }, "requestSsl");
    var password = /* @__PURE__ */ __name2((password2) => {
      return writer.addCString(password2).flush(
        112
        /* code.startup */
      );
    }, "password");
    var sendSASLInitialResponseMessage = /* @__PURE__ */ __name2(function(mechanism, initialResponse) {
      writer.addCString(mechanism).addInt32(Buffer.byteLength(initialResponse)).addString(initialResponse);
      return writer.flush(
        112
        /* code.startup */
      );
    }, "sendSASLInitialResponseMessage");
    var sendSCRAMClientFinalMessage = /* @__PURE__ */ __name2(function(additionalData) {
      return writer.addString(additionalData).flush(
        112
        /* code.startup */
      );
    }, "sendSCRAMClientFinalMessage");
    var query = /* @__PURE__ */ __name2((text) => {
      return writer.addCString(text).flush(
        81
        /* code.query */
      );
    }, "query");
    var emptyArray = [];
    var parse2 = /* @__PURE__ */ __name2((query2) => {
      const name = query2.name || "";
      if (name.length > 63) {
        console.error("Warning! Postgres only supports 63 characters for query names.");
        console.error("You supplied %s (%s)", name, name.length);
        console.error("This can cause conflicts and silent errors executing queries");
      }
      const types2 = query2.types || emptyArray;
      const len = types2.length;
      const buffer = writer.addCString(name).addCString(query2.text).addInt16(len);
      for (let i = 0; i < len; i++) {
        buffer.addInt32(types2[i]);
      }
      return writer.flush(
        80
        /* code.parse */
      );
    }, "parse");
    var paramWriter = new buffer_writer_1.Writer();
    var writeValues = /* @__PURE__ */ __name2(function(values, valueMapper) {
      for (let i = 0; i < values.length; i++) {
        const mappedVal = valueMapper ? valueMapper(values[i], i) : values[i];
        if (mappedVal == null) {
          writer.addInt16(
            0
            /* ParamType.STRING */
          );
          paramWriter.addInt32(-1);
        } else if (mappedVal instanceof Buffer) {
          writer.addInt16(
            1
            /* ParamType.BINARY */
          );
          paramWriter.addInt32(mappedVal.length);
          paramWriter.add(mappedVal);
        } else {
          writer.addInt16(
            0
            /* ParamType.STRING */
          );
          paramWriter.addInt32(Buffer.byteLength(mappedVal));
          paramWriter.addString(mappedVal);
        }
      }
    }, "writeValues");
    var bind = /* @__PURE__ */ __name2((config22 = {}) => {
      const portal = config22.portal || "";
      const statement = config22.statement || "";
      const binary = config22.binary || false;
      const values = config22.values || emptyArray;
      const len = values.length;
      writer.addCString(portal).addCString(statement);
      writer.addInt16(len);
      writeValues(values, config22.valueMapper);
      writer.addInt16(len);
      writer.add(paramWriter.flush());
      writer.addInt16(1);
      writer.addInt16(
        binary ? 1 : 0
        /* ParamType.STRING */
      );
      return writer.flush(
        66
        /* code.bind */
      );
    }, "bind");
    var emptyExecute = Buffer.from([69, 0, 0, 0, 9, 0, 0, 0, 0, 0]);
    var execute = /* @__PURE__ */ __name2((config22) => {
      if (!config22 || !config22.portal && !config22.rows) {
        return emptyExecute;
      }
      const portal = config22.portal || "";
      const rows = config22.rows || 0;
      const portalLength = Buffer.byteLength(portal);
      const len = 4 + portalLength + 1 + 4;
      const buff = Buffer.allocUnsafe(1 + len);
      buff[0] = 69;
      buff.writeInt32BE(len, 1);
      buff.write(portal, 5, "utf-8");
      buff[portalLength + 5] = 0;
      buff.writeUInt32BE(rows, buff.length - 4);
      return buff;
    }, "execute");
    var cancel = /* @__PURE__ */ __name2((processID, secretKey) => {
      const buffer = Buffer.allocUnsafe(16);
      buffer.writeInt32BE(16, 0);
      buffer.writeInt16BE(1234, 4);
      buffer.writeInt16BE(5678, 6);
      buffer.writeInt32BE(processID, 8);
      buffer.writeInt32BE(secretKey, 12);
      return buffer;
    }, "cancel");
    var cstringMessage = /* @__PURE__ */ __name2((code, string) => {
      const stringLen = Buffer.byteLength(string);
      const len = 4 + stringLen + 1;
      const buffer = Buffer.allocUnsafe(1 + len);
      buffer[0] = code;
      buffer.writeInt32BE(len, 1);
      buffer.write(string, 5, "utf-8");
      buffer[len] = 0;
      return buffer;
    }, "cstringMessage");
    var emptyDescribePortal = writer.addCString("P").flush(
      68
      /* code.describe */
    );
    var emptyDescribeStatement = writer.addCString("S").flush(
      68
      /* code.describe */
    );
    var describe = /* @__PURE__ */ __name2((msg) => {
      return msg.name ? cstringMessage(68, `${msg.type}${msg.name || ""}`) : msg.type === "P" ? emptyDescribePortal : emptyDescribeStatement;
    }, "describe");
    var close2 = /* @__PURE__ */ __name2((msg) => {
      const text = `${msg.type}${msg.name || ""}`;
      return cstringMessage(67, text);
    }, "close");
    var copyData = /* @__PURE__ */ __name2((chunk) => {
      return writer.add(chunk).flush(
        100
        /* code.copyFromChunk */
      );
    }, "copyData");
    var copyFail = /* @__PURE__ */ __name2((message) => {
      return cstringMessage(102, message);
    }, "copyFail");
    var codeOnlyBuffer = /* @__PURE__ */ __name2((code) => Buffer.from([code, 0, 0, 0, 4]), "codeOnlyBuffer");
    var flushBuffer = codeOnlyBuffer(
      72
      /* code.flush */
    );
    var syncBuffer = codeOnlyBuffer(
      83
      /* code.sync */
    );
    var endBuffer = codeOnlyBuffer(
      88
      /* code.end */
    );
    var copyDoneBuffer = codeOnlyBuffer(
      99
      /* code.copyDone */
    );
    var serialize = {
      startup,
      password,
      requestSsl,
      sendSASLInitialResponseMessage,
      sendSCRAMClientFinalMessage,
      query,
      parse: parse2,
      bind,
      execute,
      describe,
      close: close2,
      flush: /* @__PURE__ */ __name2(() => flushBuffer, "flush"),
      sync: /* @__PURE__ */ __name2(() => syncBuffer, "sync"),
      end: /* @__PURE__ */ __name2(() => endBuffer, "end"),
      copyData,
      copyDone: /* @__PURE__ */ __name2(() => copyDoneBuffer, "copyDone"),
      copyFail,
      cancel
    };
    exports.serialize = serialize;
  }
});
var require_buffer_reader = __commonJS({
  "../node_modules/pg-protocol/dist/buffer-reader.js"(exports) {
    "use strict";
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BufferReader = void 0;
    var emptyBuffer = Buffer.allocUnsafe(0);
    var BufferReader = class {
      static {
        __name(this, "BufferReader");
      }
      static {
        __name2(this, "BufferReader");
      }
      constructor(offset = 0) {
        this.offset = offset;
        this.buffer = emptyBuffer;
        this.encoding = "utf-8";
      }
      setBuffer(offset, buffer) {
        this.offset = offset;
        this.buffer = buffer;
      }
      int16() {
        const result = this.buffer.readInt16BE(this.offset);
        this.offset += 2;
        return result;
      }
      byte() {
        const result = this.buffer[this.offset];
        this.offset++;
        return result;
      }
      int32() {
        const result = this.buffer.readInt32BE(this.offset);
        this.offset += 4;
        return result;
      }
      uint32() {
        const result = this.buffer.readUInt32BE(this.offset);
        this.offset += 4;
        return result;
      }
      string(length) {
        const result = this.buffer.toString(this.encoding, this.offset, this.offset + length);
        this.offset += length;
        return result;
      }
      cstring() {
        const start = this.offset;
        let end = start;
        while (this.buffer[end++] !== 0) {
        }
        this.offset = end;
        return this.buffer.toString(this.encoding, start, end - 1);
      }
      bytes(length) {
        const result = this.buffer.slice(this.offset, this.offset + length);
        this.offset += length;
        return result;
      }
    };
    exports.BufferReader = BufferReader;
  }
});
var require_parser = __commonJS({
  "../node_modules/pg-protocol/dist/parser.js"(exports) {
    "use strict";
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Parser = void 0;
    var messages_1 = require_messages();
    var buffer_reader_1 = require_buffer_reader();
    var CODE_LENGTH = 1;
    var LEN_LENGTH = 4;
    var HEADER_LENGTH = CODE_LENGTH + LEN_LENGTH;
    var emptyBuffer = Buffer.allocUnsafe(0);
    var Parser = class {
      static {
        __name(this, "Parser");
      }
      static {
        __name2(this, "Parser");
      }
      constructor(opts) {
        this.buffer = emptyBuffer;
        this.bufferLength = 0;
        this.bufferOffset = 0;
        this.reader = new buffer_reader_1.BufferReader();
        if ((opts === null || opts === void 0 ? void 0 : opts.mode) === "binary") {
          throw new Error("Binary mode not supported yet");
        }
        this.mode = (opts === null || opts === void 0 ? void 0 : opts.mode) || "text";
      }
      parse(buffer, callback) {
        this.mergeBuffer(buffer);
        const bufferFullLength = this.bufferOffset + this.bufferLength;
        let offset = this.bufferOffset;
        while (offset + HEADER_LENGTH <= bufferFullLength) {
          const code = this.buffer[offset];
          const length = this.buffer.readUInt32BE(offset + CODE_LENGTH);
          const fullMessageLength = CODE_LENGTH + length;
          if (fullMessageLength + offset <= bufferFullLength) {
            const message = this.handlePacket(offset + HEADER_LENGTH, code, length, this.buffer);
            callback(message);
            offset += fullMessageLength;
          } else {
            break;
          }
        }
        if (offset === bufferFullLength) {
          this.buffer = emptyBuffer;
          this.bufferLength = 0;
          this.bufferOffset = 0;
        } else {
          this.bufferLength = bufferFullLength - offset;
          this.bufferOffset = offset;
        }
      }
      mergeBuffer(buffer) {
        if (this.bufferLength > 0) {
          const newLength = this.bufferLength + buffer.byteLength;
          const newFullLength = newLength + this.bufferOffset;
          if (newFullLength > this.buffer.byteLength) {
            let newBuffer;
            if (newLength <= this.buffer.byteLength && this.bufferOffset >= this.bufferLength) {
              newBuffer = this.buffer;
            } else {
              let newBufferLength = this.buffer.byteLength * 2;
              while (newLength >= newBufferLength) {
                newBufferLength *= 2;
              }
              newBuffer = Buffer.allocUnsafe(newBufferLength);
            }
            this.buffer.copy(newBuffer, 0, this.bufferOffset, this.bufferOffset + this.bufferLength);
            this.buffer = newBuffer;
            this.bufferOffset = 0;
          }
          buffer.copy(this.buffer, this.bufferOffset + this.bufferLength);
          this.bufferLength = newLength;
        } else {
          this.buffer = buffer;
          this.bufferOffset = 0;
          this.bufferLength = buffer.byteLength;
        }
      }
      handlePacket(offset, code, length, bytes) {
        switch (code) {
          case 50:
            return messages_1.bindComplete;
          case 49:
            return messages_1.parseComplete;
          case 51:
            return messages_1.closeComplete;
          case 110:
            return messages_1.noData;
          case 115:
            return messages_1.portalSuspended;
          case 99:
            return messages_1.copyDone;
          case 87:
            return messages_1.replicationStart;
          case 73:
            return messages_1.emptyQuery;
          case 68:
            return this.parseDataRowMessage(offset, length, bytes);
          case 67:
            return this.parseCommandCompleteMessage(offset, length, bytes);
          case 90:
            return this.parseReadyForQueryMessage(offset, length, bytes);
          case 65:
            return this.parseNotificationMessage(offset, length, bytes);
          case 82:
            return this.parseAuthenticationResponse(offset, length, bytes);
          case 83:
            return this.parseParameterStatusMessage(offset, length, bytes);
          case 75:
            return this.parseBackendKeyData(offset, length, bytes);
          case 69:
            return this.parseErrorMessage(offset, length, bytes, "error");
          case 78:
            return this.parseErrorMessage(offset, length, bytes, "notice");
          case 84:
            return this.parseRowDescriptionMessage(offset, length, bytes);
          case 116:
            return this.parseParameterDescriptionMessage(offset, length, bytes);
          case 71:
            return this.parseCopyInMessage(offset, length, bytes);
          case 72:
            return this.parseCopyOutMessage(offset, length, bytes);
          case 100:
            return this.parseCopyData(offset, length, bytes);
          default:
            return new messages_1.DatabaseError("received invalid response: " + code.toString(16), length, "error");
        }
      }
      parseReadyForQueryMessage(offset, length, bytes) {
        this.reader.setBuffer(offset, bytes);
        const status = this.reader.string(1);
        return new messages_1.ReadyForQueryMessage(length, status);
      }
      parseCommandCompleteMessage(offset, length, bytes) {
        this.reader.setBuffer(offset, bytes);
        const text = this.reader.cstring();
        return new messages_1.CommandCompleteMessage(length, text);
      }
      parseCopyData(offset, length, bytes) {
        const chunk = bytes.slice(offset, offset + (length - 4));
        return new messages_1.CopyDataMessage(length, chunk);
      }
      parseCopyInMessage(offset, length, bytes) {
        return this.parseCopyMessage(offset, length, bytes, "copyInResponse");
      }
      parseCopyOutMessage(offset, length, bytes) {
        return this.parseCopyMessage(offset, length, bytes, "copyOutResponse");
      }
      parseCopyMessage(offset, length, bytes, messageName) {
        this.reader.setBuffer(offset, bytes);
        const isBinary = this.reader.byte() !== 0;
        const columnCount = this.reader.int16();
        const message = new messages_1.CopyResponse(length, messageName, isBinary, columnCount);
        for (let i = 0; i < columnCount; i++) {
          message.columnTypes[i] = this.reader.int16();
        }
        return message;
      }
      parseNotificationMessage(offset, length, bytes) {
        this.reader.setBuffer(offset, bytes);
        const processId = this.reader.int32();
        const channel22 = this.reader.cstring();
        const payload = this.reader.cstring();
        return new messages_1.NotificationResponseMessage(length, processId, channel22, payload);
      }
      parseRowDescriptionMessage(offset, length, bytes) {
        this.reader.setBuffer(offset, bytes);
        const fieldCount = this.reader.int16();
        const message = new messages_1.RowDescriptionMessage(length, fieldCount);
        for (let i = 0; i < fieldCount; i++) {
          message.fields[i] = this.parseField();
        }
        return message;
      }
      parseField() {
        const name = this.reader.cstring();
        const tableID = this.reader.uint32();
        const columnID = this.reader.int16();
        const dataTypeID = this.reader.uint32();
        const dataTypeSize = this.reader.int16();
        const dataTypeModifier = this.reader.int32();
        const mode = this.reader.int16() === 0 ? "text" : "binary";
        return new messages_1.Field(name, tableID, columnID, dataTypeID, dataTypeSize, dataTypeModifier, mode);
      }
      parseParameterDescriptionMessage(offset, length, bytes) {
        this.reader.setBuffer(offset, bytes);
        const parameterCount = this.reader.int16();
        const message = new messages_1.ParameterDescriptionMessage(length, parameterCount);
        for (let i = 0; i < parameterCount; i++) {
          message.dataTypeIDs[i] = this.reader.int32();
        }
        return message;
      }
      parseDataRowMessage(offset, length, bytes) {
        this.reader.setBuffer(offset, bytes);
        const fieldCount = this.reader.int16();
        const fields = new Array(fieldCount);
        for (let i = 0; i < fieldCount; i++) {
          const len = this.reader.int32();
          fields[i] = len === -1 ? null : this.reader.string(len);
        }
        return new messages_1.DataRowMessage(length, fields);
      }
      parseParameterStatusMessage(offset, length, bytes) {
        this.reader.setBuffer(offset, bytes);
        const name = this.reader.cstring();
        const value = this.reader.cstring();
        return new messages_1.ParameterStatusMessage(length, name, value);
      }
      parseBackendKeyData(offset, length, bytes) {
        this.reader.setBuffer(offset, bytes);
        const processID = this.reader.int32();
        const secretKey = this.reader.int32();
        return new messages_1.BackendKeyDataMessage(length, processID, secretKey);
      }
      parseAuthenticationResponse(offset, length, bytes) {
        this.reader.setBuffer(offset, bytes);
        const code = this.reader.int32();
        const message = {
          name: "authenticationOk",
          length
        };
        switch (code) {
          case 0:
            break;
          case 3:
            if (message.length === 8) {
              message.name = "authenticationCleartextPassword";
            }
            break;
          case 5:
            if (message.length === 12) {
              message.name = "authenticationMD5Password";
              const salt = this.reader.bytes(4);
              return new messages_1.AuthenticationMD5Password(length, salt);
            }
            break;
          case 10:
            {
              message.name = "authenticationSASL";
              message.mechanisms = [];
              let mechanism;
              do {
                mechanism = this.reader.cstring();
                if (mechanism) {
                  message.mechanisms.push(mechanism);
                }
              } while (mechanism);
            }
            break;
          case 11:
            message.name = "authenticationSASLContinue";
            message.data = this.reader.string(length - 8);
            break;
          case 12:
            message.name = "authenticationSASLFinal";
            message.data = this.reader.string(length - 8);
            break;
          default:
            throw new Error("Unknown authenticationOk message type " + code);
        }
        return message;
      }
      parseErrorMessage(offset, length, bytes, name) {
        this.reader.setBuffer(offset, bytes);
        const fields = {};
        let fieldType = this.reader.string(1);
        while (fieldType !== "\0") {
          fields[fieldType] = this.reader.cstring();
          fieldType = this.reader.string(1);
        }
        const messageValue = fields.M;
        const message = name === "notice" ? new messages_1.NoticeMessage(length, messageValue) : new messages_1.DatabaseError(messageValue, length, name);
        message.severity = fields.S;
        message.code = fields.C;
        message.detail = fields.D;
        message.hint = fields.H;
        message.position = fields.P;
        message.internalPosition = fields.p;
        message.internalQuery = fields.q;
        message.where = fields.W;
        message.schema = fields.s;
        message.table = fields.t;
        message.column = fields.c;
        message.dataType = fields.d;
        message.constraint = fields.n;
        message.file = fields.F;
        message.line = fields.L;
        message.routine = fields.R;
        return message;
      }
    };
    exports.Parser = Parser;
  }
});
var require_dist = __commonJS({
  "../node_modules/pg-protocol/dist/index.js"(exports) {
    "use strict";
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DatabaseError = exports.serialize = exports.parse = void 0;
    var messages_1 = require_messages();
    Object.defineProperty(exports, "DatabaseError", { enumerable: true, get: /* @__PURE__ */ __name2(function() {
      return messages_1.DatabaseError;
    }, "get") });
    var serializer_1 = require_serializer();
    Object.defineProperty(exports, "serialize", { enumerable: true, get: /* @__PURE__ */ __name2(function() {
      return serializer_1.serialize;
    }, "get") });
    var parser_1 = require_parser();
    function parse2(stream, callback) {
      const parser = new parser_1.Parser();
      stream.on("data", (buffer) => parser.parse(buffer, callback));
      return new Promise((resolve) => stream.on("end", () => resolve()));
    }
    __name(parse2, "parse2");
    __name2(parse2, "parse");
    exports.parse = parse2;
  }
});
var require_net = __commonJS({
  "node-built-in-modules:net"(exports, module) {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault5;
  }
});
var require_tls = __commonJS({
  "node-built-in-modules:tls"(exports, module) {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault6;
  }
});
var require_dist2 = __commonJS({
  "../node_modules/pg-cloudflare/dist/index.js"(exports) {
    "use strict";
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CloudflareSocket = void 0;
    var events_1 = require_events();
    var CloudflareSocket = class extends events_1.EventEmitter {
      static {
        __name(this, "CloudflareSocket");
      }
      static {
        __name2(this, "CloudflareSocket");
      }
      constructor(ssl) {
        super();
        this.ssl = ssl;
        this.writable = false;
        this.destroyed = false;
        this._upgrading = false;
        this._upgraded = false;
        this._cfSocket = null;
        this._cfWriter = null;
        this._cfReader = null;
      }
      setNoDelay() {
        return this;
      }
      setKeepAlive() {
        return this;
      }
      ref() {
        return this;
      }
      unref() {
        return this;
      }
      async connect(port, host, connectListener) {
        try {
          log32("connecting");
          if (connectListener)
            this.once("connect", connectListener);
          const options = this.ssl ? { secureTransport: "starttls" } : {};
          const mod = await import("cloudflare:sockets");
          const connect = mod.connect;
          this._cfSocket = connect(`${host}:${port}`, options);
          this._cfWriter = this._cfSocket.writable.getWriter();
          this._addClosedHandler();
          this._cfReader = this._cfSocket.readable.getReader();
          if (this.ssl) {
            this._listenOnce().catch((e) => this.emit("error", e));
          } else {
            this._listen().catch((e) => this.emit("error", e));
          }
          await this._cfWriter.ready;
          log32("socket ready");
          this.writable = true;
          this.emit("connect");
          return this;
        } catch (e) {
          this.emit("error", e);
        }
      }
      async _listen() {
        while (true) {
          log32("awaiting receive from CF socket");
          const { done, value } = await this._cfReader.read();
          log32("CF socket received:", done, value);
          if (done) {
            log32("done");
            break;
          }
          this.emit("data", Buffer.from(value));
        }
      }
      async _listenOnce() {
        log32("awaiting first receive from CF socket");
        const { done, value } = await this._cfReader.read();
        log32("First CF socket received:", done, value);
        this.emit("data", Buffer.from(value));
      }
      write(data, encoding = "utf8", callback = () => {
      }) {
        if (data.length === 0)
          return callback();
        if (typeof data === "string")
          data = Buffer.from(data, encoding);
        log32("sending data direct:", data);
        this._cfWriter.write(data).then(() => {
          log32("data sent");
          callback();
        }, (err) => {
          log32("send error", err);
          callback(err);
        });
        return true;
      }
      end(data = Buffer.alloc(0), encoding = "utf8", callback = () => {
      }) {
        log32("ending CF socket");
        this.write(data, encoding, (err) => {
          this._cfSocket.close();
          if (callback)
            callback(err);
        });
        return this;
      }
      destroy(reason) {
        log32("destroying CF socket", reason);
        this.destroyed = true;
        return this.end();
      }
      startTls(options) {
        if (this._upgraded) {
          this.emit("error", "Cannot call `startTls()` more than once on a socket");
          return;
        }
        this._cfWriter.releaseLock();
        this._cfReader.releaseLock();
        this._upgrading = true;
        this._cfSocket = this._cfSocket.startTls(options);
        this._cfWriter = this._cfSocket.writable.getWriter();
        this._cfReader = this._cfSocket.readable.getReader();
        this._addClosedHandler();
        this._listen().catch((e) => this.emit("error", e));
      }
      _addClosedHandler() {
        this._cfSocket.closed.then(() => {
          if (!this._upgrading) {
            log32("CF socket closed");
            this._cfSocket = null;
            this.emit("close");
          } else {
            this._upgrading = false;
            this._upgraded = true;
          }
        }).catch((e) => this.emit("error", e));
      }
    };
    exports.CloudflareSocket = CloudflareSocket;
    var debug4 = false;
    function dump(data) {
      if (data instanceof Uint8Array || data instanceof ArrayBuffer) {
        const hex = Buffer.from(data).toString("hex");
        const str2 = new TextDecoder().decode(data);
        return `
>>> STR: "${str2.replace(/\n/g, "\\n")}"
>>> HEX: ${hex}
`;
      } else {
        return data;
      }
    }
    __name(dump, "dump");
    __name2(dump, "dump");
    function log32(...args) {
      debug4 && console.log(...args.map(dump));
    }
    __name(log32, "log3");
    __name2(log32, "log");
  }
});
var require_stream = __commonJS({
  "../node_modules/pg/lib/stream.js"(exports, module) {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var { getStream, getSecureStream } = getStreamFuncs();
    module.exports = {
      /**
       * Get a socket stream compatible with the current runtime environment.
       * @returns {Duplex}
       */
      getStream,
      /**
       * Get a TLS secured socket, compatible with the current environment,
       * using the socket and other settings given in `options`.
       * @returns {Duplex}
       */
      getSecureStream
    };
    function getNodejsStreamFuncs() {
      function getStream2(ssl) {
        const net = require_net();
        return new net.Socket();
      }
      __name(getStream2, "getStream2");
      __name2(getStream2, "getStream");
      function getSecureStream2(options) {
        const tls = require_tls();
        return tls.connect(options);
      }
      __name(getSecureStream2, "getSecureStream2");
      __name2(getSecureStream2, "getSecureStream");
      return {
        getStream: getStream2,
        getSecureStream: getSecureStream2
      };
    }
    __name(getNodejsStreamFuncs, "getNodejsStreamFuncs");
    __name2(getNodejsStreamFuncs, "getNodejsStreamFuncs");
    function getCloudflareStreamFuncs() {
      function getStream2(ssl) {
        const { CloudflareSocket } = require_dist2();
        return new CloudflareSocket(ssl);
      }
      __name(getStream2, "getStream2");
      __name2(getStream2, "getStream");
      function getSecureStream2(options) {
        options.socket.startTls(options);
        return options.socket;
      }
      __name(getSecureStream2, "getSecureStream2");
      __name2(getSecureStream2, "getSecureStream");
      return {
        getStream: getStream2,
        getSecureStream: getSecureStream2
      };
    }
    __name(getCloudflareStreamFuncs, "getCloudflareStreamFuncs");
    __name2(getCloudflareStreamFuncs, "getCloudflareStreamFuncs");
    function isCloudflareRuntime() {
      if (typeof navigator === "object" && navigator !== null && true) {
        return true;
      }
      if (typeof Response === "function") {
        const resp = new Response(null, { cf: { thing: true } });
        if (typeof resp.cf === "object" && resp.cf !== null && resp.cf.thing) {
          return true;
        }
      }
      return false;
    }
    __name(isCloudflareRuntime, "isCloudflareRuntime");
    __name2(isCloudflareRuntime, "isCloudflareRuntime");
    function getStreamFuncs() {
      if (isCloudflareRuntime()) {
        return getCloudflareStreamFuncs();
      }
      return getNodejsStreamFuncs();
    }
    __name(getStreamFuncs, "getStreamFuncs");
    __name2(getStreamFuncs, "getStreamFuncs");
  }
});
var require_connection = __commonJS({
  "../node_modules/pg/lib/connection.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var EventEmitter22 = require_events().EventEmitter;
    var { parse: parse2, serialize } = require_dist();
    var { getStream, getSecureStream } = require_stream();
    var flushBuffer = serialize.flush();
    var syncBuffer = serialize.sync();
    var endBuffer = serialize.end();
    var Connection2 = class extends EventEmitter22 {
      static {
        __name(this, "Connection2");
      }
      static {
        __name2(this, "Connection");
      }
      constructor(config22) {
        super();
        config22 = config22 || {};
        this.stream = config22.stream || getStream(config22.ssl);
        if (typeof this.stream === "function") {
          this.stream = this.stream(config22);
        }
        this._keepAlive = config22.keepAlive;
        this._keepAliveInitialDelayMillis = config22.keepAliveInitialDelayMillis;
        this.lastBuffer = false;
        this.parsedStatements = {};
        this.ssl = config22.ssl || false;
        this._ending = false;
        this._emitMessage = false;
        const self = this;
        this.on("newListener", function(eventName) {
          if (eventName === "message") {
            self._emitMessage = true;
          }
        });
      }
      connect(port, host) {
        const self = this;
        this._connecting = true;
        this.stream.setNoDelay(true);
        this.stream.connect(port, host);
        this.stream.once("connect", function() {
          if (self._keepAlive) {
            self.stream.setKeepAlive(true, self._keepAliveInitialDelayMillis);
          }
          self.emit("connect");
        });
        const reportStreamError = /* @__PURE__ */ __name2(function(error32) {
          if (self._ending && (error32.code === "ECONNRESET" || error32.code === "EPIPE")) {
            return;
          }
          self.emit("error", error32);
        }, "reportStreamError");
        this.stream.on("error", reportStreamError);
        this.stream.on("close", function() {
          self.emit("end");
        });
        if (!this.ssl) {
          return this.attachListeners(this.stream);
        }
        this.stream.once("data", function(buffer) {
          const responseCode = buffer.toString("utf8");
          switch (responseCode) {
            case "S":
              break;
            case "N":
              self.stream.end();
              return self.emit("error", new Error("The server does not support SSL connections"));
            default:
              self.stream.end();
              return self.emit("error", new Error("There was an error establishing an SSL connection"));
          }
          const options = {
            socket: self.stream
          };
          if (self.ssl !== true) {
            Object.assign(options, self.ssl);
            if ("key" in self.ssl) {
              options.key = self.ssl.key;
            }
          }
          const net = require_net();
          if (net.isIP && net.isIP(host) === 0) {
            options.servername = host;
          }
          try {
            self.stream = getSecureStream(options);
          } catch (err) {
            return self.emit("error", err);
          }
          self.attachListeners(self.stream);
          self.stream.on("error", reportStreamError);
          self.emit("sslconnect");
        });
      }
      attachListeners(stream) {
        parse2(stream, (msg) => {
          const eventName = msg.name === "error" ? "errorMessage" : msg.name;
          if (this._emitMessage) {
            this.emit("message", msg);
          }
          this.emit(eventName, msg);
        });
      }
      requestSsl() {
        this.stream.write(serialize.requestSsl());
      }
      startup(config22) {
        this.stream.write(serialize.startup(config22));
      }
      cancel(processID, secretKey) {
        this._send(serialize.cancel(processID, secretKey));
      }
      password(password) {
        this._send(serialize.password(password));
      }
      sendSASLInitialResponseMessage(mechanism, initialResponse) {
        this._send(serialize.sendSASLInitialResponseMessage(mechanism, initialResponse));
      }
      sendSCRAMClientFinalMessage(additionalData) {
        this._send(serialize.sendSCRAMClientFinalMessage(additionalData));
      }
      _send(buffer) {
        if (!this.stream.writable) {
          return false;
        }
        return this.stream.write(buffer);
      }
      query(text) {
        this._send(serialize.query(text));
      }
      // send parse message
      parse(query) {
        this._send(serialize.parse(query));
      }
      // send bind message
      bind(config22) {
        this._send(serialize.bind(config22));
      }
      // send execute message
      execute(config22) {
        this._send(serialize.execute(config22));
      }
      flush() {
        if (this.stream.writable) {
          this.stream.write(flushBuffer);
        }
      }
      sync() {
        this._ending = true;
        this._send(syncBuffer);
      }
      ref() {
        this.stream.ref();
      }
      unref() {
        this.stream.unref();
      }
      end() {
        this._ending = true;
        if (!this._connecting || !this.stream.writable) {
          this.stream.end();
          return;
        }
        return this.stream.write(endBuffer, () => {
          this.stream.end();
        });
      }
      close(msg) {
        this._send(serialize.close(msg));
      }
      describe(msg) {
        this._send(serialize.describe(msg));
      }
      sendCopyFromChunk(chunk) {
        this._send(serialize.copyData(chunk));
      }
      endCopyFrom() {
        this._send(serialize.copyDone());
      }
      sendCopyFail(msg) {
        this._send(serialize.copyFail(msg));
      }
    };
    module.exports = Connection2;
  }
});
var require_path = __commonJS({
  "node-built-in-modules:path"(exports, module) {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault7;
  }
});
var require_stream2 = __commonJS({
  "node-built-in-modules:stream"(exports, module) {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault8;
  }
});
var require_string_decoder = __commonJS({
  "node-built-in-modules:string_decoder"(exports, module) {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault9;
  }
});
var require_split2 = __commonJS({
  "../node_modules/split2/index.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var { Transform } = require_stream2();
    var { StringDecoder } = require_string_decoder();
    var kLast = Symbol("last");
    var kDecoder = Symbol("decoder");
    function transform(chunk, enc, cb) {
      let list;
      if (this.overflow) {
        const buf = this[kDecoder].write(chunk);
        list = buf.split(this.matcher);
        if (list.length === 1) return cb();
        list.shift();
        this.overflow = false;
      } else {
        this[kLast] += this[kDecoder].write(chunk);
        list = this[kLast].split(this.matcher);
      }
      this[kLast] = list.pop();
      for (let i = 0; i < list.length; i++) {
        try {
          push2(this, this.mapper(list[i]));
        } catch (error32) {
          return cb(error32);
        }
      }
      this.overflow = this[kLast].length > this.maxLength;
      if (this.overflow && !this.skipOverflow) {
        cb(new Error("maximum buffer reached"));
        return;
      }
      cb();
    }
    __name(transform, "transform");
    __name2(transform, "transform");
    function flush(cb) {
      this[kLast] += this[kDecoder].end();
      if (this[kLast]) {
        try {
          push2(this, this.mapper(this[kLast]));
        } catch (error32) {
          return cb(error32);
        }
      }
      cb();
    }
    __name(flush, "flush");
    __name2(flush, "flush");
    function push2(self, val) {
      if (val !== void 0) {
        self.push(val);
      }
    }
    __name(push2, "push2");
    __name2(push2, "push");
    function noop(incoming) {
      return incoming;
    }
    __name(noop, "noop");
    __name2(noop, "noop");
    function split(matcher, mapper, options) {
      matcher = matcher || /\r?\n/;
      mapper = mapper || noop;
      options = options || {};
      switch (arguments.length) {
        case 1:
          if (typeof matcher === "function") {
            mapper = matcher;
            matcher = /\r?\n/;
          } else if (typeof matcher === "object" && !(matcher instanceof RegExp) && !matcher[Symbol.split]) {
            options = matcher;
            matcher = /\r?\n/;
          }
          break;
        case 2:
          if (typeof matcher === "function") {
            options = mapper;
            mapper = matcher;
            matcher = /\r?\n/;
          } else if (typeof mapper === "object") {
            options = mapper;
            mapper = noop;
          }
      }
      options = Object.assign({}, options);
      options.autoDestroy = true;
      options.transform = transform;
      options.flush = flush;
      options.readableObjectMode = true;
      const stream = new Transform(options);
      stream[kLast] = "";
      stream[kDecoder] = new StringDecoder("utf8");
      stream.matcher = matcher;
      stream.mapper = mapper;
      stream.maxLength = options.maxLength;
      stream.skipOverflow = options.skipOverflow || false;
      stream.overflow = false;
      stream._destroy = function(err, cb) {
        this._writableState.errorEmitted = false;
        cb(err);
      };
      return stream;
    }
    __name(split, "split");
    __name2(split, "split");
    module.exports = split;
  }
});
var require_helper = __commonJS({
  "../node_modules/pgpass/lib/helper.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var path = require_path();
    var Stream2 = require_stream2().Stream;
    var split = require_split2();
    var util = require_util();
    var defaultPort = 5432;
    var isWin = process.platform === "win32";
    var warnStream = process.stderr;
    var S_IRWXG2 = 56;
    var S_IRWXO2 = 7;
    var S_IFMT2 = 61440;
    var S_IFREG2 = 32768;
    function isRegFile(mode) {
      return (mode & S_IFMT2) == S_IFREG2;
    }
    __name(isRegFile, "isRegFile");
    __name2(isRegFile, "isRegFile");
    var fieldNames = ["host", "port", "database", "user", "password"];
    var nrOfFields = fieldNames.length;
    var passKey = fieldNames[nrOfFields - 1];
    function warn32() {
      var isWritable = warnStream instanceof Stream2 && true === warnStream.writable;
      if (isWritable) {
        var args = Array.prototype.slice.call(arguments).concat("\n");
        warnStream.write(util.format.apply(util, args));
      }
    }
    __name(warn32, "warn3");
    __name2(warn32, "warn");
    Object.defineProperty(module.exports, "isWin", {
      get: /* @__PURE__ */ __name2(function() {
        return isWin;
      }, "get"),
      set: /* @__PURE__ */ __name2(function(val) {
        isWin = val;
      }, "set")
    });
    module.exports.warnTo = function(stream) {
      var old = warnStream;
      warnStream = stream;
      return old;
    };
    module.exports.getFileName = function(rawEnv) {
      var env22 = rawEnv || process.env;
      var file = env22.PGPASSFILE || (isWin ? path.join(env22.APPDATA || "./", "postgresql", "pgpass.conf") : path.join(env22.HOME || "./", ".pgpass"));
      return file;
    };
    module.exports.usePgPass = function(stats, fname) {
      if (Object.prototype.hasOwnProperty.call(process.env, "PGPASSWORD")) {
        return false;
      }
      if (isWin) {
        return true;
      }
      fname = fname || "<unkn>";
      if (!isRegFile(stats.mode)) {
        warn32('WARNING: password file "%s" is not a plain file', fname);
        return false;
      }
      if (stats.mode & (S_IRWXG2 | S_IRWXO2)) {
        warn32('WARNING: password file "%s" has group or world access; permissions should be u=rw (0600) or less', fname);
        return false;
      }
      return true;
    };
    var matcher = module.exports.match = function(connInfo, entry) {
      return fieldNames.slice(0, -1).reduce(function(prev, field, idx) {
        if (idx == 1) {
          if (Number(connInfo[field] || defaultPort) === Number(entry[field])) {
            return prev && true;
          }
        }
        return prev && (entry[field] === "*" || entry[field] === connInfo[field]);
      }, true);
    };
    module.exports.getPassword = function(connInfo, stream, cb) {
      var pass;
      var lineStream = stream.pipe(split());
      function onLine(line) {
        var entry = parseLine(line);
        if (entry && isValidEntry(entry) && matcher(connInfo, entry)) {
          pass = entry[passKey];
          lineStream.end();
        }
      }
      __name(onLine, "onLine");
      __name2(onLine, "onLine");
      var onEnd = /* @__PURE__ */ __name2(function() {
        stream.destroy();
        cb(pass);
      }, "onEnd");
      var onErr = /* @__PURE__ */ __name2(function(err) {
        stream.destroy();
        warn32("WARNING: error on reading file: %s", err);
        cb(void 0);
      }, "onErr");
      stream.on("error", onErr);
      lineStream.on("data", onLine).on("end", onEnd).on("error", onErr);
    };
    var parseLine = module.exports.parseLine = function(line) {
      if (line.length < 11 || line.match(/^\s+#/)) {
        return null;
      }
      var curChar = "";
      var prevChar = "";
      var fieldIdx = 0;
      var startIdx = 0;
      var endIdx = 0;
      var obj = {};
      var isLastField = false;
      var addToObj = /* @__PURE__ */ __name2(function(idx, i0, i1) {
        var field = line.substring(i0, i1);
        if (!Object.hasOwnProperty.call(process.env, "PGPASS_NO_DEESCAPE")) {
          field = field.replace(/\\([:\\])/g, "$1");
        }
        obj[fieldNames[idx]] = field;
      }, "addToObj");
      for (var i = 0; i < line.length - 1; i += 1) {
        curChar = line.charAt(i + 1);
        prevChar = line.charAt(i);
        isLastField = fieldIdx == nrOfFields - 1;
        if (isLastField) {
          addToObj(fieldIdx, startIdx);
          break;
        }
        if (i >= 0 && curChar == ":" && prevChar !== "\\") {
          addToObj(fieldIdx, startIdx, i + 1);
          startIdx = i + 2;
          fieldIdx += 1;
        }
      }
      obj = Object.keys(obj).length === nrOfFields ? obj : null;
      return obj;
    };
    var isValidEntry = module.exports.isValidEntry = function(entry) {
      var rules = {
        // host
        0: function(x) {
          return x.length > 0;
        },
        // port
        1: function(x) {
          if (x === "*") {
            return true;
          }
          x = Number(x);
          return isFinite(x) && x > 0 && x < 9007199254740992 && Math.floor(x) === x;
        },
        // database
        2: function(x) {
          return x.length > 0;
        },
        // username
        3: function(x) {
          return x.length > 0;
        },
        // password
        4: function(x) {
          return x.length > 0;
        }
      };
      for (var idx = 0; idx < fieldNames.length; idx += 1) {
        var rule = rules[idx];
        var value = entry[fieldNames[idx]] || "";
        var res = rule(value);
        if (!res) {
          return false;
        }
      }
      return true;
    };
  }
});
var require_lib = __commonJS({
  "../node_modules/pgpass/lib/index.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var path = require_path();
    var fs = require_fs();
    var helper = require_helper();
    module.exports = function(connInfo, cb) {
      var file = helper.getFileName();
      fs.stat(file, function(err, stat3) {
        if (err || !helper.usePgPass(stat3, file)) {
          return cb(void 0);
        }
        var st = fs.createReadStream(file);
        helper.getPassword(connInfo, st, cb);
      });
    };
    module.exports.warnTo = helper.warnTo;
  }
});
var require_client = __commonJS({
  "../node_modules/pg/lib/client.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var EventEmitter22 = require_events().EventEmitter;
    var utils = require_utils();
    var sasl = require_sasl();
    var TypeOverrides2 = require_type_overrides();
    var ConnectionParameters = require_connection_parameters();
    var Query2 = require_query();
    var defaults3 = require_defaults();
    var Connection2 = require_connection();
    var crypto = require_utils2();
    var Client2 = class extends EventEmitter22 {
      static {
        __name(this, "Client2");
      }
      static {
        __name2(this, "Client");
      }
      constructor(config22) {
        super();
        this.connectionParameters = new ConnectionParameters(config22);
        this.user = this.connectionParameters.user;
        this.database = this.connectionParameters.database;
        this.port = this.connectionParameters.port;
        this.host = this.connectionParameters.host;
        Object.defineProperty(this, "password", {
          configurable: true,
          enumerable: false,
          writable: true,
          value: this.connectionParameters.password
        });
        this.replication = this.connectionParameters.replication;
        const c = config22 || {};
        this._Promise = c.Promise || global.Promise;
        this._types = new TypeOverrides2(c.types);
        this._ending = false;
        this._ended = false;
        this._connecting = false;
        this._connected = false;
        this._connectionError = false;
        this._queryable = true;
        this.enableChannelBinding = Boolean(c.enableChannelBinding);
        this.connection = c.connection || new Connection2({
          stream: c.stream,
          ssl: this.connectionParameters.ssl,
          keepAlive: c.keepAlive || false,
          keepAliveInitialDelayMillis: c.keepAliveInitialDelayMillis || 0,
          encoding: this.connectionParameters.client_encoding || "utf8"
        });
        this.queryQueue = [];
        this.binary = c.binary || defaults3.binary;
        this.processID = null;
        this.secretKey = null;
        this.ssl = this.connectionParameters.ssl || false;
        if (this.ssl && this.ssl.key) {
          Object.defineProperty(this.ssl, "key", {
            enumerable: false
          });
        }
        this._connectionTimeoutMillis = c.connectionTimeoutMillis || 0;
      }
      _errorAllQueries(err) {
        const enqueueError = /* @__PURE__ */ __name2((query) => {
          process.nextTick(() => {
            query.handleError(err, this.connection);
          });
        }, "enqueueError");
        if (this.activeQuery) {
          enqueueError(this.activeQuery);
          this.activeQuery = null;
        }
        this.queryQueue.forEach(enqueueError);
        this.queryQueue.length = 0;
      }
      _connect(callback) {
        const self = this;
        const con = this.connection;
        this._connectionCallback = callback;
        if (this._connecting || this._connected) {
          const err = new Error("Client has already been connected. You cannot reuse a client.");
          process.nextTick(() => {
            callback(err);
          });
          return;
        }
        this._connecting = true;
        if (this._connectionTimeoutMillis > 0) {
          this.connectionTimeoutHandle = setTimeout(() => {
            con._ending = true;
            con.stream.destroy(new Error("timeout expired"));
          }, this._connectionTimeoutMillis);
          if (this.connectionTimeoutHandle.unref) {
            this.connectionTimeoutHandle.unref();
          }
        }
        if (this.host && this.host.indexOf("/") === 0) {
          con.connect(this.host + "/.s.PGSQL." + this.port);
        } else {
          con.connect(this.port, this.host);
        }
        con.on("connect", function() {
          if (self.ssl) {
            con.requestSsl();
          } else {
            con.startup(self.getStartupConf());
          }
        });
        con.on("sslconnect", function() {
          con.startup(self.getStartupConf());
        });
        this._attachListeners(con);
        con.once("end", () => {
          const error32 = this._ending ? new Error("Connection terminated") : new Error("Connection terminated unexpectedly");
          clearTimeout(this.connectionTimeoutHandle);
          this._errorAllQueries(error32);
          this._ended = true;
          if (!this._ending) {
            if (this._connecting && !this._connectionError) {
              if (this._connectionCallback) {
                this._connectionCallback(error32);
              } else {
                this._handleErrorEvent(error32);
              }
            } else if (!this._connectionError) {
              this._handleErrorEvent(error32);
            }
          }
          process.nextTick(() => {
            this.emit("end");
          });
        });
      }
      connect(callback) {
        if (callback) {
          this._connect(callback);
          return;
        }
        return new this._Promise((resolve, reject) => {
          this._connect((error32) => {
            if (error32) {
              reject(error32);
            } else {
              resolve();
            }
          });
        });
      }
      _attachListeners(con) {
        con.on("authenticationCleartextPassword", this._handleAuthCleartextPassword.bind(this));
        con.on("authenticationMD5Password", this._handleAuthMD5Password.bind(this));
        con.on("authenticationSASL", this._handleAuthSASL.bind(this));
        con.on("authenticationSASLContinue", this._handleAuthSASLContinue.bind(this));
        con.on("authenticationSASLFinal", this._handleAuthSASLFinal.bind(this));
        con.on("backendKeyData", this._handleBackendKeyData.bind(this));
        con.on("error", this._handleErrorEvent.bind(this));
        con.on("errorMessage", this._handleErrorMessage.bind(this));
        con.on("readyForQuery", this._handleReadyForQuery.bind(this));
        con.on("notice", this._handleNotice.bind(this));
        con.on("rowDescription", this._handleRowDescription.bind(this));
        con.on("dataRow", this._handleDataRow.bind(this));
        con.on("portalSuspended", this._handlePortalSuspended.bind(this));
        con.on("emptyQuery", this._handleEmptyQuery.bind(this));
        con.on("commandComplete", this._handleCommandComplete.bind(this));
        con.on("parseComplete", this._handleParseComplete.bind(this));
        con.on("copyInResponse", this._handleCopyInResponse.bind(this));
        con.on("copyData", this._handleCopyData.bind(this));
        con.on("notification", this._handleNotification.bind(this));
      }
      // TODO(bmc): deprecate pgpass "built in" integration since this.password can be a function
      // it can be supplied by the user if required - this is a breaking change!
      _checkPgPass(cb) {
        const con = this.connection;
        if (typeof this.password === "function") {
          this._Promise.resolve().then(() => this.password()).then((pass) => {
            if (pass !== void 0) {
              if (typeof pass !== "string") {
                con.emit("error", new TypeError("Password must be a string"));
                return;
              }
              this.connectionParameters.password = this.password = pass;
            } else {
              this.connectionParameters.password = this.password = null;
            }
            cb();
          }).catch((err) => {
            con.emit("error", err);
          });
        } else if (this.password !== null) {
          cb();
        } else {
          try {
            const pgPass = require_lib();
            pgPass(this.connectionParameters, (pass) => {
              if (void 0 !== pass) {
                this.connectionParameters.password = this.password = pass;
              }
              cb();
            });
          } catch (e) {
            this.emit("error", e);
          }
        }
      }
      _handleAuthCleartextPassword(msg) {
        this._checkPgPass(() => {
          this.connection.password(this.password);
        });
      }
      _handleAuthMD5Password(msg) {
        this._checkPgPass(async () => {
          try {
            const hashedPassword = await crypto.postgresMd5PasswordHash(this.user, this.password, msg.salt);
            this.connection.password(hashedPassword);
          } catch (e) {
            this.emit("error", e);
          }
        });
      }
      _handleAuthSASL(msg) {
        this._checkPgPass(() => {
          try {
            this.saslSession = sasl.startSession(msg.mechanisms, this.enableChannelBinding && this.connection.stream);
            this.connection.sendSASLInitialResponseMessage(this.saslSession.mechanism, this.saslSession.response);
          } catch (err) {
            this.connection.emit("error", err);
          }
        });
      }
      async _handleAuthSASLContinue(msg) {
        try {
          await sasl.continueSession(
            this.saslSession,
            this.password,
            msg.data,
            this.enableChannelBinding && this.connection.stream
          );
          this.connection.sendSCRAMClientFinalMessage(this.saslSession.response);
        } catch (err) {
          this.connection.emit("error", err);
        }
      }
      _handleAuthSASLFinal(msg) {
        try {
          sasl.finalizeSession(this.saslSession, msg.data);
          this.saslSession = null;
        } catch (err) {
          this.connection.emit("error", err);
        }
      }
      _handleBackendKeyData(msg) {
        this.processID = msg.processID;
        this.secretKey = msg.secretKey;
      }
      _handleReadyForQuery(msg) {
        if (this._connecting) {
          this._connecting = false;
          this._connected = true;
          clearTimeout(this.connectionTimeoutHandle);
          if (this._connectionCallback) {
            this._connectionCallback(null, this);
            this._connectionCallback = null;
          }
          this.emit("connect");
        }
        const { activeQuery } = this;
        this.activeQuery = null;
        this.readyForQuery = true;
        if (activeQuery) {
          activeQuery.handleReadyForQuery(this.connection);
        }
        this._pulseQueryQueue();
      }
      // if we receive an error event or error message
      // during the connection process we handle it here
      _handleErrorWhileConnecting(err) {
        if (this._connectionError) {
          return;
        }
        this._connectionError = true;
        clearTimeout(this.connectionTimeoutHandle);
        if (this._connectionCallback) {
          return this._connectionCallback(err);
        }
        this.emit("error", err);
      }
      // if we're connected and we receive an error event from the connection
      // this means the socket is dead - do a hard abort of all queries and emit
      // the socket error on the client as well
      _handleErrorEvent(err) {
        if (this._connecting) {
          return this._handleErrorWhileConnecting(err);
        }
        this._queryable = false;
        this._errorAllQueries(err);
        this.emit("error", err);
      }
      // handle error messages from the postgres backend
      _handleErrorMessage(msg) {
        if (this._connecting) {
          return this._handleErrorWhileConnecting(msg);
        }
        const activeQuery = this.activeQuery;
        if (!activeQuery) {
          this._handleErrorEvent(msg);
          return;
        }
        this.activeQuery = null;
        activeQuery.handleError(msg, this.connection);
      }
      _handleRowDescription(msg) {
        this.activeQuery.handleRowDescription(msg);
      }
      _handleDataRow(msg) {
        this.activeQuery.handleDataRow(msg);
      }
      _handlePortalSuspended(msg) {
        this.activeQuery.handlePortalSuspended(this.connection);
      }
      _handleEmptyQuery(msg) {
        this.activeQuery.handleEmptyQuery(this.connection);
      }
      _handleCommandComplete(msg) {
        if (this.activeQuery == null) {
          const error32 = new Error("Received unexpected commandComplete message from backend.");
          this._handleErrorEvent(error32);
          return;
        }
        this.activeQuery.handleCommandComplete(msg, this.connection);
      }
      _handleParseComplete() {
        if (this.activeQuery == null) {
          const error32 = new Error("Received unexpected parseComplete message from backend.");
          this._handleErrorEvent(error32);
          return;
        }
        if (this.activeQuery.name) {
          this.connection.parsedStatements[this.activeQuery.name] = this.activeQuery.text;
        }
      }
      _handleCopyInResponse(msg) {
        this.activeQuery.handleCopyInResponse(this.connection);
      }
      _handleCopyData(msg) {
        this.activeQuery.handleCopyData(msg, this.connection);
      }
      _handleNotification(msg) {
        this.emit("notification", msg);
      }
      _handleNotice(msg) {
        this.emit("notice", msg);
      }
      getStartupConf() {
        const params = this.connectionParameters;
        const data = {
          user: params.user,
          database: params.database
        };
        const appName = params.application_name || params.fallback_application_name;
        if (appName) {
          data.application_name = appName;
        }
        if (params.replication) {
          data.replication = "" + params.replication;
        }
        if (params.statement_timeout) {
          data.statement_timeout = String(parseInt(params.statement_timeout, 10));
        }
        if (params.lock_timeout) {
          data.lock_timeout = String(parseInt(params.lock_timeout, 10));
        }
        if (params.idle_in_transaction_session_timeout) {
          data.idle_in_transaction_session_timeout = String(parseInt(params.idle_in_transaction_session_timeout, 10));
        }
        if (params.options) {
          data.options = params.options;
        }
        return data;
      }
      cancel(client, query) {
        if (client.activeQuery === query) {
          const con = this.connection;
          if (this.host && this.host.indexOf("/") === 0) {
            con.connect(this.host + "/.s.PGSQL." + this.port);
          } else {
            con.connect(this.port, this.host);
          }
          con.on("connect", function() {
            con.cancel(client.processID, client.secretKey);
          });
        } else if (client.queryQueue.indexOf(query) !== -1) {
          client.queryQueue.splice(client.queryQueue.indexOf(query), 1);
        }
      }
      setTypeParser(oid, format, parseFn) {
        return this._types.setTypeParser(oid, format, parseFn);
      }
      getTypeParser(oid, format) {
        return this._types.getTypeParser(oid, format);
      }
      // escapeIdentifier and escapeLiteral moved to utility functions & exported
      // on PG
      // re-exported here for backwards compatibility
      escapeIdentifier(str2) {
        return utils.escapeIdentifier(str2);
      }
      escapeLiteral(str2) {
        return utils.escapeLiteral(str2);
      }
      _pulseQueryQueue() {
        if (this.readyForQuery === true) {
          this.activeQuery = this.queryQueue.shift();
          if (this.activeQuery) {
            this.readyForQuery = false;
            this.hasExecuted = true;
            const queryError = this.activeQuery.submit(this.connection);
            if (queryError) {
              process.nextTick(() => {
                this.activeQuery.handleError(queryError, this.connection);
                this.readyForQuery = true;
                this._pulseQueryQueue();
              });
            }
          } else if (this.hasExecuted) {
            this.activeQuery = null;
            this.emit("drain");
          }
        }
      }
      query(config22, values, callback) {
        let query;
        let result;
        let readTimeout;
        let readTimeoutTimer;
        let queryCallback;
        if (config22 === null || config22 === void 0) {
          throw new TypeError("Client was passed a null or undefined query");
        } else if (typeof config22.submit === "function") {
          readTimeout = config22.query_timeout || this.connectionParameters.query_timeout;
          result = query = config22;
          if (typeof values === "function") {
            query.callback = query.callback || values;
          }
        } else {
          readTimeout = config22.query_timeout || this.connectionParameters.query_timeout;
          query = new Query2(config22, values, callback);
          if (!query.callback) {
            result = new this._Promise((resolve, reject) => {
              query.callback = (err, res) => err ? reject(err) : resolve(res);
            }).catch((err) => {
              Error.captureStackTrace(err);
              throw err;
            });
          }
        }
        if (readTimeout) {
          queryCallback = query.callback;
          readTimeoutTimer = setTimeout(() => {
            const error32 = new Error("Query read timeout");
            process.nextTick(() => {
              query.handleError(error32, this.connection);
            });
            queryCallback(error32);
            query.callback = () => {
            };
            const index = this.queryQueue.indexOf(query);
            if (index > -1) {
              this.queryQueue.splice(index, 1);
            }
            this._pulseQueryQueue();
          }, readTimeout);
          query.callback = (err, res) => {
            clearTimeout(readTimeoutTimer);
            queryCallback(err, res);
          };
        }
        if (this.binary && !query.binary) {
          query.binary = true;
        }
        if (query._result && !query._result._types) {
          query._result._types = this._types;
        }
        if (!this._queryable) {
          process.nextTick(() => {
            query.handleError(new Error("Client has encountered a connection error and is not queryable"), this.connection);
          });
          return result;
        }
        if (this._ending) {
          process.nextTick(() => {
            query.handleError(new Error("Client was closed and is not queryable"), this.connection);
          });
          return result;
        }
        this.queryQueue.push(query);
        this._pulseQueryQueue();
        return result;
      }
      ref() {
        this.connection.ref();
      }
      unref() {
        this.connection.unref();
      }
      end(cb) {
        this._ending = true;
        if (!this.connection._connecting || this._ended) {
          if (cb) {
            cb();
          } else {
            return this._Promise.resolve();
          }
        }
        if (this.activeQuery || !this._queryable) {
          this.connection.stream.destroy();
        } else {
          this.connection.end();
        }
        if (cb) {
          this.connection.once("end", cb);
        } else {
          return new this._Promise((resolve) => {
            this.connection.once("end", resolve);
          });
        }
      }
    };
    Client2.Query = Query2;
    module.exports = Client2;
  }
});
var require_pg_pool = __commonJS({
  "../node_modules/pg-pool/index.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var EventEmitter22 = require_events().EventEmitter;
    var NOOP = /* @__PURE__ */ __name2(function() {
    }, "NOOP");
    var removeWhere = /* @__PURE__ */ __name2((list, predicate) => {
      const i = list.findIndex(predicate);
      return i === -1 ? void 0 : list.splice(i, 1)[0];
    }, "removeWhere");
    var IdleItem = class {
      static {
        __name(this, "IdleItem");
      }
      static {
        __name2(this, "IdleItem");
      }
      constructor(client, idleListener, timeoutId) {
        this.client = client;
        this.idleListener = idleListener;
        this.timeoutId = timeoutId;
      }
    };
    var PendingItem = class {
      static {
        __name(this, "PendingItem");
      }
      static {
        __name2(this, "PendingItem");
      }
      constructor(callback) {
        this.callback = callback;
      }
    };
    function throwOnDoubleRelease() {
      throw new Error("Release called on client which has already been released to the pool.");
    }
    __name(throwOnDoubleRelease, "throwOnDoubleRelease");
    __name2(throwOnDoubleRelease, "throwOnDoubleRelease");
    function promisify(Promise2, callback) {
      if (callback) {
        return { callback, result: void 0 };
      }
      let rej;
      let res;
      const cb = /* @__PURE__ */ __name2(function(err, client) {
        err ? rej(err) : res(client);
      }, "cb");
      const result = new Promise2(function(resolve, reject) {
        res = resolve;
        rej = reject;
      }).catch((err) => {
        Error.captureStackTrace(err);
        throw err;
      });
      return { callback: cb, result };
    }
    __name(promisify, "promisify");
    __name2(promisify, "promisify");
    function makeIdleListener(pool3, client) {
      return /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function idleListener(err) {
        err.client = client;
        client.removeListener("error", idleListener);
        client.on("error", () => {
          pool3.log("additional client error after disconnection due to error", err);
        });
        pool3._remove(client);
        pool3.emit("error", err, client);
      }, "idleListener"), "idleListener");
    }
    __name(makeIdleListener, "makeIdleListener");
    __name2(makeIdleListener, "makeIdleListener");
    var Pool2 = class extends EventEmitter22 {
      static {
        __name(this, "Pool2");
      }
      static {
        __name2(this, "Pool");
      }
      constructor(options, Client2) {
        super();
        this.options = Object.assign({}, options);
        if (options != null && "password" in options) {
          Object.defineProperty(this.options, "password", {
            configurable: true,
            enumerable: false,
            writable: true,
            value: options.password
          });
        }
        if (options != null && options.ssl && options.ssl.key) {
          Object.defineProperty(this.options.ssl, "key", {
            enumerable: false
          });
        }
        this.options.max = this.options.max || this.options.poolSize || 10;
        this.options.min = this.options.min || 0;
        this.options.maxUses = this.options.maxUses || Infinity;
        this.options.allowExitOnIdle = this.options.allowExitOnIdle || false;
        this.options.maxLifetimeSeconds = this.options.maxLifetimeSeconds || 0;
        this.log = this.options.log || function() {
        };
        this.Client = this.options.Client || Client2 || require_lib2().Client;
        this.Promise = this.options.Promise || global.Promise;
        if (typeof this.options.idleTimeoutMillis === "undefined") {
          this.options.idleTimeoutMillis = 1e4;
        }
        this._clients = [];
        this._idle = [];
        this._expired = /* @__PURE__ */ new WeakSet();
        this._pendingQueue = [];
        this._endCallback = void 0;
        this.ending = false;
        this.ended = false;
      }
      _isFull() {
        return this._clients.length >= this.options.max;
      }
      _isAboveMin() {
        return this._clients.length > this.options.min;
      }
      _pulseQueue() {
        this.log("pulse queue");
        if (this.ended) {
          this.log("pulse queue ended");
          return;
        }
        if (this.ending) {
          this.log("pulse queue on ending");
          if (this._idle.length) {
            this._idle.slice().map((item) => {
              this._remove(item.client);
            });
          }
          if (!this._clients.length) {
            this.ended = true;
            this._endCallback();
          }
          return;
        }
        if (!this._pendingQueue.length) {
          this.log("no queued requests");
          return;
        }
        if (!this._idle.length && this._isFull()) {
          return;
        }
        const pendingItem = this._pendingQueue.shift();
        if (this._idle.length) {
          const idleItem = this._idle.pop();
          clearTimeout(idleItem.timeoutId);
          const client = idleItem.client;
          client.ref && client.ref();
          const idleListener = idleItem.idleListener;
          return this._acquireClient(client, pendingItem, idleListener, false);
        }
        if (!this._isFull()) {
          return this.newClient(pendingItem);
        }
        throw new Error("unexpected condition");
      }
      _remove(client, callback) {
        const removed = removeWhere(this._idle, (item) => item.client === client);
        if (removed !== void 0) {
          clearTimeout(removed.timeoutId);
        }
        this._clients = this._clients.filter((c) => c !== client);
        const context22 = this;
        client.end(() => {
          context22.emit("remove", client);
          if (typeof callback === "function") {
            callback();
          }
        });
      }
      connect(cb) {
        if (this.ending) {
          const err = new Error("Cannot use a pool after calling end on the pool");
          return cb ? cb(err) : this.Promise.reject(err);
        }
        const response = promisify(this.Promise, cb);
        const result = response.result;
        if (this._isFull() || this._idle.length) {
          if (this._idle.length) {
            process.nextTick(() => this._pulseQueue());
          }
          if (!this.options.connectionTimeoutMillis) {
            this._pendingQueue.push(new PendingItem(response.callback));
            return result;
          }
          const queueCallback = /* @__PURE__ */ __name2((err, res, done) => {
            clearTimeout(tid);
            response.callback(err, res, done);
          }, "queueCallback");
          const pendingItem = new PendingItem(queueCallback);
          const tid = setTimeout(() => {
            removeWhere(this._pendingQueue, (i) => i.callback === queueCallback);
            pendingItem.timedOut = true;
            response.callback(new Error("timeout exceeded when trying to connect"));
          }, this.options.connectionTimeoutMillis);
          if (tid.unref) {
            tid.unref();
          }
          this._pendingQueue.push(pendingItem);
          return result;
        }
        this.newClient(new PendingItem(response.callback));
        return result;
      }
      newClient(pendingItem) {
        const client = new this.Client(this.options);
        this._clients.push(client);
        const idleListener = makeIdleListener(this, client);
        this.log("checking client timeout");
        let tid;
        let timeoutHit = false;
        if (this.options.connectionTimeoutMillis) {
          tid = setTimeout(() => {
            this.log("ending client due to timeout");
            timeoutHit = true;
            client.connection ? client.connection.stream.destroy() : client.end();
          }, this.options.connectionTimeoutMillis);
        }
        this.log("connecting new client");
        client.connect((err) => {
          if (tid) {
            clearTimeout(tid);
          }
          client.on("error", idleListener);
          if (err) {
            this.log("client failed to connect", err);
            this._clients = this._clients.filter((c) => c !== client);
            if (timeoutHit) {
              err = new Error("Connection terminated due to connection timeout", { cause: err });
            }
            this._pulseQueue();
            if (!pendingItem.timedOut) {
              pendingItem.callback(err, void 0, NOOP);
            }
          } else {
            this.log("new client connected");
            if (this.options.maxLifetimeSeconds !== 0) {
              const maxLifetimeTimeout = setTimeout(() => {
                this.log("ending client due to expired lifetime");
                this._expired.add(client);
                const idleIndex = this._idle.findIndex((idleItem) => idleItem.client === client);
                if (idleIndex !== -1) {
                  this._acquireClient(
                    client,
                    new PendingItem((err2, client2, clientRelease) => clientRelease()),
                    idleListener,
                    false
                  );
                }
              }, this.options.maxLifetimeSeconds * 1e3);
              maxLifetimeTimeout.unref();
              client.once("end", () => clearTimeout(maxLifetimeTimeout));
            }
            return this._acquireClient(client, pendingItem, idleListener, true);
          }
        });
      }
      // acquire a client for a pending work item
      _acquireClient(client, pendingItem, idleListener, isNew) {
        if (isNew) {
          this.emit("connect", client);
        }
        this.emit("acquire", client);
        client.release = this._releaseOnce(client, idleListener);
        client.removeListener("error", idleListener);
        if (!pendingItem.timedOut) {
          if (isNew && this.options.verify) {
            this.options.verify(client, (err) => {
              if (err) {
                client.release(err);
                return pendingItem.callback(err, void 0, NOOP);
              }
              pendingItem.callback(void 0, client, client.release);
            });
          } else {
            pendingItem.callback(void 0, client, client.release);
          }
        } else {
          if (isNew && this.options.verify) {
            this.options.verify(client, client.release);
          } else {
            client.release();
          }
        }
      }
      // returns a function that wraps _release and throws if called more than once
      _releaseOnce(client, idleListener) {
        let released = false;
        return (err) => {
          if (released) {
            throwOnDoubleRelease();
          }
          released = true;
          this._release(client, idleListener, err);
        };
      }
      // release a client back to the poll, include an error
      // to remove it from the pool
      _release(client, idleListener, err) {
        client.on("error", idleListener);
        client._poolUseCount = (client._poolUseCount || 0) + 1;
        this.emit("release", err, client);
        if (err || this.ending || !client._queryable || client._ending || client._poolUseCount >= this.options.maxUses) {
          if (client._poolUseCount >= this.options.maxUses) {
            this.log("remove expended client");
          }
          return this._remove(client, this._pulseQueue.bind(this));
        }
        const isExpired = this._expired.has(client);
        if (isExpired) {
          this.log("remove expired client");
          this._expired.delete(client);
          return this._remove(client, this._pulseQueue.bind(this));
        }
        let tid;
        if (this.options.idleTimeoutMillis && this._isAboveMin()) {
          tid = setTimeout(() => {
            this.log("remove idle client");
            this._remove(client, this._pulseQueue.bind(this));
          }, this.options.idleTimeoutMillis);
          if (this.options.allowExitOnIdle) {
            tid.unref();
          }
        }
        if (this.options.allowExitOnIdle) {
          client.unref();
        }
        this._idle.push(new IdleItem(client, idleListener, tid));
        this._pulseQueue();
      }
      query(text, values, cb) {
        if (typeof text === "function") {
          const response2 = promisify(this.Promise, text);
          setImmediate(function() {
            return response2.callback(new Error("Passing a function as the first parameter to pool.query is not supported"));
          });
          return response2.result;
        }
        if (typeof values === "function") {
          cb = values;
          values = void 0;
        }
        const response = promisify(this.Promise, cb);
        cb = response.callback;
        this.connect((err, client) => {
          if (err) {
            return cb(err);
          }
          let clientReleased = false;
          const onError = /* @__PURE__ */ __name2((err2) => {
            if (clientReleased) {
              return;
            }
            clientReleased = true;
            client.release(err2);
            cb(err2);
          }, "onError");
          client.once("error", onError);
          this.log("dispatching query");
          try {
            client.query(text, values, (err2, res) => {
              this.log("query dispatched");
              client.removeListener("error", onError);
              if (clientReleased) {
                return;
              }
              clientReleased = true;
              client.release(err2);
              if (err2) {
                return cb(err2);
              }
              return cb(void 0, res);
            });
          } catch (err2) {
            client.release(err2);
            return cb(err2);
          }
        });
        return response.result;
      }
      end(cb) {
        this.log("ending");
        if (this.ending) {
          const err = new Error("Called end on pool more than once");
          return cb ? cb(err) : this.Promise.reject(err);
        }
        this.ending = true;
        const promised = promisify(this.Promise, cb);
        this._endCallback = promised.callback;
        this._pulseQueue();
        return promised.result;
      }
      get waitingCount() {
        return this._pendingQueue.length;
      }
      get idleCount() {
        return this._idle.length;
      }
      get expiredCount() {
        return this._clients.reduce((acc, client) => acc + (this._expired.has(client) ? 1 : 0), 0);
      }
      get totalCount() {
        return this._clients.length;
      }
    };
    module.exports = Pool2;
  }
});
var require_query2 = __commonJS({
  "../node_modules/pg/lib/native/query.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var EventEmitter22 = require_events().EventEmitter;
    var util = require_util();
    var utils = require_utils();
    var NativeQuery = module.exports = function(config22, values, callback) {
      EventEmitter22.call(this);
      config22 = utils.normalizeQueryConfig(config22, values, callback);
      this.text = config22.text;
      this.values = config22.values;
      this.name = config22.name;
      this.queryMode = config22.queryMode;
      this.callback = config22.callback;
      this.state = "new";
      this._arrayMode = config22.rowMode === "array";
      this._emitRowEvents = false;
      this.on(
        "newListener",
        function(event) {
          if (event === "row") this._emitRowEvents = true;
        }.bind(this)
      );
    };
    util.inherits(NativeQuery, EventEmitter22);
    var errorFieldMap = {
      sqlState: "code",
      statementPosition: "position",
      messagePrimary: "message",
      context: "where",
      schemaName: "schema",
      tableName: "table",
      columnName: "column",
      dataTypeName: "dataType",
      constraintName: "constraint",
      sourceFile: "file",
      sourceLine: "line",
      sourceFunction: "routine"
    };
    NativeQuery.prototype.handleError = function(err) {
      const fields = this.native.pq.resultErrorFields();
      if (fields) {
        for (const key in fields) {
          const normalizedFieldName = errorFieldMap[key] || key;
          err[normalizedFieldName] = fields[key];
        }
      }
      if (this.callback) {
        this.callback(err);
      } else {
        this.emit("error", err);
      }
      this.state = "error";
    };
    NativeQuery.prototype.then = function(onSuccess, onFailure) {
      return this._getPromise().then(onSuccess, onFailure);
    };
    NativeQuery.prototype.catch = function(callback) {
      return this._getPromise().catch(callback);
    };
    NativeQuery.prototype._getPromise = function() {
      if (this._promise) return this._promise;
      this._promise = new Promise(
        function(resolve, reject) {
          this._once("end", resolve);
          this._once("error", reject);
        }.bind(this)
      );
      return this._promise;
    };
    NativeQuery.prototype.submit = function(client) {
      this.state = "running";
      const self = this;
      this.native = client.native;
      client.native.arrayMode = this._arrayMode;
      let after = /* @__PURE__ */ __name2(function(err, rows, results) {
        client.native.arrayMode = false;
        setImmediate(function() {
          self.emit("_done");
        });
        if (err) {
          return self.handleError(err);
        }
        if (self._emitRowEvents) {
          if (results.length > 1) {
            rows.forEach((rowOfRows, i) => {
              rowOfRows.forEach((row) => {
                self.emit("row", row, results[i]);
              });
            });
          } else {
            rows.forEach(function(row) {
              self.emit("row", row, results);
            });
          }
        }
        self.state = "end";
        self.emit("end", results);
        if (self.callback) {
          self.callback(null, results);
        }
      }, "after");
      if (process.domain) {
        after = process.domain.bind(after);
      }
      if (this.name) {
        if (this.name.length > 63) {
          console.error("Warning! Postgres only supports 63 characters for query names.");
          console.error("You supplied %s (%s)", this.name, this.name.length);
          console.error("This can cause conflicts and silent errors executing queries");
        }
        const values = (this.values || []).map(utils.prepareValue);
        if (client.namedQueries[this.name]) {
          if (this.text && client.namedQueries[this.name] !== this.text) {
            const err = new Error(`Prepared statements must be unique - '${this.name}' was used for a different statement`);
            return after(err);
          }
          return client.native.execute(this.name, values, after);
        }
        return client.native.prepare(this.name, this.text, values.length, function(err) {
          if (err) return after(err);
          client.namedQueries[self.name] = self.text;
          return self.native.execute(self.name, values, after);
        });
      } else if (this.values) {
        if (!Array.isArray(this.values)) {
          const err = new Error("Query values must be an array");
          return after(err);
        }
        const vals = this.values.map(utils.prepareValue);
        client.native.query(this.text, vals, after);
      } else if (this.queryMode === "extended") {
        client.native.query(this.text, [], after);
      } else {
        client.native.query(this.text, after);
      }
    };
  }
});
var require_client2 = __commonJS({
  "../node_modules/pg/lib/native/client.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var Native;
    try {
      Native = __require2("pg-native");
    } catch (e) {
      throw e;
    }
    var TypeOverrides2 = require_type_overrides();
    var EventEmitter22 = require_events().EventEmitter;
    var util = require_util();
    var ConnectionParameters = require_connection_parameters();
    var NativeQuery = require_query2();
    var Client2 = module.exports = function(config22) {
      EventEmitter22.call(this);
      config22 = config22 || {};
      this._Promise = config22.Promise || global.Promise;
      this._types = new TypeOverrides2(config22.types);
      this.native = new Native({
        types: this._types
      });
      this._queryQueue = [];
      this._ending = false;
      this._connecting = false;
      this._connected = false;
      this._queryable = true;
      const cp3 = this.connectionParameters = new ConnectionParameters(config22);
      if (config22.nativeConnectionString) cp3.nativeConnectionString = config22.nativeConnectionString;
      this.user = cp3.user;
      Object.defineProperty(this, "password", {
        configurable: true,
        enumerable: false,
        writable: true,
        value: cp3.password
      });
      this.database = cp3.database;
      this.host = cp3.host;
      this.port = cp3.port;
      this.namedQueries = {};
    };
    Client2.Query = NativeQuery;
    util.inherits(Client2, EventEmitter22);
    Client2.prototype._errorAllQueries = function(err) {
      const enqueueError = /* @__PURE__ */ __name2((query) => {
        process.nextTick(() => {
          query.native = this.native;
          query.handleError(err);
        });
      }, "enqueueError");
      if (this._hasActiveQuery()) {
        enqueueError(this._activeQuery);
        this._activeQuery = null;
      }
      this._queryQueue.forEach(enqueueError);
      this._queryQueue.length = 0;
    };
    Client2.prototype._connect = function(cb) {
      const self = this;
      if (this._connecting) {
        process.nextTick(() => cb(new Error("Client has already been connected. You cannot reuse a client.")));
        return;
      }
      this._connecting = true;
      this.connectionParameters.getLibpqConnectionString(function(err, conString) {
        if (self.connectionParameters.nativeConnectionString) conString = self.connectionParameters.nativeConnectionString;
        if (err) return cb(err);
        self.native.connect(conString, function(err2) {
          if (err2) {
            self.native.end();
            return cb(err2);
          }
          self._connected = true;
          self.native.on("error", function(err3) {
            self._queryable = false;
            self._errorAllQueries(err3);
            self.emit("error", err3);
          });
          self.native.on("notification", function(msg) {
            self.emit("notification", {
              channel: msg.relname,
              payload: msg.extra
            });
          });
          self.emit("connect");
          self._pulseQueryQueue(true);
          cb();
        });
      });
    };
    Client2.prototype.connect = function(callback) {
      if (callback) {
        this._connect(callback);
        return;
      }
      return new this._Promise((resolve, reject) => {
        this._connect((error32) => {
          if (error32) {
            reject(error32);
          } else {
            resolve();
          }
        });
      });
    };
    Client2.prototype.query = function(config22, values, callback) {
      let query;
      let result;
      let readTimeout;
      let readTimeoutTimer;
      let queryCallback;
      if (config22 === null || config22 === void 0) {
        throw new TypeError("Client was passed a null or undefined query");
      } else if (typeof config22.submit === "function") {
        readTimeout = config22.query_timeout || this.connectionParameters.query_timeout;
        result = query = config22;
        if (typeof values === "function") {
          config22.callback = values;
        }
      } else {
        readTimeout = config22.query_timeout || this.connectionParameters.query_timeout;
        query = new NativeQuery(config22, values, callback);
        if (!query.callback) {
          let resolveOut, rejectOut;
          result = new this._Promise((resolve, reject) => {
            resolveOut = resolve;
            rejectOut = reject;
          }).catch((err) => {
            Error.captureStackTrace(err);
            throw err;
          });
          query.callback = (err, res) => err ? rejectOut(err) : resolveOut(res);
        }
      }
      if (readTimeout) {
        queryCallback = query.callback;
        readTimeoutTimer = setTimeout(() => {
          const error32 = new Error("Query read timeout");
          process.nextTick(() => {
            query.handleError(error32, this.connection);
          });
          queryCallback(error32);
          query.callback = () => {
          };
          const index = this._queryQueue.indexOf(query);
          if (index > -1) {
            this._queryQueue.splice(index, 1);
          }
          this._pulseQueryQueue();
        }, readTimeout);
        query.callback = (err, res) => {
          clearTimeout(readTimeoutTimer);
          queryCallback(err, res);
        };
      }
      if (!this._queryable) {
        query.native = this.native;
        process.nextTick(() => {
          query.handleError(new Error("Client has encountered a connection error and is not queryable"));
        });
        return result;
      }
      if (this._ending) {
        query.native = this.native;
        process.nextTick(() => {
          query.handleError(new Error("Client was closed and is not queryable"));
        });
        return result;
      }
      this._queryQueue.push(query);
      this._pulseQueryQueue();
      return result;
    };
    Client2.prototype.end = function(cb) {
      const self = this;
      this._ending = true;
      if (!this._connected) {
        this.once("connect", this.end.bind(this, cb));
      }
      let result;
      if (!cb) {
        result = new this._Promise(function(resolve, reject) {
          cb = /* @__PURE__ */ __name2((err) => err ? reject(err) : resolve(), "cb");
        });
      }
      this.native.end(function() {
        self._errorAllQueries(new Error("Connection terminated"));
        process.nextTick(() => {
          self.emit("end");
          if (cb) cb();
        });
      });
      return result;
    };
    Client2.prototype._hasActiveQuery = function() {
      return this._activeQuery && this._activeQuery.state !== "error" && this._activeQuery.state !== "end";
    };
    Client2.prototype._pulseQueryQueue = function(initialConnection) {
      if (!this._connected) {
        return;
      }
      if (this._hasActiveQuery()) {
        return;
      }
      const query = this._queryQueue.shift();
      if (!query) {
        if (!initialConnection) {
          this.emit("drain");
        }
        return;
      }
      this._activeQuery = query;
      query.submit(this);
      const self = this;
      query.once("_done", function() {
        self._pulseQueryQueue();
      });
    };
    Client2.prototype.cancel = function(query) {
      if (this._activeQuery === query) {
        this.native.cancel(function() {
        });
      } else if (this._queryQueue.indexOf(query) !== -1) {
        this._queryQueue.splice(this._queryQueue.indexOf(query), 1);
      }
    };
    Client2.prototype.ref = function() {
    };
    Client2.prototype.unref = function() {
    };
    Client2.prototype.setTypeParser = function(oid, format, parseFn) {
      return this._types.setTypeParser(oid, format, parseFn);
    };
    Client2.prototype.getTypeParser = function(oid, format) {
      return this._types.getTypeParser(oid, format);
    };
  }
});
var require_native = __commonJS({
  "../node_modules/pg/lib/native/index.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = require_client2();
  }
});
var require_lib2 = __commonJS({
  "../node_modules/pg/lib/index.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var Client2 = require_client();
    var defaults3 = require_defaults();
    var Connection2 = require_connection();
    var Result2 = require_result();
    var utils = require_utils();
    var Pool2 = require_pg_pool();
    var TypeOverrides2 = require_type_overrides();
    var { DatabaseError: DatabaseError2 } = require_dist();
    var { escapeIdentifier: escapeIdentifier2, escapeLiteral: escapeLiteral2 } = require_utils();
    var poolFactory = /* @__PURE__ */ __name2((Client3) => {
      return class BoundPool extends Pool2 {
        static {
          __name(this, "BoundPool");
        }
        static {
          __name2(this, "BoundPool");
        }
        constructor(options) {
          super(options, Client3);
        }
      };
    }, "poolFactory");
    var PG = /* @__PURE__ */ __name2(function(clientConstructor) {
      this.defaults = defaults3;
      this.Client = clientConstructor;
      this.Query = this.Client.Query;
      this.Pool = poolFactory(this.Client);
      this._pools = [];
      this.Connection = Connection2;
      this.types = require_pg_types();
      this.DatabaseError = DatabaseError2;
      this.TypeOverrides = TypeOverrides2;
      this.escapeIdentifier = escapeIdentifier2;
      this.escapeLiteral = escapeLiteral2;
      this.Result = Result2;
      this.utils = utils;
    }, "PG");
    if (typeof process.env.NODE_PG_FORCE_NATIVE !== "undefined") {
      module.exports = new PG(require_native());
    } else {
      module.exports = new PG(Client2);
      Object.defineProperty(module.exports, "native", {
        configurable: true,
        enumerable: false,
        get() {
          let native = null;
          try {
            native = new PG(require_native());
          } catch (err) {
            if (err.code !== "MODULE_NOT_FOUND") {
              throw err;
            }
          }
          Object.defineProperty(module.exports, "native", {
            value: native
          });
          return native;
        }
      });
    }
  }
});
var import_lib;
var Client;
var Pool;
var Connection;
var types;
var Query;
var DatabaseError;
var escapeIdentifier;
var escapeLiteral;
var Result;
var TypeOverrides;
var defaults2;
var init_esm = __esm({
  "../node_modules/pg/esm/index.mjs"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    import_lib = __toESM(require_lib2(), 1);
    Client = import_lib.default.Client;
    Pool = import_lib.default.Pool;
    Connection = import_lib.default.Connection;
    types = import_lib.default.types;
    Query = import_lib.default.Query;
    DatabaseError = import_lib.default.DatabaseError;
    escapeIdentifier = import_lib.default.escapeIdentifier;
    escapeLiteral = import_lib.default.escapeLiteral;
    Result = import_lib.default.Result;
    TypeOverrides = import_lib.default.TypeOverrides;
    defaults2 = import_lib.default.defaults;
  }
});
function jsonResponse(statusCode, body, headers = {}) {
  return new Response(JSON.stringify(body), { status: statusCode, headers: { ...HEADERS2, ...headers } });
}
__name(jsonResponse, "jsonResponse");
function requireAdmin(request, env22) {
  const header = request.headers.get("x-admin-token") || request.headers.get("X-Admin-Token");
  return header && env22.ADMIN_TOKEN && header === env22.ADMIN_TOKEN;
}
__name(requireAdmin, "requireAdmin");
function getPool(env22) {
  if (!pool) {
    pool = new Pool({ connectionString: env22.NEON_DATABASE_URL, ssl: { rejectUnauthorized: true, mode: "require" } });
  }
  return pool;
}
__name(getPool, "getPool");
async function onRequest2(context22) {
  const { request, env: env22 } = context22;
  if (request.method === "OPTIONS") {
    return new Response("", { status: 200, headers: HEADERS2 });
  }
  const pool3 = getPool(env22);
  const client = await pool3.connect();
  try {
    if (request.method === "GET") {
      const isAdmin = requireAdmin(request, env22);
      const url = new URL(request.url);
      const id = url.searchParams.get("id");
      const slug = url.searchParams.get("slug");
      if (id) {
        const { rows: rows2 } = await client.query("SELECT * FROM news_posts WHERE id = $1", [id]);
        return rows2[0] ? jsonResponse(200, rows2[0]) : jsonResponse(404, { error: "Not found" });
      }
      if (slug) {
        const { rows: rows2 } = await client.query("SELECT * FROM news_posts WHERE slug = $1", [slug]);
        return rows2[0] ? jsonResponse(200, rows2[0]) : jsonResponse(404, { error: "Not found" });
      }
      const { rows } = await client.query(isAdmin ? "SELECT * FROM news_posts ORDER BY created_at DESC" : "SELECT * FROM news_posts WHERE published = true ORDER BY created_at DESC");
      return jsonResponse(200, rows);
    }
    if (request.method === "POST") {
      if (!requireAdmin(request, env22)) return jsonResponse(401, { error: "Unauthorized" });
      const { title: title22, content, imageUrl, published } = await request.json().catch(() => ({}));
      if (!title22 || !content) return jsonResponse(400, { error: "Missing title or content" });
      const slug = (title22 || "").toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
      const { rows } = await client.query(`INSERT INTO news_posts (title, content, image_url, published, slug, created_at, updated_at) VALUES ($1,$2,$3,$4,$5,NOW(),NOW()) RETURNING *`, [title22, content, imageUrl || null, !!published, slug]);
      return jsonResponse(200, rows[0]);
    }
    if (request.method === "PUT") {
      if (!requireAdmin(request, env22)) return jsonResponse(401, { error: "Unauthorized" });
      const { id, title: title22, content, imageUrl, published } = await request.json().catch(() => ({}));
      if (!id) return jsonResponse(400, { error: "Missing id" });
      const { rows } = await client.query(`UPDATE news_posts SET title = COALESCE($2,title), content = COALESCE($3,content), image_url = COALESCE($4,image_url), published = COALESCE($5,published), updated_at = NOW() WHERE id = $1 RETURNING *`, [id, title22, content, imageUrl, typeof published === "boolean" ? published : null]);
      return rows[0] ? jsonResponse(200, rows[0]) : jsonResponse(404, { error: "Not found" });
    }
    return jsonResponse(405, { error: "Method not allowed" });
  } catch (e) {
    console.error(e);
    return jsonResponse(500, { error: "Internal server error" });
  } finally {
    client.release();
  }
}
__name(onRequest2, "onRequest2");
var HEADERS2;
var pool;
var init_news = __esm({
  "api/news.js"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_esm();
    HEADERS2 = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, X-Admin-Token",
      "Access-Control-Allow-Methods": "GET,POST,PUT,OPTIONS"
    };
    __name2(jsonResponse, "jsonResponse");
    __name2(requireAdmin, "requireAdmin");
    __name2(getPool, "getPool");
    __name2(onRequest2, "onRequest");
  }
});
function parseOpenAIText(response) {
  if (!response) return "";
  if (typeof response.output_text === "string" && response.output_text.trim()) {
    return response.output_text.trim();
  }
  const chunks = [];
  for (const item of response.output || []) {
    for (const part of item.content || []) {
      const value = typeof part.output_text === "string" ? part.output_text : typeof part.summary_text === "string" ? part.summary_text : typeof part.text === "string" ? part.text : void 0;
      if (typeof value === "string" && value.trim()) chunks.push(value.trim());
    }
  }
  return chunks.join("\n").trim();
}
__name(parseOpenAIText, "parseOpenAIText");
function parseOpenAISources(response) {
  const seen = /* @__PURE__ */ new Set();
  const results = [];
  if (!response || !Array.isArray(response.included)) return results;
  for (const item of response.included) {
    if (item?.type !== "web_search_call") continue;
    const sources = item?.action?.sources;
    if (!Array.isArray(sources)) continue;
    for (const source of sources) {
      const url = source?.url;
      if (!url || seen.has(url)) continue;
      seen.add(url);
      results.push({ title: source?.title || url, url });
    }
  }
  return results;
}
__name(parseOpenAISources, "parseOpenAISources");
async function onRequest3(context22) {
  const { request, env: env22 } = context22;
  if (request.method === "OPTIONS") {
    return new Response("", { status: 200, headers: HEADERS3 });
  }
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: HEADERS3 });
  }
  try {
    const body = await request.json().catch(() => ({}));
    const topic = body.topic;
    const provider = String(body.provider || "gemini").toLowerCase();
    if (!topic) {
      return new Response(JSON.stringify({ error: "Missing topic" }), { status: 400, headers: HEADERS3 });
    }
    const result = provider === "openai" ? await generateWithOpenAI2(topic, env22) : await generateWithGemini(topic, env22);
    return new Response(JSON.stringify(result.body), { status: result.status, headers: HEADERS3 });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "Generation failed" }), { status: 500, headers: HEADERS3 });
  }
}
__name(onRequest3, "onRequest3");
async function generateWithOpenAI2(topic, env22) {
  const apiKey = env22.OPENAI_API_KEY;
  if (!apiKey) {
    return { status: 500, body: { error: "OPENAI_API_KEY not set" } };
  }
  const openai = new openai_default({ apiKey });
  try {
    const response = await openai.responses.create({
      prompt: OPENAI_PROMPT2,
      input: [
        {
          role: "user",
          content: [
            { type: "input_text", text: String(topic).trim() }
          ]
        }
      ],
      reasoning: { summary: "auto" },
      tools: [
        {
          type: "web_search",
          filters: null,
          search_context_size: "high",
          user_location: { type: "approximate", city: "stockholm", country: "SE", region: null, timezone: null }
        },
        {
          type: "image_generation",
          background: "auto",
          moderation: "low",
          output_compression: 100,
          output_format: "png",
          quality: "auto",
          size: "1536x1024"
        }
      ],
      store: true,
      include: ["reasoning.encrypted_content", "web_search_call.action.sources"]
    });
    const text = parseOpenAIText(response);
    if (!text) {
      console.error("OpenAI custom prompt returned no text");
      return { status: 502, body: { error: "Ingen text genererades av OpenAI" } };
    }
    const lines = text.split("\n");
    const firstLine = lines.shift() || "";
    const title22 = firstLine.replace(/^\s*#+\s*/, "").trim().slice(0, 160);
    const content = lines.join("\n").trim() || firstLine.trim();
    const sources = parseOpenAISources(response);
    return { status: 200, body: { title: title22, content, sources } };
  } catch (error32) {
    console.error("OpenAI article generation failed:", error32);
    const message = error32?.error?.message || error32?.message || "OpenAI request failed";
    return { status: 502, body: { error: message } };
  }
}
__name(generateWithOpenAI2, "generateWithOpenAI2");
async function generateWithGemini(topic, env22) {
  const apiKey = env22.GEMINI_API_KEY;
  if (!apiKey) {
    return { status: 500, body: { error: "GEMINI_API_KEY not set" } };
  }
  try {
    const prompt = `Du \xE4r en svensk journalist. Skriv en engagerande nyhetsartikel om "${topic}". Inled med en rubrik p\xE5 en rad och f\xF6lj med 3\u20135 stycken br\xF6dtext. Inkludera fakta, citat och sammanhang.`;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(GEMINI_MODEL)}:generateContent?key=${apiKey}`;
    const payload = {
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048
      }
    };
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(25e3)
      // 25s timeout (Cloudflare has 30s limit)
    });
    const data = await response.json().catch((err) => {
      console.error("Failed to parse Gemini response:", err);
      return {};
    });
    if (!response.ok) {
      console.error("Gemini API error:", {
        status: response.status,
        statusText: response.statusText,
        data
      });
      const message = data?.error?.message || `Gemini request failed (${response.status})`;
      return { status: 502, body: { error: message } };
    }
    const candidates = Array.isArray(data?.candidates) ? data.candidates : [];
    const segments = [];
    for (const candidate of candidates) {
      for (const part of candidate?.content?.parts || []) {
        if (typeof part.text === "string" && part.text.trim()) {
          segments.push(part.text.trim());
        }
      }
    }
    const text = segments.join("\n").trim();
    if (!text) {
      console.error("Gemini response missing text payload", data);
      return { status: 502, body: { error: "Ingen text genererades av Gemini" } };
    }
    const lines = text.split("\n");
    const firstLine = lines.shift() || "";
    const title22 = firstLine.replace(/^\s*#+\s*/, "").trim().slice(0, 160);
    const content = lines.join("\n").trim() || firstLine.trim();
    return { status: 200, body: { title: title22, content, sources: [] } };
  } catch (error32) {
    console.error("Gemini article generation failed:", error32);
    const message = error32?.message || "Gemini request failed";
    return { status: 502, body: { error: message } };
  }
}
__name(generateWithGemini, "generateWithGemini");
var HEADERS3;
var OPENAI_PROMPT2;
var GEMINI_MODEL;
var init_news_generate = __esm({
  "api/news-generate.js"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_openai();
    HEADERS3 = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, X-Admin-Token",
      "Access-Control-Allow-Methods": "POST,OPTIONS"
    };
    OPENAI_PROMPT2 = { id: "pmpt_68dd621211e48194a9bcb0f3b88f51c40c83dce5f116999b", version: "2" };
    GEMINI_MODEL = "gemini-2.5-flash";
    __name2(parseOpenAIText, "parseOpenAIText");
    __name2(parseOpenAISources, "parseOpenAISources");
    __name2(onRequest3, "onRequest");
    __name2(generateWithOpenAI2, "generateWithOpenAI");
    __name2(generateWithGemini, "generateWithGemini");
  }
});
function getPool2(env22) {
  if (!pool2) {
    pool2 = new Pool({
      connectionString: env22.NEON_DATABASE_URL,
      ssl: { rejectUnauthorized: true, mode: "require" }
    });
  }
  return pool2;
}
__name(getPool2, "getPool2");
async function onRequest4(context22) {
  const { request, env: env22 } = context22;
  if (request.method === "OPTIONS") {
    return new Response("", { status: 200, headers: HEADERS4 });
  }
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: HEADERS4 });
  }
  try {
    const { email } = await request.json();
    if (!email || !email.includes("@")) {
      return new Response(JSON.stringify({ error: "Invalid email address" }), { status: 400, headers: HEADERS4 });
    }
    const pool3 = getPool2(env22);
    const client = await pool3.connect();
    try {
      const result = await client.query(
        `INSERT INTO newsletter_subscribers (email, created_at) VALUES ($1, NOW()) ON CONFLICT (email) DO NOTHING RETURNING id`,
        [email]
      );
      return new Response(JSON.stringify({ success: true, message: "Successfully subscribed", isNew: result.rows.length > 0 }), { status: 200, headers: HEADERS4 });
    } finally {
      client.release();
    }
  } catch (error32) {
    console.error("Database error:", error32);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500, headers: HEADERS4 });
  }
}
__name(onRequest4, "onRequest4");
var HEADERS4;
var pool2;
var init_subscribe = __esm({
  "api/subscribe.js"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_esm();
    HEADERS4 = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST,OPTIONS"
    };
    __name2(getPool2, "getPool");
    __name2(onRequest4, "onRequest");
  }
});
async function onRequest5(context22) {
  const { request, env: env22 } = context22;
  const HEADERS5 = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, X-Admin-Token",
    "Access-Control-Allow-Methods": "POST,OPTIONS"
  };
  if (request.method === "OPTIONS") {
    return new Response("", { status: 200, headers: HEADERS5 });
  }
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: HEADERS5 });
  }
  const key = env22.BRAVE_API_KEY;
  if (!key) {
    return new Response(JSON.stringify({ error: "BRAVE_API_KEY not set" }), { status: 500, headers: HEADERS5 });
  }
  try {
    const { query, limit: limit2 } = await request.json().catch(() => ({}));
    if (!query) return new Response(JSON.stringify({ error: "Missing query" }), { status: 400, headers: HEADERS5 });
    const q = encodeURIComponent(query);
    const url = `https://api.search.brave.com/res/v1/web/search?q=${q}&count=${Math.min(Number(limit2) || 5, 10)}`;
    const resp = await fetch(url, { headers: { "Accept": "application/json", "X-Subscription-Token": key } });
    const data = await resp.json().catch(() => ({}));
    if (!resp.ok) {
      const message = data?.message || data?.error || JSON.stringify(data).slice(0, 500);
      return new Response(JSON.stringify({ error: message }), { status: 500, headers: HEADERS5 });
    }
    const items = (data?.web?.results || []).map((r) => ({
      title: r.title,
      url: r.url,
      snippet: r.description || r.snippet || ""
    }));
    return new Response(JSON.stringify({ results: items }), { status: 200, headers: HEADERS5 });
  } catch (e) {
    console.error("Brave search failed", e);
    return new Response(JSON.stringify({ error: "Search failed" }), { status: 500, headers: HEADERS5 });
  }
}
__name(onRequest5, "onRequest5");
var init_web_search = __esm({
  "api/web-search.js"() {
    init_functionsRoutes_0_40415050906190264();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    __name2(onRequest5, "onRequest");
  }
});
var routes;
var init_functionsRoutes_0_40415050906190264 = __esm({
  "../.wrangler/tmp/pages-Qylb6p/functionsRoutes-0.40415050906190264.mjs"() {
    init_image_generate();
    init_news();
    init_news_generate();
    init_subscribe();
    init_web_search();
    routes = [
      {
        routePath: "/api/image-generate",
        mountPath: "/api",
        method: "",
        middlewares: [],
        modules: [onRequest]
      },
      {
        routePath: "/api/news",
        mountPath: "/api",
        method: "",
        middlewares: [],
        modules: [onRequest2]
      },
      {
        routePath: "/api/news-generate",
        mountPath: "/api",
        method: "",
        middlewares: [],
        modules: [onRequest3]
      },
      {
        routePath: "/api/subscribe",
        mountPath: "/api",
        method: "",
        middlewares: [],
        modules: [onRequest4]
      },
      {
        routePath: "/api/web-search",
        mountPath: "/api",
        method: "",
        middlewares: [],
        modules: [onRequest5]
      }
    ];
  }
});
init_functionsRoutes_0_40415050906190264();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
init_functionsRoutes_0_40415050906190264();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
init_functionsRoutes_0_40415050906190264();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
init_functionsRoutes_0_40415050906190264();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function lexer(str2) {
  var tokens = [];
  var i = 0;
  while (i < str2.length) {
    var char = str2[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str2[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str2[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str2[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str2[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str2.length) {
        var code = str2.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str2[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count32 = 1;
      var pattern = "";
      var j = i + 1;
      if (str2[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str2.length) {
        if (str2[j] === "\\") {
          pattern += str2[j++] + str2[j++];
          continue;
        }
        if (str2[j] === ")") {
          count32--;
          if (count32 === 0) {
            j++;
            break;
          }
        } else if (str2[j] === "(") {
          count32++;
          if (str2[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str2[j++];
      }
      if (count32)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str2[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
__name(lexer, "lexer");
__name2(lexer, "lexer");
function parse(str2, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str2);
  var _a2 = options.prefixes, prefixes = _a2 === void 0 ? "./" : _a2, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = /* @__PURE__ */ __name2(function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  }, "tryConsume");
  var mustConsume = /* @__PURE__ */ __name2(function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a3 = tokens[i], nextType = _a3.type, index = _a3.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  }, "mustConsume");
  var consumeText = /* @__PURE__ */ __name2(function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  }, "consumeText");
  var isSafe = /* @__PURE__ */ __name2(function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  }, "isSafe");
  var safePattern = /* @__PURE__ */ __name2(function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  }, "safePattern");
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open3 = tryConsume("OPEN");
    if (open3) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
__name(parse, "parse");
__name2(parse, "parse");
function match(str2, options) {
  var keys = [];
  var re = pathToRegexp(str2, keys, options);
  return regexpToFunction(re, keys, options);
}
__name(match, "match");
__name2(match, "match");
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a2 = options.decode, decode = _a2 === void 0 ? function(x) {
    return x;
  } : _a2;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = /* @__PURE__ */ __name2(function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    }, "_loop_1");
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
__name(regexpToFunction, "regexpToFunction");
__name2(regexpToFunction, "regexpToFunction");
function escapeString(str2) {
  return str2.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
__name(escapeString, "escapeString");
__name2(escapeString, "escapeString");
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
__name(flags, "flags");
__name2(flags, "flags");
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
__name(regexpToRegexp, "regexpToRegexp");
__name2(regexpToRegexp, "regexpToRegexp");
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
__name(arrayToRegexp, "arrayToRegexp");
__name2(arrayToRegexp, "arrayToRegexp");
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
__name(stringToRegexp, "stringToRegexp");
__name2(stringToRegexp, "stringToRegexp");
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a2 = options.strict, strict = _a2 === void 0 ? false : _a2, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode2 = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode2(token));
    } else {
      var prefix = escapeString(encode2(token.prefix));
      var suffix = escapeString(encode2(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
__name(tokensToRegexp, "tokensToRegexp");
__name2(tokensToRegexp, "tokensToRegexp");
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
__name(pathToRegexp, "pathToRegexp");
__name2(pathToRegexp, "pathToRegexp");
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
__name(executeRequest, "executeRequest");
__name2(executeRequest, "executeRequest");
var pages_template_worker_default = {
  async fetch(originalRequest, env22, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = /* @__PURE__ */ __name2(async (input, init2) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init2);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context22 = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env: env22,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: /* @__PURE__ */ __name2(() => {
            isFailOpen = true;
          }, "passThroughOnException")
        };
        const response = await handler(context22);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env22["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    }, "next");
    try {
      return await next();
    } catch (error32) {
      if (isFailOpen) {
        const response = await env22["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error32;
    }
  }
};
var cloneResponse = /* @__PURE__ */ __name2((response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
), "cloneResponse");
init_functionsRoutes_0_40415050906190264();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var drainBody = /* @__PURE__ */ __name2(async (request, env22, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env22);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;
init_functionsRoutes_0_40415050906190264();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
__name2(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name2(async (request, env22, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env22);
  } catch (e) {
    const error32 = reduceError(e);
    return Response.json(error32, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = pages_template_worker_default;
init_functionsRoutes_0_40415050906190264();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
__name2(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env22, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env22, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
__name2(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env22, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env22, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");
__name2(__facade_invoke__, "__facade_invoke__");
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  static {
    __name(this, "___Facade_ScheduledController__");
  }
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name2(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name2(function(request, env22, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env22, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env22, ctx) {
      const dispatcher = /* @__PURE__ */ __name2(function(type, init2) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init2.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env22, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env22, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
__name2(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name2((request, env22, ctx) => {
      this.env = env22;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name2((type, init2) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init2.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
__name2(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;

// ../../.nvm/versions/node/v22.18.0/lib/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody2 = /* @__PURE__ */ __name(async (request, env3, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env3);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default2 = drainBody2;

// ../../.nvm/versions/node/v22.18.0/lib/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError2(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError2(e.cause)
  };
}
__name(reduceError2, "reduceError");
var jsonError2 = /* @__PURE__ */ __name(async (request, env3, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env3);
  } catch (e) {
    const error4 = reduceError2(e);
    return Response.json(error4, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default2 = jsonError2;

// .wrangler/tmp/bundle-3Z7JgS/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__2 = [
  middleware_ensure_req_body_drained_default2,
  middleware_miniflare3_json_error_default2
];
var middleware_insertion_facade_default2 = middleware_loader_entry_default;

// ../../.nvm/versions/node/v22.18.0/lib/node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__2 = [];
function __facade_register__2(...args) {
  __facade_middleware__2.push(...args.flat());
}
__name(__facade_register__2, "__facade_register__");
function __facade_invokeChain__2(request, env3, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__2(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env3, ctx, middlewareCtx);
}
__name(__facade_invokeChain__2, "__facade_invokeChain__");
function __facade_invoke__2(request, env3, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__2(request, env3, ctx, dispatch, [
    ...__facade_middleware__2,
    finalMiddleware
  ]);
}
__name(__facade_invoke__2, "__facade_invoke__");

// .wrangler/tmp/bundle-3Z7JgS/middleware-loader.entry.ts
var __Facade_ScheduledController__2 = class ___Facade_ScheduledController__2 {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__2)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler2(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__2 === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__2.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__2) {
    __facade_register__2(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env3, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env3, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env3, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init2) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__2(
            Date.now(),
            init2.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env3, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__2(request, env3, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler2, "wrapExportedHandler");
function wrapWorkerEntrypoint2(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__2 === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__2.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__2) {
    __facade_register__2(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env3, ctx) => {
      this.env = env3;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init2) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__2(
          Date.now(),
          init2.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__2(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint2, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY2;
if (typeof middleware_insertion_facade_default2 === "object") {
  WRAPPED_ENTRY2 = wrapExportedHandler2(middleware_insertion_facade_default2);
} else if (typeof middleware_insertion_facade_default2 === "function") {
  WRAPPED_ENTRY2 = wrapWorkerEntrypoint2(middleware_insertion_facade_default2);
}
var middleware_loader_entry_default2 = WRAPPED_ENTRY2;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__2 as __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default2 as default
};
//# sourceMappingURL=functionsWorker-0.3502491602836484.js.map
