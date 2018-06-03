export default {
  app: {
    name: '后台管理系统',
    shortName: '后管'
  },
  msg: {
    err401: 'Oh~~您的权限貌似有点点不足~',
    err404: 'Oh~~您的页面好像飞走了~',
    code9999: '未知错误，请联系管理员！',
    code9998: '您尚未登录或登录已失效！',
    code9997: '您无权访问所请求的资源！',
    code0000: '操作成功！'
  },
  route: {
    login: '登录',
    lock: '锁屏',
    home: '首页',
    system: '系统',
    user: '用户管理',
    role: '角色管理',
    menu: '菜单管理'
  },
  confirm: {
    recoveryTitle: '恢复确认',
    recoveryContent: '确认恢复所选记录？',
    disableTitle: '禁用确认',
    disableContent: '确认禁用所选记录？',
    deleteTitle: '删除确认',
    deleteContent: '确认删除所选记录？'
  },
  status: {
    enable: '可用',
    disable: '禁用',
    locked: '已锁定'
  },
  btn: {
    query: '查询',
    cancel: '取消',
    submit: '提交',
    clear: '清除',
    create: '新增',
    edit: '编辑',
    logout: '安全退出',
    delete: '物理删除',
    setRole: '设置角色',
    editPwd: '修改密码',
    backHome: '返回首页',
    backPrev: '返回上一页',
    closeOther: '关闭其他',
    closeAll: '关闭所有'
  },
  entity: {
    user: '用户',
    role: '角色'
  },
  field: {
    id: 'ID',
    username: '用户名',
    name: '姓名',
    status: '状态',
    password: '密码',
    createdTime: '创建时间',
    updatedTime: '更新时间',
    operation: '操作'
  },
  placeholder: {
    username: '请输入用户名',
    password: '请输入密码',
    name: '请输入姓名',
    startDate: '请选择创建开始日期',
    endDate: '请选择创建结束日期',
    lockPwd: '密码同登录密码'
  },
  lockPage: {
    lockScreen: '锁屏',
    lock: '解锁'
  },
  loginPage: {
    title: '欢迎登录',
    submit: '登录',
    experience: '体验账号'
  },
  valid: {
    usernameRequired: '用户名为必填项',
    usernameMin: '用户名最少为{0}位',
    usernameMax: '用户名最多为{0}位',
    usernameExists: '用户名已存在',
    passwordRequired: '密码为必填项',
    passwordMin: '密码最少为{0}位',
    passwordMax: '密码最多为{0}位',
    nameRequired: '密码为必填项',
    nameMin: '姓名最少为{0}位',
    nameMax: '姓名最多为{0}位'
  }
}
