import re

a = '"ObjUrl":"http:\/\/imgup01.sj88.com\/2017-05\/19\/19\/14951916552199_2.jpg",'
pic_url = re.findall('"(ObjUrl)":"(.*?)"', a, re.S)
# pic_url = re.findall('ObjUrl', a, re.S)

print(pic_url[0])