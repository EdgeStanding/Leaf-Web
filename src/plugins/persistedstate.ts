export default (options = { storage: null, key: null }) => {
  const storage = options.storage || (window && window.localStorage);
  const key = options.key || "vuex";

  // 获取state的值
  const getState = (key: any, storage: { getItem: (arg0: any) => any }) => {
    const value = storage.getItem(key);
    try {
      return typeof value !== "undefined" ? JSON.parse(value) : undefined;
    } catch (err: any) {
      window.$message.error(err)
    }
    return undefined;
  };

  // 设置state的值
  const setState = (
    key: any,
    state: any,
    storage: { setItem: (arg0: any, arg1: string) => any }
  ) => storage.setItem(key, JSON.stringify(state));

  return (store: {
    replaceState: (arg0: any) => void;
    subscribe: (arg0: (mutation: any, state: any) => void) => void;
  }) => {
    // 初始化时获取数据，如果有的话，把原来的vuex的state替换掉
    const data = getState(key, storage);
    if (data) {
      store.replaceState(data);
    }

    // 订阅 store 的 mutation。handler 会在每个 mutation 完成后调用，接收 mutation 和经过 mutation 后的状态作为参数
    store.subscribe((mutation, state) => {
      setState(key, state, storage);
    });
  };
};
