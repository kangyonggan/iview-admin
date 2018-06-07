export default {
  app: {
    name: '后台管理系统',
    shortName: '后管',
    '403': 'Oh~~您的权限貌似有点点不足~',
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
    title: '提示',
    warning: '警告'
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
    exitFullScreen: '退出全屏'
  },
  applyStatus: {
    APPLY: '待审批',
    REJECT: '已拒绝',
    COMPLETE: '审批通过'
  },
  btn: {
    query: '查询',
    cancel: '取消',
    submit: '提交',
    clear: '清除',
    create: '新增',
    edit: '编辑',
    detail: '详情',
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
    person: '我的',
    info: '个人信息',
    article: '我的文章',
    articleDetail: '文章详情',
    articleForm: '发布文章',
    content: '内容',
    articleCheck: '文章审核',
    novel: '小说管理'
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
      newPassword: '新密码',
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
        pattern: '必须以字母开头，且是字母数字或下划线',
        exists: '用户名已存在'
      },
      password: {
        required: '密码为必填项',
        min: '密码最少为{0}位',
        max: '密码最多为{0}位',
        pattern: '必须以字母开头，且是字母或数字'
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
        pattern: '必须以大写字母开头，且是大写字母数字或下划线',
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
        pattern: '必须以小写字母开头，且是小写字母数字或下划线',
        exists: '菜单代码已存在'
      },
      icon: {
        min: '菜单图标最少为{0}位',
        max: '菜单图标最多为{0}位'
      },
      sort: {
        pattern: '排序必须为0~99之间的整数'
      }
    }
  },
  info: {
    msg: {
      format: '文件类型错误，请选择jpg或者png',
      size: '文件太大, 请不要超过2M'
    },
    tag: {
      basic: '基本信息',
      avatar: '头像上传',
      password: '修改密码'
    },
    tip: '点击此处或拖拽上传'
  },
  article: {
    label: {
      id: 'ID',
      title: '标题',
      content: '文章内容',
      applyStatus: '申请状态',
      replyMsg: '审批意见',
      createdName: '申请人',
      createdTime: '创建时间',
      updatedTime: '更新时间',
      operation: '操作'
    },
    placeholder: {
      title: '请输入文章标题',
      createdName: '请输入申请人',
      content: '请输入文章内容，支持Markdown语法',
      applyStatus: '请选择申请状态',
      startDate: '请选择创建开始时间',
      endDate: '请选择创建结束时间',
      check: '请输入审批信息'
    },
    valid: {
      title: {
        required: '文章标题为必填项',
        min: '文章标题最少为{0}位',
        max: '文章标题最多为{0}位'
      },
      content: {
        required: '文章内容为必填项'
      }
    },
    btn: {
      reject: '拒绝',
      complete: '通过'
    },
    tag: {
      apply: '待审批',
      all: '全部'
    },
    msg: {
      check: '至少选择一篇文章'
    }
  },
  novel: {
    label: {
      code: '小说代码',
      name: '小说名称',
      author: '作者',
      categoryName: '栏目名称',
      status: '状态',
      createdTime: '创建时间',
      operation: '操作'
    },
    placeholder: {
      code: '小说代码',
      name: '小说名称',
      author: '作者',
      categoryName: '栏目名称'
    }
  }
}
