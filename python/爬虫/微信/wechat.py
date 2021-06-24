import itchat
import os
import math
from PIL import Image

# 获取数据
def download_image():
  itchat.auto_login()
  # 返回一个包含用户信息字典的列表
  friends = itchat.get_friends(update=True)
  print(friends)
  #  在当前位置创建一个用于存储头像的目录wechatImages
  base_path = 'wechatImages'
  if not os.path.exists(base_path):
      os.mkdir(base_path)

      # 获取所有好友头像
  for friend in friends:
      # 获取头像数据
      img_data = itchat.get_head_img(userName = friend['UserName'])
      #判断备注名是否为空
      if friend['RemarkName'] != '':
          img_name = friend['RemarkName']
      else :
          img_name = friend['NickName']
        #   在实际操作中如果文件名中含有*标志，会报错。则直接可以将其替换掉
      if img_name is "*":
          img_name = ""
      #通过os.path.join()函数来拼接文件名
      img_file = os.path.join(base_path, img_name + '.jpg')
      print(img_file)
      with open(img_file, 'wb') as file:
          file.write(img_data)

if __name__ == "__main__":
    download_image()