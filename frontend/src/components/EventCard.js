function EventCard({title,desc,img}){

return(

<div className="bg-white rounded-xl shadow-lg hover:scale-105 transition">

<img
src={img}
className="h-40 w-full object-cover rounded-t-xl"
/>

<div className="p-4">

<h3 className="font-bold text-lg">{title}</h3>

<p className="text-gray-600">{desc}</p>

<button className="mt-3 bg-blue-500 text-white px-4 py-1 rounded">
Register
</button>

</div>

</div>

)

}

export default EventCard