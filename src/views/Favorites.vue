<template>
  <div>
    <Header v-bind:currentgame="currentgame" v-on:update="getGame($event)" :hasHeader="header"/>
    <Preloader :data="true"/>
    <div class="wrapper">
      <div class="filters">
        <div class="search__options">
          <Input label="" @input-changed='getSearch' />
          <button disabled:true class="icon" @click='searschbyTitle'>
            <font-awesome-icon class="icon" icon="search" />
          </button>  
        </div>
        <div >
          <select class="filters__col" v-model="selectedSubject">
            <option>Все предметы</option>
            <option>Алгебра</option>
            <option>Английский язык</option>
            <option>Биология</option>
            <option>География</option>
            <option>Геометрия</option>
            <option>Демо-версия</option>
            <option>Информатика</option>
            <option>История</option>
            <option>Литература</option>
            <option>Математика</option>
            <option>Обществознание</option>
            <option>Окружающий мир</option>
            <option>Робототехника</option>
            <option>Русский язык</option>
            <option>Физика</option>
            <option>Химия</option>
          </select>
        </div>
      </div>
      <nav class="tabsNav">
        <router-link to="/all" >
          <button class="tabsNav__button">Все</button>
        </router-link>
        <router-link to="/favorites" >
          <button 
          class="tabsNav__button tabsNav__button--active">Избранные</button>
        </router-link>
        <router-link to="/mine" >
          <button class="tabsNav__button">Мои</button>
        </router-link>
        <router-link to="/downloaded" >
          <button class="tabsNav__button">Загруженные</button>
        </router-link>
        <router-link to="/created" >
          <button class="tabsNav__button">Создать</button>
        </router-link>
        
      </nav>      
        <div  class="games">          
          <GameCard v-bind:currentgame="currentgame" v-on:update="getGame($event)"  v-for="(game, index) in  filteredItems"  :game="game" :key="index"  class="games__item" />   
          
        </div>      
    </div>
  </div>
</template>
<script>
import Header from "../components/Header";
import Input from "../components/Input";
import GameCard from "../components/GameCard";
import Preloader from "../components/Preloader";
import Vuex from 'vuex';
import { mapState} from 'vuex'; 
import firebase from 'firebase';
export default {
  name: "Favorites",
  components: {
    Header,
    Input,
    GameCard,
    Preloader
  },
 props: {
    
    //likesFilterToSettingsIsLiked: Boolean,  
      
 
  },
  data: function () {
    return {
      header: true,   
      selectedItem: null,
      hasBeenLiked:false,
      selectedSubject: "Все предметы",
      search: null, 
      currentgame:{
      name:"game"
      }
    }
  },
 methods: {
  getGame(x){          
      this.currentgame=x
      console.log(this.currentgame); 
    },
    gameClicked() {  
      let items = document.querySelectorAll('#gm');
      //console.log(items)
      items.forEach(item => {
        this.selected=item;
        console.log(this.selected)
        item.addEventListener('click', this.highlight());         
      });      
    },   
    highlight() {       
      this.selected.classList.remove('games__item');  
      this.selected.classList.add('games__active'); // подсветить новый td
    },
    getSearch(value) {
      this.search = value.toLowerCase(); 
      (this.search.length == 0) ? this.search=null :         
      //this.search = value.toLowerCase(); 
      (/[0-9]/.test(this.search)) ?
      this.search = value.replace(/[^0-9]/g, '')  :      
      this.search = value.replace(/[^A-Za-zА-Яа-яЁё]/g, "").toLowerCase();
    },
    searschbyTitle(){
      console.log(this.search)       
    },
    

          

     removeLike: function()  {

 class DBwork {
          constructor(FirebaseVariable) {
            this.db = FirebaseVariable;
          }



        async RemoveLike(game,user){

            var DocumentId = await new Promise(resolve => {
                this.db.firestore().collection('games').where('name','==',game).get().then(r=>{
                    resolve(r.docs[0].id)
                })
            });

            this.db.firestore().collection('games').doc(DocumentId).update({
                "likes": firebase.firestore.FieldValue.arrayRemove(user),
            })

            // console.log(DocumentId);

        }

          }  

           var variable = new DBwork(firebase);
           console.log(this.game);
     variable.RemoveLike(this.game.name, this.currentUserId).then(r =>{

 
    
      })
     





},



     like() {
        
        //console.log(this.game.likes);
 
       
      this.game.likes.pop() && this.removeLike()   ;
      // this.hasBeenLiked = !this.hasBeenLiked; 
       //this.likesFilterToSettingsIsLiked = this.game.hasBeenLiked;        




    
        

    
      },




 
 },
  computed:{
 ...mapState({
    user: state => state.user,
    
  }),
    currentUserEmail() {
      return this.$store.getters.currentUserEmail
    },
    currentUserId() {
      return this.$store.getters.currentUserId
    },    


    
    logoFilterToLiked: state => {
     return state.filteredItems.filter(ToLikes => ToLikes.likes.includes(state.currentUserId)); 
  
  },   
   logoFilterToVisible() {
      return this.$store.getters.logoFilterToVisible
    },
    titles: state =>{
      return   state.logoFilterToSettings.map(item => item.name);
    }, 
    logoFilterToSettings: state => {
      return  state.logoFilterToVisible.map(ToSettings => ToSettings.settings);     
    },
    
    arrUniqueMix() {
      const copy = []
      Array.from(this.logoFilterToSettings).forEach((itm,i) => {
      itm.tagList = this.newfilteredItems[i].tagList
      copy.push(itm)
      })
    return copy       
    },
    newfilteredItems() { 
      let str, heading,      
      newarr=[]      
      for (let i=0; i<this.titles.length; i++){
        str=this.titles[i].replace(/[,.:-]/g, ' ');
        heading=str.replace(/\s+/g,' ' ) // заменить длинные пробелы одним
        .replace(/^\s/,'')    // удалить пробелы в начале строки
        .replace(/\s$/,'');   // удалить пробелы в конце строки
        let separator = /\s* \s*/;
        let tagList = heading.split(separator);
        let obj={tagList};       
         newarr.push(obj);            
      }       
       return newarr       
      },
    filteredItems(){         
      let sbjct;      
      sbjct = (this.selectedSubject !=='Все предметы') ? 
          this.logoFilterToToSbjct : 
            (this.search !== null) ? 
          this.arrUniqueMix.filter(itm=>itm.tagList.find(p=>p.toLowerCase()=== this.search)) :     
          this.arrUniqueMix  
      return sbjct
    },
    logoFilterToToSbjct() {      
      return this.logoFilterToSettings.filter(item => item.subject === this.selectedSubject)     
    },   
     
     
        
      
     


  },
  created: function() { 
   this.$store.dispatch('initLogo')
  //const like = this.game.likes.find(item => item === this.currentUserId
//); 
//console.log(like)
        //if (like)
        //  this.hasBeenLiked=true;  
  },
  mounted: function() {
    const userId = firebase.auth();
    this.$store.commit('SET_USER', userId)
    //console.log(userId);   
    
           






    },
  };
</script>
<style lang="scss" scoped>
.filters {
  display: flex;
  &__col {
    padding: 5px;
    width: 300px;
    margin:20px;
  }
}
.search {
 // background: #009688;
  //background-color: rgb(75, 70, 70);
  box-sizing: border-box;  
  &__options {    
    display: flex;
    align-items: center;
    //padding: 5px;
    width: 100%;   
  }
}
.dashboard{
  position: relative;
    margin:  2% 0  0 10%;      
}
.tabsNav {
  border-bottom: 1px solid #eee;
  margin: 0 15px;
  &__button {
    cursor: pointer;
    border: none;
    outline: none;
    background: transparent;
    min-width: 160px;
    padding: 15px;
    text-transform: uppercase;
    font-size: 20px;   
    font-weight: 400;
    font-style: normal;
    text-rendering: optimizeLegibility;    
    font-family: "-apple-system",BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;
    color: #333;
    transition: color 0.3s, border-color 0.3s;
    &:hover {
     // color: #009688;
       color: gray;
    }
    &--active {
      //border-bottom: 2px solid #009688;
     /// color: #009688;
       border-bottom: 2px solid #333;
       color: #333;
    }
  }
}
.icon {
  margin:5px 5px 5px 5px;
}
.games {
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  padding: 7.5px;
  &__item {     
    box-sizing: border-box;
    
    min-width: 16%;
    
    @media (min-width: 375px) {
      width: 50%;
    }
    @media (min-width: 576px) {
      width: 33.33%;
    }
    @media (min-width: 768px) {
      width: 25%;
    }
    @media (min-width: 992px) {
      width: 20%;
    }
    @media (mainwidth: 1024px) {
      width: 16.66%;
    }
    @media (min-width: 1300px) {
      width: 14.2857142857%;
    }
    @media (min-width: 1440px) {
      width: 12.5%;
    }
    @media (min-width: 1600px) {
      width: 11.11%;
    }
  }
   &__active {
      box-sizing: border-box;
      padding: 7.5px;
      width: 100%;
      @media (min-width: 375px) {
        width: 50%;
      }
      @media (min-width: 576px) {
        width: 33.33%;
      }
      @media (min-width: 768px) {
        width: 25%;
      }
      @media (min-width: 992px) {
        width: 20%;
      }
      @media (mainwidth: 1024px) {
        width: 16.66%;
      }
      @media (min-width: 1300px) {
        width: 14.2857142857%;
      }
      @media (min-width: 1440px) {
        width: 12.5%;
    }
    @media (min-width: 1600px) {
      width: 11.11%;
    }
      background-color:rgb(153, 156, 156);
    }
}
</style>
