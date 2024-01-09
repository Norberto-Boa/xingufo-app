import '../../styles/index.css';
import { Subtitle } from "../../components/Subtitle";
import { generateDates } from "../../utils/generate-array-date";
import dayjs from "dayjs";
import { Game } from "../../components/Game";
import "dayjs/locale/pt-br"
import { Ads } from "../../components/Ads";


interface jogos{
  HomeTeam: string,
  AwayTeam: string,
  location: string,
  date: Date
}

const jogos = [
  {
    HomeTeam: 'Sikwama FC',
    AwayTeam: 'Mozal',
    location: 'Campo de Sikwama',
    date: dayjs("2023-02-11").startOf("day").toDate()
  },

  {
    HomeTeam: 'Nkobe',
    AwayTeam: '16 Casas',
    location: 'Campo de Sikwama',
    date: dayjs("2023-02-11").startOf("day").toDate()
  },

  {
    HomeTeam: 'Lusalite',
    AwayTeam: 'Leao',
    location: 'Campo de IMA',
    date: dayjs().startOf("day").toDate() },
];

const datas = generateDates();

const resultados = [
  {
    HomeTeam: 'Sikwama FC',
    AwayTeam: 'MalhampseneFC',
    Location: 'Campo de Sikwama',
    Date: new Date(2023, 0, 22),
    HomeTeamGoals: 2,
    AwayTeamGoals: 1
  },

  {
    HomeTeam: 'Sikwama FC',
    AwayTeam: 'MalhampseneFC',
    Location: 'Campo de Sikwama',
    Date: new Date(2023, 0, 22),
    HomeTeamGoals: 2,
    AwayTeamGoals: 2
  },

  {
    HomeTeam: 'Sikwama FC',
    AwayTeam: 'MalhampseneFC',
    Location: 'Campo de Sikwama',
    Date: new Date(2023, 0, 9),
    HomeTeamGoals: 2,
    AwayTeamGoals: 3
  },
];





const Index = () => {
  return (
    <div className='max-w-[680px] w-full pb-16 pr-8 bg-zinc-300 min-h-screen'>

      {/* Titutlo */}
      <div className="pt-8 pl-9">
        <h1 className="font-bold text-4xl">Bem-vindo, <span className="text-green-600 font-black">Boa!</span></h1>
        <Subtitle
          text="Conecte-se com os seus colegas"
        />
      </div>

      <div className="h-72 mt-7 ml-6 bg-white w-full rounded-3xl px-9 py-4 mr-4 ">
        <div>
          <h1 className="font-semibold text-xl">Anúncios</h1>
          <Subtitle
            text="Encontre o seu adversário aqui!"
          />

          <Ads />
        </div>
      </div>

      <div className="min-h-72 mt-7 ml-6 bg-white w-full rounded-3xl px-9 py-4 mr-4">
        <div className="mb-4">
          <h1 className="font-semibold text-xl">Jogos marcados</h1>
          <Subtitle
            text={`Para os próximos dias temos ${jogos.length} jogos marcados`}
          />
        </div>

        <div>

          {datas.map((date, i) => {
            var game = jogos.filter((jogo) => {
              return jogo.date.getTime() == date.getTime();
            })

            if (game.length > 0) {
              return (
              <div
                  key={date.toDateString()}
                  className="mb-4"
              >
                  <p
                    className="mb-4 font-bold text-zinc-600 capitalize"
                  >
                    {dayjs(date.toDateString()).locale("pt-br").format("dddd - DD [de] MMMM YYYY",)}
                  </p>

                  <div className="p-4 border-2 border-zinc-300 rounded-2xl">    
                    {game.map((game, i) => {
                      return (
                        <Game
                          HomeTeam={game.HomeTeam}
                          AwayTeam={game.AwayTeam}
                          location={game.location}
                          date={game.date.toDateString()}
                          key={i}
                        />
                      )
                    })}
                  </div>
              </div>  
            )
            } else {
              return
            }

            
          })}
          

        </div>


      </div>  

    </div>
  )
}

export { Index };