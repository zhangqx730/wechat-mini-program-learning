Page({
  data:{
    modalHidden: true,
    toastHidden: true,
    imgPaths: [],
    downloadPath: ''
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },

  chooseImage: function(e){
      var $this = this;
      wx.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed '],
          sourceType: ['album', 'camera'], //album 从相册选图，camera 使用相机，默认二者都有
          success:function(res){
            $this.setData({imgPaths:res.tempFilePaths})
          }
      })
  },
  uploadImage: function(e){
    var $this = this;
    if(this.data.imgPaths.length == 0){
        this.setData({modalHidden:false});
    }
  	wx.uploadFile({
        url: getApp().globalData.server + '/chunhui/m/doctor@uploadCredeImage.do',
        filePath: this.data.imgPaths[0],
        name: 'files',
        header: {},
        formData: {
          'user': 'kesq'
        },
        success: function(res){
          console.log(res)
          console.log('success')
          $this.setData({toastHidden: false})
          console.log(res.data)
        },
        fail: function(res){
          console.log(res)
          console.log('fail')
        },
        complete: function(res){
          console.log(res)
          console.log('complete')
        }
    })
  },
  myconfirm: function(e){
      this.setData({modalHidden: true})
  },
   //完成提示
  toast1Change: function(event){
  	this.setData({toastHidden: true});
  },
  downloadImage: function(e){
    var $this = this;
    wx.downloadFile({
      url: 'http://img.3chunhui.com/headimg/kesq-crede.png',
      type: 'image',
      success: function(res){
        $this.setData({downloadPath:res.tempFilePath})
      }
    })
  }
})