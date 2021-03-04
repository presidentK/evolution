class LoginScene extends BaseScene {
	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
		if(partName&&instance.touchEnabled){
            instance.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
                switch(partName){
                    case 'label1':
                        egret.log('[INFO]:label1 clicked');
                        break;
                    default:
                        break;
                }
            })
        }
	}
	
}