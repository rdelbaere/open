import { Component } from '@angular/core';
import { ConfigureWindow, WindowConfiguration } from "../../system/interfaces/ui/window";

@Component({
  selector: 'app-apps-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements ConfigureWindow{
    operation: string = "";
    isCompleted: boolean = false;

    validChars: RegExp = /^[0-9.+\-*/ ]+$/;
    validOperators: RegExp = /^[+\-÷×]$/;

    configureWindow(): WindowConfiguration {
        return { minHeight: 250 };
    }

    onPressed($event: MouseEvent){
        const target = <HTMLInputElement>$event.target;
        if(!target.classList.contains('key')){
            return;
        }

        const char = target.innerText;
        this.entry(char);
    }

    entry(char: string){
        if(this.isCompleted){
            this.reset();
        }

        let output;
        if(char === "=") {
            output = ' ' + char + ' ' + this.calculate();
        }else if(char.match(this.validOperators)){
            output = ' ' + char + ' ';
        }else{
            output = char;
        }

        this.operation += output;
    }

    calculate(): string{
        const prepardOperation = this.prepareOperation();
        this.isCompleted = true;

        if(!prepardOperation.match(this.validChars)){
            return 'Erreur';
        }

        try{
            return eval(prepardOperation);
        }catch(error){
            return 'Erreur';
        }
    }

    prepareOperation(): string{
        let prepared = this.operation;

        prepared = prepared.replace('×', '*');
        prepared = prepared.replace('÷', '/');

        return prepared;
    }

    reset(){
        this.isCompleted = false;
        this.operation = '';
    }
}
