// You can add JavaScript here if you need additional functionality
// 搜索历史
initLocalStorage();//获取搜索历史缓存记录
setHistoryItems($("#searchInput").val());//添加搜索历史缓存记录
//历史清楚
//单个历史记录清楚
function deleteEve(num){
  clearHistoryOne(num)
  event.stopPropagation();//阻住冒泡
}
//全部历史记录清楚
function deleteAll() {
  clearHistory()
}
 
// 搜索历史缓存开始
let toVal = ''
function initLocalStorage() {
    let { historyItems } = localStorage;
    console.log(historyItems + '--historyItems--')
    if (historyItems !== undefined) {
        const onlyItem = historyItems.split('|');
        if (onlyItem.length > 0) {
            key = '';
            for (var i = 0; i < onlyItem.length; i++) {
                key = key + '<span>' + onlyItem[i] + '<i onclick="deleteEve('+i+')"></i></span>'
            }
            $('.search_history').html(key);
        }
    }
    // $("#searchInput").val('');
    // $('.search_content').removeClass('active');
}
function setHistoryItems(keyword) {
    toVal = keyword
    var maxNum = 5;
    keyword = keyword.trim();
    let { historyItems } = localStorage;
    if (historyItems === undefined) {
        localStorage.historyItems = keyword;
        console.log(localStorage + '------')
    } else {
        var onlyItem = historyItems.split('|').filter(e => e != keyword);
        if (onlyItem.length >= 5) {
            onlyItem = onlyItem.splice(0, maxNum - 1);
        }
        if (onlyItem.length > 0) historyItems = keyword + '|' + onlyItem.join('|');
        localStorage.historyItems = historyItems;
    }
    initLocalStorage();
    // toDrugList(toVal)
}
// 清除缓存
function clearHistory() {
    //清除全部缓存
    localStorage.removeItem('historyItems');
    // 清除缓存刷新页面
    location.reload();
}
// 清除单个缓存
function clearHistoryOne(num) {
    let historyItems = localStorage.getItem('historyItems');
    historyItems = historyItems.split('|');
    // historyItems = historyItems.splice($.inArray('测试',historyItems),1);
    historyItems.splice(num, 1)
    let deleteOne = '';
    for (var i = 0; i < historyItems.length; i++) {
        deleteOne = deleteOne + '<span>' + historyItems[i] + '<i onclick="deleteEve('+i+')" class="active"></i></span>'
    }
    $('.search_history').html(deleteOne);
    localStorage.setItem('historyItems', historyItems.join('|'));
}
// 搜索历史缓存结束
document.addEventListener("DOMContentLoaded", function() {
    // Example of adding an event listener
    console.log("Page loaded and script running!");
});
