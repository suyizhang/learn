import matplotlib.pyplot as plt
import jieba
from wordcloud import WordCloud

# 读取txt文本数据

def readText():
    text = open(r'test.txt', "r").read()
    cut_text = jieba.cut(text)
    result = " ".join(cut_text)
    wc = WordCloud(
        # 设置字体，不指定就会出现乱码
        # 设置背景色
        background_color='white',
        # 设置背景宽
        width=500,
        # 设置背景高
        height=350,
        # 最大字体
        max_font_size=50,
        # 最小字体
        min_font_size=10,
        mode='RGBA'
        # colormap='pink'
    )
    # 产生词云
    wc.generate(result)
    # 保存图片
    wc.to_file(r"wordcloud.png") # 按照设置的像素宽高度保存绘制好的词云图，比下面程序显示更清晰
    # 4.显示图片
    # 指定所绘图名称
    plt.figure("jay")
    # 以图片的形式显示词云
    plt.imshow(wc)
    # 关闭图像坐标系
    plt.axis("off")
    plt.show()

if __name__ == "__main__":
    readText()
