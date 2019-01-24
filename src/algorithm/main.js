export default class Main{

    constructor() {
        String.prototype.replaceAt=function(index, char) {
            var a = this.split("");
            a[index] = char;
            return a.join("");
        }

        String.prototype.devareAt = function (index, predicate) {
            var c = this[+index];
            if (!predicate || predicate(c)) {
                var before = this.substring(0, Math.max(index - 1, 0));
                var after = this.substring(Math.min(index + 1, this.length - 1));
                return before + after;
            }
            return this;
        }
    }

    add(a,b){
        console.log(`(Log) Add ${a} + ${b}`);
            console.log(`(Log) Generating tape...`);
            var tape = "";
            for(var i = 0 ; i < a ; i++){
                tape += "0";
            }
            tape += "C";
            for(var i = 0 ; i < b ; i++){
                tape += "0";
            }
            var i = 0;
            var stateNow = 'q0';
            var result = [];
            var loop = true;
            while(loop){
                result.push(`${stateNow}-${tape}-${i}`);
                switch (stateNow) {
                    case 'q0':{
                        if(tape.charAt(i) === "0"){
                            tape = tape.replaceAt(i,"B");
                            i+=1;
                            stateNow = 'q1'
                        }
                        break;
                    }
                    case 'q1':{
                        if(tape.charAt(i) === "0"){
                            i += 1;
                        }else if(tape.charAt(i) === "C"){
                            tape = tape.replaceAt(i,"0");
                            i+=1;
                            stateNow = 'q2';
                        }
                        break
                    }
                    case 'q2':{
                        loop = false;
                        break;
                    }
                    default:
                        break;
                }
            }
            return result;
    }

    sub(a,b){
        var tape = "";
        for(var i = 0 ; i < a ; i++){
            tape += "0";
        }
        tape += "C";
        for( var i = 0 ; i < b ; i++){
            tape += "0";
        }
        var i = 0;
        var stateNow = 'q0';
        var result = [];
        var loop = true;
        while(loop){
            console.log(`(Log) curr state : ${stateNow} - curr tape : ${tape} - curr index : ${i}`);
            result.push(`${stateNow}-${tape}-${i}`);
            switch (stateNow) {
                case 'q0':{
                    if(tape.charAt(i) == "0"){
                        i += 1;
                    }else if(tape.charAt(i) == "C"){
                        i += 1;
                        stateNow = 'q1';
                    }
                    break;
                }
                case 'q1':{
                    if(tape.charAt(i) == "X"){
                        i += 1;
                    }else if(tape.charAt(i) == "0"){
                        tape = tape.replaceAt(i,"X");
                        i -= 1;
                        stateNow = 'q2';
                    }else{
                        i -= 1;
                        stateNow = 'q5';
                    }
                    break;
                }
                case 'q2':{
                    if(tape.charAt(i) == 'X'){
                        i -= 1;
                    }else if(tape.charAt(i) == "C"){
                        i -= 1;
                        stateNow = 'q3';
                    }
                    break;
                }
                case 'q3':{
                    if(tape.charAt(i) === 'B' || (i === 0)){
                        i = (tape.charAt(i) == 'B') ? i+1 : i;
                        stateNow = 'q4';
                    }else if(tape.charAt(i) === '0'){
                        i -= 1;
                    }
                    break;
                }
                case 'q4':{
                    if(tape.charAt(i) === '0'){
                        tape = tape.replaceAt(i,"B");
                        i +=1;
                        stateNow = 'q0'
                    }else{
                        tape = tape.replaceAt(i,"B");
                        i+=1;
                        stateNow = 'q6'
                    }
                    break;
                }
                case 'q5':{
                    if(tape.charAt(i) == "X"){
                        tape = tape.replaceAt(i,"B")
			            i-=1;
                    }else if(tape.charAt(i) == "C"){
                        tape = tape.replaceAt(i,"B")
			            i-=1;
			            stateNow = 'q7';
                    }
                    break;
                }
                case 'q6':{
                    if(tape.charAt(i) === "C" || tape.charAt(i) === "X"){
                        tape = tape.replaceAt(i,"B");
                        i+=1;
                    }else if(tape.charAt(i) === "0"){
                        i+=1;
                    }else{
                        tape += "0"
                        stateNow = 'q7';
                    }
                    break;
                }
                case 'q7':{
                    loop = false;
                }
                default:
                    break;
            }
        }
    return result;
    }

    mult(a,b){
        console.log(`(Log) Multiply ${a} * ${b}`);
        console.log(`(Log) Generating tape..`);
        var tape1 = "";
        for(var i = 0 ; i < a ; i++){
            tape1 += "0";
        }
        tape1 += "1";
        for( var i = 0 ; i < b ; i++){
            tape1 += "0";
        }
        console.log(`(Log) Generating tape success`);
        console.log(`(Log) Tape : ${tape1}`)
        var tape2 = "";
        var tape3 = "";
        var i = 0;
        var j = 0;
        var k = 0;
        var stateNow = 'q0';
        var result = [];
        /*result obj = {
            tape1:
            tape2:
            tape3:
            i:
            j:
            k:
            state:
        }*/
        var loop = true;
        while(loop){
            console.log(`Curr State ${stateNow} - Tape 1 ${tape1} - Tape 2 ${tape2} - Tape 3 ${tape3}  i,j,k = ${i},${j},${k}`);
            result.push({
                tape1:tape1,
                tape2:tape2,
                tape3:tape3,
                i:i,
                j:j,
                k:k,
                state:stateNow
            })
            switch (stateNow) {
                case 'q0':{
                    if(tape1.charAt(i) === "0" && (tape2.charAt(j) === "" || tape2.charAt(j) === "B") && (tape3.charAt(k) === "" || tape3.charAt(j) === "B") ){
                        tape1 = tape1.replaceAt(i,"B");
                        tape2 = tape2.replaceAt(j,"0");
                        i+=1;
                        j+=1;
                    }else if(tape1.charAt(i) === "1" && (tape2.charAt(j) === "" || tape2.charAt(j) === "B") && (tape3.charAt(k) === "" || tape3.charAt(j) === "B")){
                        tape1 = tape1.replaceAt(i,"B");
                        i += 1;
                        stateNow = 'q1';
                    }
                    break;
                }
                case 'q1':{
                    if(tape1.charAt(i) === "0" && (tape2.charAt(j) === "" || tape2.charAt(j) === "B") && (tape3.charAt(k) === "" || tape3.charAt(j) === "B")){
                        j -= 1;
                        stateNow = 'q2';
                    }else if((tape1.charAt(i) === "" || tape1.charAt(i) === "B") && (tape2.charAt(j) === "" || tape2.charAt(j) === "B") && (tape3.charAt(k) === "" || tape3.charAt(j) === "B")){
                        stateNow = 'q4';
                    }
                    break;
                }
                case 'q2':{
                    if(tape1.charAt(i) === "0" && tape2.charAt(j) === "0" && (tape3.charAt(k) === "" || tape3.charAt(j) === "B")){
                        j -= 1;
                    }else if(tape1.charAt(i) === "0" && (tape2.charAt(j) === "" || tape2.charAt(j) === "B") && (tape3.charAt(k) === "" || tape3.charAt(j) === "B")){
                        j += 1;
                        stateNow = 'q3';
                    }
                    break;
                }
                case 'q3':{
                    if(tape1.charAt(i) === "0" && (tape2.charAt(j) === "" || tape2.charAt(j) === "B") && (tape3.charAt(k) === "" || tape3.charAt(j) === "B")){
                        tape1 = tape1.replaceAt(i,"B")
                        i+= 1;
                        stateNow = 'q1';
                    }else if(tape1.charAt(i) === "0" && tape2.charAt(j) === "0" && (tape3.charAt(k) === "" || tape3.charAt(j) === "B")){
                        tape3 = tape3.replaceAt(k,"0");
                        j+=1;
                        k+=1;
                    }
                    break;
                }
                case 'q4':{
                    loop = false;
                }
                default:
                    break;
            }
        }
        return result;
    }

    fac(a){
        console.log(`(Log) Factorial ${a}!`);
        console.log(`(Log) Generating tape..`);
        var half = this.factorial(Number(a))/2;
        var tape1 = "";
        for(var i = 0 ; i < half ; i++){
            tape1 += "B";
        }
        for(var i = 0 ; i < a ; i++){
            tape1 += "0";
        }
        tape1 += "1";
        for(var i = 0 ; i < half ; i++){
            tape1 += "B";
        }
        console.log(`(Log) Generating tape success`);
        console.log(`(Log) Tape : ${tape1}`)
        var tape2 = "B";
        for(var i = 0 ; i < half ; i++){
            tape2 += "B";
        }
        var tape3 = "B";
        for(var i = 0 ; i < half ; i++){
            tape3 += "B";
        }
        var i = half;
        var j = half;
        var k = half;
        var stateNow = 'q0';
        var result = [];
        /*result obj = {
            tape1:
            tape2:
            tape3:
            i:
            j:
            k:
            state:
        }*/
        var loop = true;
        while(loop){

            var input = `${tape1.charAt(i)} - ${tape2.charAt(j)} - ${tape3.charAt(k)}`;
            console.log(`Curr State ${stateNow} - Tape 1 ${tape1} - Tape 2 ${tape2} - Tape 3 ${tape3}  i,j,k = ${i},${j},${k} input : ${input}`);
            result.push({
                tape1:tape1,
                tape2:tape2,
                tape3:tape3,
                i:i,
                j:j,
                k:k,
                state:stateNow
            })
            switch (stateNow) {
                case 'q0':{
                    // 0BB
                    if(tape1.charAt(i) === "0" && (tape2.charAt(j) === "" || tape2.charAt(j) === "B") && (tape3.charAt(k) === "" || tape3.charAt(k) === "B") ){
                        tape2 = tape2.replaceAt(j,"0")
                        i += 1;
                        j += 1;
                    }else if(tape1.charAt(i) === "1" && (tape2.charAt(j) === "" || tape2.charAt(j) === "B") && (tape3.charAt(k) === "" || tape3.charAt(k) === "B") ){
                        tape1 = tape1.replaceAt(i,"B")
                        i-=1;
                        j-=1;
                        stateNow = 'q1';
                    }
                    break;
                }
                case 'q1':{
                    if(tape1.charAt(i) === "0" && tape2.charAt(j) === "0"  && (tape3.charAt(k) === "" || tape3.charAt(k) === "B") ){
                        tape2 = tape2.replaceAt(j,"B");
                        j -= 1;
                        k += 1;
                        stateNow = 'q2';
                    }else if((tape1.charAt(i) === "" || tape1.charAt(i) === "B")&& (tape2.charAt(j) === "" || tape2.charAt(j) === "B") && (tape3.charAt(k) === "" || tape3.charAt(k) === "B") ){
                        tape1 = tape1.replaceAt(i,"0");
                        stateNow = 'q2';
                    }
                    break;
                }
                case 'q2':{
                    // 00B,000,B0B,0BB
                    if(tape1.charAt(i) === "0" && tape2.charAt(j) === "0"  && (tape3.charAt(k) === "" || tape3.charAt(k) === "B") ){
                        tape3 = tape3.replaceAt(k,"0")
                        i -= 1;
                        k += 1;
                    }else if(tape1.charAt(i) === "0" && tape2.charAt(j) === "0"  && tape3.charAt(k) === "0"){
                        i -=1;
                        k += 1;
                    }else if((tape1.charAt(i) === "" || tape1.charAt(i) === "B")  && tape2.charAt(j) === "0"  && (tape3.charAt(k) === "" || tape3.charAt(k) === "B") ){
                        i += 1;
                        j -= 1;
                        stateNow = 'q3';
                    }else if((tape2.charAt(j) === "" || tape2.charAt(j) === "B")  && tape1.charAt(i) === "0"  && (tape3.charAt(k) === "" || tape3.charAt(k) === "B") ){
                        j += 1;
                        stateNow = 'q7';
                    }
                    break;
                }
                case 'q3':{
                    // 00B,000,B0B,0BB
                    if(tape1.charAt(i) === "0" && tape2.charAt(j) === "0"  && (tape3.charAt(k) === "" || tape3.charAt(k) === "B")){
                        // 00B
                        // 000
                        tape3 = tape3.replaceAt(k,"0");
                        i+=1;
                        k+=1;
                    }else if(tape1.charAt(i) === "0" && tape2.charAt(j) === "0"  && tape3.charAt(k) === "0"){
                        i+=1;
                        k+=1;
                    }else if((tape1.charAt(i) === "" || tape1.charAt(i) === "B")  && tape2.charAt(j) === "0"  && (tape3.charAt(k) === "" || tape3.charAt(k) === "B")){
                        i -= 1;
                        j -= 1;
                        stateNow = 'q2'
                    }else if((tape2.charAt(j) === "" || tape2.charAt(j) === "B")  && tape1.charAt(i) === "0"  && (tape3.charAt(k) === "" || tape3.charAt(k) === "B") ){
                        j += 1;
                        stateNow = 'q4';
                    }
                    break;
                }
                case 'q4':{
                    // 00B
                    if(tape1.charAt(i) === "0" && tape2.charAt(j) === "0"  && (tape3.charAt(k) === "" || tape3.charAt(k) === "B")){
                        tape2 = tape2.replaceAt(j,"B");
                        j += 1;
                        k -= 1;
                        stateNow = 'q5';
                    }
                    break;
                }
                case 'q5':{
                    if(tape1.charAt(i) === "0" && tape2.charAt(j) === "0"  && tape3.charAt(k) === "0"){
                        // 000
                        i+=1;
                        k-=1;
                    }else if( (tape1.charAt(i) === "" || tape1.charAt(i) === "B") && tape2.charAt(j) === "0"  && tape3.charAt(k) === "0"){
                        // B00
                        tape1 = tape1.replaceAt(i,"0");
                        i+=1;
                        k-=1;
                    }else if((tape1.charAt(i) === "" || tape1.charAt(i) === "B")  && tape2.charAt(j) === "0"  && (tape3.charAt(k) === "" || tape3.charAt(k) === "B") ){
                        // B0B
                        i -= 1;
                        j += 1;
                        stateNow = 'q6'
                    }else if(tape1.charAt(i) === "0" && (tape2.charAt(j) === "" || tape2.charAt(j) === "B")   && tape3.charAt(k) === "0"){
                        // 0B0
                        stateNow = 'q10'
                    }
                    break;
                }
                case 'q6':{
                    if(tape1.charAt(i) === "0" && tape2.charAt(j) === "0"  && (tape3.charAt(k) === "" || tape3.charAt(k) === "B")){
                        // 00B
                        j += 1;
                    }else if(tape1.charAt(i) === "0" && (tape2.charAt(j) === "" || tape2.charAt(j) === "B")  && (tape3.charAt(k) === "" || tape3.charAt(k) === "B")){
                        // 0BB
                        j -= 1;
                        k += 1;
                        stateNow = 'q2'
                    }
                    break;
                }
                case 'q7':{
                    if(tape1.charAt(i) === "0" && tape2.charAt(j) === "0"  && (tape3.charAt(k) === "" || tape3.charAt(k) === "B")){
                        // 00B
                        // 0BB
                        tape2 = tape2.replaceAt(j,"B");
                        j += 1;
                        k -= 1;
                        stateNow = 'q8';
                    }
                    break;
                }
                case 'q8':{
                    if(tape1.charAt(i) === "0" && tape2.charAt(j) === "0"  && tape3.charAt(k) === "0"){
                        // 000
                        i-=1;
                        k-=1;
                    }else if((tape1.charAt(i) === "" || tape1.charAt(i) === "B")  && tape2.charAt(j) === "0"  && tape3.charAt(k) === "0"){
                        // B00
                        // 000
                        tape1 = tape1.replaceAt(i,"0");
                        i-=1;
                        k-=1;
                    }else if((tape1.charAt(i) === "" || tape1.charAt(i) === "B")  && tape2.charAt(j) === "0"  && (tape3.charAt(k) === "" || tape3.charAt(k) === "B")){
                        // BOB
                        i+=1;
                        j+=1;
                        stateNow = 'q9'
                    }else if(tape1.charAt(i) === "0" && (tape2.charAt(j) === "" || tape2.charAt(j) === "B")   && tape3.charAt(k) === "0"){
                        // 0B0
                        stateNow = 'q10'
                    }
                    break;
                }
                case 'q9':{
                    if(tape1.charAt(i) === "0" && tape2.charAt(j) === "0"  && (tape3.charAt(k) === "" || tape3.charAt(k) === "B")){
                        // 00B
                        j += 1;
                    }else if(tape1.charAt(i) === "0" && (tape2.charAt(j) === "" || tape2.charAt(j) === "B")  && (tape3.charAt(k) === "" || tape3.charAt(k) === "B")){
                        // 0BB
                        j -=1;
                        k +=1;
                        stateNow = 'q3';
                    }
                    break;
                }
                case 'q10':{
                    loop = false;
                    break;
                }
                default:
                    break;
            }
        }
        return result;
    }

    factorial(n){
        return(n<2)?1:this.factorial(n-1)*n;
    }

    div(a,b){
        console.log(`(Log) Division ${a} / ${b}`);
        console.log(`(Log) Generating tape..`);
        var tape = "";
        for(var i = 0 ; i < a ; i++){
            tape += "1";
        }
        tape += "C";
        for( var i = 0 ; i < b ; i++){
            tape += "1";
        }
        tape += "";
        console.log(`(Log) Generating tape success`);
        console.log(`(Log) Tape : ${tape}`)

        var i = 0;
        var stateNow = 'q1';
        var result = [];
        var loop = true;
        while(loop){
            console.log(`Current Tape : ${tape} Current State : ${stateNow} i : ${i}`);
            result.push(`${stateNow}-${tape}-${i}`)

            switch(stateNow){
                case 'q0':{
                    if(tape.charAt(i) === "1"){
                        tape = tape.replaceAt(i,"B")
                        i+= 1;
                        stateNow = 'q1';
                    }else if(tape.charAt(i) === "C"){
                        tape = tape.replaceAt(i,"B");
                        i+= 1;
                        stateNow = 'q8';
                    }
                    break;
                }
                case 'q1':{
                    if(tape.charAt(i) === "1"){
                        i+=1;
                    }else if(tape.charAt(i) === "C"){
                        i+=1;
                        stateNow = 'q2';
                    }
                    break;
                }
                case 'q2':{
                    if(tape.charAt(i) === "1"){
                        i+=1;
                    }else if(tape.charAt(i) === "X"){
                        i+=1;
                    }else if(tape.charAt(i) === "0"){
                        i-=1;
                        stateNow = 'q3';
                    }else if(tape.charAt(i) === "" || tape.charAt(i) === "B"){
                        i -=1;
                        stateNow = 'q3';
                    }
                    break;
                }
                case 'q3':{
                    if(tape.charAt(i) === "1"){
                        tape = tape.replaceAt(i,"X");
                        i-=1;
                        stateNow = 'q4';
                    }else if(tape.charAt(i) === "X"){
                        i -=1;
                    }
                    break;
                }
                case 'q4':{
                    if(tape.charAt(i) === "1"){
                        i-=1;
                        stateNow = 'q6';
                    }else if(tape.charAt(i) === "C"){
                        i += 1;
                        stateNow = 'q5';
                    }
                    break;
                }
                case 'q5':{
                    if(tape.charAt(i) === "X"){
                        tape = tape.replaceAt(i,"1");
                        i+= 1;
                    }else if(tape.charAt(i) === "" || tape.charAt(i) === "B"){
                        tape = tape.replaceAt(i,"0")
                        i -=1;
                        stateNow = 'q6';
                    }else if(tape.charAt(i) === "0"){
                        i+=1;
                    }
                    break;
                }
                case 'q6':{
                    if(tape.charAt(i) === "1"){
                        i-=1;
                    }else if(tape.charAt(i) === "C"){
                        i-=1;
                        stateNow = 'q7';
                    }else if(tape.charAt(i) === "0"){
                        i -=1;
                    }
                    break;
                }
                case 'q7':{
                    if(tape.charAt(i) === "1"){
                        i-=1;
                    }else if(tape.charAt(i) === "" || tape.charAt(i) === "B"){
                        i += 1;
                        stateNow = 'q0';
                    }
                    break;
                }
                case 'q8':{
                    if(tape.charAt(i) === "1"){
                        tape = tape.replaceAt(i,"B")
                        i+=1
                    }else if(tape.charAt(i) === "0"){
                        tape = tape.replaceAt(i,"1");
                        i+= 1;
                    }else if(tape.charAt(i) === "" || tape.charAt(i) === "B"){
                        stateNow = 'q9'
                    }else if(tape.charAt(i) === "X"){
                        tape = tape.replaceAt(i,"B");
                        i+=1;
                    }
                    break;
                }
                case 'q9':{
                    loop = false;
                    break;
                }
            }
        }
        return result
    }

}
