import { deleteCasino } from "../firebase/database/casinos";
import { getSorteo } from "../firebase/database/sorteo";
import { toastError, toastSuccess } from "../helpers/helpers";
import { Firebase } from "./Firebase";
import Casino from "./Casino";

export class Solana {
  constructor() {
    this._cajeros = [];
    this._solicitudes = [];
    this._casinos = [];
    this._draw = {};
  }

  async initialize() {
    // traer cajeros, casinos, solicitudes
    let [c_fiveCashiers, c_allCashiers] = await this.getCashiersFromDB();
    this._cajeros = c_allCashiers;
    let c_casinos = await this.getCasinosFromDB();
    this._casinos = c_casinos;
    let c_requests = await this.getRequestsFromDB();
    this._solicitudes = c_requests;
    let c_draw = await this.getDrawFromDB();
    this._draw = c_draw[0];
    return [c_fiveCashiers, c_allCashiers, c_casinos, c_requests, c_draw[0]];
  }

  async getCasinosFromDB() {
    return await getSorteo();
  }

  async getRequestsFromDB() {}

  async getDrawFromDB() {}

  async getCashiersFromDB() {
    try {
      const c_allCashiers = await Firebase.getCashiers();
      const c_fiveCashiers = this.getTheFirstFiveCashiers();
      //   setCajeros(result);
      //   setIsLoading(false);
      return [c_fiveCashiers, c_allCashiers];
      //   setCincoChicos(cincoCaras);
    } catch (error) {
      toastError(error);
      return false;
    }
  }

  // DRAW
  addDrawParticipant(participant) {
    return this._draw.addParticipant(participant);
  }

  // CASHIERS
  getTheFirstFiveCashiers() {
    let actual = 0;
    let result = [];
    while (actual < 6) {
      result.push(this._cajeros[actual]);
      actual++;
    }
    return result;
  }
  getCashierIndexById(cashier) {
    return this._cajeros.findIndex((c) => c.id === cashier.id);
  }
  getCashiersByName(cashierName) {
    return this._cajeros.filter((cajero) => {
      if (cajero.nombre.toLowerCase().includes(cashierName)) {
        return cajero;
      } else {
        return null;
      }
    });
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
    return new Casino(object.image, object.name, object.link);
  }
  getCasinoById(id) {
    return this._casinos.find((c) => c.id === id);
  }

  // OWN SETTERS AND GETTERS
  // CASHIERS
  get cashiers() {
    return this._cashiers;
  }
  set cashiers(value) {
    this._cashiers = value;
  }
  // CASINOS
  get casinos() {
    return this._casinos;
  }
  set casinos(value) {
    this._casinos = value;
  }
  // REQUESTS
  get requests() {
    return this._requests;
  }
  set requests(value) {
    this._requests = value;
  }
  // DRAW
  get draw() {
    return this._draw;
  }
  set draw(value) {
    this._draw = value;
  }
}
