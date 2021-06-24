import requests
import re
from bs4 import BeautifulSoup
import csv

headers = {
    'user-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0'}


def queryId():
    # 获取前100部电影id
    list = []
    Url = 'http://movie.mtime.com/list/1709.html'
    result = requests.get(Url, headers)
    soup = BeautifulSoup(result.text, 'html.parser')
    top_list = soup.select('div[class="top_nlist"]')
    one_list = re.findall(
        r'<a href="http://movie.mtime.com/(\d+)/"', str(top_list), re.S)
    list.extend(one_list)
    for num in range(2, 11):
        response = requests.get(
            'http://movie.mtime.com/list/1709-{}.html'.format(num), headers)
        soup = BeautifulSoup(response.text, 'html.parser')
        top_list = soup.select('div[class="top_nlist"]')
        one_list = re.findall(
            r'<a href="http://movie.mtime.com/(\d+)/"', str(top_list), re.S)
        list.extend(one_list)
    return list


def queryDetail(list):
    data = []
    i = 0
    for id in list:
        response = requests.get(
            'http://movie.mtime.com/{}'.format(id), headers)
        soup = BeautifulSoup(response.text, 'html.parser')
        info_name = soup.select('dd[pan="M14_Movie_Overview_BaseInfo"]')
        info_names = re.findall(r'</strong>(.*?)</a>', str(info_name), re.S)
        try:
            director = str(info_names[0]).split('target="_blank">')[1]  # 导演
            playwriter = str(info_names[1]).split('target="_blank">')[1]  # 编剧
            section = str(info_names[2]).split('target="_blank">')[1]  # 发型地区
            company = str(info_names[3]).split('target="_blank">')[1]  # 公司
            other = re.findall(r'更多片名：</strong>(.*?)</span>',
                               str(info_name), re.DOTALL)
            other_name = str(other).split('<span>')[-1].split('\'')[0]
            movie_info = soup.select('div[class="db_cover __r_c_"]')
            movie_name = re.findall(
                r'title="(.*?)">', str(movie_info), re.DOTALL)
            movie_title = movie_name[0]
            info = {}
            info['排名'] = str(i + 1)
            info['电影名'] = movie_title
            info['导演'] = director
            info['编剧'] = playwriter
            info['发行地区'] = section
            info['公司'] = company
            info['更多片名'] = other_name
            data.append(info)
            i = i+1
        except IndexError:
            pass
    return data


def writecsv(list_message):
    out_file = r'./日本动画电影时光网TOP100.csv'
    with open(out_file, 'a', newline='', encoding='utf-8-sig') as f:
        fieldnames = ['排名', '电影名', '导演', '编剧', '发行地区', '公司', '更多片名']
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        with open(out_file, 'r', newline='', encoding='utf-8-sig') as file:
            reader = csv.reader(file, delimiter = ',')
            if not [row for row in reader]:
                writer.writeheader()
                writer.writerows(list_message)
            else:
                writer.writerows(list_message)
    print('全部写入成功')
    
    """for message in list_message:
        with open(out_file, 'a', newline='', encoding='utf-8-sig') as f:
            fieldnames = ['电影名', '导演', '编剧', '发行地区', '公司', '更多片名']
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            with open(out_file, 'r', newline='', encoding='utf-8-sig') as file:
                reader = csv.reader(file, delimiter = ',')
                if not [row for row in reader]:
                    writer.writeheader()
                    writer.writerow(message)
                else:
                    writer.writerow(message)
            print('写入成功')
    print('全部写入成功')"""


if __name__ == "__main__":
    list = queryId()
    list_message = queryDetail(list)
    writecsv(list_message)
