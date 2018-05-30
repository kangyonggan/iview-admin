const list = [{
  'id': 1,
  'username': 'admin',
  'name': '管理员',
  'isDeleted': 0,
  'createdTime': '2018-05-29 16:32:48',
  'updatedTime': '2018-05-29 16:40:53'
}, {
  'id': 2,
  'username': 'xiaoxin2',
  'name': '小新2',
  'isDeleted': 0,
  'createdTime': '2018-05-29 16:32:48',
  'updatedTime': '2018-05-29 16:40:53'
}, {
  'id': 3,
  'username': 'xiaoxin3',
  'name': '小新3',
  'isDeleted': 0,
  'createdTime': '2018-05-29 16:32:48',
  'updatedTime': '2018-05-29 16:40:53'
}, {
  'id': 4,
  'username': 'xiaoxin4',
  'name': '小新4',
  'isDeleted': 0,
  'createdTime': '2018-05-29 16:32:48',
  'updatedTime': '2018-05-29 16:40:53'
}, {
  'id': 5,
  'username': 'xiaoxin5',
  'name': '小新5',
  'isDeleted': 1,
  'createdTime': '2018-05-29 16:32:48',
  'updatedTime': '2018-05-29 16:40:53'
}, {
  'id': 6,
  'username': 'xiaoxin6',
  'name': '小新6',
  'isDeleted': 0,
  'createdTime': '2018-05-29 16:32:48',
  'updatedTime': '2018-05-29 16:40:53'
}, {
  'id': 7,
  'username': 'xiaoxin7',
  'name': '小新7',
  'isDeleted': 1,
  'createdTime': '2018-05-29 16:32:48',
  'updatedTime': '2018-05-29 16:40:53'
}, {
  'id': 8,
  'username': 'xiaoxin8',
  'name': '小新8',
  'isDeleted': 0,
  'createdTime': '2018-05-29 16:32:48',
  'updatedTime': '2018-05-29 16:40:53'
}, {
  'id': 9,
  'username': 'xiaoxin9',
  'name': '小新9',
  'isDeleted': 0,
  'createdTime': '2018-05-29 16:32:48',
  'updatedTime': '2018-05-29 16:40:53'
}, {
  'id': 10,
  'username': 'xiaoxin10',
  'name': '小新10',
  'isDeleted': 0,
  'createdTime': '2018-05-29 16:32:48',
  'updatedTime': '2018-05-29 16:40:53'
}]

export const getUserPage = req => {
  return {
    code: 200,
    msg: '操作成功',
    data: {
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        size: 10,
        orderBy: null,
        startRow: 1,
        endRow: 10,
        total: 16,
        pages: 2,
        list: list
      }
    }
  }
}

export const save = req => {
  return {
    code: 200,
    msg: '保存成功'
  }
}

export const update = req => {
  return {
    code: 200,
    msg: '更新成功'
  }
}
