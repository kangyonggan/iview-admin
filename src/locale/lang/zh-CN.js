export default {
  app: {
    name: '后台管理系统',
    shortName: '后管',
    '401': 'Oh~~您的权限貌似有点点不足~',
    '404': 'Oh~~您的页面好像飞走了~'
  },
  respCode: {
    '9999': '未知错误，请联系管理员！',
    '9998': '您尚未登录或登录已失效！',
    '9997': '您无权访问所请求的资源！',
    '9996': '网络错误，请稍后再试！',
    '1001': '用户名或密码错误！',
    '1002': '密码错误，如果忘记密码请清除Cookie！',
    '0000': '操作成功！'
  },
  notice: {
    title: '提示'
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
    locked: '已锁定',
    fullScreen: '全屏',
    exitFullScreen: '跳出全屏'
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
    backHome: '返回首页',
    backPrev: '返回上一页',
    closeOther: '关闭其他',
    closeAll: '关闭所有'
  },
  route: {
    all: '全部菜单',
    login: '登录',
    lock: '锁屏',
    home: '首页',
    system: '系统',
    user: '用户管理',
    role: '角色管理',
    menu: '菜单管理',
    consumer: '我的',
    info: '个人信息'
  },
  login: {
    title: '欢迎登录',
    submit: '登录',
    experience: '体验账号',
    placeholder: {
      username: '请输入用户名',
      password: '请输入密码'
    },
    valid: {
      username: {
        required: '用户名为必填项',
        min: '用户名最少为{0}位',
        max: '用户名最多为{0}位'
      },
      password: {
        required: '密码为必填项',
        min: '密码最少为{0}位',
        max: '密码最多为{0}位'
      }
    }
  },
  lock: {
    lockScreen: '锁屏',
    unlock: '解锁',
    placeholder: {
      password: '解锁密码同登录密码'
    }
  },
  user: {
    entity: '用户',
    label: {
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
      endDate: '请选择创建结束日期'
    },
    valid: {
      username: {
        required: '用户名为必填项',
        min: '用户名最少为{0}位',
        max: '用户名最多为{0}位',
        exists: '用户名已存在'
      },
      password: {
        required: '密码为必填项',
        min: '密码最少为{0}位',
        max: '密码最多为{0}位'
      },
      name: {
        required: '姓名为必填项',
        min: '姓名最少为{0}位',
        max: '姓名最多为{0}位'
      }
    },
    btn: {
      setRole: '设置角色',
      editPwd: '修改密码'
    }
  },
  role: {
    entity: '角色',
    label: {
      id: 'ID',
      code: '角色代码',
      name: '角色名称',
      status: '状态',
      createdTime: '创建时间',
      updatedTime: '更新时间',
      operation: '操作'
    },
    placeholder: {
      code: '请输入角色代码',
      name: '请输入角色名称',
      startDate: '请选择创建开始日期',
      endDate: '请选择创建结束日期'
    },
    valid: {
      code: {
        required: '角色代码为必填项',
        min: '角色代码最少为{0}位',
        max: '角色代码最多为{0}位',
        exists: '角色代码已存在'
      },
      name: {
        required: '角色名称为必填项',
        min: '角色名称最少为{0}位',
        max: '角色名称最多为{0}位'
      }
    },
    btn: {
      setMenu: '设置菜单'
    }
  },
  menu: {
    entity: '菜单',
    msg: {
      hasChildren: '不能删除有子菜单的父菜单'
    },
    label: {
      pcode: '上级菜单',
      code: '菜单代码',
      icon: '菜单图标',
      sort: '排序'
    },
    placeholder: {
      code: '请输入菜单代码',
      icon: '请输入菜单图标',
      sort: '请输入排序（0排在最上面）'
    },
    valid: {
      code: {
        required: '菜单代码为必填项',
        min: '菜单代码最少为{0}位',
        max: '菜单代码最多为{0}位',
        exists: '菜单代码已存在'
      },
      icon: {
        min: '菜单图标最少为{0}位',
        max: '菜单图标最多为{0}位'
      },
      sort: {
        number: '排序必须为0~99之间的整数'
      }
    }
  }
}
