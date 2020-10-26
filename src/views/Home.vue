<template>
  <div class="home">
      <div class="homeBox">
        <div class="fanhui" @click="()=>{this.$router.go(-1)}">返回</div>
         <img class="headerIMG" src="../assets/image/8.png" alt="">
         <p class="caotact">联系方式</p>
         <div class="inputBox">
           <p class="inputBox_name">姓名</p>
           <input type="text" class="input" v-model="name" placeholder="请输入姓名" >
         </div>

         <div class="inputBox seconedBox">
           <p class="inputBox_name">联系电话</p>
           <input type="text" v-model="phone" class="input" placeholder="请输入电话" >
         </div>

          <div class="inputBox seconedBox">
           <p class="inputBox_name">邮寄地址</p>
           <textarea v-model="address"  placeholder="请填写地址"></textarea>
         </div>
      </div>

      <div class="comfir" @click="confirm">确认认领</div>


      <div class="bg" v-show="acitve"></div>
      <img class="notify" v-show="acitve" src="../assets/image/6.png" alt="">
      <img class="cha" v-show="acitve" @click="()=>{this.acitve=false}" src="../assets/image/7.png" alt="">
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import { Notify } from 'vant';
export default {
  name: 'home',
  components: {
 
  },
  data(){
    return{
      name:"",
      phone:'',
      address:'',
      acitve:false,
    }
  },
  mounted(){
      console.log(this.$route)

  },
  methods:{
    confirm(){
      var that=this;
      
      const phoneText = /^1[3456789]d{9}$/;
      console.log(!phoneText.test(this.phone))
      const {wishId,version}=this.$route.params;
        if(!this.name){
           Notify({
                background:"#ff7b6e",
                message:"请输入姓名"
              });
       
        }else if(phoneText.test(this.phone)){
          console.log()
             Notify({
                background:"#ff7b6e",
                message:"请输入正确的手机号"
              });

        }else if(!this.address){
              Notify({
                background:"#ff7b6e",
                message:"请输入邮寄地址"
              });
        }else{
          const data=qs.stringify({
            wishId:wishId,
            claimName:this.name,
            claimPhone:this.phone,
            claimAddress:this.address,
            version:version
          });
          console.log(data)
          axios.post("https://qiyefuwuzhongxin.natapp4.cc/web/wish/claim",data).then(res=>{
       
            if(res.data.code==1000){
           
               that.acitve=true;
             
               Notify({
                background:"#ff7b6e",
                message:"认领成功"
              });
             
            }else{
               Notify({
                background:"#ff7b6e",
                message:res.data.msg
              });
            }
          })
        }
    }
  }
}
</script>
<style scoped>
  .home{
    width: 100%;
    height: 100%;
    padding-bottom: 200px;
    padding-top: 80px;
    background: #f7f7f7;
  }
  .homeBox{
    width: 90%;
    height: 410px;
    background-color: #fff;
    box-shadow: 0 0 5px #f7f7f7;
    margin: 0 auto;
    display:flex;
    flex-direction: column;
    align-items: center;
  }
  .caotact{
    font-size: 20px;
    font-weight: 700;
    color: #ff331e;
    margin-top: 43px;
  }
  .inputBox{
    width: 90%;
    margin-top: 40px;
  }
  .inputBox_name{
    color: #fe3923;
  }
  .input{
    width: 100%;
    height: 40px;
    border-bottom: 2px solid #e7e7e7;
  }
  .seconedBox{
    margin-top:22px ;
  }
  .headerIMG{
    width: 130px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 10px;
  }
  textarea{
    border:0;
    border-radius:5px;
    background-color:rgba(241,241,241,.98);
    width: 100%;
    height: 90px;
    padding: 3px;
    resize: none;
    margin-top: 15px;
  }
  .comfir{
    width: 90%;
    height: 48px;
    background-color: #ff7b6e;
    margin: 0 auto;
    text-align: center;
    line-height: 48px;
    border-radius: 5px;
    margin-top:40px;
    color: #fff;
  }
  .bg{
    position: fixed;
    width: 100%;
    height: 1334px;
    background-color: #000;
    opacity: 0.7;
    left: 0;
    top: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .notify{
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 80%;
    z-index: 1000;
  }
  .cha{
    width: 40px;
    position: fixed;
    left: 50%;
    top: 80%;
    transform: translate(-50%,-50%);
     z-index: 1000;
  }
  .fanhui{
    position: absolute;
    left: 21px;
    top: 21px;
    color: #a0a0a0;
  }

</style>
