from functools import cache
from readmdict import MDX, MDD  # pip install readmdict
from bs4 import BeautifulSoup
import pickle
import json
import os
import time


def getExplain(word):
    cachePosition = "examples\wordExplainCache"

    cacheFile = cachePosition + "\\" + word.lower() + ".pkl"
    filePathsList = os.listdir(cachePosition)
    fileName = word + ".pkl"
    if fileName in filePathsList:
        f = open(cacheFile, 'rb')
        data = pickle.loads(f.read())
        f.close()
    filename = "dictMdx/LDOCE5.mdx"
    headwords = [*MDX(filename)]       # 单词名列表
    items = [*MDX(filename).items()]   # 释义html源码列表
    if len(headwords) == len(items):
        print(f'加载成功：共{len(headwords)}条')
    else:
        print(f'【ERROR】加载失败{len(headwords)}，{len(items)}')
    queryWord = word
    wordIndex = headwords.index(queryWord.encode())
    word, html = items[wordIndex]
    word, html = word.decode(), html.decode()
    soup = BeautifulSoup(html, 'lxml')
    allSpan = soup.find_all(attrs={'class': 'newline'})
    jsonData = json.dumps([str(ele) for ele in allSpan])

    f = open(f"{cacheFile}", 'wb')
    print(cacheFile)
    content = pickle.dumps(jsonData)
    f.write(content)
    f.close()

    return jsonData


start = time.time()
getExplain("white")
end = time.time()
print(end - start)
