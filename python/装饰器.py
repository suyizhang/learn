import time

def time_calc(func):
  def wrapper(*args, **kargs):
    start_time = time.time()
    f = func(*args, **kargs)
    exec_time = time.time() - start_time
    return f
  return wrapper


@time_calc
def add(a, b):
  return a + b

@time_calc
def sub(a, b):    
    return a - b


if __name__ == "__main__":
  add(1, 2)