const 
    http = require('http'),
    fs = require('fs'),
    cheerio = require('cheerio');

class crawlData {

    constructor ( page ) {

        this.currentPage = 1;
        this.page = page;

        this.baseUrl = 'http://pic.netbian.com/e/search/result/index.php?searchid=692&page=';

        this.init();
    }
    init () {
        let _self = this;

        let time = setInterval(function () {

            if(_self.currentPage > _self.page) {
                clearInterval(time);
            }
            else{
                console.log('第 ' + _self.currentPage + ' 个爬虫请求发出');
                _self.getDataPackage(_self.baseUrl + (_self.currentPage + 1));
                _self.currentPage ++;
            }

        }, 1000 * 5);
    }
    getDataPackage (url, curPage) {
        console.log(url);
        let _self = this;
        http.get(url, function(response){
            var chunks = [];
            var size = 0;
            response.on('data',function(chunk){
                chunks.push(chunk);
                size += chunk.length;
            });
            response.on('end',function(){
                let data = Buffer.concat(chunks, size);
                let html = data.toString();

                let $ = cheerio.load(html);
                let result = [];

                $('.sojob-list').find('.job-info').each(i => {
                    let map = {};
                    //  个人基本信息
                    map.name = $('.job-info').eq(i).find('h3').attr('title');

                    let baseOthersInfo = $('.job-info').eq(i).find('.condition').attr('title');
                    baseOthersInfo = baseOthersInfo.split("_");

                    map.reward = baseOthersInfo[0];
                    map.area = baseOthersInfo[1];
                    map.experience = baseOthersInfo[2];

                    //  公司信息
                    let companyTagDom = $('.company-info').eq(i).find('.temptation').find('span');
                    let companyTag = [];
                    companyTagDom.each(i => {
                        companyTag.push(companyTagDom.eq(i).text());
                    });
                    let companyInfo = {
                        name: $('.company-info').eq(i).find('.company-name a').attr('title'),
                        href: $('.company-info').eq(i).find('.company-name a').attr('href'),
                        type: $('.company-info').eq(i).find('.industry-link a').text(),
                        tag: companyTag.join(',')
                    }
                    map.company = companyInfo;
                    result.push(map);
                    map = {};
                });
                let dataStr = JSON.stringify(result).trim().replace(/^\[/, curPage == 1 ? '[' : '').replace(/\]$/, curPage == _self.page ? ']' : ',');
                fs.writeFile('./jobs.txt', dataStr, { 'flag': 'a' }, function(err) {
                    if(err) throw err;
                    console.log('写入成功');
                });
            });
        });
    }
}
//  一个数据包40条，这里是99 * 40 = 3960条
new crawlData(99);
