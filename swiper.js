//依赖于transformCss.js
//dom 元素获取与汴梁初始化设置
function Swiper(selector,options){//selector选择器,options设置样式参数
    let auto=options && options.auto!==undefined?options.auto:true//设置默认自动播放
    let loop=options && options.loop!==undefined?options.loop:true;//设置默认无缝滚动
    let time=options && options.time!==undefined?options.time:3000;//设置默认自动播放定时
    let pagination_point=options && options.pagination!==undefined?options.pagination:true;//设置默认包含滚动点显示
//元素获取与变量初始化定义
    let container=document.querySelector(selector)
    let wrapper=container.querySelector('.swiper-wrapper')
    let len=wrapper.querySelectorAll('.swiper-slide').length
    let pagination=container.querySelector('.swiper-pagination')
    let length=container.querySelectorAll('.swiper-slide').length
    /* 变量初始化定义--开始--*/
    let dots=null
    let index=0
    let timer=null
    let isHori=true
    let isFirst=true;/* 变量初始化定义--结束--*/
    /* 设置无缝滚动--开始--*/
    if (loop) wrapper.innerHTML+=wrapper.innerHTML; /* 设置无缝滚动--结束--*/
    container.style.position='relative'//设置container绝对定位，是轮播点定位准确
    /*事件绑定---开始---*/
    container.addEventListener('touchstart',function (e){
    clearInterval(timer)
    this.x=e.touches[0].clientX
    this.y=e.touches[0].clientY
    this.startTime=Date.now()
        if (loop){
            switch (index) {
                case 0:
                     index=len
                     this.changedSpan(index,false)
                    break;
               case length-1:
                     index=len-1
                     this.changedSpan(index,false)
                   break;
                }
        }
    this.left=transformCSS(wrapper,'translateX')
})
    container.addEventListener('touchmove',function (e){
    this._x = e.touches[0].clientX
    this._y =e.touches[0].clientY
    let disX=Math.abs(this._x-this.x)
    let disY=Math.abs(this._y-this.y)
    if (isFirst){
    isFirst=false
    if (disX<disY){
    isHori=false
}
    if (disX>disY){
    isHori=true
}
}
    if (isHori){
        e.preventDefault()
    }else{
        return
    }
    let newLeft = this._x - this.x + this.left
    wrapper.style.transition = 'none'
    transformCSS(wrapper,'translateX',newLeft)
})
    container.addEventListener('touchend',function (e) {
    this._x = e.changedTouches[0].clientX
    let disX=Math.abs(this._x-this.x)
    this.endTime=Date.now()
    isFirst=true
    this.autoplay()
    if (!isHori)return;
    //左滑
    if (disX>container.offsetWidth/3||(this.endTime-this.startTime)<300){
    if (this._x < this.x ) {
    index++
}
    //右滑
    if (this._x > this.x) {
    index--
}
}
    if (index < 0) {
    index = 0
}
    if (index>length-1){
    index=length-1
}
    this.changedSpan(index)
})
    wrapper.addEventListener('transitionend',function (){
    if (loop && index===length-1){
    index=len-1
    container.changedSpan(index,false)
}
})/*事件绑定---开始---*/
    /*方法绑定--开始---*/
    container.init=function init(){
    let slides=container.querySelectorAll('.swiper-slide')
    window.addEventListener('load',function (){
        let h=slides[0].offsetHeight
        container.style.height=h+'px'
    })
    wrapper.style.width=length*100+'%'
    slides.forEach(function (slide){
    slide.style.width=100/length+'%'
})
        if (pagination_point){
    for (let i=0; i<len;i++){
    let span=document.createElement('span')
    if (i===0){
    span.className='active'
}
    pagination.appendChild(span)
}
    dots=container.querySelectorAll('.swiper-pagination span')
}
    }
    container.init()
    container.autoplay=function autoplay(){
    clearInterval(timer)
        if (auto){
            timer=setInterval(function (){
                index++
                container.changedSpan(index)
           },time)
        }
     }
    container.autoplay()
    container.changedSpan=function (i,isTransition){
    if (isTransition===undefined){
    isTransition=true
}
    if (isTransition){
    wrapper.style.transition = 'all 0.5s'
}else {
    wrapper.style.transition = 'none'
}
    let newLeft=-i*container.offsetWidth
    transformCSS(wrapper,'translateX',newLeft)
        if (pagination_point){
            dots.forEach(function (e){
                e.classList.remove('active')
            })
            dots[i%len].classList.add('active')
        }
    index=i

    }/*方法绑定--结束---*/

}