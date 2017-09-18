/**
 * tinyImgUpload
 * @param ele [string] [生成组件的元素的选择器]
 * @param options [Object] [对组件设置的基本参数]
 * options具体参数如下
 * path 图片上传的地址路径 必需
 * onSuccess(res) 文件上传成功后的回调 参数为返回的文本 必需
 * onFailure(res) 文件上传失败后的回调 参数为返回的文本 必需
 * @return [function] [执行图片上传的函数]
 * 调用方法
 * tinyImgUpload('div', options)
 */
document.documentElement.style.fontSize = document.documentElement.clientWidth*0.1+'px';

var options = {
    path: '/',
    onSuccess: function (res) {
        console.log(res);
    },
    onFailure: function (res) {
        console.log(res);
    }
}

var upload = tinyImgUpload('#upload', options);
function tinyImgUpload(ele, options) {
    // 判断容器元素合理性并且添加基础元素
    var eleList = document.querySelectorAll(ele)
    if(eleList.length == 0){
        // console.log('绑定的元素不存在')
        return;
    }else if(eleList.length>1){
        console.log('请绑定唯一元素')
        return
    }else {
        eleList[0].innerHTML ='<div id="img-container" >'+
                '<div class="img-up-add  img-item"> <span class="img-add-icon">+</span> </div>'+
                '<input type="file" name="files" id="img-file-input" multiple>'+
                '</div>'
        var ele = eleList[0].querySelector('#img-container')
        ele.files = [];   // 当前上传的文件数组
    }

    // 为添加按钮绑定点击事件，设置选择图片的功能
    var addBtn = document.querySelector('.img-up-add')
    addBtn.addEventListener('click',function () {
        document.querySelector('#img-file-input').value = null
        document.querySelector('#img-file-input').click()
        return false
    },false)

    // 预览图片
    //处理input选择的图片
    function handleFileSelect(evt) {
        var files = evt.target.files

        for(var i=0, f; f=files[i];i++){
            // 过滤掉非图片类型文件
            if(!f.type.match('image.*')){
                continue
            }
            // 过滤掉重复上传的图片
            var tip = false
            for(var j=0; j<(ele.files).length; j++){
                if((ele.files)[j].name == f.name){
                    tip = true
                    break
                }
            }
            if(!tip){
                // 图片文件绑定到容器元素上
                ele.files.push(f)

                var reader = new FileReader()
                reader.onload = (function (theFile) {
                    return function (e) {
                        var oDiv = document.createElement('div');
                        oDiv.className = 'img-thumb img-item';
                        oDiv.id = 'inputN'
                        // 向图片容器里添加元素
                        oDiv.innerHTML = '<img id="address" class="thumb-icon" src="'+e.target.result+'" />'+
                                        '<a href="javscript:;" class="img-remove">x</a>'

                        ele.insertBefore(oDiv, addBtn);
                    }
                })(f)

                reader.readAsDataURL(f)
            }
        }
    }
    document.querySelector('#img-file-input').addEventListener('change', handleFileSelect, false);

    // 删除图片
    function removeImg(evt) {
        if(evt.target.className.match(/img-remove/)){
            console.log('3',ele.files)
            // 获取删除的节点的索引
            function getIndex(ele){

                if(ele && ele.nodeType && ele.nodeType == 1) {
                    var oParent = ele.parentNode
                    var oChilds = oParent.children
                    for(var i = 0; i < oChilds.length; i++){
                        if(oChilds[i] == ele)
                            return i
                    }
                }else {
                    return -1
                }
            }
            // 根据索引删除指定的文件对象
            var index = getIndex(evt.target.parentNode)
            ele.removeChild(evt.target.parentNode)
            if(index < 0){
                return;
            }else {
                ele.files.splice(index, 1);
            }
            console.log('4',ele.files);
        }
    }
    ele.addEventListener('click', removeImg, false)

    // 上传图片
    function uploadImg() {
        console.log(ele.files)

        var xhr = new XMLHttpRequest()
        var formData = new FormData()

        for( var i = 0, f; f = ele.files[i]; i++ ){
            formData.append( 'files', f )
        }

        console.log('1',ele.files)
        console.log('2',formData)

        xhr.onreadystatechange = function (e) {
            if( xhr.readyState == 4){
                if( xhr.status == 200){
                    options.onSuccess( xhr.responseText)
                }else {
                    options.onFailure( xhr.responseText)
                }
            }
        }

        xhr.open( 'POST', options.path, true )
        xhr.send( formData )

    }
    return uploadImg
}
export default tinyImgUpload

