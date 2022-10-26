<template>
    <div class="container mx-auto my-[64px]">
        <div class="mx-7">
            <div class="text-center">
                <h1 class="text-5xl font-extrabold">{{ day }}, {{ month }} {{ date }} {{ year }}</h1>
            </div>

            <!-- :to="{name: 'oneTask', params: {category: 'urgent', id: items.id}}" @click="$router.push({'name':'update','params':{'id':post.id}})" -->
            <div class="mt-16 mb-6">
                <h2 class="font-bold text-3xl text-center mb-4">Urgent</h2>
                <div class="urgentList border rounded-md">
                    <div v-for="(items, index) in urgentTasks" :key="index" class="py-5 px-10 mb-2" id="task" data-id="" ref="doc">
                        <div class="flex justify-between pr-6">
                            <div class="flex space-x-3">
                                <button @click="completed(items, 'urgent', items.id)"><input ref="check" type="checkbox" @click="items.completed = !items.completed" :checked="items.completed"></button>
                                <RouterLink class="text-lg font-bold hover:underline" :to="`/tasks/urgent/${items.id}`">{{ items.title }}</RouterLink>
                            </div>
                            <div class="space-x-3">
                                <button class="border rounded-md px-5" v-if="!items.editState" @click="items.editState = !items.editState">Edit</button>
                                <button class="border rounded-md px-5" @click="removeTask('urgent', items.id, items.editState)">Delete</button>
                            </div>
                        </div>
                        <p class="mt-3">{{ items.detail }}</p>
                        <div v-if="items.editState" class="pt-3">
                            <div class="p-6 border rounded-md">
                                <div>
                                    <label for="title">Title:</label>
                                </div>
                                <div>
                                    <input type="text" v-model="title" id="title" ref="title" name="title" class="border w-80" v-bind:placeholder="items.title">
                                </div>

                                <br>
                
                                <div>
                                    <label for="detail">Details:</label>
                                </div>
                                <div>
                                    <textarea type="text" v-model="detail" id="detail" ref="detail" name="detail" class="border w-80" v-bind:placeholder="items.detail"></textarea>
                                </div>
                                <div class="space-x-3 mt-3">
                                    <button class="border rounded-md px-5" @click="editTask(items.editState, 'urgent', items.id)">Edit</button>
                                    <button class="border rounded-md px-5" @click="items.editState = !items.editState">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button class="bg-zinc-800 p-3 rounded-md text-white font-bold" @click="showFormUrgent = !showFormUrgent" v-if="!showFormUrgent">Add Task</button>
        
            <div v-else>
                <button class="bg-zinc-800 p-3 rounded-md text-white font-bold" @click="showFormUrgent = !showFormUrgent">Close</button>
                <div class="border mt-4 rounded-md">
                    <div class="p-6">
                        <div>
                            <label for="title">Title:</label>
                        </div>
                        <div>
                            <input type="text" v-model="title" id="title" name="title" class="border w-80">
                        </div>

                        <br>
        
                        <div>
                            <label for="detail">Details:</label>
                        </div>
                        <div>
                            <textarea type="text" v-model="detail" id="detail" name="detail" class="border w-80"></textarea>
                        </div>
                    </div>
                    <div class="p-6">
                        <button class="bg-zinc-800 p-3 rounded-md text-white font-bold" @click="addDataUrgent()">Add Task</button>
                    </div>
                </div>
            </div>
                
            
            <div class="mt-16 mb-6">
                <h2 class="font-bold text-3xl text-center mb-4">Not Urgent</h2>
                <div class="urgentList border rounded-md">
                    <div v-for="(items, index) in notUrgentTasks" :key="index" class="py-5 px-10 mb-2" id="task" data-id="" ref="doc">
                        <div class="flex justify-between pr-6">
                            <div class="flex space-x-3">
                                <button @click="completed(items, 'not-urgent', items.id)"><input ref="check" type="checkbox" @click="items.completed = !items.completed" :checked="items.completed"></button>
                                <RouterLink class="text-lg font-bold hover:underline" :to="`/tasks/not-urgent/${items.id}`">{{ items.title }}</RouterLink>
                            </div>
                            <div class="space-x-3">
                                <button class="border rounded-md px-5" v-if="!items.editState" @click="items.editState = !items.editState">Edit</button>
                                <button class="border rounded-md px-5" @click="removeTask('not-urgent', items.id, items.editState)">Delete</button>
                            </div>
                        </div>
                        <p class="mt-3">{{ items.detail }}</p>
                        <div v-if="items.editState" class="pt-3">
                            <div class="p-6 border rounded-md">
                                <div>
                                    <label for="title">Title:</label>
                                </div>
                                <div>
                                    <input type="text" v-model="title" id="title" ref="title" name="title" class="border w-80" v-bind:placeholder="items.title">
                                </div>

                                <br>
                
                                <div>
                                    <label for="detail">Details:</label>
                                </div>
                                <div>
                                    <textarea type="text" v-model="detail" id="detail" ref="detail" name="detail" class="border w-80" v-bind:placeholder="items.detail"></textarea>
                                </div>
                                <div class="space-x-3 mt-3">
                                    <button class="border rounded-md px-5" @click="(items.editState = !items.editState); editTask('not-urgent', items.id)">Edit</button>
                                    <button class="border rounded-md px-5" @click="items.editState = !items.editState">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button class="bg-zinc-800 p-3 rounded-md text-white font-bold" @click="showFormNotUrgent = !showFormNotUrgent" v-if="!showFormNotUrgent">Add Task</button>

            <div v-else>
                <button class="bg-zinc-800 p-3 rounded-md text-white font-bold" @click="showFormNotUrgent = !showFormNotUrgent">Close</button>
                <div class="border mt-4 rounded-md">
                    <div class="p-6">
                        <div>
                            <label for="title">Title:</label>
                        </div>
                        <div>
                            <input type="text" v-model="title" id="title" name="title" class="border w-80">
                        </div>

                        <br>

                        <div>
                            <label for="detail">Details:</label>
                        </div>
                        <div>
                            <textarea type="text" v-model="detail" id="detail" name="detail" class="border w-80"></textarea>
                        </div>
                    </div>
                    <div class="p-6">
                        <button class="bg-zinc-800 p-3 rounded-md text-white font-bold" @click="addDataNotUrgent()">Add Task</button>
                    </div>
                </div>
            </div>
            
            
            <div class="mt-16 mb-6">
                <h2 class="font-bold text-3xl text-center mb-4">No Due Time</h2>
                <div class="urgentList border rounded-md">
                    <div v-for="(items, index) in noDueTimeTasks" :key="index" class="py-5 px-10 mb-2" id="task" data-id="" ref="doc">
                        <div class="flex justify-between pr-6">
                            <div class="flex space-x-3">
                                <button @click="completed(items, 'no-due-time', items.id)"><input ref="check" type="checkbox" @click="items.completed = !items.completed" :checked="items.completed"></button>
                                <RouterLink class="text-lg font-bold hover:underline" :to="`/tasks/no-due-time/${items.id}`">{{ items.title }}</RouterLink>
                            </div>
                            <div class="space-x-3">
                                <button class="border rounded-md px-5" v-if="!items.editState" @click="items.editState = !items.editState">Edit</button>
                                <button class="border rounded-md px-5" @click="removeTask('no-due-time', items.id, items.editState)">Delete</button>
                            </div>
                        </div>
                        <p class="mt-3">{{ items.detail }}</p>
                        <div v-if="items.editState" class="pt-3">
                            <div class="p-6 border rounded-md">
                                <div>
                                    <label for="title">Title:</label>
                                </div>
                                <div>
                                    <input type="text" v-model="title" id="title" ref="title" name="title" class="border w-80" v-bind:placeholder="items.title">
                                </div>

                                <br>
                
                                <div>
                                    <label for="detail">Details:</label>
                                </div>
                                <div>
                                    <textarea type="text" v-model="detail" id="detail" ref="detail" name="detail" class="border w-80" v-bind:placeholder="items.detail"></textarea>
                                </div>
                                <div class="space-x-3 mt-3">
                                    <button class="border rounded-md px-5" @click="(items.editState = !items.editState); editTask('no-due-time', items.id)">Edit</button>
                                    <button class="border rounded-md px-5" @click="items.editState = !items.editState">Cancel</button>
                                </div>
                            </div>
                        </div>
                        </div>
                </div>
            </div>

            <button class="bg-zinc-800 p-3 rounded-md text-white font-bold" @click="showFormNoDueTime = !showFormNoDueTime" v-if="!showFormNoDueTime">Add Task</button>

            <div v-else>
                <button class="bg-zinc-800 p-3 rounded-md text-white font-bold" @click="showFormNoDueTime = !showFormNoDueTime">Close</button>
                <div class="border mt-4 rounded-md">
                    <div class="p-6">
                        <div>
                            <label for="title">Title:</label>
                        </div>
                        <div>
                            <input type="text" v-model="title" id="title" name="title" class="border w-80">
                        </div>

                        <br>

                        <div>
                            <label for="detail">Details:</label>
                        </div>
                        <div>
                            <textarea type="text" v-model="detail" id="detail" name="detail" class="border w-80"></textarea>
                        </div>
                    </div>
                    <div class="p-6">
                        <button class="bg-zinc-800 p-3 rounded-md text-white font-bold" @click="addDataNoDueTime()">Add Task</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>    

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBsUhezcNfQfvCkW7F7IkLml0SBzRhp17c",
  authDomain: "vuejs-todo-ead65.firebaseapp.com",
  projectId: "vuejs-todo-ead65",
  storageBucket: "vuejs-todo-ead65.appspot.com",
  messagingSenderId: "921865366399",
  appId: "1:921865366399:web:23f567f6a0f9c9df02c84a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default{
    data() {
        return{
            urgentTasks: [],
            notUrgentTasks: [],
            noDueTimeTasks: [],
            day: '',
            date: '',
            month: '',
            year: '',
            title: '',
            detail: '',
            urgency: '',
            showFormUrgent: false,
            showFormNotUrgent: false,
            showFormNoDueTime: false,
        }
    },
    mounted() {
        // this.setTime();
        setInterval(() => {this.currentDate(), 1000});
        this.loadUrgent();
        this.loadNotUrgent();
        this.loadNoDueTime();
    },
    methods: {
        currentDate() {
            const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const date = new Date();
            const yyyy = date.getFullYear();
            let mm = date.getMonth() + 1;
            let dd = date.getDate();
            let day = date.getDay();
            this.day = weekday[day];
            this.date = dd;
            this.month = month[mm];
            this.year = yyyy;
        },
        async loadUrgent() {
            try{
                const querySnap = await getDocs(collection(db, "urgent"));
                this.urgentTasks = [];
                querySnap.forEach((doc) => {
                    this.urgentTasks[doc.id] = doc.data;
                    this.urgentTasks.push(doc.data());
                    console.log(doc.data());
                })
            }
            catch(err){
                console.log(err.message);
            }
        },
        async loadNotUrgent() {
            try{
                const querySnap = await getDocs(collection(db, "not-urgent"));
                this.notUrgentTasks = [];
                querySnap.forEach((doc) => {
                    // console.log(doc.id);
                    this.notUrgentTasks[doc.id] = doc.data;
                    this.notUrgentTasks.push(doc.data());
                })
            }
            catch(err){
                console.log(err.message);
            }
        },
        async loadNoDueTime() {
            try{
                const querySnap = await getDocs(collection(db, "no-due-time"));
                this.noDueTimeTasks = [];
                querySnap.forEach((doc) => {
                    // console.log(doc.id);
                    this.noDueTimeTasks[doc.id] = doc.data;
                    this.noDueTimeTasks.push(doc.data());
                })
            }
            catch(err){
                console.log(err.message);
            }
        },
        async addDataUrgent() {
            try {
                const docRef = await addDoc(collection(db, "urgent"), {
                    title: this.title,
                    detail: this.detail,
                    completed: false,
                    id: '',
                    editState: false,
                });
                
                await setDoc(doc(db, "urgent", docRef.id), {
                    title: this.title,
                    detail: this.detail,
                    completed: false,
                    id: docRef.id,
                    editState: false,
                });

                console.log("Document written with ID: ", docRef.id);
                this.loadUrgent();
            } 
            catch (e) {
                console.error("Error adding document: ", e);
            }
            this.title = '';
            this.detail = '';
        },
        async addDataNotUrgent() {
            try {
                const docRef = await addDoc(collection(db, "not-urgent"), {
                    title: this.title,
                    detail: this.detail,
                    completed: false,
                    id: '',
                    editState: false,
                });
                
                await setDoc(doc(db, "not-urgent", docRef.id), {
                    title: this.title,
                    detail: this.detail,
                    completed: false,
                    id: docRef.id,
                    editState: false,
                });

                console.log("Document written with ID: ", docRef.id);

                this.loadNotUrgent();
            } 
            catch (e) {
                console.error("Error adding document: ", e);
            }
            this.title = '';
            this.detail = '';
        },
        async addDataNoDueTime() {
            try {
                const docRef = await addDoc(collection(db, "no-due-time"), {
                    title: this.title,
                    detail: this.detail,
                    completed: false,
                    id: '',
                    editState: false,
                });
                
                await setDoc(doc(db, "no-due-time", docRef.id), {
                    title: this.title,
                    detail: this.detail,
                    completed: false,
                    id: docRef.id,
                    editState: false,
                });

                console.log("Document written with ID: ", docRef.id);

                this.loadNoDueTime();
            } 
            catch (e) {
                console.error("Error adding document: ", e);
            }
            this.title = '';
            this.detail = '';
        },
        async removeTask(coll, id) {
            await deleteDoc(doc(db, coll, id));
            if (coll === "urgent") {
                this.loadUrgent();
            }
            else if (coll === "not-urgent") {
                this.loadNotUrgent();
            }
            else if (coll === "no-due-time") {
                this.loadNoDueTime();
            }
        },
        async editTask(state, coll, id) {
            state = !state
            await setDoc(doc(db, coll, id), {
                title: this.title,
                detail: this.detail,
                completed: false,
                id: id,
                editState: state,
            });
            if (coll === "urgent") {
                this.loadUrgent();
            }
            else if (coll === "not-urgent") {
                this.loadNotUrgent();
            }
            else if (coll === "no-due-time") {
                this.loadNoDueTime();
            }
            this.title = '';
            this.detail = '';
        },
        async completed(items, coll, id) {
            // items.completed = !items.completed;
            var titleTemp = items.title;
            var detailTemp = items.detail;
            await setDoc(doc(db, coll, id), {
                title: titleTemp,
                detail: detailTemp,
                completed: items.completed,
                id: id,
                editState: false,
            });
        }
    }
}
</script>