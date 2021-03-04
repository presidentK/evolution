class BaseScene extends eui.Component implements eui.UIComponent{
    public constructor(){
        super();
    }

    protected partAdded(partName: string, instance: any):void{
        super.partAdded(partName, instance);
        if(partName&&instance.touchEnabled){
            instance.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
                switch(partName){
                    case 'back':
                        this.back();
                        break;
                    default:
                        break;
                }
            })
        }
    }
    
    protected childrenCreated():void{
		super.childrenCreated();
	}

    public back(){
        SceneManager.back();
    }

    public onCreated(){
        
    }

    public onShow(){

    }

    public onHide(){

    }

    public onDestroyed(){

    }

}