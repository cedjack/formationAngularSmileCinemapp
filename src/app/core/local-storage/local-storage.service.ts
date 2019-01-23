import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorage {

  getItem(index: string): unknown {

    let value = null;

    try {
      let unparsedValue = null;
      value = (unparsedValue = localStorage.getItem(index)) ? JSON.parse(unparsedValue) : null;
    } catch (error) {
      value = null;
    }

    return value;

  }

  setItem(index: string, value: any): void {

    localStorage.setItem(index, JSON.stringify(value));

  }

  removeItem(index: string): void {

    localStorage.removeItem(index);

  }

  clear(): void {

    localStorage.clear();

  }

}
