const Human = function(param) {
  this.skill = param && param.skill || '保密'
  this.hobby = param && param.hobby || '保密'
}
Human.prototype = {
  getSkill: function() {
    return this.skill
  },
  getHobby: function() {
    return this.hobby
  }
}

const Named = function(named) { 
  (function(named, that) {
    that.wholeName = named
    if (named.includes(' ')) {
      that.FirstName = named.slice(0, named.indexOf(' '))
      that.SecondeName = named.slice(named.indexOf(' '))
    }
  })(named, this)
}

const Work = function(work) {
  (function(work, that) {
    switch (work) {
      case 'code':
        that.work = '工程师'
        that.workDesc = '每天沉迷于编程'
        break
      case 'UE':
        that.work = '设计师'
        that.workDesc = '设计更像一种艺术'
        break
      default :
        that.work = work
        that.workDesc = '对不起，我们不清楚您所选择职位的描述'
    }
  })(work, this)
}

Work.prototype.changeWork = function(work) {
  this.work = work
}

const Person = function(param, name, work) {    // 构造方法，不同模块使用不同创建过程
  const _person = new Human(param)
  _person.named = new Named(name)
  _person.work = new Work(work)
  return _person
}

const xiaoming = new Person({ skill: '耍帅', hobby: '装逼' }, 'xiao ming', 'code')
xiaoming.skill    // 耍帅
xiaoming.FirstName  // xiao
xiaoming.work    // 工程师