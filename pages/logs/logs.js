Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: [],
    condition: '',
    page: 1,
    tag:'like',
    isShow:true
  },
  getInfo: function() {
    var that = this;
    console.log(that.data.tag);
    var objs = this.data.info;
    wx.request({
      url: 'http://blog.oajing.com/blog/index',
      data: {
        condtion: that.data.condition,
        page: that.data.page
      },
      success: function(res) {
        if (res.data.data.length>0){
          if (that.data.tag == 'like') {
            that.setData({
              info: objs.concat(res.data.data),
            });
          }else if(that.data.tag =='islike'){
            // console.log('aaaaaaaaa');
            that.setData({
              info: res.data.data.concat(objs),
            });
          }
        }else{
          that.setData({
            isShow:false
          })
        }
       
        
      }
    })
  },
  getContent: function(e) {
    // console.log(e);
    var con = e.detail.value;
    // console.log(con);
    this.setData({
      condition: con
    })
    this.getInfo();
    // console.log(this.data.condition);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '正在加载中',
    })
    this.getInfo();
    wx.hideLoading();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    var page = this.data.page;
    page += 1;
    this.setData({
      tag:'islike',
      page: page
    });
    

    this.getInfo();

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.setData({
      tag:'like'
    })
    
    var page = this.data.page;
    // console.log(page);
    page += 1;
    this.setData({
      page: page
    })
    this.getInfo();
    // console.log(123);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})