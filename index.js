/*globals THREE */
(() => {
    var dom = document.querySelector('canvas'),
    width = window.innerWidth,
    height = window.innerHeight,
    mp = Math.PI,
    reqRet,
    rad = function(r){return r * (Math.PI / 180);},
    init ={},
    cam ={};

    cam.x = init.x = 0;
    cam.y = init.y = 0;
    cam.z = init.z = 110;



    (function(w,r){
        w['r'+r] = w['r'+r] ||
        w['webkitR'+r] ||
        w['mozR'+r] ||
        w['oR'+r] ||
        w['msR'+r] ||
        function(callback){w.setTimeout(callback,1000/60);};
    })(window,'equestAnimationFrame');

    (function(w,c){
        w['c'+c] = w['c'+c] ||
        w['webkitC'+c] ||
        w['mozC'+c] ||
        w['oC'+c] ||
        w['msC'+c] ||
        function(callback){w.clearTimeout(callback);};
    })(window,'ancelAnimationFrame');

    var renderer = new THREE.WebGLRenderer({
        canvas:dom
    });
    renderer.setSize(width,height);
    renderer.setPixelRatio(window.devicePixelRatio);

    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(10,width / height,1,10000);
    camera.position.set(init.x, init.y, init.z);

    var draw_meta = [],
        pos = [];
        pos[0] = [7,0,-15];
        pos[1] = [3,3,-8];
        pos[2] = [3,-4,-12];
        pos[3] = [-4,0,-10];
        pos[4] = [-4,-6,-2];
        pos[5] = [-7,5,-15];
        pos[6] = [-14,5,-10];
        pos[7] = [-12,0,-15];
        pos[8] = [-9,-4,-1];
        pos[9] = [-5,5,-1];

        pos[10] = [14,5,-10];
        pos[11] = [12,0,-15];
        pos[12] = [9,-4,-1];
        pos[13] = [5,5,-1];
    var draw = function(n){
        var name = '_'+n,
            rotation = (Math.random() * (50 - 1) + 1 | 0) / 10000,
            rot_x = (Math.random() * 12 | 0) / 10,
            rot_y = (Math.random() * 12 | 0) / 10,
            rot_z = (Math.random() * 12 | 0) / 10,
            x = (Math.random() * 10 | 0) - 5,
            y = (Math.random() * 10 | 0) - 5,
            z = (Math.random() * 10 | 0) - 5,
            size = Math.random() * (4 - 1) + 1 | 0;

        var mesh = new THREE.Mesh(
            new THREE.BoxGeometry(size,size,size,8,8),
            new THREE.MeshPhongMaterial({color:0xf8b500,shininess:2})
        );
        draw_meta[name] = {};
        draw_meta[name].rotation = rotation;
        draw_meta[name].move = rotation * 10;
        mesh.rotation.x += rot_x;
        mesh.rotation.y += rot_y;
        mesh.rotation.z += rot_z;
        mesh.name = name;
        // mesh.position.set(x,y,z);
        mesh.position.set(pos[n - 1][0],pos[n - 1][1],pos[n - 1][2]);
        scene.add(mesh);
    };

    var i = 0,
        draw_cnt = 14;
    while(i < draw_cnt){
        draw(i + 1);
        i = (i + 1)|0;
    }

    var cen = new THREE.Mesh(
        new THREE.BoxGeometry(3,3,3),
        new THREE.MeshNormalMaterial()
    );
    cen.rotation.x += 0.8;
    cen.rotation.y += 1.2;
    cen.rotation.z += 0;
    cen.position.set(0,0,0);
    scene.add(cen);

    //ライト
    var light_1 = new THREE.DirectionalLight(0xffffff,0.1);
    var light_2 = new THREE.AmbientLight(0xffffff,0.9);
    light_1.position.set(0,100,100);
    scene.add(light_1);
    scene.add(light_2);

    //背景色
    renderer.setClearColor(0xffffff, 1.0);

    //毎秒描画
    var load = function(){
        scene.traverse(function(obj){
            if(obj instanceof THREE.Mesh === true && obj.name){
                obj.rotation.x += draw_meta[obj.name].rotation;
                obj.rotation.y += draw_meta[obj.name].rotation;
                obj.rotation.z += draw_meta[obj.name].rotation;
                // obj.position.x += draw_meta[obj.name].move;
                // if(obj.position.x > 20){
                //     obj.position.x = -20;
                // }
            }
        });

        camera.position.x += (cam.x - camera.position.x) * 0.03;
        camera.position.y += (cam.y - camera.position.y) * 0.03;
        camera.lookAt(new THREE.Vector3(0, 0, 0));


        renderer.render(scene,camera);
        requestAnimationFrame(load);
    };
    load();


    $(window).on('resize',function(){
        var w = window.innerWidth,
        h = window.innerHeight;
        renderer.setSize(w,h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
    })
    .on('mousemove',function(e){
        var x = (e.clientX - dom.getBoundingClientRect().left),
            y = (e.clientY - dom.getBoundingClientRect().top),
            dom_w = dom.clientWidth / 2,
            dom_h = dom.clientHeight / 2;

            cam.x = (x - dom_w) / 12;
            cam.y = (y - dom_h) / 12;


    })
    .on('mouseleave',function(){
        cam.x = init.x;
        cam.y = init.y;
    });
})();
