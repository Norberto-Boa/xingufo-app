
const News = () => {
  return (
    <div className="w-full min-h-[250px] bg-white mt-9 rounded-xl p-4">
      <div>
        <h2
        className="font-sans font-semibold text-lg"
        >
          Novidades
        </h2>

        <div className="flex items-center mt-2">
          <div
            className="flex justify-between"
          >
            <div
              className="rounded-lg !w-12 h-12"
            >
              <img
                className="rounded-inherit w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"
                alt=""
              />
            </div>
            <div className="flex w-3/4">
              <h4
                className="text-base font-sans font-bold"
              >Torneio de Sikwama Assina com AnyTech</h4>
            </div>
          </div>
          
        </div>
      </div>
      
      <span className="text-sm mt-1 text-zinc-400 font-sans font-medium capitalize">07 de fevereiro de 2023</span>
    </div>

  )
}

export { News };