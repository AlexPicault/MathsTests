export class OpService{

    retOperation : any = {};

    //get a new operation 
    getOp(opType, level) {
        var coefs = [0.25, 0.6, 1];
        var coef = coefs[level-1];
        var ops  = ['multiplication', 'addition', 'soustraction', 'mix'];
        switch(opType) {
            case 'multiplication' :
            this.retOperation.digit1 = Math.floor(coef * (level == 1 ? Math.random() * 10 : 3 + Math.random() * 7));
            this.retOperation.digit2 = Math.floor( 1 + Math.random() * 10 );
            this.retOperation.opChar = 'x';
            this.retOperation.result = this.retOperation.digit1 * this.retOperation.digit2;
            break;
    
            case 'addition' :
            this.retOperation.digit1 = Math.floor( Math.random() * 99 );
            this.retOperation.digit2 = Math.floor( 1 + Math.random() * (99 - this.retOperation.digit1) );
            this.retOperation.digit1 = Math.floor(this.retOperation.digit1 * coef);
            this.retOperation.digit2 = Math.floor(this.retOperation.digit2 * coef);
            this.retOperation.opChar = '+';
            this.retOperation.result = this.retOperation.digit1 + this.retOperation.digit2;
            break;
    
            case 'soustraction' :
            this.retOperation.digit1 = Math.floor( 10 + Math.random() * 90 );
            this.retOperation.digit2 = Math.floor( Math.random() * this.retOperation.digit1 );
            this.retOperation.digit1 = Math.floor(this.retOperation.digit1 * coef);
            this.retOperation.digit2 = Math.floor(this.retOperation.digit2 * coef);
            this.retOperation.opChar = '-';
            this.retOperation.result = this.retOperation.digit1 - this.retOperation.digit2;
            break;
    
            default :
            return this.getOp(ops[Math.floor(Math.random() * 3)], level);
        }
        this.retOperation.op = opType;
        
        return this.retOperation;
    }
    
}