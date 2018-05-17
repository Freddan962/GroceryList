import { Unit } from './../classes/unit';
import { Injectable } from '@angular/core';

@Injectable()
export class UnitService {
  
  static units: Unit[] = [];
  static initialized: boolean = false;

  public static initialize() : void {
    if (UnitService.initialized) return;

    let units = [
      { name: 'kg' },
      { name: 'g' },
      { name: 'dl' },
      { name: 'cl' },
      { name: 'box' },
      { name: 'jar' }
    ]

    units.forEach((data) => {
      this.initializeUnit(data);
    });

    UnitService.initialized = true;
  }

  public static initializeUnit(unitData) {
    let unit = new Unit(unitData.name);
    UnitService.units.push(unit);
  }
  
  public static getUnits() : Unit[] {
    return this.units;
  }

  /**
   * getByID()
   * 
   * @static
   * @param {number} id The ID of the unit to fetch
   * @returns {Unit} The found unit
   * @memberof UnitService
  */
  public static getByID(id: number) : Unit {
    let unit = this.units.find((unit) => {
      return unit.getID() == id;
    });

    return unit;
  }

}
