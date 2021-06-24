class Student(object):
  __slots__ = ('name', 'score') # 用tuple定义允许绑定的属性名称  继承的不受影响

  def __init__(self, name, score):
    self.name = name
    self.score = score
  

  def print_score(self):
    print('%s: %s' % (self.name, self.score))
  
  def get_grade(self):
    if self.score >= 90:
      return 'A'
    elif self.score >= 60:
      return 'B'
    else:
      return 'C'

if __name__ == "__main__":
  ming = Student('ming', '79')
  print(ming.print_score())
  print(ming.title)