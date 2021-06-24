import os
import re
from urllib import error

import requests
from bs4 import BeautifulSoup

headers = {
    'user-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0'}
num = 0
numPicture = 0
file = ''
List = []


def Find(url):
    global List
    print('正在检测图片总数，请稍等.....')
    t = 0
    # i = 1
    s = 0
    while t < 2:
        Url = url + str(t)
        try:
            Result = requests.get(Url, headers, timeout=7)
        except BaseException:
            t = t + 1
            continue
        else:
            result = Result.text
            soup = BeautifulSoup(result, 'html.parser')
            pic_li = soup.find_all('li')
            pic_url = []
            for i in pic_li:
                # pic_a = i.find('a')
                pic_image = i.find('img')
                if pic_image:
                    pic_url.append('http://pic.netbian.com/' +
                                   pic_image.get('src'))
            s += len(pic_url)
            if len(pic_url) == 0:
                break
            else:
                List.extend(pic_url)
                print(List)
                t = t + 1
    return s


def dowmloadPictureList(keyword):
    global num
    global List

    print('找到关键词:' + keyword + '的图片，即将开始下载图片...')
    for i in List:
        print('正在下载第' + str(num + 1) + '张图片，图片地址:' + str(i))
        try:
            if i is not None:
                pic = requests.get(i, timeout=7)
            else:
                continue
        except BaseException:
            print('错误，当前图片无法下载')
            continue
        else:
            string = file + r'\\' + keyword + '_' + str(num) + '.jpg'
            fp = open(string, 'wb')
            fp.write(pic.content)
            fp.close()
            num += 1
        if num >= numPicture:
            return


def dowmloadPicture(html, keyword):
    global num
    # t =0
    pic_url = re.findall('"objURL":"(.*?)",', html, re.S)  # 先利用正则表达式找到图片url
    print('找到关键词:' + keyword + '的图片，即将开始下载图片...')
    for each in pic_url:
        print('正在下载第' + str(num + 1) + '张图片，图片地址:' + str(each))
        try:
            if each is not None:
                pic = requests.get(each, timeout=7)
            else:
                continue
        except BaseException:
            print('错误，当前图片无法下载')
            continue
        else:
            string = file + r'\\' + keyword + '_' + str(num) + '.jpg'
            fp = open(string, 'wb')
            fp.write(pic.content)
            fp.close()
            num += 1
        if num >= numPicture:
            return


if __name__ == '__main__':  # 主函数入口
    # word = input("请输入搜索关键词(可以是人名，地名等): ")
    url = 'http://pic.netbian.com/e/search/result/index.php?searchid=692&page='  # 高清短发
    tot = Find(url)
    print('经过检测图片共有%d张' % (tot))
    numPicture = int(input('请输入想要下载的图片数量 '))
    file = input('请建立一个存储图片的文件夹，输入文件夹名称即可')
    y = os.path.exists(file)
    if y == 1:
        print('该文件已存在，请重新输入')
        file = input('请建立一个存储图片的文件夹，)输入文件夹名称即可')
        os.mkdir(file)
    else:
        os.mkdir(file)
    t = 0
    tmp = url

    dowmloadPictureList('美女')

    print('当前搜索结束，感谢使用')
