class SceneManager {
	public static root:egret.DisplayObjectContainer;
	public static animationEnabled:boolean=true;
	public static animationDuration:number=300;

	public static init(root:egret.DisplayObjectContainer){
		SceneManager.root=root;
	}

	public static go(scene:any,animationEnabled:boolean=true){
		const root=SceneManager.root,toScene:BaseScene=new scene();
		if(root.numChildren>0){
			let currentScene:BaseScene=<BaseScene>root.getChildAt(root.numChildren-1);
			if(animationEnabled&&SceneManager.animationEnabled){
				SceneManager.switchAnimation(currentScene,'out');
			}else{
				currentScene.visible=false;
			}
			currentScene.onHide&&currentScene.onHide();
		}
		root.addChild(toScene);
		toScene.addEventListener(egret.Event.COMPLETE,()=>{
			toScene.onCreated&&toScene.onCreated();
			toScene.onShow&&toScene.onShow();
		},this);
		if(animationEnabled&&SceneManager.animationEnabled){
			SceneManager.switchAnimation(toScene);
		}
	}

	public static back(){
		const root=SceneManager.root;
		if(root.numChildren>1){
			let currentScene:BaseScene=<BaseScene>root.getChildAt(root.numChildren-1),
				toScene:BaseScene=<BaseScene>root.getChildAt(root.numChildren-2);
			toScene.visible=true;
			toScene.onShow&&toScene.onShow();
			root.removeChild(currentScene);
			currentScene.onHide&&currentScene.onHide();
			currentScene.onDestroyed&&currentScene.onDestroyed();
		}
	}

	public static backToScene(scene:any){
		const root=SceneManager.root,currentScene:any=root.getChildAt(root.numChildren-1);
		while(root.numChildren>1){
			if(currentScene.constructor.name!==scene.name){
				SceneManager.back();
			}else{
				break;
			}
		}
	}

	private static switchAnimation(sceneInstance:any,action:string='in'){
		if(action==='out'){
			egret.Tween.get(sceneInstance).to({x:-sceneInstance.width},SceneManager.animationDuration,egret.Ease.sineIn).call(()=>{
				sceneInstance.x=0;
				sceneInstance.visible=false;
			},sceneInstance);
		}else{
			sceneInstance.x=sceneInstance.width;
			egret.Tween.get(sceneInstance).to({x:0},SceneManager.animationDuration,egret.Ease.sineIn);
		}
	}
}