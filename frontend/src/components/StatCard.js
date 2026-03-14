function StatCard({title,value,color}){

return(

<div className={`p-6 rounded-xl text-white ${color}`}>

<p>{title}</p>

<h2 className="text-3xl font-bold">
{value}
</h2>

</div>

)

}

export default StatCard