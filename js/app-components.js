const LibraryComponent = Vue.component('Library', {
    // this function is run AFTER the props have been passed in
    data() {
        return {
            library: [
                new Book(
                    "Seductive Interaction Design",
                    234),
                new Book(
                    "Seductive",
                    2),
                new Book(
                    "Design",
                    2345),
                new Movie(
                    "Godfather part 1",
                    200),
                new Movie(
                    "Godfather part 2",
                    160),
                new Movie(
                    "Godfather part 3",
                    100),
            ],
        }
    },

    // values/bindings passed to this component
    props: {},

    // functions that you want to use in your view that are triggered manually
    methods: {},

    // props/data that needs to be calculated when dependencies change
    computed: {},

    // the view
    template: `
              <div class="card-columns">
              <!--        <h3 class="card-title">Title:  {{ item.title }}</h3>-->
              <!--        &lt;!&ndash;        <p class="card-text" v-if="item.constructor.name === 'Book'">Pages:  {{item.pages}}</p>&ndash;&gt;-->
              <!--        <p class="card-text" v-if="item.pages">Pages:  {{ item.pages }}</p>-->
              <!--        <p class="card-text" v-if="item.runtime">Pages:  {{ item.pages }}</p>-->
                  <library-item v-for="item in library" :item="item"></library-item>
              </div>`,
});
const LibraryItemComponent = Vue.component('LibraryItem', {
    props: {
        item: LibraryItem
    },
    computed: {
        typeOfItem() {
            return this.item.constructor.name;
        },
    },
    template: `
              <div class="card" :class="{'border-success' : item.isAvailable()}">
<!--                  <h3 class="card-title">Title:  {{ item.title }}</h3>-->
<!--                  &lt;!&ndash;        <p class="card-text" v-if="item.constructor.name === 'Book'">Pages:  {{item.pages}}</p>&ndash;&gt;-->
<!--                  <p class="card-text" v-if="item.pages">Pages:  {{ item.pages }}</p>-->
<!--                  <p class="card-text" v-if="item.runtime">Pages:  {{ item.pages }}</p>-->
<!--                        <book v-if="item.constructor.name === 'Book'" :item="item"></book>-->
<!--                        <book v-if="item.constructor.name === 'Book'" :item="item"></book>-->
                    <component :is="typeOfItem" :item="item"></component>
              <div class="card-footer">
                <button v-if="item.isAvailable()" @click="item.checkOut()">Check Out</button>
                <button v-else @click="item.checkIn()">Check In</button>
              </div>
              </div>
            `,
});

const BookComponent = Vue.component('Book', {
    // this books component will inherit all props, data, methods etc from LibraryItem
    extends: LibraryItemComponent,
    template: `
              <div class="book bg-primary" >
                  <h3 class="card-title">Title:  {{ item.title }}</h3>
                  <p class="card-text" v-if="item.pages">Pages:  {{ item.pages }}</p>
              </div>
            `,
});


const MovieComponent = Vue.component('Movie', {
    // this books component will inherit all props, data, methods etc from LibraryItem
    extends: LibraryItemComponent,
    template: `
              <div class="movie bg-secondary" >
                  <h3 class="card-title">Title:  {{ item.title }}</h3>
                  <p class="card-text" v-if="item.runtime">Runtime:  {{ item.runtime }}</p>
              </div>
            `,
});