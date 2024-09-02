import { deleteCasino } from "../firebase/database/casinos";
import { getSorteo } from "../firebase/database/sorteo";
import { toastError, toastSuccess } from "../helpers/helpers";
import Firebase from "./Firebase";
import Casino from "./Casino";
import Draw from "./Draw";

export default class Solana {
  constructor() {
    this._cajeros = [];
    this._solicitudes = [];
    this._casinos = [];
    this._draw = {};
    this._state = false;
    this._platforms = [];
  }

  reset() {
    this._cajeros = [];
    this._solicitudes = [];
    this._casinos = [];
    this._draw = {};
    this._state = false;
  }

  async initialize() {
    console.log("Initializing started");
    // traer cajeros, casinos, solicitudes
    let c_allCashiers = await this.getCashiersFromDB();
    this._cajeros = this.orderCashiersPos(c_allCashiers);
    let c_fiveCashiers = this.getTheFirstFiveCashiers();

    let c_casinos = await this.getCasinosFromDB();
    this._casinos = c_casinos;

    let c_requests = await this.getRequestsFromDB();
    this._solicitudes = c_requests;

    let c_draw = await this.getDrawFromDB();
    let { _description, _id, _slots, _isActive, _image } = c_draw;
    this._draw = new Draw(_description, _id, _image, _isActive, _slots);
    this._draw.participants = await this.getParticipantsFromDB();
    console.table(this._draw.participants);
    this._draw.markSlotPerParticipant();

    let c_platforms = await this.getPlatformsFromDB();
    this._platforms = c_platforms;
    if (c_allCashiers.length < 5) c_fiveCashiers = [];

    let result = [
      c_fiveCashiers,
      c_allCashiers,
      c_casinos,
      c_requests,
      this._draw,
      c_platforms,
    ];
    this._state = true;

    console.log("Initializing finished");
    return result;
  }

  async getDrawAgain() {
    let c_draw = await this.getDrawFromDB();
    let { _description, _id, _slots, _isActive, _image } = c_draw;
    this._draw = new Draw(_description, _id, _image, _isActive, _slots);
    this._draw.participants = await this.getParticipantsFromDB();
    this._draw.markSlotPerParticipant();
  }

  async getPlatformsFromDB() {
    return await Firebase.getPlatforms();
  }

  async getCasinosFromDB() {
    return await Firebase.getCasinos();
  }

  async getRequestsFromDB() {
    return await Firebase.getRequests();
  }

  async getDrawFromDB() {
    return await Firebase.getDraw();
  }

  async getParticipantsFromDB() {
    return await Firebase.getParticipants();
  }

  async getCashiersFromDB() {
    // const c_fiveCashiers = this.getTheFirstFiveCashiers();
    return await Firebase.getCashiers();

    // try {
    //   this._cashiers = await Firebase.getCashiers();
    //   //   setCajeros(result);
    //   //   setIsLoading(false);
    //   return [c_fiveCashiers, c_allCashiers];
    //   //   setCincoChicos(cincoCaras);
    // } catch (error) {
    //   toastError(error);
    //   return false;
    // }
  }

  // DRAW
  addDrawParticipant(participant) {
    return this._draw.addParticipant(participant);
  }

  // CASHIERS
  getTheFirstFiveCashiers() {
    let actual = 0;
    let result = [];
    while (actual < 6 && actual < this._cajeros.length) {
      result.push(this._cajeros[actual]);
      actual++;
    }
    return result;
  }
  getCashierIndexById(cashier) {
    return this._cajeros.findIndex((c) => c._id === cashier._id);
  }
  getCashiersByName(cashierName) {
    return this._cajeros.filter((cajero) => {
      if (cajero._name.toLowerCase().includes(cashierName)) {
        return cajero;
      } else {
        return null;
      }
    });
  }
  moveCashierPosition(newPos, cashier) {
    /*
    CASOS:
    1) Cajero no existe previamente, agregamos en la posición deseada.
    2) Cajero ya existe, cambiamos su posición  
    */
    let cashierIndex = this.getCashierIndexById(cashier);
    let copyOfCashiers = [...this._cajeros];
    if (cashierIndex === -1) {
      // CASO 1
      copyOfCashiers.splice(newPos, 0, cashier);
      return this.orderCashiersPos(copyOfCashiers);
    } else {
      // CASO 2
      copyOfCashiers.splice(cashierIndex, 1);
      copyOfCashiers.splice(newPos, 0, cashier);
      return this.orderCashiersPos(copyOfCashiers);
    }
  }

  orderCashiersPos(copyOfCashiers) {
    let newArray = [];
    copyOfCashiers.forEach((caj, i) => {
      caj._position = i;
      newArray.push(caj);
    });
    return newArray;
  }

  addCashier(data) {
    Firebase.postCashier(data).then((r) => this.cajeros.push(r));
  }

  getCashiersQuantityByState(state) {
    let counter = 0;
    this._cajeros.forEach((c) => {
      if (state) {
        if (c._state == "conectado") counter++;
      } else {
        if (c._state == "desconectado") counter++;
      }
    });
    return counter;
  }

  // CASINOS
  removeCasinoFromDB(casinoObject) {
    deleteCasino(casinoObject).then(() => {
      toastSuccess("Eliminado correctamente");
      // getCasinos(); :FIXME
      return true;
    });
    return false;
  }
  createCasino() {
    return new Casino();
  }
  createCasino(object) {
    return new Casino(object._image, object._name, object._link);
  }
  getCasinoById(id) {
    return this._casinos.find((c) => c._id === id);
  }

  // REQUESTS
  getUnresolvedRequests() {
    return this._solicitudes.filter((s) => s._state !== true);
  }
  getResolvedRequests() {
    return this._solicitudes.filter((s) => s._state !== false);
  }

  orderResolvedRequestByRecentTime() {
    return [...this.getResolvedRequests()].sort((a, b) => {
      const dateA = new Date(`${a._date} ${a._time}`);
      const dateB = new Date(`${b._date} ${b._time}`);
      return dateA - dateB;
      // return dateB - dateA;
    });
  }
  orderUnresolvedRequestByRecentTime() {
    return [...this.getUnresolvedRequests()].sort((a, b) => {
      const dateA = new Date(`${a._date} ${a._time}`);
      const dateB = new Date(`${b._date} ${b._time}`);
      return dateA - dateB;
      // return dateB - dateA;
    });
  }

  getNumberOfResolvedRequests() {
    return this.getResolvedRequests().length;
  }
  getNumberOfUnresolvedRequests() {
    return this.getUnresolvedRequests().length;
  }

  // OWN SETTERS AND GETTERS
  // PLATFORMS5
  get platforms() {
    return this._platforms;
  }
  set platforms(value) {
    this._platforms = value;
  }
  // CASHIERS
  get cajeros() {
    return this._cajeros;
  }
  set cajeros(value) {
    this._cajeros = value;
  }
  // CASINOS
  get casinos() {
    return this._casinos;
  }
  set casinos(value) {
    this._casinos = value;
  }
  // REQUESTS
  get solicitudes() {
    return this._solicitudes;
  }
  set solicitudes(value) {
    this._solicitudes = value;
  }
  // DRAW
  get draw() {
    return this._draw;
  }
  set draw(value) {
    this._draw = value;
  }
  // STATE
  get state() {
    return this._state;
  }
  set state(value) {
    this._state = value;
  }
}
