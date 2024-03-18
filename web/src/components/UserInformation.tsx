import UserInformationInput from "./UserInformationInput";




export default function UserInformation() {
  return (
    <div>
      <div className="mb-3 flex justify-between">
        <div>
          <h2 className="text-xl font-semibold">Informações Pessoais</h2>
          <span className="text-zinc-400">
            Os teus dados pessoais colectados pela plataforma
          </span>
        </div>
      </div>

      <div>
        <UserInformationInput label="Name" type="text" name="Name" id="Name" />
      </div>
    </div>
  );
}
