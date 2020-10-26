<template>
  <div class="about">
      <img src="../assets/image/1.jpg" class="img" alt="">
      <div class="listBox">
            <div v-for="(item,index) in list" :key='index' class="lovebox">
             <img class="love" v-if="item.gender===2" src="../assets/image/2.png" alt="">
             <img class="love" v-else src="../assets/image/3.png" alt="">
                <div class="outText">
                    <div class="jibenmes">
                      <div style=" display: flex;">编号:<div class="xiahuaxian">{{item.wishId}}</div></div>
                      <div style=" display: flex;">性别:<div class="xiahuaxian">{{item.gender===2?'女':'男'}}</div></div>
                      <div style=" display: flex;">年龄:<div class="xiahuaxian">{{item.age}}</div></div>
                    </div>
                    <div class="" style="marginTop:5px;display:flex;">
                      <div style="line-height:15px"> 家庭困难情况:<span class="jiating">{{item.familyState}}</span></div>
                    </div>
                     <div style="display: flex;marginTop:0px">心愿:<div class="xinyaun">{{item.desire}}</div></div>
                </div>
      
               <img v-if="!item.status" src="../assets/image/4.png" class="button" @click="handreClick(item.wishId,item.version)" alt="">
              <img v-else class="yirenling" src="../assets/image/5.png" alt="">
            </div> 

      </div>
  </div>
</template>
<script>
import axios from 'axios'
import qs from 'qs'
export default {
    name:'About',
    data(){
      return{
        list:[
        ]
      }
    },
    mounted(){
      const data=qs.stringify({
        pageSize:100,
        pageNum:1,
      })
      axios.post(' https://qiyefuwuzhongxin.natapp4.cc/web/wish/list',data).then(res=>{
        console.log(res)
        if(res.data.code==1000){
          this.list=res.data.data.list
        }
      })
    },
    methods:{
      handreClick(wishId,version){

          this.$router.push({
            name:'Home',
            params:{
              wishId:wishId,
              version:version
            }
          })
      }
    }
}
</script>
<style scoped>
  .about{
    width:100%;
    padding-bottom: 100px;
    background-color: #f0f0f4;
  }
  .img{
    width:100%
  }
  .listBox{
    width: 96%;
    padding-bottom: 50px;
    background-color: #fcd9d1;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .lovebox{
    width: 100%;
    margin-top: 10px;
    position: relative;
  }
  .love{
    width: 100%;
  }
  .outText{
    position: absolute;
    left: 50%;
    top:33%;
    transform: translateX(-50%);
    font-size: 12px;
    color: #b00501;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .jibenmes{
    display: flex;
  }
  .xiahuaxian{
    width: 30px;
    border-bottom: 1px dotted #b00501;
    text-align: center;
    color: #000;
  }
  .xinyaun{
      width: 100px;
    border-bottom: 1px dotted #b00501;
    text-align: left;
    color: #000;
    font-size:10px;
  }
  .jiating{
      width: 150px;
    border-bottom: 1px dotted #b00501;
    text-align: left;
    color: #000;
  }
  .button{
    width: 65px;
    position: absolute;
    left: 51%;
    transform: translateX(-50%);
    bottom: 49px;
  }
  .yirenling{
    width: 60px;
    position: absolute;
    bottom: 52px;
       left: 51%;
    transform: translateX(-50%);
  }
</style>