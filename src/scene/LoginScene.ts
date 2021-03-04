class LoginScene extends BaseScene {
    private progressBar:eui.ProgressBar;
    private isLogining:boolean=false;
    private timer:egret.Timer;

	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
		if(partName&&instance.touchEnabled){
            instance.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
                switch(partName){
                    case 'loginBtn':
                        if(this.isLogining) return;
                        this.isLogining=true;
                        let progressValue=0;
                        this.timer = new egret.Timer(100, 0);
                        this.timer.addEventListener(egret.TimerEvent.TIMER, ()=>{
                            if(progressValue<100){
                                progressValue+=Math.round(Math.random()*4);
                                if(progressValue>100) progressValue=100;
                            }else{
                                this.timer.stop();
                                SceneManager.go(IndexScene);
                            }
                            this.progressBar.value=progressValue;
                        }, this);
                        this.timer.start();
                        break;
                    default:
                        break;
                }
            })
        }
	}
	
}