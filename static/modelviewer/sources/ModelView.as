//ActionScript 3.0
//  package com
//    package zam
//      package MOM
//        class MOM
package com.zam.MOM 
{
    import __AS3__.vec.*;
    import com.zam.*;
    import flash.display.*;
    import flash.events.*;
    import flash.geom.*;
    import flash.net.*;
    import flash.text.*;
    import flash.utils.*;
    import org.papervision3d.core.geom.*;
    import org.papervision3d.core.geom.renderables.*;
    import org.papervision3d.core.math.*;
    import org.papervision3d.core.proto.*;
    import org.papervision3d.events.*;
    import org.papervision3d.materials.*;
    import org.papervision3d.materials.utils.*;
    import org.papervision3d.objects.*;
    import org.papervision3d.objects.primitives.*;
    
    public class MOM extends org.papervision3d.objects.DisplayObject3D
    {
        public function MOM(arg1:String, arg2:*=null)
        {
            var loc1:*;
            loc1 = 0;
            this._center = new org.papervision3d.core.geom.renderables.Vertex3D();
            this._boundingbox = new org.papervision3d.core.geom.renderables.Vertex3D();
            this._attachments = new Array(26);
            super(null, null);
            if (arg2 != null)
            {
                _stage = arg2 as com.zam.Viewer;
            }
            this._contentpath = arg1;
            this._materials = new org.papervision3d.materials.utils.MaterialsList();
            this._container = this;
            blendMode = flash.display.BlendMode.LAYER;
            addEventListener(com.zam.MOM.MOMEvent.GEOMETRY_LOADED, this.onMomGeometryDone);
            addEventListener(com.zam.MOM.MOMEvent.MATERIALS_LOADED, this.onMomMaterialsDone);
            addEventListener(com.zam.MOM.MOMEvent.MOM_LOADED, this.onMomLoadComplete);
            addEventListener(com.zam.MOM.MOMEvent.INTERNAL_ERROR, this.onError);
            this._mumtextures = new Array();
            this._loadedMaterials = new Array();
            if (!_loadedAttachments)
            {
                _loadedAttachments = new Array();
            }
            if (!_waitingAttachments)
            {
                _waitingAttachments = new Array();
            }
            if (!_waitingArmor)
            {
                _waitingArmor = new Array();
            }
            while (loc1 < this._attachments.length) 
            {
                this._attachments[loc1] = null;
                ++loc1;
            }
            this.loaded = false;
            return;
        }

        private function addMaterial(arg1:String):org.papervision3d.core.proto.MaterialObject3D
        {
            var loc1:*;
            loc1 = null;
            var loc3:*;
            loc3 = null;
            var loc2:*;
            loc2 = arg1.toLowerCase();
            if (this._materials)
            {
                loc1 = this._materials.getMaterialByName(loc2);
            }
            else 
            {
                this._materials = new org.papervision3d.materials.utils.MaterialsList();
            }
            if (!loc1)
            {
                if (loc2 != "")
                {
                    loc3 = this._nocache ? "?" + Math.floor(Math.random() * 10000) + new Date().getTime() : "";
                    loc1 = new org.papervision3d.materials.BitmapFileMaterial(this._contentpath + "minalpha/textures/" + loc2 + loc3);
                    loc1.addEventListener(org.papervision3d.events.FileLoadEvent.LOAD_PROGRESS, this.onFileLoadProgress);
                    loc1.addEventListener(org.papervision3d.events.FileLoadEvent.LOAD_COMPLETE, this.onMaterialLoadComplete);
                    loc1.addEventListener(org.papervision3d.events.FileLoadEvent.LOAD_ERROR, this.onMaterialLoadError);
                    loc1.addEventListener(org.papervision3d.events.FileLoadEvent.SECURITY_LOAD_ERROR, this.onMaterialLoadError);
                    loc1.name = loc2;
                    loc1.doubleSided = false;
                    loc1.smooth = true;
                    this._materials.addMaterial(loc1);
                    var loc4:*;
                    var loc5:*;
                    loc5 = ((loc4 = this).materialsToLoad + 1);
                    loc4.materialsToLoad = loc5;
                }
            }
            return loc1;
        }

        public function destroy():void
        {
            var loc1:*;
            loc1 = null;
            var loc2:*;
            loc2 = 0;
            this.dtrace("!!!!!!!!!!!!!!!! DESTROY !!!!!!!!!!!!!!!!");
            _loadingIdle = true;
            var loc3:*;
            loc3 = 0;
            var loc4:*;
            loc4 = this._container.children;
            for (loc1 in loc4)
            {
                this._container.removeChildByName(loc1);
            }
            while (loc2 < this._attachments.length) 
            {
                this._attachments[loc2] = null;
                ++loc2;
            }
            this._basespecial = null;
            this._npcbase = "";
            this._filename = "";
            this.done = false;
            this.loaded = false;
            this.geometryLoaded = false;
            this.head = null;
            this.opacity = 1;
            this._race = -1;
            this._gender = -1;
            this._skincolor = 0;
            this._facetype = 0;
            this._haircolor = 0;
            this._hairstyle = 0;
            this._facialfeature = 0;
            this._facialcolor = 0;
            this._showhair = true;
            this._showfacefeatures = true;
            _isnpc = false;
            this._type = 0;
            this._isattach = false;
            _waitingArmor = new Array();
            _loadedAttachments = new Array();
            _waitingAttachments = new Array();
            return;
        }

        public function setRaceGender(arg1:int, arg2:int):void
        {
            if (arg1 == 0 || arg1 > RACES.length || arg2 > GENDERS.length)
            {
                return;
            }
            if (!this.loaded)
            {
                this._race = arg1;
                this._gender = arg2;
                return;
            }
            if (arg1 == this._race && arg2 == this._gender)
            {
                return;
            }
            var loc1:*;
            loc1 = "";
            var loc2:*;
            loc2 = 0;
            while (loc2 < this._attachments.length) 
            {
                if (this._attachments[loc2] != null)
                {
                    if (loc1 != "")
                    {
                        loc1 = loc1 + ",";
                    }
                    loc1 = loc1 + String(this._attachments[loc2].slot + "," + this._attachments[loc2].id);
                }
                ++loc2;
            }
            this.destroy();
            this._race = arg1;
            this._gender = arg2;
            this.load();
            this.attach(loc1);
            return;
        }

        public function get skincolor():int
        {
            return this._skincolor;
        }

        private function addModel(arg1:int, arg2:int):void
        {
            var loc6:*;
            loc6 = null;
            var loc7:*;
            loc7 = null;
            var loc8:*;
            loc8 = 0;
            var loc9:*;
            loc9 = null;
            var loc1:*;
            loc1 = UNIQUESLOTS[arg1];
            var loc2:*;
            loc2 = new Array();
            var loc3:*;
            loc3 = 0;
            if (loc1 == com.zam.MOM.MOMItemSlot.RIGHTHAND && this._attachments[loc1] && (arg1 == com.zam.MOM.MOMItemSlot.TWOHAND || arg1 == com.zam.MOM.MOMItemSlot.ONEHAND))
            {
                arg1 = com.zam.MOM.MOMItemSlot.OFFHAND;
                loc1 = com.zam.MOM.MOMItemSlot.LEFTHAND;
            }
            var loc4:*;
            loc4 = 0;
            while (loc4 < this._slotbones.length) 
            {
                if (this._slotbones[loc4].slot == arg1 || arg1 == com.zam.MOM.MOMItemSlot.RANGED && this._slotbones[loc4].slot == loc1)
                {
                    loc2.push(this._slotbones[loc4]);
                    ++loc3;
                    if (!(arg1 == com.zam.MOM.MOMItemSlot.SHOULDER) || loc3 == 2)
                    {
                        break;
                    }
                }
                ++loc4;
            }
            var loc5:*;
            loc5 = 0;
            while (loc5 < loc3) 
            {
                loc6 = "";
                loc7 = arg2.toString();
                loc8 = com.zam.MOM.MOMModelType.ITEM;
                if (arg1 != com.zam.MOM.MOMItemSlot.HEAD)
                {
                    if (arg1 == com.zam.MOM.MOMItemSlot.SHOULDER)
                    {
                        loc6 = "_" + loc5 + 1;
                        loc7 = loc7 + loc6;
                        loc8 = com.zam.MOM.MOMModelType.SHOULDER;
                    }
                }
                else 
                {
                    this.loader(4, "models/armor/1/" + loc7);
                    loc7 = loc7 + "_" + this._race + "_" + this._gender;
                    loc8 = com.zam.MOM.MOMModelType.HELM;
                }
                (loc9 = new com.zam.MOM.MOM(this._contentpath)).addEventListener(org.papervision3d.events.FileLoadEvent.LOAD_PROGRESS, this.onFileLoadProgress);
                loc9.addEventListener(org.papervision3d.events.FileLoadEvent.LOAD_ERROR, this.onAttachmentLoadError);
                if (!this._isattach)
                {
                    loc9.addEventListener(com.zam.MOM.MOMEvent.ATTACHMENT_LOADED, this.onAttachmentLoadComplete);
                }
                loc9.addEventListener(com.zam.MOM.MOMEvent.CHANGED, this.onMomChange);
                loc9.load(loc8 + com.zam.MOM.MOMModelType.ATTACH, loc7, this._scaling / INTERNAL_SCALING);
                loc9.copyTransform(this._bones[loc2[loc5].bone].matrix);
                loc9.x = loc9.x + this._bones[loc2[loc5].bone].transpivot.x;
                loc9.y = loc9.y + this._bones[loc2[loc5].bone].transpivot.y;
                loc9.z = loc9.z + this._bones[loc2[loc5].bone].transpivot.z;
                loc9.name = "slot_" + loc1 + loc6;
                this._container.removeChildByName(loc9.name);
                if (arg1 == com.zam.MOM.MOMItemSlot.TWOHAND)
                {
                    this._container.removeChildByName("slot_13");
                }
                this._container.addChild(loc9);
                this._attachments[loc1] = {"name":"slot_" + loc1, "slot":arg1, "id":arg2, "geo":null};
                this.dtrace("attached \"slot_" + loc1 + loc6 + "\"");
                ++loc5;
            }
            return;
        }

        public function set skincolor(arg1:int):void
        {
            if (!(this._skincolor == arg1) && !(arg1 == -1))
            {
                this._skincolor = arg1;
                this.updateCharacter(true);
            }
            return;
        }

        private function onMomGeometryDone(arg1:org.papervision3d.events.FileLoadEvent):void
        {
            this.dtrace("--", "momGeometryLoaded" + (this._isattach ? " (attachment)" : "") + ": " + this._contentpath + this._filename);
            this.geometryLoaded = true;
            if (this.materialsToLoad == 0 && !this.done)
            {
                dispatchEvent(new flash.events.Event(com.zam.MOM.MOMEvent.MOM_LOADED));
            }
            if (this._isattach)
            {
                dispatchEvent(new flash.events.Event(com.zam.MOM.MOMEvent.ATTACHMENT_LOADED));
            }
            else 
            {
                if (_waitingAttachments.length > 0)
                {
                    this.loadNextModel();
                }
                else 
                {
                    _loadingIdle = true;
                }
            }
            return;
        }

        public function get hairstyle():int
        {
            return this._hairstyle;
        }

        private function onLoadOMAError(arg1:org.papervision3d.events.FileLoadEvent):void
        {
            this._showhair = false;
            this._showfacefeatures = true;
            this.setMeshes();
            return;
        }

        private function loader(arg1:int, arg2:String):void
        {
            var loader:com.zam.ZAMLoader;
            var noCache:String;
            var pId:int;
            var pUrl:String;
            var queued:Boolean;
            var url:String;

            var loc1:*;
            url = null;
            queued = false;
            noCache = null;
            pId = arg1;
            pUrl = arg2;
            url = pUrl.toLowerCase();
            queued = false;
            this.dtrace("loader(" + pId + "," + pUrl + ")");
            loader = new com.zam.ZAMLoader();
            if (pId != 1)
            {
                if (pId != 2)
                {
                    if (pId != 3)
                    {
                        if (pId != 4)
                        {
                            if (pId == 5)
                            {
                                url = url + ".mum";
                                loader.dataFormat = flash.net.URLLoaderDataFormat.TEXT;
                                loader.addEventListener(org.papervision3d.events.FileLoadEvent.LOAD_COMPLETE, this.parseMUM);
                            }
                        }
                        else 
                        {
                            url = url + ".oma";
                            loader.dataFormat = flash.net.URLLoaderDataFormat.TEXT;
                            loader.addEventListener(org.papervision3d.events.FileLoadEvent.LOAD_COMPLETE, this.parseOMA);
                            loader.addEventListener(org.papervision3d.events.FileLoadEvent.LOAD_ERROR, this.onLoadOMAError);
                        }
                    }
                    else 
                    {
                        url = url + ".sis";
                        loader.dataFormat = flash.net.URLLoaderDataFormat.TEXT;
                        loader.addEventListener(org.papervision3d.events.FileLoadEvent.LOAD_COMPLETE, this.parseSISNPC);
                    }
                }
                else 
                {
                    url = url + ".sis";
                    loader.dataFormat = flash.net.URLLoaderDataFormat.TEXT;
                    loader.addEventListener(org.papervision3d.events.FileLoadEvent.LOAD_COMPLETE, this.parseSISArmor);
                }
            }
            else 
            {
                url = url + ".mom";
                this._filename = url;
                queued = true;
                loader.dataFormat = flash.net.URLLoaderDataFormat.BINARY;
                loader.addEventListener(org.papervision3d.events.FileLoadEvent.LOAD_COMPLETE, this.parseMOM);
            }
            loader.addEventListener(org.papervision3d.events.FileLoadEvent.LOAD_PROGRESS, this.onFileLoadProgress);
            loader.addEventListener(org.papervision3d.events.FileLoadEvent.LOAD_ERROR, this.onLoadError);
            loader.addEventListener(org.papervision3d.events.FileLoadEvent.SECURITY_LOAD_ERROR, this.onLoadError);
            try
            {
                if (queued)
                {
                    _loadingIdle = false;
                }
                url = escape(url);
                noCache = this._nocache ? "?" + Math.floor(Math.random() * 10000) + new Date().getTime() : "";
                this.dtrace("Downloading (" + pId + "): " + this._contentpath + url);
                loader.load(new flash.net.URLRequest(this._contentpath + url + noCache));
                dispatchEvent(new flash.events.Event(com.zam.MOM.MOMEvent.OPEN_FILE));
            }
            catch (ex:Error)
            {
                dtrace("Error loading file: " + url + ": " + undefined.message);
                if (queued)
                {
                    _loadingIdle = true;
                }
            }
            return;
        }

        public function attachArmor(arg1:int, arg2:int):void
        {
            if (!(this._type == com.zam.MOM.MOMModelType.CHAR) && !(this._type == com.zam.MOM.MOMModelType.NPC) || this.slotType(arg1) == -1)
            {
                return;
            }
            if (this.slotType(arg1) != com.zam.MOM.MOMModelType.ITEM)
            {
                this.dtrace("--", "queued armor");
                _waitingArmor.push({"slot":arg1, "id":arg2});
                if (this.done || this.loaded && this.materialsToLoad == 0)
                {
                    this.loadNextArmor();
                }
            }
            else 
            {
                this.attachItem(arg1, arg2);
            }
            return;
        }

        private function parseMUM(arg1:org.papervision3d.events.FileLoadEvent):void
        {
            var loc2:*;
            loc2 = null;
            var loc3:*;
            loc3 = null;
            var loc7:*;
            loc7 = 0;
            var loc8:*;
            loc8 = null;
            this.dtrace("--", "parseMUM()");
            var loc1:*;
            loc1 = arg1.target.data.split("\r\n");
            var loc4:*;
            loc4 = loc1.shift();
            var loc5:*;
            loc5 = parseInt(loc1.shift());
            this._mumtextures = new Array();
            var loc6:*;
            loc6 = 0;
            while (loc6 < loc5) 
            {
                loc2 = loc1.shift();
                loc3 = loc2.split(" ");
                loc7 = parseInt(loc3.shift());
                loc8 = loc3.join(" ");
                this._mumtextures[loc7] = loc8 || "";
                ++loc6;
            }
            this.loader(1, "models/" + loc4.substr(0, loc4.lastIndexOf(".")));
            return;
        }

        private function onMomLoadComplete(arg1:flash.events.Event):void
        {
            this.dtrace("--", "momLoadComplete " + (this._isattach ? "(attachment)" : ""));
            this.done = true;
            dispatchEvent(new org.papervision3d.events.FileLoadEvent(org.papervision3d.events.FileLoadEvent.LOAD_COMPLETE));
            return;
        }

        public function set hairstyle(arg1:int):void
        {
            if (!(this._hairstyle == arg1) && !(arg1 == -1))
            {
                this._hairstyle = arg1;
                this.updateCharacter(true);
            }
            return;
        }

        public function get facetype():int
        {
            return this._facetype;
        }

        public function get facialfeature():int
        {
            return this._facialfeature;
        }

        public function get contentpath():String
        {
            return this._contentpath;
        }

        public function get type():int
        {
            return this._type;
        }

        public function set contentpath(arg1:String):void
        {
            this._contentpath = arg1;
            return;
        }

        public function set facetype(arg1:int):void
        {
            if (!(this._facetype == arg1) && !(arg1 == -1))
            {
                this._facetype = arg1;
                this.updateCharacter(true);
            }
            return;
        }

        private function onMaterialLoadError(arg1:org.papervision3d.events.FileLoadEvent):void
        {
            this.dtrace("--", "momMaterialLoadError (" + this.materialsToLoad + "): " + arg1.file);
            var loc1:*;
            var loc2:*;
            loc2 = ((loc1 = this).materialsToLoad - 1);
            loc1.materialsToLoad = loc2;
            if (this.materialsToLoad == 0)
            {
                this._loadedMaterials = [];
                dispatchEvent(new flash.events.Event(com.zam.MOM.MOMEvent.MATERIALS_LOADED));
            }
            return;
        }

        public function attach(arg1:String):void
        {
            var loc3:*;
            loc3 = 0;
            var loc4:*;
            loc4 = 0;
            this.dtrace("attach(", arg1, ")");
            if (!(this._type == com.zam.MOM.MOMModelType.CHAR) && !(this._type == com.zam.MOM.MOMModelType.NPC) || arg1 == "")
            {
                return;
            }
            var loc1:*;
            loc1 = arg1.split(",");
            if (loc1.length % 2 != 0)
            {
                trace("!!", "Lists are not equal length");
                return;
            }
            var loc2:*;
            loc2 = 0;
            while (loc2 < loc1.length) 
            {
                loc3 = loc1[loc2];
                loc4 = loc1[(loc2 + 1)];
                if (this.slotType(loc3) != com.zam.MOM.MOMModelType.ITEM)
                {
                    this.attachArmor(loc3, loc4);
                }
                else 
                {
                    this.attachItem(loc3, loc4);
                }
                loc2 = loc2 + 2;
            }
            return;
        }

        public function set facialcolor(arg1:int):void
        {
            if (!(this._facialcolor == arg1) && !(arg1 == -1))
            {
                this._facialcolor = arg1;
                this.updateCharacter(true);
            }
            return;
        }

        private function onLoadMOMError(arg1:org.papervision3d.events.FileLoadEvent):void
        {
            this.dtrace("--", "loadMOMError: " + arg1.message);
            this._filename = "";
            var loc1:*;
            loc1 = new org.papervision3d.events.FileLoadEvent(org.papervision3d.events.FileLoadEvent.LOAD_ERROR, arg1.file, -1, -1, arg1.message);
            dispatchEvent(loc1);
            return;
        }

        public function get center():org.papervision3d.core.geom.renderables.Vertex3D
        {
            return this._center;
        }

        private function parseSISArmor(arg1:org.papervision3d.events.FileLoadEvent):void
        {
            var loc3:*;
            loc3 = 0;
            var loc4:*;
            loc4 = null;
            var loc5:*;
            loc5 = null;
            var loc12:*;
            loc12 = null;
            var loc13:*;
            loc13 = null;
            this.dtrace("--", "parseSISArmor()");
            var loc1:*;
            loc1 = parseInt(arg1.file.substring(arg1.file.lastIndexOf("/") + 1, arg1.file.lastIndexOf(".")));
            var loc2:*;
            loc2 = arg1.target.data.split("\r\n");
            loc5 = (loc4 = loc2.shift()).split(" ");
            var loc6:*;
            loc6 = parseInt(loc5[0]);
            var loc7:*;
            loc7 = UNIQUESLOTS[loc6];
            if (this._attachments[loc7] != null)
            {
                this.clearSlot(loc6, false);
            }
            var loc8:*;
            loc8 = new Array();
            var loc9:*;
            loc9 = parseInt(loc2.shift());
            loc3 = 0;
            while (loc3 < loc9) 
            {
                loc5 = (loc4 = loc2.shift()).split(" ");
                loc12 = {"index":parseInt(loc5[0]), "value":parseInt(loc5[1])};
                loc8.push(loc12);
                ++loc3;
            }
            var loc10:*;
            loc10 = parseInt(loc2.shift());
            loc3 = 0;
            while (loc3 < loc10) 
            {
                if ((loc5 = (loc4 = loc2.shift()).split(" ")).length > 3)
                {
                    loc5[2] = loc5.slice(2).join(" ");
                }
                if ((loc13 = {"region":parseInt(loc5[0]), "gender":parseInt(loc5[1]), "name":loc5[2]}).gender == this._gender && !_isnpc)
                {
                    if (loc13.region > 0)
                    {
                        if (!(loc13.region == com.zam.MOM.MOMTextureRegion.FOOT && (this._race == 6 || this._race == 8 || this._race == 11 || this.race == 14)))
                        {
                            this._baked.push({"region":loc13.region, "layer":SLOTSORT[loc6], "name":loc13.name, "slot":loc6});
                            this.addMaterial(loc13.name);
                        }
                    }
                    else 
                    {
                        this._special[2] = loc13.name;
                        this.addMaterial(loc13.name);
                    }
                }
                ++loc3;
            }
            loc4 = loc2.shift();
            var loc11:*;
            loc11 = [0, 0, 0];
            if (loc4 != null)
            {
                loc5 = loc4.split(" ");
                loc11 = [parseInt(loc5[0]), parseInt(loc5[1]), parseInt(loc5[2])];
            }
            this._attachments[loc7] = {"name":"slot_" + loc6, "slot":loc6, "id":loc1, "geo":loc8, "abc":loc11};
            if (loc6 == com.zam.MOM.MOMItemSlot.ROBE)
            {
                this._attachments[loc6] = {"name":"slot_" + loc6, "slot":loc6, "id":loc1, "geo":[], "abc":[0, 0, 0]};
            }
            this.dtrace("attached \"slot_" + loc6 + "\" (" + this._attachments[loc6].abc + ")");
            this.updateCharacter();
            this.loadNextArmor();
            return;
        }

        public function set facialfeature(arg1:int):void
        {
            if (!(this._facialfeature == arg1) && !(arg1 == -1))
            {
                this._facialfeature = arg1;
                this.updateCharacter(true);
            }
            return;
        }

        private function parseIdFromDisplayName(arg1:String):int
        {
            var loc1:*;
            loc1 = new RegExp("_(\\d+)");
            var loc2:*;
            loc2 = loc1.exec(arg1)[1];
            if (loc2)
            {
                return parseInt(loc2);
            }
            return -1;
        }

        private function setMeshes():void
        {
            var loc1:*;
            loc1 = 0;
            var loc2:*;
            loc2 = 0;
            var loc3:*;
            loc3 = 0;
            var loc4:*;
            loc4 = 0;
            if (this._hairstyles.length == 0)
            {
                return;
            }
            this.dtrace("setMeshes()");
            loc1 = 0;
            while (loc1 < this._meshes.length) 
            {
                this._container.getChildByName("geo_" + this._meshes[loc1].index).visible = this._meshes[loc1].geosetid == 0;
                ++loc1;
            }
            loc1 = 0;
            while (loc1 < 16) 
            {
                this._chargeosets[loc1] = 1;
                ++loc1;
            }
            this._chargeosets[7] = 2;
            if (this._showfacefeatures && this._facialfeatures[this._facialfeature])
            {
                this._chargeosets[1] = this._facialfeatures[this._facialfeature].geoset1;
                this._chargeosets[2] = this._facialfeatures[this._facialfeature].geoset2;
                this._chargeosets[3] = this._facialfeatures[this._facialfeature].geoset3;
            }
            if (this._race == 9)
            {
                if (this._chargeosets[1] == 1)
                {
                    var loc5:*;
                    var loc6:*;
                    var loc7:*;
                    loc7 = ((loc5 = this._chargeosets)[(loc6 = 1)] + 1);
                    loc5[loc6] = loc7;
                }
                if (this._chargeosets[2] == 1)
                {
                    loc7 = ((loc5 = this._chargeosets)[(loc6 = 2)] + 1);
                    loc5[loc6] = loc7;
                }
                if (this._chargeosets[3] == 1)
                {
                    loc7 = ((loc5 = this._chargeosets)[(loc6 = 3)] + 1);
                    loc5[loc6] = loc7;
                }
            }
            loc1 = 0;
            while (loc1 < this._attachments.length) 
            {
                if (this._attachments[loc1] != null)
                {
                    if (this._attachments[loc1].geo != null)
                    {
                        loc2 = 0;
                        while (loc2 < this._attachments[loc1].geo.length) 
                        {
                            this._chargeosets[this._attachments[loc1].geo[loc2].index] = this._attachments[loc1].geo[loc2].value;
                            ++loc2;
                        }
                        if (this._chargeosets[13] == 1)
                        {
                            this._chargeosets[13] = 1 + int(this._attachments[loc1].abc[2]);
                        }
                        if (this._attachments[loc1].slot == 6)
                        {
                            this._chargeosets[18] = 1 + int(this._attachments[loc1].abc[0]);
                            this.dtrace("robe", this._chargeosets[18]);
                        }
                    }
                }
                ++loc1;
            }
            if (this._chargeosets[13] == 2)
            {
                this._chargeosets[12] = loc5 = 0;
                this._chargeosets[5] = loc5;
            }
            if (this._chargeosets[4] > 1)
            {
                this._chargeosets[8] = 0;
            }
            if (this._showhair && this._hairstyles.length > 0)
            {
                loc1 = 0;
                while (loc1 < this._hairstyles.length) 
                {
                    loc2 = 0;
                    while (loc2 < this._meshes.length) 
                    {
                        if (!(this._meshes[loc2].geosetid == 0) && this._meshes[loc2].geosetid == this._hairstyles[loc1].geoset)
                        {
                            this._container.getChildByName("geo_" + this._meshes[loc2].index).visible = this._hairstyle == loc1 && this._showhair;
                        }
                        ++loc2;
                    }
                    ++loc1;
                }
            }
            loc1 = 0;
            while (loc1 < this._meshes.length) 
            {
                if ((this._race == 1 || this._race == 7 || this._race == 8 || this._race == 18) && this._gender == 0 && this._hairstyle == 0 && this._meshes[loc1].geosetid == 1)
                {
                    this._container.getChildByName("geo_" + this._meshes[loc1].index).visible = true;
                }
                loc2 = 1;
                while (loc2 < 20) 
                {
                    loc3 = loc2 * 100;
                    loc4 = (loc2 + 1) * 100;
                    if (this._meshes[loc1].geosetid > loc3 && this._meshes[loc1].geosetid < loc4 && loc2 >= 1 && loc2 <= 3)
                    {
                        this.dtrace("debug", loc1, this._meshes[loc1].geosetid, this._chargeosets[loc2], loc3, loc4);
                    }
                    if (this._meshes[loc1].geosetid > loc3 && this._meshes[loc1].geosetid < loc4)
                    {
                        this._container.getChildByName("geo_" + this._meshes[loc1].index).visible = this._meshes[loc1].geosetid == loc3 + this._chargeosets[loc2];
                    }
                    ++loc2;
                }
                if (this._race != 9)
                {
                    if (this._race == 22)
                    {
                        if (this._gender == 0 && (this._meshes[loc1].pass == 3 || this._meshes[loc1].pass == 2 || this._meshes[loc1].pass >= 36 && this._meshes[loc1].pass <= 47))
                        {
                            this._container.getChildByName("geo_" + this._meshes[loc1].index).visible = false;
                        }
                        else 
                        {
                            if (this._gender == 1 && (this._meshes[loc1].pass == 2 || this._meshes[loc1].pass == 3 || this._meshes[loc1].pass >= 58 && this._meshes[loc1].pass <= 69))
                            {
                                this._container.getChildByName("geo_" + this._meshes[loc1].index).visible = false;
                            }
                        }
                    }
                }
                else 
                {
                    if (this._gender == 1 && this._meshes[loc1].pass == 0)
                    {
                        this._container.getChildByName("geo_" + this._meshes[loc1].index).visible = false;
                    }
                    else 
                    {
                        if (this._gender == 0 && this._meshes[loc1].pass == 3)
                        {
                            this._container.getChildByName("geo_" + this._meshes[loc1].index).visible = false;
                        }
                    }
                }
                ++loc1;
            }
            dispatchEvent(new flash.events.Event(com.zam.MOM.MOMEvent.CHANGED, true));
            return;
        }

        private function parseSISNPC(arg1:org.papervision3d.events.FileLoadEvent):void
        {
            var loc2:*;
            loc2 = null;
            var loc3:*;
            loc3 = null;
            this.dtrace("--", "parseSISNPC()");
            var loc1:*;
            loc1 = arg1.target.data.split("\r\n");
            loc2 = loc1.shift();
            loc3 = loc2.split(" ");
            this._race = parseInt(loc3[0]);
            this._gender = parseInt(loc3[1]);
            loc2 = loc1.shift();
            if (loc2 != "")
            {
                this._npcbase = loc2;
            }
            loc2 = loc1.shift();
            loc3 = loc2.split(" ");
            this._skincolor = parseInt(loc3[0]);
            this._hairstyle = parseInt(loc3[1]);
            this._haircolor = parseInt(loc3[2]);
            this._facialfeature = parseInt(loc3[3]);
            this._facetype = parseInt(loc3[4]);
            this.load();
            loc2 = loc1.shift();
            loc3 = loc2.split(" ");
            var loc4:*;
            loc4 = parseInt(loc3[0]);
            var loc5:*;
            loc5 = parseInt(loc3[1]);
            var loc6:*;
            loc6 = parseInt(loc3[2]);
            var loc7:*;
            loc7 = parseInt(loc3[3]);
            var loc8:*;
            loc8 = parseInt(loc3[4]);
            var loc9:*;
            loc9 = parseInt(loc3[5]);
            var loc10:*;
            loc10 = parseInt(loc3[6]);
            var loc11:*;
            loc11 = parseInt(loc3[7]);
            var loc12:*;
            loc12 = parseInt(loc3[8]);
            var loc13:*;
            loc13 = parseInt(loc3[9]);
            if (loc4 != 0)
            {
                this.attachArmor(com.zam.MOM.MOMItemSlot.HEAD, loc4);
            }
            if (loc5 != 0)
            {
                this.attachArmor(com.zam.MOM.MOMItemSlot.SHOULDER, loc5);
            }
            if (loc6 != 0)
            {
                this.attachArmor(com.zam.MOM.MOMItemSlot.SHIRT, loc6);
            }
            if (loc7 != 0)
            {
                this.attachArmor(com.zam.MOM.MOMItemSlot.CHEST, loc7);
            }
            if (loc8 != 0)
            {
                this.attachArmor(com.zam.MOM.MOMItemSlot.BELT, loc8);
            }
            if (loc9 != 0)
            {
                this.attachArmor(com.zam.MOM.MOMItemSlot.PANTS, loc9);
            }
            if (loc10 != 0)
            {
                this.attachArmor(com.zam.MOM.MOMItemSlot.BOOTS, loc10);
            }
            if (loc11 != 0)
            {
                this.attachArmor(com.zam.MOM.MOMItemSlot.BRACERS, loc11);
            }
            if (loc12 != 0)
            {
                this.attachArmor(com.zam.MOM.MOMItemSlot.GLOVES, loc12);
            }
            if (loc13 != 0)
            {
                this.attachArmor(com.zam.MOM.MOMItemSlot.TABARD, loc13);
            }
            return;
        }

        private function dtrace(... rest):void
        {
            var args:Array;
            var elapsed:String;
            var s:String;
            var str:String;
            var title:String;

            var loc1:*;
            elapsed = null;
            title = null;
            str = null;
            s = null;
            args = rest;
            if (this._ttimer == 0)
            {
                this._ttimer = flash.utils.getTimer();
            }
            elapsed = (flash.utils.getTimer() - this._ttimer).toString();
            while (elapsed.length < 4) 
            {
                elapsed = elapsed + " ";
            }
            elapsed = "+" + elapsed;
            try
            {
                title = this._filename.substr(this._filename.lastIndexOf("/") + 1);
                str = args.join(" ");
                var loc2:*;
                loc2 = 0;
                var loc3:*;
                loc3 = str.split("\n");
                for each (s in loc3)
                {
                    trace(elapsed, title, s);
                }
            }
            catch (ex:Error)
            {
                trace(elapsed, "[d]", args.join(" "));
            }
            return;
        }

        private function updateBaked(arg1:int, arg2:int, arg3:String):void
        {
            var loc1:*;
            loc1 = false;
            var loc2:*;
            loc2 = 0;
            while (loc2 < this._baked.length) 
            {
                if (this._baked[loc2].region == arg1 && this._baked[loc2].layer == arg2)
                {
                    this._baked[loc2] = {"region":arg1, "layer":arg2, "name":arg3};
                    loc1 = true;
                }
                ++loc2;
            }
            if (!loc1)
            {
                this._baked.push({"region":arg1, "layer":arg2, "name":arg3});
            }
            return;
        }

        private function object_to_string(arg1:*):String
        {
            var loc3:*;
            loc3 = undefined;
            if (typeof arg1 != "object")
            {
                return arg1;
            }
            var loc1:*;
            loc1 = 0;
            var loc2:*;
            loc2 = "";
            var loc4:*;
            loc4 = 0;
            var loc5:*;
            loc5 = arg1;
            for (loc3 in loc5)
            {
                if (loc1 != 0)
                {
                    loc2 = loc2 + ", ";
                }
                loc2 = loc2 + loc3 + ":";
                if (arg1[loc3] === null)
                {
                    loc2 = loc2 + "null";
                }
                else 
                {
                    loc2 = loc2 + arg1[loc3].toString();
                }
                ++loc1;
            }
            return "{ " + loc2 + " }";
        }

        private function buildMeshes():void
        {
            var loc3:*;
            loc3 = null;
            var loc4:*;
            loc4 = null;
            var loc5:*;
            loc5 = 0;
            var loc6:*;
            loc6 = null;
            var loc7:*;
            loc7 = null;
            var loc8:*;
            loc8 = 0;
            var loc9:*;
            loc9 = null;
            var loc10:*;
            loc10 = null;
            var loc11:*;
            loc11 = null;
            var loc12:*;
            loc12 = null;
            var loc13:*;
            loc13 = null;
            var loc14:*;
            loc14 = null;
            this.dtrace("buildMeshes()");
            this._meshes.sortOn("pass", Array.NUMERIC);
            var loc1:*;
            loc1 = new Array();
            var loc2:*;
            loc2 = 0;
            while (loc2 < this._meshes.length) 
            {
                loc3 = this._meshes[loc2];
                this._container.removeChildByName("geo_" + loc3.index);
                (loc4 = this._container.addChild(new org.papervision3d.core.geom.TriangleMesh3D(null, null, null, "geo_" + loc3.index))).addGeometry(new org.papervision3d.core.proto.GeometryObject3D());
                loc4.geometry.vertices = new Array();
                loc5 = loc3.idx_start;
                while (loc5 < loc3.idx_end) 
                {
                    loc4.geometry.vertices.push(this._vertices[this._indices[loc5]].position);
                    loc5 = (loc5 + 1);
                }
                loc4.geometry.faces = new Array();
                if (loc3.opacity == 1 && !(loc3.blendmode == 6) && loc3.color == 16777215 && !loc3.envmap)
                {
                    if (loc3.geosetid == 0)
                    {
                        loc3.show = true;
                    }
                    if (loc3.material.search("armorreflect") == -1)
                    {
                        if (loc3.material != "item/objectcomponents/weapon/stave_2h_ulduarraid_d_03_glow.png")
                        {
                            if (this._filename != "models/creature/etherial/etherial.mom")
                            {
                                if (this._filename != "models/creature/etherialrobe/etherialrobe.mom")
                                {
                                    if (this._filename != "models/creature/airelemental/airelemental.mom")
                                    {
                                        if (this._filename != "models/creature/fireelemental/fireelemental.mom")
                                        {
                                            if (this._filename != "models/creature/elementalearth/elementalearth.mom")
                                            {
                                                if (this._filename != "models/creature/waterelemental/waterelemental.mom")
                                                {
                                                    if (this._filename == "models/creature/infernal/infernal.mom" || this._filename == "models/creature/abyssaloutland/abyssal_outland.mom" || this._filename == "models/creature/abyssalillidan/abyssal_illidan.mom")
                                                    {
                                                        if (loc3.pass == 0)
                                                        {
                                                            loc3.show = false;
                                                        }
                                                    }
                                                    else 
                                                    {
                                                        if (this._filename != "models/creature/arthaslichking/arthaslichking_unarmed.mom")
                                                        {
                                                            if (this._filename == "models/creature/dragonsinestra/dragonsinestra.mom")
                                                            {
                                                                if (loc3.pass > 3)
                                                                {
                                                                    loc3.show = false;
                                                                }
                                                            }
                                                        }
                                                        else 
                                                        {
                                                            if (loc3.pass == 2 || loc3.pass == 9 || loc3.pass == 10)
                                                            {
                                                                loc3.show = false;
                                                            }
                                                        }
                                                    }
                                                }
                                                else 
                                                {
                                                    if (loc3.pass == 0)
                                                    {
                                                        loc3.show = false;
                                                    }
                                                }
                                            }
                                            else 
                                            {
                                                if (loc3.pass == 2 || loc3.pass == 3)
                                                {
                                                    loc3.show = false;
                                                }
                                            }
                                        }
                                        else 
                                        {
                                            if (loc3.pass == 0 || loc3.pass == 1)
                                            {
                                                loc3.show = false;
                                            }
                                        }
                                    }
                                    else 
                                    {
                                        if (loc3.pass == 8 || loc3.pass == 9)
                                        {
                                            loc3.show = false;
                                        }
                                    }
                                }
                                else 
                                {
                                    if (loc3.pass == 1 || loc3.pass == 2)
                                    {
                                        loc3.show = false;
                                    }
                                }
                            }
                            else 
                            {
                                if (loc3.pass == 1 || loc3.pass == 2 || loc3.pass == 3)
                                {
                                    loc3.show = false;
                                }
                            }
                            if (!(this._filename.search("glave_1h_dualblade_d_02.mom") == -1) || !(this._filename.search("knife_1h_blacktemple_d_01.mom") == -1))
                            {
                                if (loc3.blendmode != 2)
                                {
                                    if (loc3.blendmode != 4)
                                    {
                                        if (loc3.show)
                                        {
                                            this.addMaterial(loc3.material);
                                        }
                                        loc6 = "mat_" + (this._textures[loc3.matid].special > -1 ? "s" + this._textures[loc3.matid].special : loc3.matid.toString()) + "_" + loc3.blendmode + "_" + int(loc3.transparent);
                                        loc7 = this._materials.getMaterialByName(loc6);
                                        this.dtrace("#\tgs\tidxs\tidxe\tb o s\t\tcolor\t\tmatid:material");
                                        this.dtrace(loc3.pass + "\t" + loc3.geosetid + "\t" + loc3.idx_start + "\t" + loc3.idx_end + "\t" + loc3.blendmode + " " + loc3.opacity + " " + loc3.show + "\t0x" + com.zam.Color.dechex(loc3.color) + "\t" + loc3.matid + ":" + loc3.material + "\t" + loc6);
                                        loc8 = loc3.idx_start;
                                        while (loc8 < loc3.idx_end) 
                                        {
                                            loc9 = this._vertices[this._indices[(loc8 + 0)]].position;
                                            loc10 = this._vertices[this._indices[(loc8 + 1)]].position;
                                            loc11 = this._vertices[this._indices[(loc8 + 2)]].position;
                                            loc12 = this._vertices[this._indices[(loc8 + 0)]].uv;
                                            loc13 = this._vertices[this._indices[(loc8 + 1)]].uv;
                                            loc14 = this._vertices[this._indices[(loc8 + 2)]].uv;
                                            if (loc3.show)
                                            {
                                                loc1.push(loc9, loc10, loc11);
                                            }
                                            loc4.geometry.faces.push(new org.papervision3d.core.geom.renderables.Triangle3D(loc4, [loc9, loc10, loc11], loc7, [loc12, loc13, loc14]));
                                            loc8 = loc8 + 3;
                                        }
                                        loc4.geometry.ready = true;
                                        loc4.visible = loc3.show;
                                    }
                                }
                            }
                            else 
                            {
                                if (loc3.show)
                                {
                                    this.addMaterial(loc3.material);
                                }
                                loc6 = "mat_" + (this._textures[loc3.matid].special > -1 ? "s" + this._textures[loc3.matid].special : loc3.matid.toString()) + "_" + loc3.blendmode + "_" + int(loc3.transparent);
                                loc7 = this._materials.getMaterialByName(loc6);
                                this.dtrace("#\tgs\tidxs\tidxe\tb o s\t\tcolor\t\tmatid:material");
                                this.dtrace(loc3.pass + "\t" + loc3.geosetid + "\t" + loc3.idx_start + "\t" + loc3.idx_end + "\t" + loc3.blendmode + " " + loc3.opacity + " " + loc3.show + "\t0x" + com.zam.Color.dechex(loc3.color) + "\t" + loc3.matid + ":" + loc3.material + "\t" + loc6);
                                loc8 = loc3.idx_start;
                                while (loc8 < loc3.idx_end) 
                                {
                                    loc9 = this._vertices[this._indices[(loc8 + 0)]].position;
                                    loc10 = this._vertices[this._indices[(loc8 + 1)]].position;
                                    loc11 = this._vertices[this._indices[(loc8 + 2)]].position;
                                    loc12 = this._vertices[this._indices[(loc8 + 0)]].uv;
                                    loc13 = this._vertices[this._indices[(loc8 + 1)]].uv;
                                    loc14 = this._vertices[this._indices[(loc8 + 2)]].uv;
                                    if (loc3.show)
                                    {
                                        loc1.push(loc9, loc10, loc11);
                                    }
                                    loc4.geometry.faces.push(new org.papervision3d.core.geom.renderables.Triangle3D(loc4, [loc9, loc10, loc11], loc7, [loc12, loc13, loc14]));
                                    loc8 = loc8 + 3;
                                }
                                loc4.geometry.ready = true;
                                loc4.visible = loc3.show;
                            }
                        }
                    }
                }
                loc2 = (loc2 + 1);
            }
            this.calcBounds(loc1);
            this.setMeshes();
            return;
        }

        private function calcBounds(arg1:Array):void
        {
            var loc3:*;
            loc3 = null;
            var loc1:*;
            loc1 = new org.papervision3d.core.geom.renderables.Vertex3D();
            var loc2:*;
            loc2 = new org.papervision3d.core.geom.renderables.Vertex3D();
            var loc4:*;
            loc4 = 0;
            var loc5:*;
            loc5 = arg1;
            for each (loc3 in loc5)
            {
                loc1.x = Math.min(loc3.x, loc1.x);
                loc1.y = Math.min(loc3.y, loc1.y);
                loc1.z = Math.min(loc3.z, loc1.z);
                loc2.x = Math.max(loc3.x, loc2.x);
                loc2.y = Math.max(loc3.y, loc2.y);
                loc2.z = Math.max(loc3.z, loc2.z);
            }
            this._center = new org.papervision3d.core.geom.renderables.Vertex3D((loc1.x + loc2.x) / 2, (loc1.y + loc2.y) / 2, (loc1.z + loc2.z) / 2);
            this._boundingbox = new org.papervision3d.core.geom.renderables.Vertex3D(loc2.x - loc1.x, loc2.y - loc1.y, loc2.z - loc1.z);
            return;
        }

        private function buildTextures():void
        {
            var loc1:*;
            loc1 = null;
            var loc2:*;
            loc2 = null;
            var loc3:*;
            loc3 = null;
            var loc4:*;
            loc4 = null;
            var loc5:*;
            loc5 = null;
            var loc6:*;
            loc6 = null;
            var loc7:*;
            loc7 = null;
            var loc9:*;
            loc9 = null;
            if (this._skincolors.length == 0 && this._facialfeatures.length == 0 && this._hairstyles.length == 0)
            {
                this.dtrace("not a character model (no features)");
                return;
            }
            this.dtrace("buildTextures()");
            if (this._skincolors.length > 0)
            {
                if (this._skincolor >= this._skincolors.length)
                {
                    this._skincolor = 0;
                }
                else 
                {
                    if (this._race == 7 && this._gender == 1 && this._skincolor == 6)
                    {
                        this._skincolor = 7;
                    }
                }
                loc1 = this._skincolors[this._skincolor];
                if (this._facetype >= loc1.face.length)
                {
                    this._facetype = 0;
                }
                loc2 = loc1.face[this._facetype];
            }
            if (this._facialfeatures.length > 0)
            {
                if (this._facialfeature >= this._facialfeatures.length)
                {
                    this._facialfeature = 0;
                }
                loc3 = this._facialfeatures[this._facialfeature];
                if (this._facialcolor >= loc3.color.length)
                {
                    this._facialcolor = 0;
                }
                if (loc3.color[this._facialcolor])
                {
                    loc4 = loc3.color[this._facialcolor];
                }
                else 
                {
                    loc4 = {"lower":null, "upper":null};
                }
            }
            else 
            {
                loc3 = null;
                loc4 = {"lower":null, "upper":null};
            }
            if (this._hairstyle >= this._hairstyles.length)
            {
                this._hairstyle = 0;
            }
            loc5 = this._hairstyles[this._hairstyle];
            if (this._haircolor >= loc5.color.length)
            {
                this._haircolor = 0;
            }
            if (loc5.color[this._haircolor])
            {
                loc6 = loc5.color[this._haircolor];
            }
            else 
            {
                loc6 = {"lower":null, "upper":null};
            }
            if (_isnpc)
            {
                this._special[1] = this._npcbase;
            }
            this.dtrace(this.object_to_string(loc1));
            if (loc1 != null)
            {
                if (loc1.base)
                {
                    if (this._special[1] != loc1.base)
                    {
                        this._basedirty = true;
                    }
                    this._special[1] = _isnpc ? this._npcbase : loc1.base;
                }
                if (loc1.fur)
                {
                    this._special[8] = loc1.fur;
                }
            }
            if (loc6 && loc6.texture)
            {
                this._special[6] = loc6.texture;
            }
            var loc10:*;
            loc10 = 0;
            var loc11:*;
            loc11 = this._special;
            for each (loc7 in loc11)
            {
                this.addMaterial(loc7);
            }
            if (!_isnpc)
            {
                if (loc1.lower)
                {
                    this.updateBaked(com.zam.MOM.MOMTextureRegion.PELVIS_UPPER, 2, loc1.lower);
                }
                if (loc1.upper)
                {
                    this.updateBaked(com.zam.MOM.MOMTextureRegion.TORSO_UPPER, 2, loc1.upper);
                }
                if (loc2.lower)
                {
                    this.updateBaked(com.zam.MOM.MOMTextureRegion.FACE_LOWER, 1, loc2.lower);
                }
                if (loc2.upper)
                {
                    this.updateBaked(com.zam.MOM.MOMTextureRegion.FACE_UPPER, 1, loc2.upper);
                }
                if (loc4.lower)
                {
                    this.updateBaked(com.zam.MOM.MOMTextureRegion.FACE_LOWER, 2, loc4.lower);
                }
                if (loc4.upper)
                {
                    this.updateBaked(com.zam.MOM.MOMTextureRegion.FACE_UPPER, 2, loc4.upper);
                }
                if (loc6.lower)
                {
                    this.updateBaked(com.zam.MOM.MOMTextureRegion.FACE_LOWER, 3, loc6.lower);
                }
                if (loc6.upper)
                {
                    this.updateBaked(com.zam.MOM.MOMTextureRegion.FACE_UPPER, 3, loc6.upper);
                }
                loc10 = 0;
                loc11 = this._baked;
                for each (loc9 in loc11)
                {
                    this.addMaterial(loc9.name);
                }
            }
            this._chargeosets = new Array(20);
            var loc8:*;
            loc8 = 0;
            while (loc8 < 20) 
            {
                this._chargeosets[loc8] = 1;
                ++loc8;
            }
            this._chargeosets[7] = 2;
            if (loc3)
            {
                this._chargeosets[1] = loc3.geoset1;
                this._chargeosets[2] = loc3.geoset2;
                this._chargeosets[3] = loc3.geoset3;
            }
            return;
        }

        private function updateCharacter(arg1:Boolean=false):void
        {
            if (this.loaded)
            {
                this.buildTextures();
                this.setMeshes();
                if (this.materialsToLoad == 0)
                {
                    this.paintArmor();
                }
            }
            dispatchEvent(new flash.events.Event(com.zam.MOM.MOMEvent.CHANGED, true));
            return;
        }

        private function processBitmap(arg1:flash.display.BitmapData, arg2:int=1, arg3:Number=1, arg4:uint=16777215):void
        {
            var loc3:*;
            loc3 = 0;
            var loc4:*;
            loc4 = 0;
            var loc5:*;
            loc5 = null;
            var loc1:*;
            loc1 = new com.zam.Color(arg4);
            var loc2:*;
            loc2 = arg1;
            if (arg2 != 0)
            {
                loc3 = 0;
                while (loc3 < loc2.width) 
                {
                    loc4 = 0;
                    while (loc4 < loc2.height) 
                    {
                        loc5 = new com.zam.Color(loc2.getPixel32(loc3, loc4));
                        if (arg2 == 4 && loc5.alpha == 255)
                        {
                            loc5.alpha = Math.max(loc5.red, loc5.blue, loc5.green);
                        }
                        else 
                        {
                            if (BLENDS[arg2] && loc5.alpha == 10)
                            {
                                loc5.alpha = 0;
                            }
                            else 
                            {
                                if (loc5.alpha != 255)
                                {
                                    if (!BLENDS[arg2])
                                    {
                                        loc5.alpha = 255;
                                    }
                                }
                            }
                        }
                        if (arg4 != 16777215)
                        {
                            loc5.red = loc5.red * loc1.red / 255;
                            loc5.green = loc5.green * loc1.green / 255;
                            loc5.blue = loc5.blue * loc1.blue / 255;
                        }
                        loc2.setPixel32(loc3, loc4, loc5.argb);
                        ++loc4;
                    }
                    ++loc3;
                }
            }
            else 
            {
                loc2.colorTransform(loc2.rect, new flash.geom.ColorTransform(1, 1, 1, 1, 1, 1, 1, 255));
            }
            return;
        }

        private function onAttachmentLoadError(arg1:org.papervision3d.events.FileLoadEvent):void
        {
            this.dtrace("--", "attachmentLoadError (" + _waitingAttachments.length + "): " + arg1.target);
            var loc1:*;
            loc1 = this.parseIdFromDisplayName(arg1.target.name);
            _loadedAttachments[UNIQUESLOTS[loc1]] = null;
            if (_waitingAttachments.length > 0)
            {
                this.loadNextModel();
            }
            else 
            {
                _loadingIdle = true;
            }
            return;
        }

        private function parseMOM(arg1:org.papervision3d.events.FileLoadEvent):void
        {
            var bad:Boolean;
            var btex:Object;
            var c1:Array;
            var c2:Array;
            var c3:Array;
            var c4:Array;
            var char:int;
            var color:com.zam.Color;
            var data:flash.utils.ByteArray;
            var e:org.papervision3d.events.FileLoadEvent;
            var facial:Object;
            var facial_num_colors:int;
            var facialt:Object;
            var hair_num_colors:int;
            var hasOpaque:Boolean;
            var i:int;
            var j:int;
            var len:int;
            var m:com.zam.MOM.MOMMesh;
            var mat:Object;
            var material:org.papervision3d.materials.BitmapMaterial;
            var mesh:com.zam.MOM.MOMMesh;
            var name:String;
            var r1:Array;
            var r2:Array;
            var r3:Array;
            var r4:Array;
            var skin:Object;
            var skin_num_facetypes:int;
            var skint:Object;
            var slotbone:Object;
            var stex:Object;
            var style:Object;
            var stylet:Object;
            var tmatrix:Array;
            var x:Number;
            var y:Number;
            var z:Number;

            var loc1:*;
            i = 0;
            j = 0;
            len = 0;
            char = 0;
            x = NaN;
            y = NaN;
            z = NaN;
            skin_num_facetypes = 0;
            facial_num_colors = 0;
            hair_num_colors = 0;
            stex = null;
            mat = null;
            btex = null;
            skin = null;
            skint = null;
            facial = null;
            facialt = null;
            style = null;
            stylet = null;
            mesh = null;
            bad = false;
            hasOpaque = false;
            m = null;
            name = null;
            color = null;
            material = null;
            tmatrix = null;
            r1 = null;
            r2 = null;
            r3 = null;
            r4 = null;
            c1 = null;
            c2 = null;
            c3 = null;
            c4 = null;
            slotbone = null;
            e = arg1;
            this.dtrace("--", "parseMOM()");
            data = e.target.data;
            data.endian = flash.utils.Endian.LITTLE_ENDIAN;
            try
            {
                this.readHeader(data);
                this.opacity = data.readFloat();
                this._gender = int(data.readByte());
                this._race = int(data.readByte());
                data.position = this.head.offset_vertices;
                Vector._vertices = new com.zam.MOM.MOMVertex(this.head.num_vertices, true);
                i = 0;
                while (i < this.head.num_vertices) 
                {
                    this._vertices[i] = new com.zam.MOM.MOMVertex();
                    x = data.readFloat() * this._scaling;
                    y = data.readFloat() * this._scaling;
                    z = data.readFloat() * this._scaling;
                    this._vertices[i].position = new org.papervision3d.core.geom.renderables.Vertex3D(x, z, y);
                    data.readFloat();
                    data.readFloat();
                    data.readFloat();
                    this._vertices[i].uv = new org.papervision3d.core.math.NumberUV(data.readFloat(), data.readFloat());
                    i = (i + 1);
                }
                data.position = this.head.offset_indices;
                Vector._indices = new int(this.head.num_indices, true);
                i = 0;
                while (i < this.head.num_indices) 
                {
                    this._indices[i] = int(data.readUnsignedShort());
                    i = (i + 1);
                }
                data.position = this.head.offset_texgroups;
                this._special = new Array(32);
                i = 0;
                while (i < this.head.num_texgroups) 
                {
                    stex = {"id":data.readByte(), "name":data.readUTF().toLowerCase()};
                    this._special[stex.id] = stex.name;
                    i = (i + 1);
                }
                this.dtrace(">> type:", this._type);
                data.position = this.head.offset_mats;
                this._textures = new Array();
                i = 0;
                while (i < this.head.num_mats) 
                {
                    mat = {"name":data.readUTF().toLowerCase(), "special":data.readInt()};
                    if (mat.name == "" && !(this._mumtextures[i] == undefined))
                    {
                        mat.name = this._mumtextures[i];
                    }
                    if (!(mat.special == -1) && this._special[mat.special] == undefined && !(this._type == com.zam.MOM.MOMModelType.CHAR))
                    {
                        mat.special = -1;
                    }
                    this._textures.push(mat);
                    i = (i + 1);
                }
                this._textures.forEach(this.trace_array);
                data.position = this.head.offset_bakedtexs;
                this._baked = new Array();
                i = 0;
                while (i < this.head.num_bakedtexs) 
                {
                    btex = {"region":data.readByte(), "layer":data.readByte(), "name":data.readUTF().toLowerCase()};
                    this._baked.push(btex);
                    this.addMaterial(btex.name);
                    i = (i + 1);
                }
                data.position = this.head.offset_skincolors;
                skin_num_facetypes = data.readInt();
                this._skincolors = new Array();
                i = 0;
                while (i < this.head.num_skincolors) 
                {
                    skin = new Object();
                    skin.base = data.readUTF().toLowerCase();
                    skin.fur = data.readUTF().toLowerCase();
                    skin.lower = data.readUTF().toLowerCase();
                    skin.upper = data.readUTF().toLowerCase();
                    skin.face = new Array(skin_num_facetypes);
                    j = 0;
                    while (j < skin_num_facetypes) 
                    {
                        skint = new Object();
                        skint.lower = data.readUTF().toLowerCase();
                        skint.upper = data.readUTF().toLowerCase();
                        skin.face[j] = skint;
                        j = (j + 1);
                    }
                    this._skincolors.push(skin);
                    i = (i + 1);
                }
                data.position = this.head.offset_facialfeatures;
                facial_num_colors = data.readInt();
                this._facialfeatures = new Array();
                i = 0;
                while (i < this.head.num_facialfeatures) 
                {
                    facial = new Object();
                    facial.geoset1 = data.readInt();
                    facial.geoset2 = data.readInt();
                    facial.geoset3 = data.readInt();
                    facial.color = new Array(facial_num_colors);
                    j = 0;
                    while (j < facial_num_colors) 
                    {
                        facialt = new Object();
                        facialt.lower = data.readUTF().toLowerCase();
                        facialt.upper = data.readUTF().toLowerCase();
                        facial.color[j] = facialt;
                        j = (j + 1);
                    }
                    this._facialfeatures.push(facial);
                    i = (i + 1);
                }
                data.position = this.head.offset_hairstyles;
                hair_num_colors = data.readInt();
                this._hairstyles = new Array();
                i = 0;
                while (i < this.head.num_hairstyles) 
                {
                    style = new Object();
                    style.geoset = data.readInt();
                    style.index = data.readInt();
                    style.color = new Array(hair_num_colors);
                    j = 0;
                    while (j < hair_num_colors) 
                    {
                        stylet = new Object();
                        stylet.texture = data.readUTF().toLowerCase();
                        stylet.lower = data.readUTF().toLowerCase();
                        stylet.upper = data.readUTF().toLowerCase();
                        style.color[j] = stylet;
                        j = (j + 1);
                    }
                    this._hairstyles[style.index] = style;
                    i = (i + 1);
                }
                this.dtrace(this.head.num_hairstyles);
                this.buildTextures();
                data.position = this.head.offset_meshes;
                this._meshes = new Array();
                i = 0;
                while (i < this.head.num_meshes) 
                {
                    mesh = new com.zam.MOM.MOMMesh();
                    mesh.index = i;
                    mesh.show = data.readBoolean();
                    if (this._type != com.zam.MOM.MOMModelType.CHAR)
                    {
                        mesh.show = true;
                    }
                    mesh.pass = data.readInt();
                    mesh.geosetid = data.readShort();
                    mesh.matid = data.readShort();
                    if (this._textures[mesh.matid].special > -1 && !(this._special[this._textures[mesh.matid].special] == null))
                    {
                        mesh.material = this._special[this._textures[mesh.matid].special];
                    }
                    else 
                    {
                        mesh.material = this._textures[mesh.matid].name;
                    }
                    mesh.idx_start = data.readUnsignedShort();
                    mesh.idx_end = mesh.idx_start + data.readUnsignedShort();
                    mesh.transparent = Boolean(data.readByte());
                    mesh.blendmode = data.readShort();
                    mesh.swrap = Boolean(data.readByte());
                    mesh.twrap = Boolean(data.readByte());
                    mesh.nozwrite = Boolean(data.readByte());
                    mesh.envmap = Boolean(data.readByte());
                    mesh.unlit = Boolean(data.readByte());
                    mesh.billboard = Boolean(data.readByte());
                    mesh.color = uint((data.readFloat() * 255 & 255) << 16 | (data.readFloat() * 255 & 255) << 8 | data.readFloat() * 255 & 255);
                    mesh.opacity = data.readFloat();
                    mesh.texanim = 0;
                    bad = false;
                    hasOpaque = false;
                    var loc2:*;
                    loc2 = 0;
                    var loc3:*;
                    loc3 = this._meshes;
                    for each (m in loc3)
                    {
                        if (m.idx_start == mesh.idx_start && m.idx_end == mesh.idx_end && mesh.blendmode > 0)
                        {
                            bad = true;
                        }
                        if (m.blendmode != 0)
                        {
                            continue;
                        }
                        hasOpaque = true;
                    }
                    if (!(bad && hasOpaque))
                    {
                        name = this._textures[mesh.matid].special > -1 ? "s" + this._textures[mesh.matid].special : mesh.matid.toString();
                        name = name + "_" + mesh.blendmode + "_" + int(mesh.transparent);
                        if (!this._materials.getMaterialByName("mat_" + name))
                        {
                            color = new com.zam.Color(com.zam.Color.random());
                            color.alpha = 255 * 0.6;
                            material = new org.papervision3d.materials.BitmapMaterial(new flash.display.BitmapData(1, 1, true, color.argb));
                            material.doubleSided = mesh.billboard;
                            material.smooth = true;
                            this._materials.addMaterial(material, "mat_" + name);
                        }
                        if (i == 0)
                        {
                            this.dtrace("i b t e u b o color\tis\tie\tp\tg\tid:file");
                        }
                        this.dtrace(i.toString().substr(-1), mesh.blendmode, int(mesh.transparent), int(mesh.envmap), int(mesh.unlit), int(mesh.billboard), int(mesh.opacity), com.zam.Color.dechex(mesh.color) + "\t" + mesh.idx_start + "\t" + mesh.idx_end + "\t" + mesh.pass + "\t" + mesh.geosetid + "\t" + mesh.matid + ":" + mesh.material + "\tmat_" + name);
                        this._meshes.push(mesh);
                    }
                    i = (i + 1);
                }
                data.position = this.head.offset_bones;
                Vector._bones = new com.zam.MOM.MOMBone(this.head.num_bones, true);
                i = 0;
                while (i < this.head.num_bones) 
                {
                    this._bones[i] = new com.zam.MOM.MOMBone();
                    this._bones[i].parent = data.readInt();
                    x = data.readFloat() * this._scaling;
                    y = data.readFloat() * this._scaling;
                    z = data.readFloat() * this._scaling;
                    this._bones[i].pivot = new org.papervision3d.core.math.Number3D(x, z, y);
                    x = data.readFloat() * this._scaling;
                    y = data.readFloat() * this._scaling;
                    z = data.readFloat() * this._scaling;
                    this._bones[i].transpivot = new org.papervision3d.core.math.Number3D(x, z, y);
                    tmatrix = new Array(16);
                    j = 0;
                    while (j < 16) 
                    {
                        tmatrix[j] = data.readFloat();
                        j = (j + 1);
                    }
                    r1 = [tmatrix[0], tmatrix[1], tmatrix[2], tmatrix[3]];
                    r2 = [tmatrix[4], tmatrix[5], tmatrix[6], tmatrix[7]];
                    r3 = [tmatrix[8], tmatrix[9], tmatrix[10], tmatrix[11]];
                    r4 = [tmatrix[12], tmatrix[13], tmatrix[14], tmatrix[15]];
                    tmatrix = r1.concat(r3, r2, r4);
                    c1 = [tmatrix[0], tmatrix[4], tmatrix[8], tmatrix[12]];
                    c2 = [tmatrix[1], tmatrix[5], tmatrix[9], tmatrix[13]];
                    c3 = [tmatrix[2], tmatrix[6], tmatrix[10], tmatrix[14]];
                    c4 = [tmatrix[3], tmatrix[7], tmatrix[11], tmatrix[15]];
                    tmatrix = c1.concat(c3, c2, c4);
                    this._bones[i].matrix = new org.papervision3d.core.math.Matrix3D(tmatrix);
                    i = (i + 1);
                }
                data.position = this.head.offset_slotbones;
                this._slotbones = new Array();
                i = 0;
                while (i < this.head.num_slotbones) 
                {
                    slotbone = new Object();
                    slotbone.slot = data.readShort();
                    slotbone.bone = data.readShort();
                    x = data.readFloat() * this._scaling;
                    y = data.readFloat() * this._scaling;
                    z = data.readFloat() * this._scaling;
                    slotbone.offset = new org.papervision3d.core.math.Number3D(x, z, y);
                    this._slotbones.push(slotbone);
                    i = (i + 1);
                }
                this.loaded = true;
                this.buildMeshes();
                dispatchEvent(new org.papervision3d.events.FileLoadEvent(com.zam.MOM.MOMEvent.GEOMETRY_LOADED));
            }
            catch (ex:Error)
            {
                dispatchEvent(new flash.events.Event(com.zam.MOM.MOMEvent.INTERNAL_ERROR));
                trace(undefined.message);
                trace(undefined.getStackTrace());
            }
            return;
        }

        private function paintArmor():void
        {
            var loc1:*;
            loc1 = 0;
            var loc4:*;
            loc4 = null;
            var loc5:*;
            loc5 = null;
            var loc6:*;
            loc6 = null;
            var loc7:*;
            loc7 = null;
            var loc8:*;
            loc8 = NaN;
            var loc9:*;
            loc9 = NaN;
            var loc10:*;
            loc10 = null;
            var loc11:*;
            loc11 = null;
            var loc12:*;
            loc12 = null;
            var loc13:*;
            loc13 = null;
            var loc14:*;
            loc14 = null;
            var loc15:*;
            loc15 = null;
            this.dtrace("paintArmor()");
            if (_isnpc || this._isattach)
            {
                return;
            }
            var loc2:*;
            loc2 = new Array();
            loc1 = 0;
            while (loc1 < this._baked.length) 
            {
                if (this._baked[loc1].layer != 2)
                {
                    if (this._chargeosets[13] == 2)
                    {
                        if (this._baked[loc1].slot != com.zam.MOM.MOMItemSlot.PANTS)
                        {
                            if (this._baked[loc1].slot == com.zam.MOM.MOMItemSlot.BOOTS)
                            {
                                this._baked[loc1].layer = 5;
                            }
                        }
                        else 
                        {
                            this._baked[loc1].layer = 6;
                        }
                    }
                    loc2.push(this._baked[loc1]);
                }
                else 
                {
                    if (!(this._baked[loc1].region == com.zam.MOM.MOMTextureRegion.TORSO_UPPER && (!(this._attachments[4] == null) || !(this._attachments[5] == null)) || this._baked[loc1].region == com.zam.MOM.MOMTextureRegion.PELVIS_UPPER && (!(this._attachments[7] == null) || !(this._attachments[20] == null))))
                    {
                        if (this._chargeosets[13] == 2)
                        {
                            if (this._baked[loc1].slot != com.zam.MOM.MOMItemSlot.PANTS)
                            {
                                if (this._baked[loc1].slot == com.zam.MOM.MOMItemSlot.BOOTS)
                                {
                                    this._baked[loc1].layer = 5;
                                }
                            }
                            else 
                            {
                                this._baked[loc1].layer = 6;
                            }
                        }
                        loc2.push(this._baked[loc1]);
                    }
                }
                ++loc1;
            }
            if ((!this._basespecial || this._basedirty) && this._special[1])
            {
                this._basespecial = this._materials.getMaterialByName(this._special[1]).bitmap.clone();
                this._basedirty = false;
            }
            var loc3:*;
            loc3 = null;
            if (this._basespecial)
            {
                loc3 = this._basespecial.clone();
            }
            else 
            {
                loc3 = new flash.display.BitmapData(512, 512);
            }
            loc2.sortOn("layer", Array.NUMERIC);
            loc1 = 0;
            while (loc1 < loc2.length) 
            {
                if (loc4 = this._materials.getMaterialByName(loc2[loc1].name).bitmap)
                {
                    loc5 = REGIONS[loc2[loc1].region];
                    loc6 = new flash.geom.Point(loc3.width * loc5[0], loc3.height * loc5[1]);
                    loc7 = new flash.geom.Matrix();
                    loc8 = loc3.width / (loc4.width / loc5[2]);
                    loc9 = loc3.height / (loc4.height / loc5[3]);
                    loc7.scale(loc8, loc9);
                    loc7.translate(loc6.x, loc6.y);
                    loc3.draw(loc4, loc7);
                }
                ++loc1;
            }
            (this._materials.getMaterialByName("mat_s1_0_0") as org.papervision3d.materials.BitmapMaterial).texture = loc3;
            if (!(this._special[2] == null) || !(this._special[6] == null) || !(this._special[8] == null))
            {
                loc1 = 0;
                while (loc1 < this._meshes.length) 
                {
                    if (!(this._special[2] == null) && this._textures[this._meshes[loc1].matid].special == 2)
                    {
                        if (loc10 = this._materials.getMaterialByName(this._special[2]))
                        {
                            if (loc11 = this._materials.getMaterialByName("mat_s2_0_0") as org.papervision3d.materials.BitmapMaterial)
                            {
                                loc11.texture = loc10.bitmap as flash.display.BitmapData;
                                loc11.doubleSided = true;
                            }
                        }
                    }
                    if (!(this._special[6] == null) && this._textures[this._meshes[loc1].matid].special == 6)
                    {
                        if (loc12 = this._materials.getMaterialByName(this._special[6]))
                        {
                            if (loc13 = this._materials.getMaterialByName("mat_s6_1_0") as org.papervision3d.materials.BitmapMaterial)
                            {
                                loc13.texture = loc12.bitmap as flash.display.BitmapData;
                            }
                        }
                    }
                    if (!(this._special[8] == null) && this._textures[this._meshes[loc1].matid].special == 8)
                    {
                        if (loc14 = this._materials.getMaterialByName(this._special[8]))
                        {
                            if (loc15 = this._materials.getMaterialByName("mat_s8_1_0") as org.papervision3d.materials.BitmapMaterial)
                            {
                                loc15.texture = loc14.bitmap as flash.display.BitmapData;
                                loc15.doubleSided = true;
                            }
                        }
                    }
                    ++loc1;
                }
            }
            dispatchEvent(new flash.events.Event(com.zam.MOM.MOMEvent.CHANGED, true));
            return;
        }

        public function set haircolor(arg1:int):void
        {
            if (!(this._haircolor == arg1) && !(arg1 == -1))
            {
                this._haircolor = arg1;
                this.updateCharacter(true);
            }
            return;
        }

        private function onMomChange(arg1:flash.events.Event):void
        {
            this.dtrace("--", "momChange");
            dispatchEvent(new flash.events.Event(com.zam.MOM.MOMEvent.CHANGED, true));
            return;
        }

        private function onMaterialLoadComplete(arg1:org.papervision3d.events.FileLoadEvent):void
        {
            var loc3:*;
            loc3 = null;
            var loc4:*;
            loc4 = null;
            var loc5:*;
            loc5 = null;
            var loc6:*;
            loc6 = null;
            this.dtrace("--", "momMaterialLoadComplete (" + (this.materialsToLoad - 1) + "): " + arg1.file);
            var loc1:*;
            loc1 = arg1.target as org.papervision3d.materials.BitmapFileMaterial;
            var loc2:*;
            loc2 = false;
            var loc7:*;
            loc7 = 0;
            var loc8:*;
            loc8 = this._meshes;
            for each (loc3 in loc8)
            {
                if (!(loc3.material == loc1.name && loc3.show))
                {
                    continue;
                }
                if (loc3.blendmode != 0)
                {
                    continue;
                }
                break;
            }
            loc7 = 0;
            loc8 = this._meshes;
            for (loc4 in loc8)
            {
                if (!((loc3 = this._meshes[loc4]).material == loc1.name && loc3.show))
                {
                    continue;
                }
                loc5 = "mat_" + (this._textures[loc3.matid].special == -1 ? loc3.matid : "s" + this._textures[loc3.matid].special) + "_" + loc3.blendmode + "_" + int(loc3.transparent);
                if (!(loc3.blendmode == 0) && loc2)
                {
                    this._meshes[loc4].show = false;
                    this._container.getChildByName("geo_" + loc3.index).visible = false;
                    continue;
                }
                if (this._loadedMaterials[loc5] != undefined)
                {
                    continue;
                }
                this.dtrace(">>" + (loc3.envmap ? ">" : ""), loc5, loc3.index, loc3.opacity, int(loc3.envmap), int(loc3.unlit), int(loc3.billboard), com.zam.Color.dechex(loc3.color));
                (loc6 = this._materials.getMaterialByName(loc5) as org.papervision3d.materials.BitmapMaterial).texture = loc1.bitmap.clone();
                this.processBitmap(loc6.bitmap, loc3.blendmode, loc3.opacity, loc3.color);
                this._loadedMaterials[loc5] = true;
            }
            loc8 = ((loc7 = this).materialsToLoad - 1);
            loc7.materialsToLoad = loc8;
            if (this.materialsToLoad == 0)
            {
                this._loadedMaterials = [];
                dispatchEvent(new flash.events.Event(com.zam.MOM.MOMEvent.MATERIALS_LOADED));
            }
            return;
        }

        private function slotType(arg1:int):int
        {
            var loc1:*;
            loc1 = UNIQUESLOTS[arg1];
            if (arg1 < 1 || arg1 >= UNIQUESLOTS.length)
            {
                return -1;
            }
            if (loc1 == com.zam.MOM.MOMItemSlot.HEAD || loc1 == com.zam.MOM.MOMItemSlot.SHOULDER || loc1 == com.zam.MOM.MOMItemSlot.RIGHTHAND || loc1 == com.zam.MOM.MOMItemSlot.LEFTHAND)
            {
                return com.zam.MOM.MOMModelType.ITEM;
            }
            return com.zam.MOM.MOMModelType.ARMOR;
        }

        private function showBitmap(arg1:flash.display.BitmapData, arg2:String=""):void
        {
            if (showBitmapPos.x + arg1.width > 600)
            {
                showBitmapPos.x = 0;
                showBitmapPos.y = showBitmapPos.y - showBitmapPos.z;
                showBitmapPos.z = 0;
            }
            var loc1:*;
            loc1 = new flash.display.MovieClip();
            var loc2:*;
            (loc2 = new flash.text.TextField()).wordWrap = true;
            loc2.width = arg1.width;
            loc2.height = arg1.height;
            loc2.multiline = true;
            loc2.text = arg2;
            loc2.autoSize = "center";
            loc1.graphics.beginBitmapFill(arg1);
            loc1.graphics.drawRect(0, 0, arg1.width, arg1.height);
            loc1.graphics.endFill();
            loc1.addChild(loc2);
            var loc3:*;
            (loc3 = new org.papervision3d.materials.MovieMaterial(loc1, true, false, true)).doubleSided = true;
            loc3.smooth = true;
            var loc4:*;
            loc4 = new org.papervision3d.objects.primitives.Plane(loc3);
            this._container.removeChildByName("showBitmap" + counter);
            this._container.addChild(loc4, "showBitmap" + counter);
            loc4.rotationY = -90;
            loc4.x = 500;
            loc4.y = showBitmapPos.y + 100;
            loc4.z = showBitmapPos.x - 220;
            showBitmapPos.x = showBitmapPos.x + arg1.width + 1;
            showBitmapPos.z = Math.max(arg1.height + 1, showBitmapPos.z);
            var loc5:*;
            var loc6:*;
            counter++;
            return;
        }

        private function onError(arg1:flash.events.Event):void
        {
            dispatchEvent(new flash.events.Event(com.zam.MOM.MOMEvent.ERROR, true));
            return;
        }

        public function clearSlotsAll():void
        {
            var loc1:*;
            loc1 = 0;
            while (loc1 < 27) 
            {
                this.clearSlot(loc1, false);
                ++loc1;
            }
            this.updateCharacter();
            return;
        }

        public function get facialcolor():int
        {
            return this._facialcolor;
        }

        private function parseOMA(arg1:org.papervision3d.events.FileLoadEvent):void
        {
            var loc2:*;
            loc2 = null;
            var loc3:*;
            loc3 = null;
            this.dtrace("--", "parseOMA()");
            var loc1:*;
            loc1 = arg1.target.data.split("\r\n");
            loc2 = loc1.shift();
            loc3 = loc2.split(" ");
            this._showhair = parseInt(loc3[0]) != 0 ? false : true;
            this._showfacefeatures = parseInt(loc3[1]) != 0 ? false : true;
            this.setMeshes();
            return;
        }

        private function onLoadError(arg1:org.papervision3d.events.FileLoadEvent):void
        {
            this.dtrace("--", "loadError: " + arg1.message);
            var loc1:*;
            loc1 = new org.papervision3d.events.FileLoadEvent(org.papervision3d.events.FileLoadEvent.LOAD_ERROR, arg1.file, -1, -1, arg1.message);
            dispatchEvent(loc1);
            return;
        }

        private function onMomMaterialsDone(arg1:flash.events.Event):void
        {
            this.dtrace("--", "momMaterialsLoaded");
            if (this._baked.length > 0)
            {
                this.paintArmor();
            }
            if (this.geometryLoaded == true && !this.done)
            {
                dispatchEvent(new flash.events.Event(com.zam.MOM.MOMEvent.MOM_LOADED));
            }
            dispatchEvent(new flash.events.Event(com.zam.MOM.MOMEvent.CHANGED, true));
            if (_waitingArmor.length > 0)
            {
                if (this._isattach)
                {
                    _loadingIdle = true;
                }
                else 
                {
                    this.loadNextArmor();
                }
            }
            return;
        }

        public function get boundingbox():org.papervision3d.core.geom.renderables.Vertex3D
        {
            return this._boundingbox;
        }

        public function get gender():int
        {
            return this._gender;
        }

        private function readHeader(arg1:flash.utils.ByteArray):void
        {
            this.head = new Object();
            arg1.position = 0;
            this.head.version = arg1.readInt();
            this.head.end = arg1.readInt();
            this.head.num_vertices = arg1.readShort();
            this.head.offset_vertices = arg1.readInt();
            this.head.num_indices = arg1.readUnsignedShort();
            this.head.offset_indices = arg1.readInt();
            this.head.num_mats = arg1.readShort();
            this.head.offset_mats = arg1.readInt();
            this.head.num_meshes = arg1.readShort();
            this.head.offset_meshes = arg1.readInt();
            this.head.num_texgroups = arg1.readShort();
            this.head.offset_texgroups = arg1.readInt();
            this.head.num_bakedtexs = arg1.readShort();
            this.head.offset_bakedtexs = arg1.readInt();
            this.head.num_bones = arg1.readShort();
            this.head.offset_bones = arg1.readInt();
            this.head.num_slotbones = arg1.readShort();
            this.head.offset_slotbones = arg1.readInt();
            this.head.num_skincolors = arg1.readShort();
            this.head.offset_skincolors = arg1.readInt();
            this.head.num_facialfeatures = arg1.readShort();
            this.head.offset_facialfeatures = arg1.readInt();
            this.head.num_hairstyles = arg1.readShort();
            this.head.offset_hairstyles = arg1.readInt();
            arg1.position = this.head.end;
            this.dtrace("Header: " + " {version:" + this.head.version + " size:" + arg1.length + "type:" + this._type + " vertices:" + this.head.num_vertices + "@" + this.head.offset_vertices + " indices:" + this.head.num_indices + "@" + this.head.offset_indices + " materials:" + this.head.num_mats + "@" + this.head.offset_mats + " meshes:" + this.head.num_meshes + "@" + this.head.offset_meshes + " replacement_textures:" + this.head.num_texgroups + "@" + this.head.offset_texgroups + " baked_textures:" + this.head.num_bakedtexs + "@" + this.head.offset_bakedtexs + " bones:" + this.head.num_bones + "@" + this.head.offset_bones + " attach_maps:" + this.head.num_slotbones + "@" + this.head.offset_slotbones + " skins:" + this.head.num_skincolors + "@" + this.head.offset_skincolors + " facial_features:" + this.head.num_facialfeatures + "@" + this.head.offset_facialfeatures + " hair_styles:" + this.head.num_hairstyles + "@" + this.head.offset_hairstyles + "}");
            return;
        }

        public function get haircolor():int
        {
            return this._haircolor;
        }

        private function onFileLoadProgress(arg1:org.papervision3d.events.FileLoadEvent):void
        {
            var loc1:*;
            loc1 = new org.papervision3d.events.FileLoadEvent(org.papervision3d.events.FileLoadEvent.LOAD_PROGRESS, arg1.file, arg1.bytesLoaded, arg1.bytesTotal);
            dispatchEvent(loc1);
            return;
        }

        public function get race():int
        {
            return this._race;
        }

        private function loadNextModel():void
        {
            var a:Object;
            var attachment:org.papervision3d.objects.DisplayObject3D;

            var loc1:*;
            attachment = null;
            if (_waitingAttachments.length == 0)
            {
                return;
            }
            a = _waitingAttachments.shift();
            this.dtrace("--", "loadNextModel (" + _waitingAttachments.length + "): " + a.id + "@" + a.slot);
            if (_loadedAttachments[a.id])
            {
                this.dtrace("--", "loading cached model");
                if (_loadedAttachments[a.id].done)
                {
                    attachment = _loadedAttachments[a.id];
                    this._container.removeChildByName(attachment.name);
                    this._container.addChild(attachment);
                    this._attachments[UNIQUESLOTS[a.slot]] = {"name":"slot_" + UNIQUESLOTS[a.slot], "slot":a.slot, "id":a.id, "geo":null};
                }
                else 
                {
                    this.dtrace("--- model current in queue (skipped)");
                }
                return;
            }
            try
            {
                this.addModel(a.slot, a.id);
            }
            catch (ex:Error)
            {
                dtrace("!! Unable to load model: " + undefined.message);
                trace(undefined.getStackTrace());
            }
            return;
        }

        private function loadNextArmor():void
        {
            var a:Object;

            var loc1:*;
            if (_waitingArmor.length == 0)
            {
                return;
            }
            a = _waitingArmor.shift();
            this.dtrace("--", "loadNextArmor (" + _waitingAttachments.length + 1 + "): " + a.id + "@" + a.slot);
            try
            {
                this.loader(2, "models/armor/" + a.slot + "/" + a.id);
            }
            catch (ex:Error)
            {
                dtrace("!!", "Unable to load armor: " + undefined.message);
                trace(undefined.getStackTrace());
            }
            return;
        }

        private function onAttachmentLoadComplete(arg1:flash.events.Event):void
        {
            this.dtrace("--", "attachmentLoaded (" + _waitingAttachments.length + "): " + arg1.target);
            var loc1:*;
            loc1 = this.parseIdFromDisplayName(arg1.target.name);
            _loadedAttachments[UNIQUESLOTS[loc1]] = arg1.target;
            dispatchEvent(new flash.events.Event(com.zam.MOM.MOMEvent.CHANGED, true));
            if (_waitingAttachments.length > 0)
            {
                this.loadNextModel();
            }
            else 
            {
                _loadingIdle = true;
            }
            return;
        }

        public function toggleGeoset(arg1:int):void
        {
            var loc2:*;
            loc2 = null;
            var loc1:*;
            loc1 = 0;
            while (loc1 < this._meshes.length) 
            {
                if (this._meshes[loc1].geosetid == arg1)
                {
                    loc2 = this._container.getChildByName("geo_" + this._meshes[loc1].index);
                    loc2.visible = !loc2.visible;
                    break;
                }
                ++loc1;
            }
            return;
        }

        public function clearSlot(arg1:int=-1, arg2:Boolean=true):void
        {
            var loc2:*;
            loc2 = null;
            var loc3:*;
            loc3 = null;
            var loc4:*;
            loc4 = null;
            var loc5:*;
            loc5 = 0;
            this.dtrace("clearSlot(", arg1, arg2, ")");
            var loc1:*;
            loc1 = UNIQUESLOTS[arg1];
            if (arg1 == -1 || !(this._type == com.zam.MOM.MOMModelType.CHAR) && !(this._type == com.zam.MOM.MOMModelType.NPC) || this._attachments[loc1] == null)
            {
                this.dtrace("..nop?", loc1, this._type, this._attachments[loc1]);
                return;
            }
            if (arg1 == com.zam.MOM.MOMItemSlot.HEAD || arg1 == com.zam.MOM.MOMItemSlot.SHOULDER || loc1 == com.zam.MOM.MOMItemSlot.LEFTHAND || loc1 == com.zam.MOM.MOMItemSlot.RIGHTHAND)
            {
                loc3 = [loc2 = this._attachments[loc1].name];
                arg2 = false;
                if (arg1 != com.zam.MOM.MOMItemSlot.HEAD)
                {
                    if (arg1 == com.zam.MOM.MOMItemSlot.SHOULDER)
                    {
                        loc3 = [loc2 + "_1", loc2 + "_2"];
                    }
                }
                else 
                {
                    this._showhair = true;
                    this._showfacefeatures = true;
                    this.setMeshes();
                }
                var loc6:*;
                loc6 = 0;
                var loc7:*;
                loc7 = loc3;
                for each (loc4 in loc7)
                {
                    this._container.removeChildByName(loc4);
                }
            }
            else 
            {
                this._baked.sortOn("layer");
                loc5 = 0;
                while (loc5 < this._baked.length) 
                {
                    if (UNIQUESLOTS[this._baked[loc5].slot] == loc1)
                    {
                        this.dtrace("Removing:", this._baked[loc5].name);
                        this._baked.splice(loc5, 1);
                        loc5 = (loc5 - 1);
                    }
                    ++loc5;
                }
                if (arg1 == com.zam.MOM.MOMItemSlot.ROBE)
                {
                    this._attachments[arg1] = null;
                }
            }
            if (this._attachments[loc1].slot == 20)
            {
                this._attachments[20] = null;
            }
            this._attachments[loc1] = null;
            if (arg2)
            {
                this.updateCharacter();
            }
            return;
        }

        public function load(arg1:int=1, arg2:*=null, arg3:Number=NaN):void
        {
            var filename:String;
            var loadtype:int;
            var pFilename:*=null;
            var pScale:Number=NaN;
            var pType:int=1;
            var prefix:String;
            var type:int;

            var loc1:*;
            pType = arg1;
            pFilename = arg2;
            pScale = arg3;
            prefix = "models/";
            filename = String(pFilename);
            type = pType;
            loadtype = 1;
            if (filename == "null")
            {
                filename = "";
            }
            if (filename == "" && this._race > -1 && this._gender > -1)
            {
                type = com.zam.MOM.MOMModelType.CHAR;
                filename = RACES[this._race] + GENDERS[this._gender];
            }
            else 
            {
                if (filename == "")
                {
                    trace("!!", "Item/NPC ID is required.");
                    return;
                }
            }
            if (type >= com.zam.MOM.MOMModelType.ATTACH)
            {
                this._isattach = true;
                type = type - com.zam.MOM.MOMModelType.ATTACH;
            }
            var loc2:*;
            loc2 = type;
            switch (loc2) 
            {
                case com.zam.MOM.MOMModelType.ITEM:
                {
                    prefix = prefix + "item/";
                    loadtype = 5;
                    break;
                }
                case com.zam.MOM.MOMModelType.HELM:
                {
                    prefix = prefix + "armor/1/";
                    if (!this._isattach)
                    {
                        filename = filename + "_1_0";
                    }
                    loadtype = 5;
                    break;
                }
                case com.zam.MOM.MOMModelType.SHOULDER:
                {
                    prefix = prefix + "armor/3/";
                    if (!this._isattach)
                    {
                        filename = filename + "_2";
                    }
                    loadtype = 5;
                    break;
                }
                case com.zam.MOM.MOMModelType.NPC:
                {
                    prefix = prefix + "npc/";
                    _isnpc = true;
                    loadtype = 5;
                    break;
                }
                case com.zam.MOM.MOMModelType.OBJECT:
                {
                    prefix = prefix + "obj/";
                    loadtype = 5;
                    break;
                }
                case com.zam.MOM.MOMModelType.HUMAN:
                {
                    prefix = prefix + "npc/";
                    _isnpc = true;
                    loadtype = 3;
                    break;
                }
                case com.zam.MOM.MOMModelType.CHAR:
                {
                    prefix = prefix + "char/";
                    loadtype = 1;
                    break;
                }
                default:
                {
                    type = com.zam.MOM.MOMModelType.ITEM;
                    prefix = prefix + "item/";
                    loadtype = 5;
                    break;
                }
            }
            this._type = type;
            this._scaling = pScale || DEFAULT_SCALING;
            this._scaling = this._scaling * INTERNAL_SCALING;
            if (this._filename)
            {
                trace("!!", "Base model already loaded.");
                return;
            }
            this.loaded = false;
            try
            {
                this.loader(loadtype, prefix + filename);
            }
            catch (ex:Error)
            {
                dtrace("!!", "There was an error loading the file: " + undefined.message);
                trace(undefined.getStackTrace());
            }
            return;
        }

        private function trace_array(arg1:*, arg2:int, arg3:Array):void
        {
            this.dtrace("[ " + arg2 + " ] " + (arg1 == null ? "null" : this.object_to_string(arg1)));
            return;
        }

        public function clearSlots(arg1:Array):void
        {
            var loc1:*;
            loc1 = 0;
            var loc2:*;
            loc2 = 0;
            var loc3:*;
            loc3 = arg1;
            for each (loc1 in loc3)
            {
                if (!(loc1 > 0 && loc1 < 27))
                {
                    continue;
                }
                this.clearSlot(loc1, false);
            }
            this.updateCharacter();
            return;
        }

        public function attachItem(arg1:int, arg2:int):void
        {
            var loc1:*;
            loc1 = null;
            var loc2:*;
            loc2 = 0;
            if (!(this._type == com.zam.MOM.MOMModelType.CHAR) && !(this._type == com.zam.MOM.MOMModelType.NPC) || !(this.slotType(arg1) == com.zam.MOM.MOMModelType.ITEM))
            {
                return;
            }
            if (_loadedAttachments[arg2])
            {
                this.dtrace("--", "loading cached model", arg1, arg2);
                loc1 = _loadedAttachments[arg2];
                loc2 = UNIQUESLOTS[arg1];
                this._container.removeChildByName(loc1.name);
                this._container.addChild(loc1);
                if (loc2 == com.zam.MOM.MOMItemSlot.RIGHTHAND && this._attachments[loc2])
                {
                    loc2 = com.zam.MOM.MOMItemSlot.LEFTHAND;
                }
                this._attachments[loc2] = {"name":"slot_" + loc2, "slot":arg1, "id":arg2, "geo":null};
            }
            else 
            {
                this.dtrace("--", "queued model (" + _waitingAttachments.length + 1 + "): " + arg2 + "@" + arg1 + ")");
                _waitingAttachments.push({"slot":arg1, "id":arg2});
            }
            if (_loadingIdle)
            {
                this.loadNextModel();
            }
            return;
        }

        private function trace_r(... rest):void
        {
            var loc2:*;
            loc2 = null;
            var loc3:*;
            loc3 = 0;
            var loc4:*;
            loc4 = null;
            var loc5:*;
            loc5 = undefined;
            var loc1:*;
            loc1 = 0;
            while (loc1 < rest.length) 
            {
                loc2 = rest[loc1];
                loc3 = 0;
                loc4 = "";
                if (loc1 != 0)
                {
                    loc4 = loc4 + ", ";
                }
                loc4 = loc4 + "{ ";
                var loc6:*;
                loc6 = 0;
                var loc7:*;
                loc7 = loc2;
                for (loc5 in loc7)
                {
                    if (loc3 != 0)
                    {
                        loc4 = loc4 + ", ";
                    }
                    loc4 = loc4 + loc5 + ":";
                    if (loc2[loc5] === null)
                    {
                        loc4 = loc4 + "null";
                    }
                    else 
                    {
                        loc4 = loc4 + loc2[loc5].toString();
                    }
                    ++loc3;
                }
                loc4 = loc4 + " }";
                trace(loc4);
                ++loc1;
            }
            return;
        }

        
        {
            DEFAULT_SCALING = 1;
            INTERNAL_SCALING = 100;
            _loadingIdle = true;
            _isnpc = false;
            BLENDS = [false, true, true, false, true, false, false];
            counter = 0;
            showBitmapPos = new org.papervision3d.core.math.Number3D();
        }

        private static const SLOTSORT:Array=[0, 16, 0, 15, 1, 7, 9, 5, 6, 10, 11, 0, 0, 17, 18, 19, 14, 20, 0, 8, 7, 21, 22, 23, 0, 24, 25];

        private static const REGIONS:Array=[new Array(0, 0, 1, 1), new Array(0, 0.75, 0.5, 0.25), new Array(0, 0.5, 0.5, 0.25), new Array(0, 0.375, 0.5, 0.125), new Array(0, 0.25, 0.5, 0.125), new Array(0, 0, 0.5, 0.25), new Array(0.5, 0.75, 0.5, 0.25), new Array(0.5, 0.625, 0.5, 0.125), new Array(0.5, 0.375, 0.5, 0.25), new Array(0.5, 0.125, 0.5, 0.25), new Array(0.5, 0, 0.5, 0.125)];

        public static const UNIQUESLOTS:Array=[0, 1, 0, 3, 4, 5, 6, 7, 8, 9, 10, 0, 0, 21, 22, 21, 16, 21, 0, 19, 5, 21, 22, 22, 0, 21, 21];

        public static const GENDERS:Array=["Male", "Female"];

        public static const RACES:Array=["", "Human", "Orc", "Dwarf", "NightElf", "Scourge", "Tauren", "Gnome", "Troll", "Goblin", "BloodElf", "Draenei", "FelOrc", "Naga_", "Broken", "Skeleton", "Vrykul", "Tuskarr", "ForestTroll", "Taunka", "NorthrendSkeleton", "IceTroll", "Worgen"];

        private var _container:org.papervision3d.core.proto.DisplayObjectContainer3D;

        public var loaded:Boolean=false;

        private var _basespecial:flash.display.BitmapData;

        private var _textures:Array;

        private var _type:int;

        private var opacity:Number;

        public var geometryLoaded:Boolean=false;

        private var _basedirty:Boolean=false;

        private var _nocache:Boolean;

        private var _facialfeature:int=0;

        private var _bones:*;

        private var _haircolor:int=0;

        private var _scaling:Number;

        private var _chargeosets:Array;

        private var _isattach:Boolean=false;

        public var materialsToLoad:int;

        private var _vertices:*;

        private var _contentpath:String;

        private var _filename:String;

        private var _loadedMaterials:Array;

        private var _indices:*;

        private var _slotbones:Array;

        private var _center:org.papervision3d.core.geom.renderables.Vertex3D;

        private var _showfacefeatures:Boolean=true;

        private var _ttimer:int=0;

        private var _meshes:Array;

        private var _facetype:int=0;

        private var _special:Array;

        public var done:Boolean=false;

        private var _skincolor:int=0;

        private var _hairstyle:int=0;

        private var _facialfeatures:Array;

        private var _baked:Array;

        private var _materials:org.papervision3d.materials.utils.MaterialsList;

        private var _race:int=-1;

        private var _mumtextures:Array;

        private var _skincolors:Array;

        private var _showhair:Boolean=true;

        private var _facialcolor:int=0;

        private var _gender:int=-1;

        private var _hairstyles:Array;

        private var head:Object;

        private var _boundingbox:org.papervision3d.core.geom.renderables.Vertex3D;

        private var _attachments:Array;

        private var _npcbase:String;

        private static var _loadingIdle:Boolean=true;

        private static var _waitingAttachments:Array;

        private static var _stage:com.zam.Viewer;

        public static var DEFAULT_SCALING:Number=1;

        private static var _waitingArmor:Array;

        private static var BLENDS:Array;

        private static var INTERNAL_SCALING:Number=100;

        private static var showBitmapPos:org.papervision3d.core.math.Number3D;

        private static var _loadedAttachments:Array;

        private static var _isnpc:Boolean=false;

        private static var counter:int=0;
    }
}


//        class MOMBone
package com.zam.MOM 
{
    import org.papervision3d.core.math.*;
    
    public class MOMBone extends Object
    {
        public function MOMBone()
        {
            super();
            this.parent = 0;
            var loc1:*;
            this.transpivot = loc1 = null;
            this.pivot = loc1;
            this.matrix = null;
            return;
        }

        public var transpivot:org.papervision3d.core.math.Number3D;

        public var pivot:org.papervision3d.core.math.Number3D;

        public var matrix:org.papervision3d.core.math.Matrix3D;

        public var parent:int;
    }
}


//        class MOMEvent
package com.zam.MOM 
{
    import flash.events.*;
    
    public class MOMEvent extends flash.events.Event
    {
        public function MOMEvent(arg1:String, arg2:Boolean=false, arg3:Boolean=false)
        {
            super(arg1, arg2, arg3);
            return;
        }

        public static const ATTACHMENT_LOADED:String="momAttachmentComplete";

        public static const INTERNAL_ERROR:String="momInternalError";

        public static const ERROR:String="momError";

        public static const OPEN_FILE:String="momOpen";

        public static const GEOMETRY_LOADED:String="momGeometryDone";

        public static const CHANGED:String="momChanged";

        public static const MATERIALS_LOADED:String="momMaterialsDone";

        public static const MOM_LOADED:String="momModelLoaded";
    }
}


//        class MOMGender
package com.zam.MOM 
{
    public class MOMGender extends Object
    {
        public function MOMGender()
        {
            super();
            return;
        }

        public static const FEMALE:int=1;

        public static const MALE:int=0;
    }
}


//        class MOMItemSlot
package com.zam.MOM 
{
    public class MOMItemSlot extends Object
    {
        public function MOMItemSlot()
        {
            super();
            return;
        }

        public static const THROWN:int=25;

        public static const BELT:int=6;

        public static const RANGED:int=26;

        public static const ROBE:int=20;

        public static const CAPE:int=16;

        public static const SHIRT:int=4;

        public static const BRACERS:int=9;

        public static const TABARD:int=19;

        public static const HEAD:int=1;

        public static const CHEST:int=5;

        public static const SHOULDER:int=3;

        public static const BOOTS:int=8;

        public static const SHIELD:int=14;

        public static const RIGHTHAND:int=21;

        public static const BOW:int=15;

        public static const TWOHAND:int=17;

        public static const ONEHAND:int=13;

        public static const GLOVES:int=10;

        public static const PANTS:int=7;

        public static const LEFTHAND:int=22;

        public static const OFFHAND:int=23;
    }
}


//        class MOMMesh
package com.zam.MOM 
{
    import flash.utils.*;
    
    public class MOMMesh extends Object
    {
        public function MOMMesh(arg1:Object=null)
        {
            super();
            this.texanim = 0;
            this.color = 16777215;
            this.opacity = 1;
            return;
        }

        public function read(arg1:flash.utils.ByteArray):void
        {
            return;
        }

        public var show:Boolean;

        public var opacity:Number;

        public var geosetid:int;

        public var envmap:Boolean;

        public var pass:int;

        public var transparent:Boolean;

        public var index:int;

        public var idx_start:int;

        public var color:uint;

        public var unlit:Boolean;

        public var nozwrite:Boolean;

        public var material:String;

        public var idx_end:int;

        public var blendmode:int;

        public var texanim:int;

        public var matid:int;

        public var swrap:Boolean;

        public var twrap:Boolean;

        public var billboard:Boolean;
    }
}


//        class MOMModelType
package com.zam.MOM 
{
    public class MOMModelType extends Object
    {
        public function MOMModelType()
        {
            super();
            return;
        }

        public static const SHOULDER:int=4;

        public static const NPC:int=8;

        public static const HUMAN:int=32;

        public static const ARMOR:int=128;

        public static const ITEM:int=1;

        public static const ATTACH:int=1024;

        public static const CHAR:int=16;

        public static const HELM:int=2;

        public static const OBJECT:int=64;
    }
}


//        class MOMRace
package com.zam.MOM 
{
    public class MOMRace extends Object
    {
        public function MOMRace()
        {
            super();
            return;
        }

        public static const ORC:int=2;

        public static const BLOODELF:int=10;

        public static const DWARF:int=3;

        public static const HUMAN:int=1;

        public static const GNOME:int=7;

        public static const TROLL:int=8;

        public static const TAUREN:int=6;

        public static const NIGHTELF:int=4;

        public static const GOBLIN:int=9;

        public static const DRAENEI:int=11;

        public static const SCOURGE:int=5;

        public static const WORGEN:int=22;
    }
}


//        class MOMTextureRegion
package com.zam.MOM 
{
    public class MOMTextureRegion extends Object
    {
        public function MOMTextureRegion()
        {
            super();
            return;
        }

        public static const FACE_LOWER:int=5;

        public static const PELVIS_LOWER:int=9;

        public static const LEG_LOWER:int=9;

        public static const BASE:int=0;

        public static const TORSO_UPPER:int=6;

        public static const FACE_UPPER:int=4;

        public static const ARM_LOWER:int=2;

        public static const FOOT:int=10;

        public static const HAND:int=3;

        public static const LEG_UPPER:int=8;

        public static const PELVIS_UPPER:int=8;

        public static const TORSO_LOWER:int=7;

        public static const ARM_UPPER:int=1;
    }
}


//        class MOMVertex
package com.zam.MOM 
{
    import org.papervision3d.core.geom.renderables.*;
    import org.papervision3d.core.math.*;
    
    public class MOMVertex extends Object
    {
        public function MOMVertex()
        {
            super();
            this.position = null;
            this.normal = null;
            this.uv = null;
            var loc1:*;
            this.weights = loc1 = null;
            this.bones = loc1;
            return;
        }

        public var uv:org.papervision3d.core.math.NumberUV;

        public var normal:org.papervision3d.core.math.Number3D;

        public var position:org.papervision3d.core.geom.renderables.Vertex3D;

        public var weights:*;

        public var bones:*;
    }
}


//      class Color
package com.zam 
{
    public class Color extends Object
    {
        public function Color(arg1:uint=4278190080)
        {
            super();
            this.setARGB(arg1 >> 24 & 255, arg1 >> 16 & 255, arg1 >> 8 & 255, arg1 & 255);
            return;
        }

        public function get blue():uint
        {
            return this._blue;
        }

        public function set red(arg1:uint):void
        {
            this._red = arg1 & 255;
            return;
        }

        public function get green():uint
        {
            return this._green;
        }

        public function get alpha():uint
        {
            return this._alpha;
        }

        public function set green(arg1:uint):void
        {
            this._green = arg1 & 255;
            return;
        }

        public function get argb():uint
        {
            return (this._alpha & 255) << 24 | (this._red & 255) << 16 | (this._green & 255) << 8 | this._blue & 255;
        }

        public function get rgb():uint
        {
            return (this._red & 255) << 16 | (this._green & 255) << 8 | this._blue & 255;
        }

        public function setARGB(arg1:uint, arg2:uint, arg3:uint, arg4:uint):void
        {
            this._alpha = arg1;
            this._red = arg2;
            this._green = arg3;
            this._blue = arg4;
            return;
        }

        public function toString():String
        {
            return this.hex;
        }

        public function get red():uint
        {
            return this._red;
        }

        public function set blue(arg1:uint):void
        {
            this._blue = arg1 & 255;
            return;
        }

        public function set argb(arg1:uint):void
        {
            this.setARGB(arg1 >> 24 & 255, arg1 >> 16 & 255, arg1 >> 8 & 255, arg1 & 255);
            return;
        }

        public function set rgb(arg1:uint):void
        {
            this.setARGB(255, arg1 >> 16 & 255, arg1 >> 8 & 255, arg1 & 255);
            return;
        }

        public function get hex():String
        {
            var loc1:*;
            loc1 = [this._red.toString(16), this._green.toString(16), this._blue.toString(16)];
            var loc2:*;
            loc2 = 0;
            while (loc2 < loc1.length) 
            {
                while (loc1[loc2].length < 2) 
                {
                    loc1[loc2] = "0" + loc1[loc2];
                }
                loc1[loc2] = loc1[loc2].toUpperCase();
                ++loc2;
            }
            return loc1.join("");
        }

        public function set alpha(arg1:uint):void
        {
            this._alpha = arg1 & 255;
            return;
        }

        public static function dechex(arg1:uint):String
        {
            var loc1:*;
            loc1 = new Color(arg1);
            return loc1.hex;
        }

        public static function random(arg1:uint=255, arg2:Boolean=false):uint
        {
            if (!(arg1 == 255) || arg2)
            {
                return uint((arg1 & 255) << 24 | (int(Math.random() * 255) & 255) << 16 | (int(Math.random() * 255) & 255) << 8 | int(Math.random() * 255) & 255);
            }
            return uint((int(Math.random() * 255) & 255) << 16 | (int(Math.random() * 255) & 255) << 8 | int(Math.random() * 255) & 255);
        }

        private var _blue:uint;

        private var _green:uint;

        private var _red:uint;

        private var _alpha:uint=255;
    }
}


//      class Viewer
package com.zam 
{
    import com.zam.MOM.*;
    import flash.display.*;
    import flash.events.*;
    import flash.external.*;
    import flash.filters.*;
    import flash.net.*;
    import flash.system.*;
    import flash.text.*;
    import org.papervision3d.core.math.*;
    import org.papervision3d.events.*;
    import org.papervision3d.objects.*;
    import org.papervision3d.view.*;
    
    public class Viewer extends org.papervision3d.view.BasicView
    {
        public function Viewer(arg1:Object=null, arg2:String="")
        {
            var loc2:*;
            loc2 = null;
            this.ZAMLogo = com.zam.Viewer_ZAMLogo;
            this.WindowPNG = com.zam.Viewer_WindowPNG;
            this.FullscreenPNG = com.zam.Viewer_FullscreenPNG;
            super(600, 400, true, false, "Free");
            camera.focus = 100;
            camera.x = 2000;
            camera.z = 0;
            camera.y = 0;
            camera.zoom = 6;
            this.centerNode = org.papervision3d.objects.DisplayObject3D.ZERO;
            this._downloads = new Object();
            this._blurFilter = new flash.filters.BlurFilter(0, 0);
            this._blur = true;
            if (arg1.blur != undefined)
            {
                this._blur = Boolean(parseInt(arg1.blur));
            }
            this._mode = 1;
            if (arg1.mode != undefined)
            {
                this._mode = parseInt(arg1.mode);
            }
            if (arg2 != "")
            {
                this._loaderUrl = arg2;
            }
            var loc1:*;
            loc1 = "";
            var loc3:*;
            loc3 = 0;
            var loc4:*;
            loc4 = arg1;
            for (loc2 in loc4)
            {
                if (loc1 != "")
                {
                    loc1 = loc1 + ", ";
                }
                loc1 = loc1 + loc2 + ":";
                if (arg1[loc2] !== null)
                {
                    loc1 = loc1 + arg1[loc2].toString();
                    continue;
                }
                loc1 = loc1 + "null";
            }
            trace("params: " + loc1);
            this._contentpath = arg1.contentPath || "";
            if (!this._contentpath)
            {
                trace("nop");
                return;
            }
            this._logo = "dev";
            this.init(parseInt(arg1.modelType), arg1.model, arg1.equipList || "", arg1.ha || -1, arg1.hc || -1, arg1.fa || -1, arg1.sk || -1, arg1.fh || -1, arg1.fc || -1);
            camera.lookAt(this.centerNode);
            singleRender();
            return;
        }

        private function externGetFacialColor():int
        {
            var loc1:*;
            try
            {
                return this.rootNode.facialcolor;
            }
            catch (ex:Error)
            {
                trace("[EXTERN] Could not get character: " + undefined.message);
                trace(undefined.getStackTrace());
            }
            return -1;
        }

        private function onLogoError(arg1:flash.events.Event):void
        {
            this.loadDefaultLogo();
            return;
        }

        private function onMouseMove(arg1:flash.events.MouseEvent):void
        {
            this.currentX = arg1.stageX;
            this.currentY = arg1.stageY;
            return;
        }

        private function externGetHairStyle():int
        {
            var loc1:*;
            try
            {
                return this.rootNode.hairstyle;
            }
            catch (ex:Error)
            {
                trace("[EXTERN] Could not get character: " + undefined.message);
                trace(undefined.getStackTrace());
            }
            return -1;
        }

        private function loop3D():void
        {
            var loc1:*;
            loc1 = NaN;
            var loc2:*;
            loc2 = false;
            var loc3:*;
            loc3 = null;
            if (this.rootNode.geometryLoaded && !this._initiated)
            {
                this.FullscreenButton.x = viewport.viewportWidth - 18;
                this.FullscreenButton.y = viewport.viewportHeight - 18;
                this.FullscreenButton.visible = true;
                loc1 = 1;
                loc2 = false;
                if (this._baseZoom != 0)
                {
                    loc2 = true;
                    loc1 = Number(this._zoom) / this._baseZoom;
                }
                this._baseZoom = int(Math.max(this.rootNode.boundingbox.x, this.rootNode.boundingbox.z, this.rootNode.boundingbox.y) * 1.8 * (this._fullscreen ? stage.fullScreenHeight : viewport.viewportHeight) / viewport.viewportHeight);
                this._zoom = this._baseZoom * loc1;
                if (this._zoom < this.rootNode.boundingbox.y / 2)
                {
                    this._zoom = this.rootNode.boundingbox.y / 2;
                }
                this.rootNode.x = -this.rootNode.center.x;
                this.rootNode.y = -this.rootNode.center.y;
                this.rootNode.z = -this.rootNode.center.z;
                if (this.rootNode.type != com.zam.MOM.MOMModelType.ITEM)
                {
                    if (this.isPetWindow())
                    {
                        this._zoom = int(Math.min(Math.max(this.rootNode.boundingbox.y + this.rootNode.boundingbox.z, this.rootNode.boundingbox.x), 1000));
                        if (Math.round(this.rootNode.boundingbox.y) == 599)
                        {
                            this._zoom = int(this.rootNode.boundingbox.y);
                        }
                        this._zoom = this._zoom * 300 / viewport.viewportWidth * 5 / 3;
                        camera.x = this._zoom * 0.75;
                        camera.z = (-this._zoom) * 0.5;
                        camera.y = this._zoom * 0.1;
                    }
                    else 
                    {
                        if (this._mode == 3 && !this._fullscreen && !this._initiated)
                        {
                            this._zoom = int(Math.max(this.rootNode.boundingbox.x, this.rootNode.boundingbox.z, this.rootNode.boundingbox.y) * 2.5);
                            camera.z = (-this._zoom) * 0.75;
                            if (this.rootNode.race != com.zam.MOM.MOMRace.HUMAN)
                            {
                                if (this.rootNode.race != com.zam.MOM.MOMRace.ORC)
                                {
                                    if (this.rootNode.race != com.zam.MOM.MOMRace.DWARF)
                                    {
                                        if (this.rootNode.race != com.zam.MOM.MOMRace.NIGHTELF)
                                        {
                                            if (this.rootNode.race != com.zam.MOM.MOMRace.SCOURGE)
                                            {
                                                if (this.rootNode.race != com.zam.MOM.MOMRace.TAUREN)
                                                {
                                                    if (this.rootNode.race != com.zam.MOM.MOMRace.GNOME)
                                                    {
                                                        if (this.rootNode.race != com.zam.MOM.MOMRace.TROLL)
                                                        {
                                                            if (this.rootNode.race != com.zam.MOM.MOMRace.BLOODELF)
                                                            {
                                                                if (this.rootNode.race == com.zam.MOM.MOMRace.DRAENEI)
                                                                {
                                                                    if (this.rootNode.gender != com.zam.MOM.MOMGender.MALE)
                                                                    {
                                                                        this._zoom = int(this.rootNode.boundingbox.y * 2);
                                                                    }
                                                                    else 
                                                                    {
                                                                        this._zoom = int(this.rootNode.boundingbox.y * 2.2);
                                                                    }
                                                                }
                                                            }
                                                            else 
                                                            {
                                                                if (this.rootNode.gender != com.zam.MOM.MOMGender.MALE)
                                                                {
                                                                    this._zoom = int(this.rootNode.boundingbox.y * 2);
                                                                }
                                                                else 
                                                                {
                                                                    this._zoom = int(this.rootNode.boundingbox.y * 2);
                                                                }
                                                            }
                                                        }
                                                        else 
                                                        {
                                                            if (this.rootNode.gender != com.zam.MOM.MOMGender.MALE)
                                                            {
                                                                this._zoom = int(this.rootNode.boundingbox.y * 1.9);
                                                                this.rootNode.y = this.rootNode.y + this.rootNode.boundingbox.y * 0.05;
                                                            }
                                                            else 
                                                            {
                                                                this._zoom = int(this.rootNode.boundingbox.y * 2);
                                                            }
                                                        }
                                                    }
                                                    else 
                                                    {
                                                        if (this.rootNode.gender != com.zam.MOM.MOMGender.MALE)
                                                        {
                                                            this._zoom = int(this.rootNode.boundingbox.y * 2.2);
                                                        }
                                                        else 
                                                        {
                                                            this._zoom = int(this.rootNode.boundingbox.y * 1.8);
                                                            this.rootNode.y = this.rootNode.y + this.rootNode.boundingbox.y * 0.1;
                                                        }
                                                    }
                                                }
                                                else 
                                                {
                                                    if (this.rootNode.gender != com.zam.MOM.MOMGender.MALE)
                                                    {
                                                        this._zoom = int(this.rootNode.boundingbox.y * 2.2);
                                                    }
                                                    else 
                                                    {
                                                        this._zoom = int(this.rootNode.boundingbox.y * 2.3);
                                                    }
                                                }
                                            }
                                            else 
                                            {
                                                this.rootNode.y = this.rootNode.y + this.rootNode.boundingbox.y * 0.05;
                                                if (this.rootNode.gender != com.zam.MOM.MOMGender.MALE)
                                                {
                                                    this._zoom = int(this.rootNode.boundingbox.y * 1.9);
                                                }
                                                else 
                                                {
                                                    this._zoom = int(this.rootNode.boundingbox.y * 1.9);
                                                }
                                            }
                                        }
                                        else 
                                        {
                                            if (this.rootNode.gender != com.zam.MOM.MOMGender.MALE)
                                            {
                                                this._zoom = int(this.rootNode.boundingbox.y * 2.1);
                                            }
                                            else 
                                            {
                                                this._zoom = int(this.rootNode.boundingbox.y * 2);
                                            }
                                        }
                                    }
                                    else 
                                    {
                                        if (this.rootNode.gender != com.zam.MOM.MOMGender.MALE)
                                        {
                                            this._zoom = int(this.rootNode.boundingbox.y * 2.2);
                                        }
                                        else 
                                        {
                                            this._zoom = int(this.rootNode.boundingbox.y * 2.2);
                                        }
                                    }
                                }
                                else 
                                {
                                    if (this.rootNode.gender != com.zam.MOM.MOMGender.MALE)
                                    {
                                        this._zoom = int(this.rootNode.boundingbox.y * 2);
                                    }
                                    else 
                                    {
                                        this._zoom = int(this.rootNode.boundingbox.y * 2.2);
                                    }
                                }
                            }
                            else 
                            {
                                if (this.rootNode.gender != com.zam.MOM.MOMGender.MALE)
                                {
                                    this._zoom = int(this.rootNode.boundingbox.y * 2.1);
                                }
                                else 
                                {
                                    this._zoom = int(this.rootNode.boundingbox.y * 1.95);
                                }
                            }
                        }
                    }
                }
                else 
                {
                    if (!loc2)
                    {
                        camera.x = 0;
                        camera.z = -this._zoom;
                    }
                }
                camera.far = this._zoom * 2;
                camera.lookAt(this.centerNode);
                camera.moveBackward(this._zoom - camera.distanceTo(this.centerNode));
                this._initiated = true;
                singleRender();
                return;
            }
            if (this._dragging)
            {
                this.hThrow = this.currentX - this.previousX;
                this.vThrow = this.currentY - this.previousY;
                this.previousX = this.currentX;
                this.previousY = this.currentY;
            }
            if (this.hPush != 0)
            {
                this.hThrow = this.hPush;
            }
            if (this.vPush != 0)
            {
                this.vThrow = this.vPush;
            }
            if (this.zPush != 0)
            {
                this.zThrow = this.zPush;
            }
            if (this.hThrow || this.vThrow || this.zThrow || this._dragging)
            {
                if (Math.abs(this.vThrow) > 0.1)
                {
                    loc3 = new org.papervision3d.core.math.Number3D(0, 1, 0);
                    org.papervision3d.core.math.Matrix3D.rotateAxis(camera.transform, loc3);
                    if (Math.abs(camera.y + Math.round(this.vThrow * this._zoom / 100) * loc3.y) < (this._zoom - 1))
                    {
                        camera.moveUp(Math.round(this.vThrow * this._zoom / 100));
                    }
                    this.vThrow = this.vThrow / 1.2;
                }
                else 
                {
                    this.vThrow = 0;
                }
                if (Math.abs(this.hThrow) > 0.1)
                {
                    camera.moveLeft(Math.round(this.hThrow * this._zoom / 100));
                    this.hThrow = this.hThrow / 1.2;
                }
                else 
                {
                    this.hThrow = 0;
                }
                if (Math.abs(this.zThrow) > 0.1)
                {
                    this._zoom = this._zoom - this.zThrow;
                    if (this._zoom < this.rootNode.boundingbox.y / 2)
                    {
                        this._zoom = this.rootNode.boundingbox.y / 2;
                    }
                    camera.far = this._zoom * 2;
                    this.zThrow = this.zThrow / 1.2;
                }
                else 
                {
                    this.zThrow = 0;
                }
                camera.lookAt(this.centerNode);
                camera.moveBackward(this._zoom - camera.distanceTo(this.centerNode));
                if (Math.abs(this.hThrow) > 0.1 || Math.abs(this.vThrow) > 0.1 || Math.abs(this.zThrow) > 0.1)
                {
                    this.stageQualityLow();
                    if (this._blur)
                    {
                        this._blurFilter.blurX = Math.min(Math.abs(this.hThrow) * 0.25, 25);
                        viewport.filters = [this._blurFilter];
                    }
                }
                else 
                {
                    if (!this._dragging)
                    {
                        if (this._blur)
                        {
                            viewport.filters = [];
                        }
                        this.stageQualityHigh();
                    }
                }
                singleRender();
            }
            return;
        }

        public function init(arg1:int, arg2:String, arg3:String, arg4:int, arg5:int, arg6:int, arg7:int, arg8:int, arg9:int):void
        {
            var gender:int;
            var i:int;
            var pEquipList:String;
            var pFaceType:int;
            var pFacial:int;
            var pFacialColor:int;
            var pHairColor:int;
            var pHairStyle:int;
            var pModel:String;
            var pModelType:int;
            var pSkinColor:int;
            var race:int;

            var loc1:*;
            race = 0;
            gender = 0;
            i = 0;
            pModelType = arg1;
            pModel = arg2;
            pEquipList = arg3;
            pHairStyle = arg4;
            pHairColor = arg5;
            pFaceType = arg6;
            pSkinColor = arg7;
            pFacial = arg8;
            pFacialColor = arg9;
            this._touched = false;
            this._focus = false;
            this._initiated = false;
            this._zoom = 2000;
            this.init3D();
            this.init2D();
            addEventListener(flash.events.Event.ADDED_TO_STAGE, this.initEvents);
            this.initExtern();
            try
            {
                if (pModelType > 0 && !(pModelType == com.zam.MOM.MOMModelType.CHAR))
                {
                    this.rootNode.load(pModelType, pModel);
                }
                else 
                {
                    if (pModelType == com.zam.MOM.MOMModelType.CHAR || pModelType == com.zam.MOM.MOMModelType.HUMAN)
                    {
                        race = -1;
                        gender = -1;
                        i = 1;
                        while (i < com.zam.MOM.MOM.RACES.length) 
                        {
                            if (pModel.indexOf(com.zam.MOM.MOM.RACES[i].toLowerCase()) == 0)
                            {
                                race = i;
                                break;
                            }
                            i = (i + 1);
                        }
                        if (race != -1)
                        {
                            if (pModel.indexOf("female") != com.zam.MOM.MOM.RACES[race].length)
                            {
                                if (pModel.indexOf("male") == com.zam.MOM.MOM.RACES[race].length)
                                {
                                    gender = com.zam.MOM.MOMGender.MALE;
                                }
                            }
                            else 
                            {
                                gender = com.zam.MOM.MOMGender.FEMALE;
                            }
                        }
                        if (!(race == -1) && !(gender == -1))
                        {
                            this.rootNode.skincolor = pSkinColor;
                            this.rootNode.facetype = pFaceType;
                            this.rootNode.hairstyle = pHairStyle;
                            this.rootNode.haircolor = pHairColor;
                            this.rootNode.facialfeature = pFacial;
                            this.rootNode.facialcolor = pFacialColor;
                            this.rootNode.setRaceGender(race, gender);
                            this.rootNode.load();
                            this.rootNode.attach(pEquipList);
                        }
                        else 
                        {
                            throw new Error("Invalid character model string");
                        }
                    }
                }
            }
            catch (error:Error)
            {
                trace("An Error occurred: " + undefined.message + " (" + undefined.name + ")");
                LoadingText.text = "Loading Error.";
                LoadingText.visible = true;
            }
            return;
        }

        private function externSetHairColor(arg1:int):void
        {
            var val:int;

            var loc1:*;
            val = arg1;
            try
            {
                this.rootNode.haircolor = val;
            }
            catch (ex:Error)
            {
                trace("[EXTERN] Could not set character: " + undefined.message);
                trace(undefined.getStackTrace());
            }
            return;
        }

        private function externClearSlot(arg1:int):void
        {
            var pId:int;

            var loc1:*;
            pId = arg1;
            try
            {
                this.rootNode.clearSlot(pId);
            }
            catch (ex:Error)
            {
                trace("[EXTERN] Could not clear slots: " + undefined.message);
                trace(undefined.getStackTrace());
            }
            return;
        }

        private function isMouseOverStage():Boolean
        {
            return !(stage.mouseX < 0 || stage.mouseX > stage.width || stage.mouseY < 0 || stage.mouseY > stage.height);
        }

        private function onLogoLoad(arg1:flash.events.Event):void
        {
            var e:flash.events.Event;
            var logoBitmap:flash.display.BitmapData;

            var loc1:*;
            logoBitmap = null;
            e = arg1;
            try
            {
                logoBitmap = flash.display.Bitmap(e.target.content).bitmapData;
                this.LogoBR.graphics.beginBitmapFill(logoBitmap);
                this.LogoBR.graphics.drawRect(0, 0, logoBitmap.width, logoBitmap.height);
                this.LogoBR.graphics.endFill();
                this.LogoBR.x = viewport.viewportWidth - (logoBitmap.width + 18);
                this.LogoBR.y = viewport.viewportHeight - (logoBitmap.height + 18);
                if (this._mode > 1 || this.isPetWindow())
                {
                    this.LogoBR.visible = false;
                }
                addChild(this.LogoBR);
            }
            catch (ex:Error)
            {
                loadDefaultLogo();
            }
            return;
        }

        private function onFocus(arg1:flash.events.Event):void
        {
            if (!this._focus && this._touched)
            {
                this._focus = true;
            }
            return;
        }

        private function externAttachList(arg1:String):void
        {
            var pList:String;

            var loc1:*;
            pList = arg1;
            try
            {
                this.rootNode.attach(pList);
            }
            catch (ex:Error)
            {
                trace("[EXTERN] Could not attach items: " + undefined.message);
                trace(undefined.getStackTrace());
            }
            return;
        }

        private function onMouseUp(arg1:flash.events.MouseEvent):void
        {
            this._dragging = false;
            if (this.vThrow == 0 && this.hThrow == 0 && this.zThrow == 0)
            {
                if (this._blur)
                {
                    viewport.filters = [];
                }
                this.stageQualityHigh();
                singleRender();
            }
            if (!this.isMouseOverStage())
            {
                this.onBlur(arg1);
            }
            return;
        }

        private function initEvents(arg1:flash.events.Event):void
        {
            removeEventListener(flash.events.Event.ADDED_TO_STAGE, this.initEvents);
            this.stageQualityLow();
            stage.doubleClickEnabled = true;
            stage.addEventListener(flash.events.MouseEvent.DOUBLE_CLICK, this.onFullscreenClick);
            stage.addEventListener(flash.events.MouseEvent.MOUSE_DOWN, this.onMouseDown);
            stage.addEventListener(flash.events.MouseEvent.MOUSE_UP, this.onMouseUp);
            stage.addEventListener(flash.events.MouseEvent.MOUSE_MOVE, this.onMouseMove);
            stage.addEventListener(flash.events.MouseEvent.MOUSE_WHEEL, this.onMouseWheel);
            stage.addEventListener(flash.events.KeyboardEvent.KEY_DOWN, this.onKeyDown);
            stage.addEventListener(flash.events.KeyboardEvent.KEY_UP, this.onKeyUp);
            stage.addEventListener(flash.events.MouseEvent.MOUSE_OVER, this.onFocus);
            stage.addEventListener(flash.events.MouseEvent.MOUSE_OUT, this.onBlur);
            stage.addEventListener(flash.events.Event.RESIZE, this.onResize);
            stage.addEventListener(flash.events.FullScreenEvent.FULL_SCREEN, this.onFullscreen);
            this.rootNode.addEventListener(com.zam.MOM.MOMEvent.CHANGED, this.onChange);
            this.rootNode.addEventListener(com.zam.MOM.MOMEvent.OPEN_FILE, this.onLoadOpen);
            this.rootNode.addEventListener(com.zam.MOM.MOMEvent.ERROR, this.onMOMError);
            this.rootNode.addEventListener(org.papervision3d.events.FileLoadEvent.LOAD_PROGRESS, this.onLoadProgress);
            this.rootNode.addEventListener(org.papervision3d.events.FileLoadEvent.LOAD_ERROR, this.onLoadError);
            this.rootNode.addEventListener(org.papervision3d.events.FileLoadEvent.LOAD_COMPLETE, this.onLoad);
            addEventListener(flash.events.Event.ENTER_FRAME, this.tick);
            return;
        }

        private function onLoadOpen(arg1:flash.events.Event):void
        {
            if (this.halted)
            {
                return;
            }
            if (this._totalsize == 0)
            {
                this.LoadingText.text = "Loading ...";
                this.LoadingText.visible = true;
            }
            return;
        }

        private function init2D():void
        {
            var loader:flash.display.Loader;
            var pad:Number;
            var re:RegExp;

            var loc1:*;
            loader = null;
            pad = 4;
            this.LogoBR = new flash.display.MovieClip();
            this.LogoBR.name = "Logo";
            this.LogoBR.alpha = 0.8;
            re = new RegExp("^http:\\/\\/.*\\.(wowhead|allakhazam|thottbot)\\.com\\/", "i");
            if (this._loaderUrl == "" || !re.test(this._loaderUrl))
            {
                loader = new flash.display.Loader();
                loader.contentLoaderInfo.addEventListener(flash.events.Event.COMPLETE, this.onLogoLoad);
                loader.contentLoaderInfo.addEventListener(flash.events.IOErrorEvent.IO_ERROR, this.onLogoError);
                try
                {
                    loader.load(new flash.net.URLRequest(this._contentpath + "badge.png"), new flash.system.LoaderContext(true, null, null));
                }
                catch (ex:Error)
                {
                    loadDefaultLogo();
                }
            }
            this.FullscreenBitmap = new this.FullscreenPNG();
            this.WindowBitmap = new this.WindowPNG();
            this.FullscreenButton = new flash.display.SimpleButton(this.FullscreenBitmap, this.FullscreenBitmap, this.FullscreenBitmap, this.FullscreenBitmap);
            this.FullscreenButton.width = 16;
            this.FullscreenButton.height = 16;
            this.FullscreenButton.x = viewport.viewportWidth - 18;
            this.FullscreenButton.y = viewport.viewportHeight - 18;
            this.FullscreenButton.addEventListener(flash.events.MouseEvent.CLICK, this.onFullscreenClick);
            this.FullscreenButton.visible = false;
            addChild(this.FullscreenButton);
            this.LoadingText = new flash.text.TextField();
            this.LoadingText.name = "Loading";
            this.LoadingText.defaultTextFormat = new flash.text.TextFormat("Verdana", 11, 16777215, true);
            this.LoadingText.width = viewport.viewportWidth - pad - this.LogoBR.width - pad;
            this.LoadingText.height = 20;
            this.LoadingText.selectable = false;
            this.LoadingText.multiline = true;
            this.LoadingText.antiAliasType = "advanced";
            this.LoadingText.text = "Loading ... ";
            this.LoadingText.x = pad;
            this.LoadingText.y = viewport.viewportHeight - this.LoadingText.height;
            this.LoadingText.visible = false;
            this.LoadingText.filters = [new flash.filters.GlowFilter(4278190080, 0.8, 6, 6, 8, 1)];
            addChild(this.LoadingText);
            return;
        }

        private function stageQualityHigh():void
        {
            if (!this.rootNode.done)
            {
                return;
            }
            stage.quality = "medium";
            return;
        }

        private function externSetSkinColor(arg1:int):void
        {
            var val:int;

            var loc1:*;
            val = arg1;
            try
            {
                this.rootNode.skincolor = val;
            }
            catch (ex:Error)
            {
                trace("[EXTERN] Could not set character: " + undefined.message);
                trace(undefined.getStackTrace());
            }
            return;
        }

        private function externSetHairStyle(arg1:int):void
        {
            var val:int;

            var loc1:*;
            val = arg1;
            try
            {
                this.rootNode.hairstyle = val;
            }
            catch (ex:Error)
            {
                trace("[EXTERN] Could not set character: " + undefined.message);
                trace(undefined.getStackTrace());
            }
            return;
        }

        private function onChange(arg1:flash.events.Event):void
        {
            if (this._initiated)
            {
                singleRender();
            }
            return;
        }

        private function onLoad(arg1:org.papervision3d.events.FileLoadEvent):void
        {
            this.stageQualityHigh();
            singleRender();
            trace("Load complete. (" + this.rootNode.numChildren + " children)");
            return;
        }

        private function externSetFacialColor(arg1:int):void
        {
            var val:int;

            var loc1:*;
            val = arg1;
            try
            {
                this.rootNode.facialcolor = val;
            }
            catch (ex:Error)
            {
                trace("[EXTERN] Could not set character: " + undefined.message);
                trace(undefined.getStackTrace());
            }
            return;
        }

        private function stageQualityLow():void
        {
            stage.quality = "low";
            return;
        }

        private function init3D():void
        {
            this.rootNode = new com.zam.MOM.MOM(this._contentpath, this);
            scene.addChild(this.rootNode);
            return;
        }

        private function onResize(arg1:flash.events.Event):void
        {
            this.onChange(arg1);
            if (this.isPetWindow())
            {
                this.LogoBR.visible = false;
            }
            else 
            {
                this.LogoBR.x = viewport.viewportWidth - this.LogoBR.width;
                this.LogoBR.y = viewport.viewportHeight - this.LogoBR.height;
                this.LogoBR.visible = true;
                this.FullscreenButton.x = viewport.viewportWidth - 18;
                this.FullscreenButton.y = viewport.viewportHeight - 18;
                this.FullscreenButton.visible = true;
            }
            return;
        }

        private function externSetFacial(arg1:int):void
        {
            var val:int;

            var loc1:*;
            val = arg1;
            try
            {
                this.rootNode.facialfeature = val;
            }
            catch (ex:Error)
            {
                trace("[EXTERN] Could not set character: " + undefined.message);
                trace(undefined.getStackTrace());
            }
            return;
        }

        private function externIsLoaded():Boolean
        {
            var loc1:*;
            try
            {
                return this.rootNode.geometryLoaded;
            }
            catch (ex:Error)
            {
                trace("[EXTERN] externIsLoaded: " + undefined.message);
                trace(undefined.getStackTrace());
            }
            return false;
        }

        private function externGetFacial():int
        {
            var loc1:*;
            try
            {
                return this.rootNode.facialfeature;
            }
            catch (ex:Error)
            {
                trace("[EXTERN] Could not get character: " + undefined.message);
                trace(undefined.getStackTrace());
            }
            return -1;
        }

        private function tick(arg1:flash.events.Event):void
        {
            this.loop3D();
            return;
        }

        private function externToggleGeoset(arg1:String):void
        {
            var s:String;

            var loc1:*;
            s = arg1;
            try
            {
                this.rootNode.toggleGeoset(parseInt(s));
            }
            catch (ex:Error)
            {
                trace("[EXTERN] Could not set geoset: " + undefined.message);
                trace(undefined.getStackTrace());
            }
            return;
        }

        private function externSetAppearance(arg1:int, arg2:int, arg3:int, arg4:int, arg5:int, arg6:int):void
        {
            trace("externSetAppearance(" + arg1, arg2, arg3, arg4, arg5, arg6 + ")");
            this.externSetCharacter(-1, -1, arg4, arg3, arg1, arg2, arg5, arg6);
            return;
        }

        private function externSetCharacter(arg1:int=1, arg2:int=1, arg3:int=-1, arg4:int=-1, arg5:int=-1, arg6:int=-1, arg7:int=-1, arg8:int=-1):void
        {
            var pFaceType:int=-1;
            var pFacial:int=-1;
            var pFacialColor:int=-1;
            var pGender:int=1;
            var pHairColor:int=-1;
            var pHairStyle:int=-1;
            var pRace:int=1;
            var pSkinColor:int=-1;

            var loc1:*;
            pRace = arg1;
            pGender = arg2;
            pSkinColor = arg3;
            pFaceType = arg4;
            pHairStyle = arg5;
            pHairColor = arg6;
            pFacial = arg7;
            pFacialColor = arg8;
            try
            {
                this.rootNode.skincolor = pSkinColor;
                this.rootNode.facetype = pFaceType;
                this.rootNode.hairstyle = pHairStyle;
                this.rootNode.haircolor = pHairColor;
                this.rootNode.facialfeature = pFacial;
                this.rootNode.facialcolor = pFacialColor;
                if (!(pRace == -1) && !(pGender == -1))
                {
                    this.rootNode.setRaceGender(pRace, pGender);
                }
                if (!this.rootNode.geometryLoaded)
                {
                    this.rootNode.load();
                }
            }
            catch (ex:Error)
            {
                trace("[EXTERN] Could not set character: " + undefined.message);
                trace(undefined.getStackTrace());
            }
            return;
        }

        private function externClearSlots(arg1:String):void
        {
            var pList:String;

            var loc1:*;
            pList = arg1;
            try
            {
                this.rootNode.clearSlots(pList.split(","));
            }
            catch (ex:Error)
            {
                trace("[EXTERN] Could not clear slots: " + undefined.message);
                trace(undefined.getStackTrace());
            }
            return;
        }

        private function externAttachSlot(arg1:int, arg2:int):void
        {
            var pId:int;
            var pSlot:int;

            var loc1:*;
            pSlot = arg1;
            pId = arg2;
            try
            {
                this.rootNode.attachArmor(pSlot, pId);
            }
            catch (ex:Error)
            {
                trace("[EXTERN] Could not attach item: " + undefined.message);
                trace(undefined.getStackTrace());
            }
            return;
        }

        private function externGetHairColor():int
        {
            var loc1:*;
            try
            {
                return this.rootNode.haircolor;
            }
            catch (ex:Error)
            {
                trace("[EXTERN] Could not get character: " + undefined.message);
                trace(undefined.getStackTrace());
            }
            return -1;
        }

        private function externToggleBlur(arg1:String=""):void
        {
            var mode:String="";

            var loc1:*;
            mode = arg1;
            try
            {
                if (mode == "")
                {
                    mode = String(!this._blur);
                }
                this._blur = Boolean(mode);
            }
            catch (ex:Error)
            {
                trace("[EXTERN] Could not set blur: " + undefined.message);
                trace(undefined.getStackTrace());
            }
            return;
        }

        private function onFullscreenClick(arg1:flash.events.MouseEvent):void
        {
            if (this._fullscreen)
            {
                stage.displayState = flash.display.StageDisplayState.NORMAL;
            }
            else 
            {
                stage.displayState = flash.display.StageDisplayState.FULL_SCREEN;
            }
            return;
        }

        private function onLoadProgress(arg1:org.papervision3d.events.FileLoadEvent):void
        {
            if (this.halted)
            {
                return;
            }
            if (this._downloads[arg1.file] == null)
            {
                this._downloads[arg1.file] = 0;
                this._totalsize = this._totalsize + arg1.bytesTotal;
            }
            this._progress = this._progress + arg1.bytesLoaded - this._downloads[arg1.file];
            this._downloads[arg1.file] = arg1.bytesLoaded;
            if (arg1.bytesTotal == arg1.bytesLoaded)
            {
                delete this._downloads[arg1.file];
            }
            if (this._totalsize && this._progress / this._totalsize == 1)
            {
                var loc1:*;
                this._totalsize = loc1 = 0;
                this._progress = loc1;
                this.LoadingText.visible = false;
                this.LoadingText.text = "";
            }
            else 
            {
                this.LoadingText.text = "Loading ... " + Math.round(this._progress / this._totalsize * 100) + "%";
                if (!this.LoadingText.visible)
                {
                    this.LoadingText.visible = true;
                }
            }
            return;
        }

        private function onKeyDown(arg1:flash.events.KeyboardEvent):void
        {
            if (arg1.keyCode != 37)
            {
                if (arg1.keyCode != 39)
                {
                    if (arg1.keyCode != 40)
                    {
                        if (arg1.keyCode != 38)
                        {
                            if (arg1.keyCode != 65)
                            {
                                if (arg1.keyCode == 90)
                                {
                                    this.zPush = -25;
                                }
                            }
                            else 
                            {
                                this.zPush = 25;
                            }
                        }
                        else 
                        {
                            this.vPush = 5;
                        }
                    }
                    else 
                    {
                        this.vPush = -5;
                    }
                }
                else 
                {
                    this.hPush = 10;
                }
            }
            else 
            {
                this.hPush = -10;
            }
            return;
        }

        private function onMouseDown(arg1:flash.events.MouseEvent):void
        {
            if (!this._touched)
            {
                this._touched = true;
            }
            this.onFocus(arg1);
            this.previousX = arg1.stageX;
            this.previousY = arg1.stageY;
            this.stageQualityLow();
            this._dragging = true;
            return;
        }

        private function onKeyUp(arg1:flash.events.KeyboardEvent):void
        {
            if (arg1.keyCode != 37)
            {
                if (arg1.keyCode != 39)
                {
                    if (arg1.keyCode != 40)
                    {
                        if (arg1.keyCode != 38)
                        {
                            if (arg1.keyCode != 65)
                            {
                                if (arg1.keyCode == 90)
                                {
                                    this.zPush = 0;
                                }
                            }
                            else 
                            {
                                this.zPush = 0;
                            }
                        }
                        else 
                        {
                            this.vPush = 0;
                        }
                    }
                    else 
                    {
                        this.vPush = 0;
                    }
                }
                else 
                {
                    this.hPush = 0;
                }
            }
            else 
            {
                this.hPush = 0;
            }
            return;
        }

        private function onMOMError(arg1:flash.events.Event):void
        {
            this.LoadingText.text = "Loading Error.";
            this.LoadingText.visible = true;
            this.halted = true;
            return;
        }

        private function initExtern():void
        {
            var loc1:*;
            if (flash.external.ExternalInterface.available)
            {
                try
                {
                    flash.external.ExternalInterface.addCallback("attachList", this.externAttachList);
                    flash.external.ExternalInterface.addCallback("attachSlot", this.externAttachSlot);
                    flash.external.ExternalInterface.addCallback("clearSlot", this.externClearSlot);
                    flash.external.ExternalInterface.addCallback("clearSlots", this.externClearSlots);
                    flash.external.ExternalInterface.addCallback("clearSlotsAll", this.externClearSlotsAll);
                    flash.external.ExternalInterface.addCallback("setAppearance", this.externSetAppearance);
                    flash.external.ExternalInterface.addCallback("setCharacter", this.externSetCharacter);
                    flash.external.ExternalInterface.addCallback("setHairStyle", this.externSetHairStyle);
                    flash.external.ExternalInterface.addCallback("setHairColor", this.externSetHairColor);
                    flash.external.ExternalInterface.addCallback("setFaceType", this.externSetFaceType);
                    flash.external.ExternalInterface.addCallback("setSkinColor", this.externSetSkinColor);
                    flash.external.ExternalInterface.addCallback("setFacialHairStyle", this.externSetFacial);
                    flash.external.ExternalInterface.addCallback("setFacialHairColor", this.externSetFacialColor);
                    flash.external.ExternalInterface.addCallback("getHairStyle", this.externGetHairStyle);
                    flash.external.ExternalInterface.addCallback("getHairColor", this.externGetHairColor);
                    flash.external.ExternalInterface.addCallback("getFaceType", this.externGetFaceType);
                    flash.external.ExternalInterface.addCallback("getSkinColor", this.externGetSkinColor);
                    flash.external.ExternalInterface.addCallback("getFacialHairStyle", this.externGetFacial);
                    flash.external.ExternalInterface.addCallback("getFacialHairColor", this.externGetFacialColor);
                    flash.external.ExternalInterface.addCallback("isLoaded", this.externIsLoaded);
                    flash.external.ExternalInterface.addCallback("toggleGeoset", this.externToggleGeoset);
                    flash.external.ExternalInterface.addCallback("toggleBlur", this.externToggleBlur);
                }
                catch (error:Error)
                {
                    trace("An Error occurred: " + undefined.message + " (" + undefined.name + ")");
                    LoadingText.text = "Loading Error.";
                    LoadingText.visible = true;
                }
            }
            return;
        }

        private function loadDefaultLogo():void
        {
            var loc1:*;
            loc1 = (new this.ZAMLogo() as flash.display.Bitmap).bitmapData;
            this.LogoBR.graphics.beginBitmapFill(loc1);
            this.LogoBR.graphics.drawRect(0, 0, loc1.width, loc1.height);
            this.LogoBR.graphics.endFill();
            this.LogoBR.x = viewport.viewportWidth - loc1.width;
            this.LogoBR.y = viewport.viewportHeight - loc1.height;
            this.LogoBR.filters = [new flash.filters.GlowFilter(4278190080)];
            if (this._mode > 1 || this.isPetWindow())
            {
                this.LogoBR.visible = false;
            }
            addChild(this.LogoBR);
            return;
        }

        private function onLoadError(arg1:org.papervision3d.events.FileLoadEvent):void
        {
            trace(arg1.message);
            this.LoadingText.text = "Loading Error.";
            this.LoadingText.visible = true;
            return;
        }

        private function externClearSlotsAll():void
        {
            var loc1:*;
            try
            {
                this.rootNode.clearSlotsAll();
            }
            catch (ex:Error)
            {
                trace("[EXTERN] Could not clear slots: " + undefined.message);
                trace(undefined.getStackTrace());
            }
            return;
        }

        private function isPetWindow():Boolean
        {
            return false;
        }

        private function onBlur(arg1:flash.events.Event):void
        {
            if (this._focus && !this._dragging)
            {
                this._focus = false;
                if (this.isPetWindow())
                {
                    this._touched = false;
                }
            }
            return;
        }

        private function externGetSkinColor():int
        {
            var loc1:*;
            try
            {
                return this.rootNode.skincolor;
            }
            catch (ex:Error)
            {
                trace("[EXTERN] Could not get character: " + undefined.message);
                trace(undefined.getStackTrace());
            }
            return -1;
        }

        private function externGetFaceType():int
        {
            var loc1:*;
            try
            {
                return this.rootNode.facetype;
            }
            catch (ex:Error)
            {
                trace("[EXTERN] Could not get character: " + undefined.message);
                trace(undefined.getStackTrace());
            }
            return -1;
        }

        private function onMouseWheel(arg1:flash.events.MouseEvent):void
        {
            if (this._focus || !this.isPetWindow())
            {
                this._touched = true;
                this.zThrow = arg1.delta * this._zoom / 100;
            }
            return;
        }

        private function externSetFaceType(arg1:int):void
        {
            var val:int;

            var loc1:*;
            val = arg1;
            try
            {
                this.rootNode.facetype = val;
            }
            catch (ex:Error)
            {
                trace("[EXTERN] Could not set character: " + undefined.message);
                trace(undefined.getStackTrace());
            }
            return;
        }

        private function onFullscreen(arg1:flash.events.FullScreenEvent):void
        {
            if (arg1.fullScreen)
            {
                this.FullscreenButton.upState = this.WindowBitmap;
                this.FullscreenButton.downState = this.WindowBitmap;
                this.FullscreenButton.overState = this.WindowBitmap;
                this._fullscreen = true;
            }
            else 
            {
                this.FullscreenButton.upState = this.FullscreenBitmap;
                this.FullscreenButton.downState = this.FullscreenBitmap;
                this.FullscreenButton.overState = this.FullscreenBitmap;
                this._fullscreen = false;
            }
            this.LogoBR.x = viewport.viewportWidth - (this.LogoBR.width + 18);
            this.LogoBR.y = viewport.viewportHeight - (this.LogoBR.height + 18);
            this.FullscreenButton.x = viewport.viewportWidth - 18;
            this.FullscreenButton.y = viewport.viewportHeight - 18;
            this.LoadingText.y = viewport.viewportHeight - this.LoadingText.height;
            this.loop3D();
            return;
        }

        private var currentY:Number=0;

        private var rootNode:com.zam.MOM.MOM;

        private var vThrow:Number=0;

        private var WindowPNG:Class;

        private var previousX:Number=0;

        private var previousY:Number=0;

        private var _blur:Boolean;

        private var FullscreenPNG:Class;

        private var _fullscreen:Boolean=false;

        private var LogoBR:flash.display.MovieClip;

        private var hThrow:Number=0;

        private var WindowBitmap:flash.display.Bitmap;

        private var _blurFilter:flash.filters.BlurFilter;

        private var _contentpath:String;

        private var LoadingText:flash.text.TextField;

        private var _initiated:Boolean;

        private var _downloads:Object;

        private var _mode:int;

        private var _logo:String;

        private var zThrow:Number=0;

        private var _progress:Number=0;

        private var halted:Boolean;

        private var hPush:Number=0;

        private var _baseZoom:Number=0;

        private var _dragging:Boolean;

        private var vPush:Number=0;

        private var zPush:Number=0;

        private var _zoom:Number;

        private var _totalsize:Number=0;

        private var ZAMLogo:Class;

        private var _focus:Boolean;

        private var _loaderUrl:String="";

        private var _touched:Boolean;

        private var FullscreenBitmap:flash.display.Bitmap;

        private var FullscreenButton:flash.display.SimpleButton;

        private var centerNode:org.papervision3d.objects.DisplayObject3D;

        private var currentX:Number=0;
    }
}


//      class Viewer_FullscreenPNG
package com.zam 
{
    import mx.core.*;
    
    public class Viewer_FullscreenPNG extends mx.core.BitmapAsset
    {
        public function Viewer_FullscreenPNG()
        {
            super();
            return;
        }
    }
}


//      class Viewer_WindowPNG
package com.zam 
{
    import mx.core.*;
    
    public class Viewer_WindowPNG extends mx.core.BitmapAsset
    {
        public function Viewer_WindowPNG()
        {
            super();
            return;
        }
    }
}


//      class Viewer_ZAMLogo
package com.zam 
{
    import mx.core.*;
    
    public class Viewer_ZAMLogo extends mx.core.BitmapAsset
    {
        public function Viewer_ZAMLogo()
        {
            super();
            return;
        }
    }
}


//      class ZAMLoader
package com.zam 
{
    import flash.events.*;
    import flash.net.*;
    import org.papervision3d.events.*;
    
    public class ZAMLoader extends flash.net.URLLoader
    {
        public function ZAMLoader(arg1:flash.net.URLRequest=null)
        {
            this._request = arg1;
            super(arg1);
            addEventListener(flash.events.Event.COMPLETE, this.loadComplete);
            addEventListener(flash.events.ProgressEvent.PROGRESS, this.loadProgress);
            addEventListener(flash.events.IOErrorEvent.IO_ERROR, this.loadIOError);
            addEventListener(flash.events.SecurityErrorEvent.SECURITY_ERROR, this.loadSecurityError);
            return;
        }

        private function loadSecurityError(arg1:flash.events.SecurityErrorEvent):void
        {
            var loc1:*;
            loc1 = new org.papervision3d.events.FileLoadEvent(org.papervision3d.events.FileLoadEvent.SECURITY_LOAD_ERROR, this.request.url, -1, -1, arg1.text);
            dispatchEvent(loc1);
            return;
        }

        public override function load(arg1:flash.net.URLRequest):void
        {
            this._request = arg1;
            super.load(arg1);
            return;
        }

        private function loadProgress(arg1:flash.events.ProgressEvent):void
        {
            var loc1:*;
            loc1 = new org.papervision3d.events.FileLoadEvent(org.papervision3d.events.FileLoadEvent.LOAD_PROGRESS, this.request.url, arg1.bytesLoaded, arg1.bytesTotal);
            dispatchEvent(loc1);
            return;
        }

        private function loadIOError(arg1:flash.events.IOErrorEvent):void
        {
            var loc1:*;
            loc1 = new org.papervision3d.events.FileLoadEvent(org.papervision3d.events.FileLoadEvent.LOAD_ERROR, this.request.url, -1, -1, arg1.text);
            dispatchEvent(loc1);
            return;
        }

        public function get request():flash.net.URLRequest
        {
            return this._request;
        }

        private function loadComplete(arg1:flash.events.Event):void
        {
            var loc1:*;
            loc1 = new org.papervision3d.events.FileLoadEvent(org.papervision3d.events.FileLoadEvent.LOAD_COMPLETE, this.request.url);
            dispatchEvent(loc1);
            return;
        }

        private var _request:flash.net.URLRequest;
    }
}


//  package mx
//    package core
//      class BitmapAsset
package mx.core 
{
    import flash.display.*;
    
    public class BitmapAsset extends mx.core.FlexBitmap implements mx.core.IFlexAsset, mx.core.IFlexDisplayObject
    {
        public function BitmapAsset(arg1:flash.display.BitmapData=null, arg2:String="auto", arg3:Boolean=false)
        {
            super(arg1, arg2, arg3);
            return;
        }

        public function get measuredWidth():Number
        {
            if (bitmapData)
            {
                return bitmapData.width;
            }
            return 0;
        }

        public function get measuredHeight():Number
        {
            if (bitmapData)
            {
                return bitmapData.height;
            }
            return 0;
        }

        public function setActualSize(arg1:Number, arg2:Number):void
        {
            width = arg1;
            height = arg2;
            return;
        }

        public function move(arg1:Number, arg2:Number):void
        {
            this.x = arg1;
            this.y = arg2;
            return;
        }

        mx_internal static const VERSION:String="3.4.0.9271";
    }
}


//      class FlexBitmap
package mx.core 
{
    import flash.display.*;
    import mx.utils.*;
    
    public class FlexBitmap extends flash.display.Bitmap
    {
        public function FlexBitmap(arg1:flash.display.BitmapData=null, arg2:String="auto", arg3:Boolean=false)
        {
            var bitmapData:flash.display.BitmapData=null;
            var pixelSnapping:String="auto";
            var smoothing:Boolean=false;

            var loc1:*;
            bitmapData = arg1;
            pixelSnapping = arg2;
            smoothing = arg3;
            super(bitmapData, pixelSnapping, smoothing);
            try
            {
                name = mx.utils.NameUtil.createUniqueName(this);
            }
            catch (e:Error)
            {
            };
            return;
        }

        public override function toString():String
        {
            return mx.utils.NameUtil.displayObjectToString(this);
        }

        mx_internal static const VERSION:String="3.4.0.9271";
    }
}


//      class IFlexAsset
package mx.core 
{
    public interface IFlexAsset
    {
    }
}


//      class IFlexDisplayObject
package mx.core 
{
    import flash.accessibility.*;
    import flash.display.*;
    import flash.events.*;
    import flash.geom.*;
    
    public interface IFlexDisplayObject extends flash.display.IBitmapDrawable, flash.events.IEventDispatcher
    {
        function get visible():Boolean;

        function get rotation():Number;

        function localToGlobal(arg1:flash.geom.Point):flash.geom.Point;

        function get name():String;

        function set width(arg1:Number):void;

        function get measuredHeight():Number;

        function get blendMode():String;

        function get scale9Grid():flash.geom.Rectangle;

        function set name(arg1:String):void;

        function set scaleX(arg1:Number):void;

        function set scaleY(arg1:Number):void;

        function get measuredWidth():Number;

        function get accessibilityProperties():flash.accessibility.AccessibilityProperties;

        function set scrollRect(arg1:flash.geom.Rectangle):void;

        function get cacheAsBitmap():Boolean;

        function globalToLocal(arg1:flash.geom.Point):flash.geom.Point;

        function get height():Number;

        function set blendMode(arg1:String):void;

        function get parent():flash.display.DisplayObjectContainer;

        function getBounds(arg1:flash.display.DisplayObject):flash.geom.Rectangle;

        function get opaqueBackground():Object;

        function set scale9Grid(arg1:flash.geom.Rectangle):void;

        function setActualSize(arg1:Number, arg2:Number):void;

        function set alpha(arg1:Number):void;

        function set accessibilityProperties(arg1:flash.accessibility.AccessibilityProperties):void;

        function get width():Number;

        function hitTestPoint(arg1:Number, arg2:Number, arg3:Boolean=false):Boolean;

        function set cacheAsBitmap(arg1:Boolean):void;

        function get scaleX():Number;

        function get scaleY():Number;

        function get scrollRect():flash.geom.Rectangle;

        function get mouseX():Number;

        function get mouseY():Number;

        function set height(arg1:Number):void;

        function set mask(arg1:flash.display.DisplayObject):void;

        function getRect(arg1:flash.display.DisplayObject):flash.geom.Rectangle;

        function get alpha():Number;

        function set transform(arg1:flash.geom.Transform):void;

        function move(arg1:Number, arg2:Number):void;

        function get loaderInfo():flash.display.LoaderInfo;

        function get root():flash.display.DisplayObject;

        function hitTestObject(arg1:flash.display.DisplayObject):Boolean;

        function set opaqueBackground(arg1:Object):void;

        function set visible(arg1:Boolean):void;

        function get mask():flash.display.DisplayObject;

        function set x(arg1:Number):void;

        function set y(arg1:Number):void;

        function get transform():flash.geom.Transform;

        function set filters(arg1:Array):void;

        function get x():Number;

        function get y():Number;

        function get filters():Array;

        function set rotation(arg1:Number):void;

        function get stage():flash.display.Stage;
    }
}


//      class IRepeaterClient
package mx.core 
{
    public interface IRepeaterClient
    {
        function get instanceIndices():Array;

        function set instanceIndices(arg1:Array):void;

        function get isDocument():Boolean;

        function set repeaters(arg1:Array):void;

        function initializeRepeaterArrays(arg1:mx.core.IRepeaterClient):void;

        function get repeaters():Array;

        function set repeaterIndices(arg1:Array):void;

        function get repeaterIndices():Array;
    }
}


//      namespace mx_internal
package mx.core 
{
    public namespace mx_internal="http://www.adobe.com/2006/flex/mx/internal";
}


//    package utils
//      class NameUtil
package mx.utils 
{
    import flash.display.*;
    import flash.utils.*;
    import mx.core.*;
    
    public class NameUtil extends Object
    {
        public function NameUtil()
        {
            super();
            return;
        }

        public static function displayObjectToString(arg1:flash.display.DisplayObject):String
        {
            var displayObject:flash.display.DisplayObject;
            var indices:Array;
            var o:flash.display.DisplayObject;
            var result:String;
            var s:String;

            var loc1:*;
            result = null;
            o = null;
            s = null;
            indices = null;
            displayObject = arg1;
            try
            {
                o = displayObject;
                while (o != null) 
                {
                    if (!(o.parent && o.stage && o.parent == o.stage))
                    {
                    };
                    s = o.name;
                    if (o as mx.core.IRepeaterClient)
                    {
                        indices = mx.core.IRepeaterClient(o).instanceIndices;
                        if (indices)
                        {
                            s = s + "[" + indices.join("][") + "]";
                        }
                    }
                    result = result != null ? s + "." + result : s;
                    o = o.parent;
                }
            }
            catch (e:SecurityError)
            {
            };
            return result;
        }

        public static function createUniqueName(arg1:Object):String
        {
            if (!arg1)
            {
                return null;
            }
            var loc1:*;
            loc1 = flash.utils.getQualifiedClassName(arg1);
            var loc2:*;
            loc2 = loc1.indexOf("::");
            if (loc2 != -1)
            {
                loc1 = loc1.substr(loc2 + 2);
            }
            var loc3:*;
            if ((loc3 = loc1.charCodeAt((loc1.length - 1))) >= 48 && loc3 <= 57)
            {
                loc1 = loc1 + "_";
            }
            var loc4:*;
            var loc5:*;
            return loc1 + counter++;
        }

        
        {
            counter = 0;
        }

        mx_internal static const VERSION:String="3.4.0.9271";

        private static var counter:int=0;
    }
}


//  package org
//    package papervision3d
//      package cameras
//        class Camera3D
package org.papervision3d.cameras 
{
    import flash.geom.*;
    import flash.utils.*;
    import org.papervision3d.core.culling.*;
    import org.papervision3d.core.geom.renderables.*;
    import org.papervision3d.core.math.*;
    import org.papervision3d.core.proto.*;
    import org.papervision3d.core.render.data.*;
    import org.papervision3d.objects.*;
    
    public class Camera3D extends org.papervision3d.core.proto.CameraObject3D
    {
        public function Camera3D(arg1:Number=60, arg2:Number=10, arg3:Number=5000, arg4:Boolean=false, arg5:Boolean=false)
        {
            super(arg2, 40);
            this.fov = arg1;
            this._prevFocus = 0;
            this._prevZoom = 0;
            this._prevOrtho = false;
            this._prevUseProjection = false;
            _useCulling = arg4;
            _useProjectionMatrix = arg5;
            _far = arg3;
            this._focusFix = org.papervision3d.core.math.Matrix3D.IDENTITY;
            return;
        }

        public function update(arg1:flash.geom.Rectangle):void
        {
            if (!arg1)
            {
                throw new Error("Camera3D#update: Invalid viewport rectangle! " + arg1);
            }
            this.viewport = arg1;
            this._prevFocus = this.focus;
            this._prevZoom = this.zoom;
            this._prevWidth = this.viewport.width;
            this._prevHeight = this.viewport.height;
            if (this._prevOrtho != this.ortho)
            {
                if (this.ortho)
                {
                    this._prevOrthoProjection = this.useProjectionMatrix;
                    this.useProjectionMatrix = true;
                }
                else 
                {
                    this.useProjectionMatrix = this._prevOrthoProjection;
                }
            }
            this.useProjectionMatrix = this._useProjectionMatrix;
            this._prevOrtho = this.ortho;
            this._prevUseProjection = _useProjectionMatrix;
            this.useCulling = _useCulling;
            return;
        }

        public function get projection():org.papervision3d.core.math.Matrix3D
        {
            return this._projection;
        }

        public override function set near(arg1:Number):void
        {
            if (arg1 > 0)
            {
                this.focus = arg1;
                this.update(this.viewport);
            }
            return;
        }

        public override function orbit(arg1:Number, arg2:Number, arg3:Boolean=true, arg4:org.papervision3d.objects.DisplayObject3D=null):void
        {
            var loc4:*;
            loc4 = NaN;
            arg4 = (arg4 = arg4 || _target) || org.papervision3d.objects.DisplayObject3D.ZERO;
            if (arg3)
            {
                arg1 = arg1 * Math.PI / 180;
                arg2 = arg2 * Math.PI / 180;
            }
            var loc1:*;
            loc1 = arg4.world.n14 - this.x;
            var loc2:*;
            loc2 = arg4.world.n24 - this.y;
            var loc3:*;
            loc3 = arg4.world.n34 - this.z;
            loc4 = Math.sqrt(loc1 * loc1 + loc2 * loc2 + loc3 * loc3);
            var loc5:*;
            loc5 = Math.cos(arg2) * Math.sin(arg1);
            var loc6:*;
            loc6 = Math.sin(arg2) * Math.sin(arg1);
            var loc7:*;
            loc7 = Math.cos(arg1);
            this.x = arg4.world.n14 + loc5 * loc4;
            this.y = arg4.world.n24 + loc7 * loc4;
            this.z = arg4.world.n34 + loc6 * loc4;
            this.lookAt(arg4);
            return;
        }

        public override function set useCulling(arg1:Boolean):void
        {
            super.useCulling = arg1;
            if (_useCulling)
            {
                if (!this.culler)
                {
                    this.culler = new org.papervision3d.core.culling.FrustumCuller();
                }
                org.papervision3d.core.culling.FrustumCuller(this.culler).initialize(this.fov, this.viewport.width / this.viewport.height, this.focus / this.zoom, _far);
            }
            else 
            {
                this.culler = null;
            }
            return;
        }

        public override function projectFaces(arg1:Array, arg2:org.papervision3d.objects.DisplayObject3D, arg3:org.papervision3d.core.render.data.RenderSessionData):Number
        {
            var loc14:*;
            loc14 = NaN;
            var loc15:*;
            loc15 = NaN;
            var loc16:*;
            loc16 = NaN;
            var loc17:*;
            loc17 = NaN;
            var loc18:*;
            loc18 = NaN;
            var loc19:*;
            loc19 = NaN;
            var loc20:*;
            loc20 = NaN;
            var loc21:*;
            loc21 = null;
            var loc22:*;
            loc22 = null;
            var loc23:*;
            loc23 = NaN;
            var loc31:*;
            loc31 = null;
            var loc33:*;
            loc33 = null;
            var loc1:*;
            var loc2:*;
            loc2 = (loc1 = arg2.view).n11;
            var loc3:*;
            loc3 = loc1.n12;
            var loc4:*;
            loc4 = loc1.n13;
            var loc5:*;
            loc5 = loc1.n21;
            var loc6:*;
            loc6 = loc1.n22;
            var loc7:*;
            loc7 = loc1.n23;
            var loc8:*;
            loc8 = loc1.n31;
            var loc9:*;
            loc9 = loc1.n32;
            var loc10:*;
            loc10 = loc1.n33;
            var loc11:*;
            loc11 = loc1.n41;
            var loc12:*;
            loc12 = loc1.n42;
            var loc13:*;
            loc13 = loc1.n43;
            var loc24:*;
            loc24 = 0;
            var loc25:*;
            var loc26:*;
            loc26 = (loc25 = arg3.camera.focus) * arg3.camera.zoom;
            var loc27:*;
            loc27 = viewport.width / 2;
            var loc28:*;
            loc28 = viewport.height / 2;
            var loc29:*;
            var loc30:*;
            loc30 = (loc29 = arg3.camera.far) - loc25;
            var loc32:*;
            loc32 = flash.utils.getTimer();
            var loc34:*;
            loc34 = 0;
            var loc35:*;
            loc35 = arg1;
            for each (loc33 in loc35)
            {
                loc24 = (loc31 = loc33.vertices).length;
                for (;;) 
                {
                    loc21 = loc36 = loc31[--loc24];
                    if (!loc36)
                    {
                        break;
                    }
                    if (loc21.timestamp == loc32)
                    {
                        continue;
                    }
                    loc21.timestamp = loc32;
                    loc14 = loc21.x;
                    loc15 = loc21.y;
                    loc16 = loc21.z;
                    loc19 = loc14 * loc8 + loc15 * loc9 + loc16 * loc10 + loc1.n34;
                    loc22 = loc21.vertex3DInstance;
                    if (_useProjectionMatrix)
                    {
                        loc20 = loc14 * loc11 + loc15 * loc12 + loc16 * loc13 + loc1.n44;
                        loc19 = loc19 / loc20;
                        var loc36:*;
                        loc22.visible = loc36 = loc19 > 0 && loc19 < 1;
                        if (loc36)
                        {
                            loc17 = (loc14 * loc2 + loc15 * loc3 + loc16 * loc4 + loc1.n14) / loc20;
                            loc18 = (loc14 * loc5 + loc15 * loc6 + loc16 * loc7 + loc1.n24) / loc20;
                            loc22.x = loc17 * loc27;
                            loc22.y = loc18 * loc28;
                            loc22.z = loc19 * loc20;
                        }
                        continue;
                    }
                    loc22.visible = loc36 = loc25 + loc19 > 0;
                    if (!loc36)
                    {
                        continue;
                    }
                    loc17 = loc14 * loc2 + loc15 * loc3 + loc16 * loc4 + loc1.n14;
                    loc18 = loc14 * loc5 + loc15 * loc6 + loc16 * loc7 + loc1.n24;
                    loc23 = loc26 / (loc25 + loc19);
                    loc22.x = loc17 * loc23;
                    loc22.y = loc18 * loc23;
                    loc22.z = loc19;
                }
            }
            return 0;
        }

        public override function set orthoScale(arg1:Number):void
        {
            super.orthoScale = arg1;
            this.useProjectionMatrix = this.useProjectionMatrix;
            this._prevOrtho = !this.ortho;
            this.update(this.viewport);
            return;
        }

        public override function transformView(arg1:org.papervision3d.core.math.Matrix3D=null):void
        {
            if (!(ortho == this._prevOrtho) || !(this._prevUseProjection == _useProjectionMatrix) || !(focus == this._prevFocus) || !(zoom == this._prevZoom) || !(viewport.width == this._prevWidth) || !(viewport.height == this._prevHeight))
            {
                this.update(viewport);
            }
            if (_target)
            {
                lookAt(_target);
            }
            else 
            {
                if (_transformDirty)
                {
                    updateTransform();
                }
            }
            if (_useProjectionMatrix)
            {
                super.transformView();
                this.eye.calculateMultiply4x4(this._projection, this.eye);
            }
            else 
            {
                this._focusFix.copy(this.transform);
                this._focusFix.n14 = this._focusFix.n14 + focus * this.transform.n13;
                this._focusFix.n24 = this._focusFix.n24 + focus * this.transform.n23;
                this._focusFix.n34 = this._focusFix.n34 + focus * this.transform.n33;
                super.transformView(this._focusFix);
            }
            if (culler as org.papervision3d.core.culling.FrustumCuller)
            {
                org.papervision3d.core.culling.FrustumCuller(culler).transform.copy(this.transform);
            }
            return;
        }

        public override function set far(arg1:Number):void
        {
            if (arg1 > this.focus)
            {
                _far = arg1;
                this.update(this.viewport);
            }
            return;
        }

        public override function projectVertices(arg1:Array, arg2:org.papervision3d.objects.DisplayObject3D, arg3:org.papervision3d.core.render.data.RenderSessionData):Number
        {
            var loc14:*;
            loc14 = NaN;
            var loc15:*;
            loc15 = NaN;
            var loc16:*;
            loc16 = NaN;
            var loc17:*;
            loc17 = NaN;
            var loc18:*;
            loc18 = NaN;
            var loc19:*;
            loc19 = NaN;
            var loc20:*;
            loc20 = NaN;
            var loc21:*;
            loc21 = null;
            var loc22:*;
            loc22 = null;
            var loc23:*;
            loc23 = NaN;
            var loc1:*;
            var loc2:*;
            loc2 = (loc1 = arg2.view).n11;
            var loc3:*;
            loc3 = loc1.n12;
            var loc4:*;
            loc4 = loc1.n13;
            var loc5:*;
            loc5 = loc1.n21;
            var loc6:*;
            loc6 = loc1.n22;
            var loc7:*;
            loc7 = loc1.n23;
            var loc8:*;
            loc8 = loc1.n31;
            var loc9:*;
            loc9 = loc1.n32;
            var loc10:*;
            loc10 = loc1.n33;
            var loc11:*;
            loc11 = loc1.n41;
            var loc12:*;
            loc12 = loc1.n42;
            var loc13:*;
            loc13 = loc1.n43;
            var loc24:*;
            loc24 = arg1.length;
            var loc25:*;
            var loc26:*;
            loc26 = (loc25 = arg3.camera.focus) * arg3.camera.zoom;
            var loc27:*;
            loc27 = viewport.width / 2;
            var loc28:*;
            loc28 = viewport.height / 2;
            var loc29:*;
            var loc30:*;
            loc30 = (loc29 = arg3.camera.far) - loc25;
            for (;;) 
            {
                loc21 = loc31 = arg1[--loc24];
                if (!loc31)
                {
                    break;
                }
                loc14 = loc21.x;
                loc15 = loc21.y;
                loc16 = loc21.z;
                loc19 = loc14 * loc8 + loc15 * loc9 + loc16 * loc10 + loc1.n34;
                loc22 = loc21.vertex3DInstance;
                if (_useProjectionMatrix)
                {
                    loc20 = loc14 * loc11 + loc15 * loc12 + loc16 * loc13 + loc1.n44;
                    loc19 = loc19 / loc20;
                    var loc31:*;
                    loc22.visible = loc31 = loc19 > 0 && loc19 < 1;
                    if (loc31)
                    {
                        loc17 = (loc14 * loc2 + loc15 * loc3 + loc16 * loc4 + loc1.n14) / loc20;
                        loc18 = (loc14 * loc5 + loc15 * loc6 + loc16 * loc7 + loc1.n24) / loc20;
                        loc22.x = loc17 * loc27;
                        loc22.y = loc18 * loc28;
                        loc22.z = loc19 * loc20;
                    }
                    continue;
                }
                loc22.visible = loc31 = loc25 + loc19 > 0;
                if (!loc31)
                {
                    continue;
                }
                loc17 = loc14 * loc2 + loc15 * loc3 + loc16 * loc4 + loc1.n14;
                loc18 = loc14 * loc5 + loc15 * loc6 + loc16 * loc7 + loc1.n24;
                loc23 = loc26 / (loc25 + loc19);
                loc22.x = loc17 * loc23;
                loc22.y = loc18 * loc23;
                loc22.z = loc19;
            }
            return 0;
        }

        public override function set useProjectionMatrix(arg1:Boolean):void
        {
            var loc1:*;
            loc1 = NaN;
            var loc2:*;
            loc2 = NaN;
            if (arg1)
            {
                if (this.ortho)
                {
                    loc1 = viewport.width / 2;
                    loc2 = viewport.height / 2;
                    this._projection = createOrthoMatrix(-loc1, loc1, -loc2, loc2, -_far, _far);
                    this._projection = org.papervision3d.core.math.Matrix3D.multiply(_orthoScaleMatrix, this._projection);
                }
                else 
                {
                    this._projection = createPerspectiveMatrix(fov, viewport.width / viewport.height, this.focus, this.far);
                }
            }
            else 
            {
                if (this.ortho)
                {
                    arg1 = true;
                }
            }
            super.useProjectionMatrix = arg1;
            return;
        }

        public static function createPerspectiveMatrix(arg1:Number, arg2:Number, arg3:Number, arg4:Number):org.papervision3d.core.math.Matrix3D
        {
            var loc1:*;
            loc1 = arg1 / 2 * Math.PI / 180;
            var loc2:*;
            loc2 = Math.tan(loc1);
            var loc3:*;
            loc3 = 1 / loc2;
            return new org.papervision3d.core.math.Matrix3D([loc3 / arg2, 0, 0, 0, 0, loc3, 0, 0, 0, 0, -(arg3 + arg4) / (arg3 - arg4), 2 * arg4 * arg3 / (arg3 - arg4), 0, 0, 1, 0]);
        }

        public static function createOrthoMatrix(arg1:Number, arg2:Number, arg3:Number, arg4:Number, arg5:Number, arg6:Number):org.papervision3d.core.math.Matrix3D
        {
            var loc1:*;
            loc1 = (arg2 + arg1) / (arg2 - arg1);
            var loc2:*;
            loc2 = (arg4 + arg3) / (arg4 - arg3);
            var loc3:*;
            loc3 = (arg6 + arg5) / (arg6 - arg5);
            var loc4:*;
            (loc4 = new org.papervision3d.core.math.Matrix3D([2 / (arg2 - arg1), 0, 0, loc1, 0, 2 / (arg4 - arg3), 0, loc2, 0, 0, -2 / (arg6 - arg5), loc3, 0, 0, 0, 1])).calculateMultiply(org.papervision3d.core.math.Matrix3D.scaleMatrix(1, 1, -1), loc4);
            return loc4;
        }

        protected var _focusFix:org.papervision3d.core.math.Matrix3D;

        protected var _prevUseProjection:Boolean;

        protected var _prevZoom:Number;

        protected var _prevOrtho:Boolean;

        protected var _prevWidth:Number;

        protected var _prevHeight:Number;

        protected var _prevFocus:Number;

        protected var _projection:org.papervision3d.core.math.Matrix3D;

        protected var _prevOrthoProjection:Boolean;
    }
}


//        class CameraType
package org.papervision3d.cameras 
{
    public class CameraType extends Object
    {
        public function CameraType()
        {
            super();
            return;
        }

        
        {
            TARGET = "Target";
            FREE = "Free";
            DEBUG = "Debug";
            SPRING = "Spring";
        }

        public static var TARGET:String="Target";

        public static var DEBUG:String="Debug";

        public static var FREE:String="Free";

        public static var SPRING:String="Spring";
    }
}


//        class DebugCamera3D
package org.papervision3d.cameras 
{
    import flash.display.*;
    import flash.events.*;
    import flash.geom.*;
    import flash.text.*;
    import flash.ui.*;
    import org.papervision3d.view.*;
    
    public class DebugCamera3D extends org.papervision3d.cameras.Camera3D
    {
        public function DebugCamera3D(arg1:org.papervision3d.view.Viewport3D, arg2:Number=90, arg3:Number=10, arg4:Number=5000)
        {
            super(arg2, arg3, arg4, true);
            this.viewport3D = arg1;
            this.viewport = arg1.sizeRectangle;
            this.focus = this.viewport.height / 2 / Math.tan(arg2 / 2 * Math.PI / 180);
            this.zoom = this.focus / arg3;
            this.focus = arg3;
            this.far = arg4;
            this.displayProperties();
            this.checkStageReady();
            return;
        }

        protected function keyDownHandler(arg1:flash.events.KeyboardEvent):void
        {
            var loc1:*;
            loc1 = arg1.keyCode;
            switch (loc1) 
            {
                case "W".charCodeAt():
                case flash.ui.Keyboard.UP:
                {
                    this.keyForward = true;
                    this.keyBackward = false;
                    break;
                }
                case "S".charCodeAt():
                case flash.ui.Keyboard.DOWN:
                {
                    this.keyBackward = true;
                    this.keyForward = false;
                    break;
                }
                case "A".charCodeAt():
                case flash.ui.Keyboard.LEFT:
                {
                    this.keyLeft = true;
                    this.keyRight = false;
                    break;
                }
                case "D".charCodeAt():
                case flash.ui.Keyboard.RIGHT:
                {
                    this.keyRight = true;
                    this.keyLeft = false;
                    break;
                }
                case "Q".charCodeAt():
                {
                    var loc2:*;
                    rotationZ--;
                    break;
                }
                case "E".charCodeAt():
                {
                    rotationZ++;
                    break;
                }
                case "F".charCodeAt():
                {
                    fov--;
                    break;
                }
                case "R".charCodeAt():
                {
                    fov++;
                    break;
                }
                case "G".charCodeAt():
                {
                    near = near - 10;
                    break;
                }
                case "T".charCodeAt():
                {
                    near = near + 10;
                    break;
                }
                case "H".charCodeAt():
                {
                    far = far - 10;
                    break;
                }
                case "Y".charCodeAt():
                {
                    far = far + 10;
                    break;
                }
            }
            return;
        }

        public function set inertia(arg1:Number):void
        {
            this._inertia = arg1;
            return;
        }

        protected function setupEvents():void
        {
            this.viewportStage = this.viewport3D.containerSprite.stage;
            this.viewportStage.addEventListener(flash.events.MouseEvent.MOUSE_DOWN, this.mouseDownHandler);
            this.viewportStage.addEventListener(flash.events.MouseEvent.MOUSE_UP, this.mouseUpHandler);
            this.viewportStage.addEventListener(flash.events.KeyboardEvent.KEY_DOWN, this.keyDownHandler);
            this.viewportStage.addEventListener(flash.events.KeyboardEvent.KEY_UP, this.keyUpHandler);
            this.viewportStage.addEventListener(flash.events.Event.ENTER_FRAME, this.onEnterFrameHandler);
            return;
        }

        protected function displayProperties():void
        {
            this._propertiesDisplay = new flash.display.Sprite();
            this._propertiesDisplay.graphics.beginFill(0);
            this._propertiesDisplay.graphics.drawRect(0, 0, 100, 100);
            this._propertiesDisplay.graphics.endFill();
            this._propertiesDisplay.x = 0;
            this._propertiesDisplay.y = 0;
            var loc1:*;
            loc1 = new flash.text.TextFormat("_sans", 9);
            this.xText = new flash.text.TextField();
            this.yText = new flash.text.TextField();
            this.zText = new flash.text.TextField();
            this.rotationXText = new flash.text.TextField();
            this.rotationYText = new flash.text.TextField();
            this.rotationZText = new flash.text.TextField();
            this.fovText = new flash.text.TextField();
            this.nearText = new flash.text.TextField();
            this.farText = new flash.text.TextField();
            var loc2:*;
            loc2 = [this.xText, this.yText, this.zText, this.rotationXText, this.rotationYText, this.rotationZText, this.fovText, this.nearText, this.farText];
            var loc3:*;
            loc3 = 10;
            var loc4:*;
            loc4 = 0;
            while (loc4 < loc2.length) 
            {
                loc2[loc4].width = 100;
                loc2[loc4].selectable = false;
                loc2[loc4].textColor = 16776960;
                loc2[loc4].text = "";
                loc2[loc4].defaultTextFormat = loc1;
                loc2[loc4].y = loc3 * loc4;
                this._propertiesDisplay.addChild(loc2[loc4]);
                loc4 = (loc4 + 1);
            }
            this.viewport3D.addChild(this._propertiesDisplay);
            return;
        }

        protected function onEnterFrameHandler(arg1:flash.events.Event):void
        {
            if (this.keyForward)
            {
                this.forwardFactor = this.forwardFactor + 50;
            }
            if (this.keyBackward)
            {
                this.forwardFactor = this.forwardFactor + -50;
            }
            if (this.keyLeft)
            {
                this.sideFactor = this.sideFactor + -50;
            }
            if (this.keyRight)
            {
                this.sideFactor = this.sideFactor + 50;
            }
            var loc1:*;
            loc1 = this.rotationX + (this.targetRotationX - this.rotationX) / this._inertia;
            var loc2:*;
            loc2 = this.rotationY + (this.targetRotationY - this.rotationY) / this._inertia;
            this.rotationX = Math.round(loc1 * 10) / 10;
            this.rotationY = Math.round(loc2 * 10) / 10;
            this.forwardFactor = this.forwardFactor + (0 - this.forwardFactor) / this._inertia;
            this.sideFactor = this.sideFactor + (0 - this.sideFactor) / this._inertia;
            if (this.forwardFactor > 0)
            {
                this.moveForward(this.forwardFactor);
            }
            else 
            {
                this.moveBackward(-this.forwardFactor);
            }
            if (this.sideFactor > 0)
            {
                this.moveRight(this.sideFactor);
            }
            else 
            {
                this.moveLeft(-this.sideFactor);
            }
            this.xText.text = "x:" + int(x);
            this.yText.text = "y:" + int(y);
            this.zText.text = "z:" + int(z);
            this.rotationXText.text = "rotationX:" + int(loc1);
            this.rotationYText.text = "rotationY:" + int(loc2);
            this.rotationZText.text = "rotationZ:" + int(rotationZ);
            this.fovText.text = "fov:" + Math.round(fov);
            this.nearText.text = "near:" + Math.round(near);
            this.farText.text = "far:" + Math.round(far);
            return;
        }

        protected function mouseUpHandler(arg1:flash.events.MouseEvent):void
        {
            this.viewportStage.removeEventListener(flash.events.MouseEvent.MOUSE_MOVE, this.mouseMoveHandler);
            return;
        }

        protected function keyUpHandler(arg1:flash.events.KeyboardEvent):void
        {
            var loc1:*;
            loc1 = arg1.keyCode;
            switch (loc1) 
            {
                case "W".charCodeAt():
                case flash.ui.Keyboard.UP:
                {
                    this.keyForward = false;
                    break;
                }
                case "S".charCodeAt():
                case flash.ui.Keyboard.DOWN:
                {
                    this.keyBackward = false;
                    break;
                }
                case "A".charCodeAt():
                case flash.ui.Keyboard.LEFT:
                {
                    this.keyLeft = false;
                    break;
                }
                case "D".charCodeAt():
                case flash.ui.Keyboard.RIGHT:
                {
                    this.keyRight = false;
                    break;
                }
            }
            return;
        }

        public function get propsDisplay():flash.display.Sprite
        {
            return this._propertiesDisplay;
        }

        public function get inertia():Number
        {
            return this._inertia;
        }

        protected function onAddedToStageHandler(arg1:flash.events.Event):void
        {
            this.setupEvents();
            return;
        }

        protected function mouseMoveHandler(arg1:flash.events.MouseEvent):void
        {
            this.targetRotationY = this.startRotationY - (this.startPoint.x - this.viewportStage.mouseX) / 2;
            this.targetRotationX = this.startRotationX + (this.startPoint.y - this.viewportStage.mouseY) / 2;
            return;
        }

        protected function mouseDownHandler(arg1:flash.events.MouseEvent):void
        {
            this.viewportStage.addEventListener(flash.events.MouseEvent.MOUSE_MOVE, this.mouseMoveHandler);
            this.startPoint = new flash.geom.Point(this.viewportStage.mouseX, this.viewportStage.mouseY);
            this.startRotationY = this.rotationY;
            this.startRotationX = this.rotationX;
            return;
        }

        public function set propsDisplay(arg1:flash.display.Sprite):void
        {
            this._propertiesDisplay = arg1;
            return;
        }

        private function checkStageReady():void
        {
            if (this.viewport3D.containerSprite.stage != null)
            {
                this.setupEvents();
            }
            else 
            {
                this.viewport3D.containerSprite.addEventListener(flash.events.Event.ADDED_TO_STAGE, this.onAddedToStageHandler);
            }
            return;
        }

        protected var keyLeft:Boolean=false;

        protected var targetRotationX:Number=0;

        protected var targetRotationY:Number=0;

        protected var sideFactor:Number=0;

        protected var _propertiesDisplay:flash.display.Sprite;

        protected var viewport3D:org.papervision3d.view.Viewport3D;

        protected var fovText:flash.text.TextField;

        protected var xText:flash.text.TextField;

        protected var yText:flash.text.TextField;

        protected var zText:flash.text.TextField;

        protected var startPoint:flash.geom.Point;

        protected var startRotationX:Number;

        protected var startRotationY:Number;

        protected var keyBackward:Boolean=false;

        protected var farText:flash.text.TextField;

        protected var keyForward:Boolean=false;

        protected var rotationXText:flash.text.TextField;

        protected var rotationZText:flash.text.TextField;

        protected var rotationYText:flash.text.TextField;

        protected var forwardFactor:Number=0;

        protected var nearText:flash.text.TextField;

        protected var viewportStage:flash.display.Stage;

        protected var _inertia:Number=3;

        protected var keyRight:Boolean=false;
    }
}


//        class SpringCamera3D
package org.papervision3d.cameras 
{
    import org.papervision3d.core.math.*;
    import org.papervision3d.objects.*;
    
    public class SpringCamera3D extends org.papervision3d.cameras.Camera3D
    {
        public function SpringCamera3D(arg1:Number=60, arg2:Number=10, arg3:Number=5000, arg4:Boolean=false, arg5:Boolean=false)
        {
            this.positionOffset = new org.papervision3d.core.math.Number3D(0, 5, -50);
            this.lookOffset = new org.papervision3d.core.math.Number3D(0, 2, 10);
            this._velocity = new org.papervision3d.core.math.Number3D();
            this._dv = new org.papervision3d.core.math.Number3D();
            this._stretch = new org.papervision3d.core.math.Number3D();
            this._force = new org.papervision3d.core.math.Number3D();
            this._acceleration = new org.papervision3d.core.math.Number3D();
            this._desiredPosition = new org.papervision3d.core.math.Number3D();
            this._lookAtPosition = new org.papervision3d.core.math.Number3D();
            this._targetTransform = new org.papervision3d.core.math.Matrix3D();
            this._xPositionOffset = new org.papervision3d.core.math.Number3D();
            this._xLookOffset = new org.papervision3d.core.math.Number3D();
            this._xPosition = new org.papervision3d.core.math.Number3D();
            this._xLookAtObject = new org.papervision3d.objects.DisplayObject3D();
            super(arg1, arg2, arg3, arg4, arg5);
            return;
        }

        public override function transformView(arg1:org.papervision3d.core.math.Matrix3D=null):void
        {
            super.transformView(arg1);
            if (this._camTarget != null)
            {
                this._targetTransform.n31 = this._camTarget.transform.n31;
                this._targetTransform.n32 = this._camTarget.transform.n32;
                this._targetTransform.n33 = this._camTarget.transform.n33;
                this._targetTransform.n21 = this._camTarget.transform.n21;
                this._targetTransform.n22 = this._camTarget.transform.n22;
                this._targetTransform.n23 = this._camTarget.transform.n23;
                this._targetTransform.n11 = this._camTarget.transform.n11;
                this._targetTransform.n12 = this._camTarget.transform.n12;
                this._targetTransform.n13 = this._camTarget.transform.n13;
                this._xPositionOffset.x = this.positionOffset.x;
                this._xPositionOffset.y = this.positionOffset.y;
                this._xPositionOffset.z = this.positionOffset.z;
                org.papervision3d.core.math.Matrix3D.multiplyVector(this._targetTransform, this._xPositionOffset);
                this._xLookOffset.x = this.lookOffset.x;
                this._xLookOffset.y = this.lookOffset.y;
                this._xLookOffset.z = this.lookOffset.z;
                org.papervision3d.core.math.Matrix3D.multiplyVector(this._targetTransform, this._xLookOffset);
                this._desiredPosition.x = this._camTarget.x + this._xPositionOffset.x;
                this._desiredPosition.y = this._camTarget.y + this._xPositionOffset.y;
                this._desiredPosition.z = this._camTarget.z + this._xPositionOffset.z;
                this._lookAtPosition.x = this._camTarget.x + this._xLookOffset.x;
                this._lookAtPosition.y = this._camTarget.y + this._xLookOffset.y;
                this._lookAtPosition.z = this._camTarget.z + this._xLookOffset.z;
                this._stretch.x = (x - this._desiredPosition.x) * (-this.stiffness);
                this._stretch.y = (y - this._desiredPosition.y) * (-this.stiffness);
                this._stretch.z = (z - this._desiredPosition.z) * (-this.stiffness);
                this._dv.x = this._velocity.x * this.damping;
                this._dv.y = this._velocity.y * this.damping;
                this._dv.z = this._velocity.z * this.damping;
                this._force.x = this._stretch.x - this._dv.x;
                this._force.y = this._stretch.y - this._dv.y;
                this._force.z = this._stretch.z - this._dv.z;
                this._acceleration.x = this._force.x * 1 / this.mass;
                this._acceleration.y = this._force.y * 1 / this.mass;
                this._acceleration.z = this._force.z * 1 / this.mass;
                this._velocity.plusEq(this._acceleration);
                this._xPosition.x = x + this._velocity.x;
                this._xPosition.y = y + this._velocity.y;
                this._xPosition.z = z + this._velocity.z;
                x = this._xPosition.x;
                y = this._xPosition.y;
                z = this._xPosition.z;
                this._xLookAtObject.x = this._lookAtPosition.x;
                this._xLookAtObject.y = this._lookAtPosition.y;
                this._xLookAtObject.z = this._lookAtPosition.z;
                lookAt(this._xLookAtObject);
                if (Math.abs(this._zrot) > 0)
                {
                    this.rotationZ = this._zrot;
                }
            }
            return;
        }

        public override function get target():org.papervision3d.objects.DisplayObject3D
        {
            return this._camTarget;
        }

        public function get zrot():Number
        {
            return this._zrot;
        }

        public override function set target(arg1:org.papervision3d.objects.DisplayObject3D):void
        {
            this._camTarget = arg1;
            return;
        }

        public function set zrot(arg1:Number):void
        {
            this._zrot = arg1;
            if (this._zrot < 0.001)
            {
                arg1 = 0;
            }
            return;
        }

        public var _camTarget:org.papervision3d.objects.DisplayObject3D;

        private var _velocity:org.papervision3d.core.math.Number3D;

        private var _stretch:org.papervision3d.core.math.Number3D;

        public var damping:Number=4;

        public var stiffness:Number=1;

        public var lookOffset:org.papervision3d.core.math.Number3D;

        private var _lookAtPosition:org.papervision3d.core.math.Number3D;

        public var positionOffset:org.papervision3d.core.math.Number3D;

        private var _acceleration:org.papervision3d.core.math.Number3D;

        private var _targetTransform:org.papervision3d.core.math.Matrix3D;

        private var _desiredPosition:org.papervision3d.core.math.Number3D;

        private var _force:org.papervision3d.core.math.Number3D;

        private var _xPosition:org.papervision3d.core.math.Number3D;

        private var _dv:org.papervision3d.core.math.Number3D;

        private var _xLookOffset:org.papervision3d.core.math.Number3D;

        public var mass:Number=40;

        private var _xPositionOffset:org.papervision3d.core.math.Number3D;

        private var _xLookAtObject:org.papervision3d.objects.DisplayObject3D;

        private var _zrot:Number=0;
    }
}


//      package core
//        package clipping
//          package draw
//            class Clipping
package org.papervision3d.core.clipping.draw 
{
    import flash.display.*;
    import flash.geom.*;
    import org.papervision3d.core.render.command.*;
    
    public class Clipping extends Object
    {
        public function Clipping()
        {
            this.zeroPoint = new flash.geom.Point(0, 0);
            super();
            return;
        }

        public function rect(arg1:Number, arg2:Number, arg3:Number, arg4:Number):Boolean
        {
            return true;
        }

        public function screen(arg1:flash.display.Sprite):org.papervision3d.core.clipping.draw.Clipping
        {
            if (!this.rectangleClipping)
            {
                this.rectangleClipping = new org.papervision3d.core.clipping.draw.RectangleClipping();
            }
            var loc1:*;
            loc1 = arg1.stage.align;
            switch (loc1) 
            {
                case flash.display.StageAlign.TOP_LEFT:
                {
                    this.zeroPoint.x = 0;
                    this.zeroPoint.y = 0;
                    this.globalPoint = arg1.globalToLocal(this.zeroPoint);
                    this.rectangleClipping.minX = loc1 = this.globalPoint.x;
                    this.rectangleClipping.maxX = loc1 + arg1.stage.stageWidth;
                    this.rectangleClipping.minY = loc1 = this.globalPoint.y;
                    this.rectangleClipping.maxY = loc1 + arg1.stage.stageHeight;
                    break;
                }
                case flash.display.StageAlign.TOP_RIGHT:
                {
                    this.zeroPoint.x = arg1.stage.stageWidth;
                    this.zeroPoint.y = 0;
                    this.globalPoint = arg1.globalToLocal(this.zeroPoint);
                    this.rectangleClipping.maxX = loc1 = this.globalPoint.x;
                    this.rectangleClipping.minX = loc1 - arg1.stage.stageWidth;
                    this.rectangleClipping.minY = loc1 = this.globalPoint.y;
                    this.rectangleClipping.maxY = loc1 + arg1.stage.stageHeight;
                    break;
                }
                case flash.display.StageAlign.BOTTOM_LEFT:
                {
                    this.zeroPoint.x = 0;
                    this.zeroPoint.y = arg1.stage.stageHeight;
                    this.globalPoint = arg1.globalToLocal(this.zeroPoint);
                    this.rectangleClipping.minX = loc1 = this.globalPoint.x;
                    this.rectangleClipping.maxX = loc1 + arg1.stage.stageWidth;
                    this.rectangleClipping.maxY = loc1 = this.globalPoint.y;
                    this.rectangleClipping.minY = loc1 - arg1.stage.stageHeight;
                    break;
                }
                case flash.display.StageAlign.BOTTOM_RIGHT:
                {
                    this.zeroPoint.x = arg1.stage.stageWidth;
                    this.zeroPoint.y = arg1.stage.stageHeight;
                    this.globalPoint = arg1.globalToLocal(this.zeroPoint);
                    this.rectangleClipping.maxX = loc1 = this.globalPoint.x;
                    this.rectangleClipping.minX = loc1 - arg1.stage.stageWidth;
                    this.rectangleClipping.maxY = loc1 = this.globalPoint.y;
                    this.rectangleClipping.minY = loc1 - arg1.stage.stageHeight;
                    break;
                }
                case flash.display.StageAlign.TOP:
                {
                    this.zeroPoint.x = arg1.stage.stageWidth / 2;
                    this.zeroPoint.y = 0;
                    this.globalPoint = arg1.globalToLocal(this.zeroPoint);
                    this.rectangleClipping.minX = this.globalPoint.x - arg1.stage.stageWidth / 2;
                    this.rectangleClipping.maxX = this.globalPoint.x + arg1.stage.stageWidth / 2;
                    this.rectangleClipping.minY = loc1 = this.globalPoint.y;
                    this.rectangleClipping.maxY = loc1 + arg1.stage.stageHeight;
                    break;
                }
                case flash.display.StageAlign.BOTTOM:
                {
                    this.zeroPoint.x = arg1.stage.stageWidth / 2;
                    this.zeroPoint.y = arg1.stage.stageHeight;
                    this.globalPoint = arg1.globalToLocal(this.zeroPoint);
                    this.rectangleClipping.minX = this.globalPoint.x - arg1.stage.stageWidth / 2;
                    this.rectangleClipping.maxX = this.globalPoint.x + arg1.stage.stageWidth / 2;
                    this.rectangleClipping.maxY = loc1 = this.globalPoint.y;
                    this.rectangleClipping.minY = loc1 - arg1.stage.stageHeight;
                    break;
                }
                case flash.display.StageAlign.LEFT:
                {
                    this.zeroPoint.x = 0;
                    this.zeroPoint.y = arg1.stage.stageHeight / 2;
                    this.globalPoint = arg1.globalToLocal(this.zeroPoint);
                    this.rectangleClipping.minX = loc1 = this.globalPoint.x;
                    this.rectangleClipping.maxX = loc1 + arg1.stage.stageWidth;
                    this.rectangleClipping.minY = this.globalPoint.y - arg1.stage.stageHeight / 2;
                    this.rectangleClipping.maxY = this.globalPoint.y + arg1.stage.stageHeight / 2;
                    break;
                }
                case flash.display.StageAlign.RIGHT:
                {
                    this.zeroPoint.x = arg1.stage.stageWidth;
                    this.zeroPoint.y = arg1.stage.stageHeight / 2;
                    this.globalPoint = arg1.globalToLocal(this.zeroPoint);
                    this.rectangleClipping.maxX = loc1 = this.globalPoint.x;
                    this.rectangleClipping.minX = loc1 - arg1.stage.stageWidth;
                    this.rectangleClipping.minY = this.globalPoint.y - arg1.stage.stageHeight / 2;
                    this.rectangleClipping.maxY = this.globalPoint.y + arg1.stage.stageHeight / 2;
                    break;
                }
                default:
                {
                    this.zeroPoint.x = arg1.stage.stageWidth / 2;
                    this.zeroPoint.y = arg1.stage.stageHeight / 2;
                    this.globalPoint = arg1.globalToLocal(this.zeroPoint);
                    this.rectangleClipping.minX = this.globalPoint.x - arg1.stage.stageWidth / 2;
                    this.rectangleClipping.maxX = this.globalPoint.x + arg1.stage.stageWidth / 2;
                    this.rectangleClipping.minY = this.globalPoint.y - arg1.stage.stageHeight / 2;
                    this.rectangleClipping.maxY = this.globalPoint.y + arg1.stage.stageHeight / 2;
                }
            }
            return this.rectangleClipping;
        }

        public function check(arg1:org.papervision3d.core.render.command.RenderableListItem):Boolean
        {
            return true;
        }

        public function asRectangleClipping():org.papervision3d.core.clipping.draw.RectangleClipping
        {
            if (!this.rectangleClipping)
            {
                this.rectangleClipping = new org.papervision3d.core.clipping.draw.RectangleClipping();
            }
            this.rectangleClipping.minX = -1000000;
            this.rectangleClipping.minY = -1000000;
            this.rectangleClipping.maxX = 1000000;
            this.rectangleClipping.maxY = 1000000;
            return this.rectangleClipping;
        }

        public var minX:Number=-1000000;

        public var minY:Number=-1000000;

        private var zeroPoint:flash.geom.Point;

        private var globalPoint:flash.geom.Point;

        private var rectangleClipping:org.papervision3d.core.clipping.draw.RectangleClipping;

        public var maxX:Number=1000000;

        public var maxY:Number=1000000;
    }
}


//            class RectangleClipping
package org.papervision3d.core.clipping.draw 
{
    import org.papervision3d.core.render.command.*;
    
    public class RectangleClipping extends org.papervision3d.core.clipping.draw.Clipping
    {
        public function RectangleClipping(arg1:Number=-1000000, arg2:Number=-1000000, arg3:Number=1000000, arg4:Number=1000000)
        {
            super();
            this.minX = arg1;
            this.maxX = arg3;
            this.minY = arg2;
            this.maxY = arg4;
            return;
        }

        public override function check(arg1:org.papervision3d.core.render.command.RenderableListItem):Boolean
        {
            if (arg1.maxX < minX)
            {
                return false;
            }
            if (arg1.minX > maxX)
            {
                return false;
            }
            if (arg1.maxY < minY)
            {
                return false;
            }
            if (arg1.minY > maxY)
            {
                return false;
            }
            return true;
        }

        public override function rect(arg1:Number, arg2:Number, arg3:Number, arg4:Number):Boolean
        {
            if (this.maxX < arg1)
            {
                return false;
            }
            if (this.minX > arg3)
            {
                return false;
            }
            if (this.maxY < arg2)
            {
                return false;
            }
            if (this.minY > arg4)
            {
                return false;
            }
            return true;
        }

        public function toString():String
        {
            return "{minX:" + minX + " maxX:" + maxX + " minY:" + minY + " maxY:" + maxY + "}";
        }

        public override function asRectangleClipping():org.papervision3d.core.clipping.draw.RectangleClipping
        {
            return this;
        }
    }
}


//          class DefaultClipping
package org.papervision3d.core.clipping 
{
    import org.papervision3d.core.geom.renderables.*;
    import org.papervision3d.core.proto.*;
    import org.papervision3d.core.render.data.*;
    import org.papervision3d.objects.*;
    
    public class DefaultClipping extends Object
    {
        public function DefaultClipping()
        {
            super();
            return;
        }

        public function testFace(arg1:org.papervision3d.core.geom.renderables.Triangle3D, arg2:org.papervision3d.objects.DisplayObject3D, arg3:org.papervision3d.core.render.data.RenderSessionData):Boolean
        {
            return false;
        }

        public function clipFace(arg1:org.papervision3d.core.geom.renderables.Triangle3D, arg2:org.papervision3d.objects.DisplayObject3D, arg3:org.papervision3d.core.proto.MaterialObject3D, arg4:org.papervision3d.core.render.data.RenderSessionData, arg5:Array):Number
        {
            return 0;
        }

        public function setDisplayObject(arg1:org.papervision3d.objects.DisplayObject3D, arg2:org.papervision3d.core.render.data.RenderSessionData):void
        {
            return;
        }

        public function reset(arg1:org.papervision3d.core.render.data.RenderSessionData):void
        {
            return;
        }
    }
}


//        package culling
//          class DefaultLineCuller
package org.papervision3d.core.culling 
{
    import org.papervision3d.core.geom.renderables.*;
    
    public class DefaultLineCuller extends Object implements org.papervision3d.core.culling.ILineCuller
    {
        public function DefaultLineCuller()
        {
            super();
            return;
        }

        public function testLine(arg1:org.papervision3d.core.geom.renderables.Line3D):Boolean
        {
            return arg1.v0.vertex3DInstance.visible && arg1.v1.vertex3DInstance.visible;
        }
    }
}


//          class DefaultParticleCuller
package org.papervision3d.core.culling 
{
    import org.papervision3d.core.geom.renderables.*;
    
    public class DefaultParticleCuller extends Object implements org.papervision3d.core.culling.IParticleCuller
    {
        public function DefaultParticleCuller()
        {
            super();
            return;
        }

        public function testParticle(arg1:org.papervision3d.core.geom.renderables.Particle):Boolean
        {
            if (arg1.material.invisible == false)
            {
                if (arg1.vertex3D.vertex3DInstance.visible == true)
                {
                    return true;
                }
            }
            return false;
        }
    }
}


//          class DefaultTriangleCuller
package org.papervision3d.core.culling 
{
    import org.papervision3d.core.geom.renderables.*;
    import org.papervision3d.core.proto.*;
    
    public class DefaultTriangleCuller extends Object implements org.papervision3d.core.culling.ITriangleCuller
    {
        public function DefaultTriangleCuller()
        {
            super();
            return;
        }

        public function testFace(arg1:org.papervision3d.core.geom.renderables.Triangle3D, arg2:org.papervision3d.core.geom.renderables.Vertex3DInstance, arg3:org.papervision3d.core.geom.renderables.Vertex3DInstance, arg4:org.papervision3d.core.geom.renderables.Vertex3DInstance):Boolean
        {
            var loc1:*;
            loc1 = null;
            if (arg2.visible && arg3.visible && arg4.visible)
            {
                if ((loc1 = arg1.material ? arg1.material : arg1.instance.material).invisible)
                {
                    return false;
                }
                x0 = arg2.x;
                y0 = arg2.y;
                x1 = arg3.x;
                y1 = arg3.y;
                x2 = arg4.x;
                y2 = arg4.y;
                if (loc1.oneSide)
                {
                    if (loc1.opposite)
                    {
                        if ((x2 - x0) * (y1 - y0) - (y2 - y0) * (x1 - x0) > 0)
                        {
                            return false;
                        }
                    }
                    else 
                    {
                        if ((x2 - x0) * (y1 - y0) - (y2 - y0) * (x1 - x0) < 0)
                        {
                            return false;
                        }
                    }
                }
                return true;
            }
            return false;
        }

        protected static var y2:Number;

        protected static var y1:Number;

        protected static var y0:Number;

        protected static var x0:Number;

        protected static var x1:Number;

        protected static var x2:Number;
    }
}


//          class FrustumCuller
package org.papervision3d.core.culling 
{
    import org.papervision3d.core.geom.renderables.*;
    import org.papervision3d.core.math.*;
    import org.papervision3d.objects.*;
    
    public class FrustumCuller extends Object implements org.papervision3d.core.culling.IObjectCuller
    {
        public function FrustumCuller()
        {
            super();
            this.transform = org.papervision3d.core.math.Matrix3D.IDENTITY;
            this.initialize();
            return;
        }

        public function get ratio():Number
        {
            return this._ratio;
        }

        public function pointInFrustum(arg1:Number, arg2:Number, arg3:Number):int
        {
            var loc1:*;
            loc1 = this.transform;
            var loc2:*;
            loc2 = arg1 - loc1.n14;
            var loc3:*;
            loc3 = arg2 - loc1.n24;
            var loc4:*;
            loc4 = arg3 - loc1.n34;
            var loc5:*;
            if ((loc5 = loc2 * loc1.n13 + loc3 * loc1.n23 + loc4 * loc1.n33) > this._far || loc5 < this._near)
            {
                return OUTSIDE;
            }
            var loc6:*;
            loc6 = loc2 * loc1.n12 + loc3 * loc1.n22 + loc4 * loc1.n32;
            var loc7:*;
            loc7 = loc5 * this._tang;
            if (loc6 > loc7 || loc6 < -loc7)
            {
                return OUTSIDE;
            }
            var loc8:*;
            loc8 = loc2 * loc1.n11 + loc3 * loc1.n21 + loc4 * loc1.n31;
            loc7 = loc7 * this._ratio;
            if (loc8 > loc7 || loc8 < -loc7)
            {
                return OUTSIDE;
            }
            return INSIDE;
        }

        public function get fov():Number
        {
            return this._fov;
        }

        public function set ratio(arg1:Number):void
        {
            this.initialize(this._fov, arg1, this._near, this._far);
            return;
        }

        public function set near(arg1:Number):void
        {
            this.initialize(this._fov, this._ratio, arg1, this._far);
            return;
        }

        public function set fov(arg1:Number):void
        {
            this.initialize(arg1, this._ratio, this._near, this._far);
            return;
        }

        public function get far():Number
        {
            return this._far;
        }

        public function initialize(arg1:Number=60, arg2:Number=1.333, arg3:Number=1, arg4:Number=5000):void
        {
            this._fov = arg1;
            this._ratio = arg2;
            this._near = arg3;
            this._far = arg4;
            var loc1:*;
            loc1 = Math.PI / 180 * this._fov * 0.5;
            this._tang = Math.tan(loc1);
            this._nh = this._near * this._tang;
            this._nw = this._nh * this._ratio;
            this._fh = this._far * this._tang;
            this._fw = this._fh * this._ratio;
            var loc2:*;
            loc2 = Math.atan(this._tang * this._ratio);
            this._sphereX = 1 / Math.cos(loc2);
            this._sphereY = 1 / Math.cos(loc1);
            return;
        }

        public function set far(arg1:Number):void
        {
            this.initialize(this._fov, this._ratio, this._near, arg1);
            return;
        }

        public function get near():Number
        {
            return this._near;
        }

        public function sphereInFrustum(arg1:org.papervision3d.objects.DisplayObject3D, arg2:org.papervision3d.core.math.BoundingSphere):int
        {
            var loc2:*;
            loc2 = NaN;
            var loc3:*;
            loc3 = NaN;
            var loc4:*;
            loc4 = NaN;
            var loc5:*;
            loc5 = NaN;
            var loc1:*;
            loc1 = arg2.radius * Math.max(arg1.scaleX, Math.max(arg1.scaleY, arg1.scaleZ));
            var loc6:*;
            loc6 = INSIDE;
            var loc7:*;
            loc7 = this.transform;
            var loc8:*;
            loc8 = arg1.world.n14 - loc7.n14;
            var loc9:*;
            loc9 = arg1.world.n24 - loc7.n24;
            var loc10:*;
            loc10 = arg1.world.n34 - loc7.n34;
            if ((loc5 = loc8 * loc7.n13 + loc9 * loc7.n23 + loc10 * loc7.n33) > this._far + loc1 || loc5 < this._near - loc1)
            {
                return OUTSIDE;
            }
            if (loc5 > this._far - loc1 || loc5 < this._near + loc1)
            {
                loc6 = INTERSECT;
            }
            loc4 = loc8 * loc7.n12 + loc9 * loc7.n22 + loc10 * loc7.n32;
            loc2 = this._sphereY * loc1;
            loc5 = loc5 * this._tang;
            if (loc4 > loc5 + loc2 || loc4 < -loc5 - loc2)
            {
                return OUTSIDE;
            }
            if (loc4 > loc5 - loc2 || loc4 < -loc5 + loc2)
            {
                loc6 = INTERSECT;
            }
            loc3 = loc8 * loc7.n11 + loc9 * loc7.n21 + loc10 * loc7.n31;
            loc5 = loc5 * this._ratio;
            loc2 = this._sphereX * loc1;
            if (loc3 > loc5 + loc2 || loc3 < -loc5 - loc2)
            {
                return OUTSIDE;
            }
            if (loc3 > loc5 - loc2 || loc3 < -loc5 + loc2)
            {
                loc6 = INTERSECT;
            }
            return loc6;
        }

        public function testObject(arg1:org.papervision3d.objects.DisplayObject3D):int
        {
            var loc1:*;
            loc1 = INSIDE;
            if (!arg1.geometry || !arg1.geometry.vertices || !arg1.geometry.vertices.length)
            {
                return loc1;
            }
            var loc2:*;
            loc2 = arg1.frustumTestMethod;
            switch (loc2) 
            {
                case org.papervision3d.core.culling.FrustumTestMethod.BOUNDING_SPHERE:
                {
                    loc1 = this.sphereInFrustum(arg1, arg1.geometry.boundingSphere);
                    break;
                }
                case org.papervision3d.core.culling.FrustumTestMethod.BOUNDING_BOX:
                {
                    loc1 = this.aabbInFrustum(arg1, arg1.geometry.aabb);
                    break;
                }
                case org.papervision3d.core.culling.FrustumTestMethod.NO_TESTING:
                {
                    break;
                }
                default:
                {
                    break;
                }
            }
            return loc1;
        }

        public function aabbInFrustum(arg1:org.papervision3d.objects.DisplayObject3D, arg2:org.papervision3d.core.math.AxisAlignedBoundingBox, arg3:Boolean=true):int
        {
            var loc1:*;
            loc1 = null;
            var loc2:*;
            loc2 = null;
            var loc3:*;
            loc3 = 0;
            var loc4:*;
            loc4 = 0;
            var loc5:*;
            loc5 = arg2.getBoxVertices();
            var loc6:*;
            loc6 = 0;
            var loc7:*;
            loc7 = loc5;
            for each (loc1 in loc7)
            {
                loc2 = loc1.toNumber3D();
                org.papervision3d.core.math.Matrix3D.multiplyVector(arg1.world, loc2);
                if (this.pointInFrustum(loc2.x, loc2.y, loc2.z) != INSIDE)
                {
                    ++loc4;
                }
                else 
                {
                    ++loc3;
                    if (arg3)
                    {
                        return INSIDE;
                    }
                }
                if (!(loc3 && loc4))
                {
                    continue;
                }
                return INTERSECT;
            }
            if (loc3)
            {
                return loc3 < 8 ? INTERSECT : INSIDE;
            }
            return OUTSIDE;
        }

        public static const OUTSIDE:int=-1;

        public static const INSIDE:int=1;

        public static const INTERSECT:int=0;

        private var _tang:Number;

        private var _near:Number;

        private var _ratio:Number;

        private var _fov:Number;

        private var _far:Number;

        private var _nh:Number;

        private var _fh:Number;

        private var _nw:Number;

        public var transform:org.papervision3d.core.math.Matrix3D;

        private var _sphereY:Number;

        private var _sphereX:Number;

        private var _fw:Number;
    }
}


//          class FrustumTestMethod
package org.papervision3d.core.culling 
{
    public class FrustumTestMethod extends Object
    {
        public function FrustumTestMethod()
        {
            super();
            return;
        }

        public static const BOUNDING_BOX:int=1;

        public static const NO_TESTING:int=-1;

        public static const BOUNDING_SPHERE:int=0;
    }
}


//          class ILineCuller
package org.papervision3d.core.culling 
{
    import org.papervision3d.core.geom.renderables.*;
    
    public interface ILineCuller
    {
        function testLine(arg1:org.papervision3d.core.geom.renderables.Line3D):Boolean;
    }
}


//          class IObjectCuller
package org.papervision3d.core.culling 
{
    import org.papervision3d.objects.*;
    
    public interface IObjectCuller
    {
        function testObject(arg1:org.papervision3d.objects.DisplayObject3D):int;
    }
}


//          class IParticleCuller
package org.papervision3d.core.culling 
{
    import org.papervision3d.core.geom.renderables.*;
    
    public interface IParticleCuller
    {
        function testParticle(arg1:org.papervision3d.core.geom.renderables.Particle):Boolean;
    }
}


//          class ITriangleCuller
package org.papervision3d.core.culling 
{
    import org.papervision3d.core.geom.renderables.*;
    
    public interface ITriangleCuller
    {
        function testFace(arg1:org.papervision3d.core.geom.renderables.Triangle3D, arg2:org.papervision3d.core.geom.renderables.Vertex3DInstance, arg3:org.papervision3d.core.geom.renderables.Vertex3DInstance, arg4:org.papervision3d.core.geom.renderables.Vertex3DInstance):Boolean;
    }
}


//          class RectangleLineCuller
package org.papervision3d.core.culling 
{
    import flash.geom.*;
    import org.papervision3d.core.geom.renderables.*;
    import org.papervision3d.core.math.util.*;
    
    public class RectangleLineCuller extends Object implements org.papervision3d.core.culling.ILineCuller
    {
        public function RectangleLineCuller(arg1:flash.geom.Rectangle=null)
        {
            super();
            if (arg1)
            {
                this.cullingRectangle = arg1;
            }
            this.lineBoundsRect = new flash.geom.Rectangle();
            this.rectIntersection = new flash.geom.Rectangle();
            return;
        }

        public function testLine(arg1:org.papervision3d.core.geom.renderables.Line3D):Boolean
        {
            if (!arg1.v0.vertex3DInstance.visible || !arg1.v1.vertex3DInstance.visible)
            {
                return false;
            }
            var loc1:*;
            loc1 = arg1.v0.vertex3DInstance.x;
            var loc2:*;
            loc2 = arg1.v0.vertex3DInstance.y;
            var loc3:*;
            loc3 = arg1.v1.vertex3DInstance.x;
            var loc4:*;
            loc4 = arg1.v1.vertex3DInstance.y;
            this.lineBoundsRect.width = Math.abs(loc3 - loc1);
            this.lineBoundsRect.height = Math.abs(loc4 - loc2);
            if (loc1 < loc3)
            {
                this.lineBoundsRect.x = loc1;
            }
            else 
            {
                this.lineBoundsRect.x = loc3;
            }
            if (loc2 < loc4)
            {
                this.lineBoundsRect.y = loc2;
            }
            else 
            {
                this.lineBoundsRect.y = loc4;
            }
            if (this.cullingRectangle.containsRect(this.lineBoundsRect))
            {
                return true;
            }
            if (!org.papervision3d.core.math.util.FastRectangleTools.intersects(this.lineBoundsRect, this.cullingRectangle))
            {
                return false;
            }
            this.rectIntersection = org.papervision3d.core.math.util.FastRectangleTools.intersection(this.lineBoundsRect, this.cullingRectangle);
            var loc5:*;
            loc5 = (loc4 - loc2) / (loc3 - loc1);
            var loc6:*;
            loc6 = loc2 - loc5 * loc1;
            var loc7:*;
            if ((loc7 = (this.cullingRectangle.top - loc6) / loc5) > this.rectIntersection.left && loc7 < this.rectIntersection.right)
            {
                return true;
            }
            if ((loc7 = (this.cullingRectangle.bottom - loc6) / loc5) > this.rectIntersection.left && loc7 < this.rectIntersection.right)
            {
                return true;
            }
            var loc8:*;
            if ((loc8 = loc5 * this.cullingRectangle.left + loc6) > this.rectIntersection.top && loc8 < this.rectIntersection.bottom)
            {
                return true;
            }
            if ((loc8 = loc5 * this.cullingRectangle.right + loc6) > this.rectIntersection.top && loc8 < this.rectIntersection.bottom)
            {
                return true;
            }
            return false;
        }

        private var lineBoundsRect:flash.geom.Rectangle;

        private var rectIntersection:flash.geom.Rectangle;

        private var cullingRectangle:flash.geom.Rectangle;
    }
}


//          class RectangleParticleCuller
package org.papervision3d.core.culling 
{
    import flash.geom.*;
    import org.papervision3d.core.geom.renderables.*;
    import org.papervision3d.core.math.util.*;
    
    public class RectangleParticleCuller extends Object implements org.papervision3d.core.culling.IParticleCuller
    {
        public function RectangleParticleCuller(arg1:flash.geom.Rectangle=null)
        {
            super();
            this.cullingRectangle = arg1;
            testPoint = new flash.geom.Point();
            return;
        }

        public function testParticle(arg1:org.papervision3d.core.geom.renderables.Particle):Boolean
        {
            vInstance = arg1.vertex3D.vertex3DInstance;
            if (arg1.material.invisible == false)
            {
                if (vInstance.visible)
                {
                    if (org.papervision3d.core.math.util.FastRectangleTools.intersects(arg1.renderRect, this.cullingRectangle))
                    {
                        return true;
                    }
                }
            }
            return false;
        }

        public var cullingRectangle:flash.geom.Rectangle;

        private static var vInstance:org.papervision3d.core.geom.renderables.Vertex3DInstance;

        private static var testPoint:flash.geom.Point;
    }
}


//          class RectangleTriangleCuller
package org.papervision3d.core.culling 
{
    import flash.geom.*;
    import org.papervision3d.core.geom.renderables.*;
    import org.papervision3d.core.math.util.*;
    
    public class RectangleTriangleCuller extends org.papervision3d.core.culling.DefaultTriangleCuller implements org.papervision3d.core.culling.ITriangleCuller
    {
        public function RectangleTriangleCuller(arg1:flash.geom.Rectangle=null)
        {
            this.cullingRectangle = new flash.geom.Rectangle(DEFAULT_RECT_X, DEFAULT_RECT_Y, DEFAULT_RECT_W, DEFAULT_RECT_H);
            super();
            if (arg1)
            {
                this.cullingRectangle = arg1;
            }
            return;
        }

        public override function testFace(arg1:org.papervision3d.core.geom.renderables.Triangle3D, arg2:org.papervision3d.core.geom.renderables.Vertex3DInstance, arg3:org.papervision3d.core.geom.renderables.Vertex3DInstance, arg4:org.papervision3d.core.geom.renderables.Vertex3DInstance):Boolean
        {
            if (super.testFace(arg1, arg2, arg3, arg4))
            {
                hitRect.x = Math.min(arg4.x, Math.min(arg3.x, arg2.x));
                hitRect.width = Math.max(arg4.x, Math.max(arg3.x, arg2.x)) + Math.abs(hitRect.x);
                hitRect.y = Math.min(arg4.y, Math.min(arg3.y, arg2.y));
                hitRect.height = Math.max(arg4.y, Math.max(arg3.y, arg2.y)) + Math.abs(hitRect.y);
                return org.papervision3d.core.math.util.FastRectangleTools.intersects(this.cullingRectangle, hitRect);
            }
            return false;
        }

        
        {
            hitRect = new flash.geom.Rectangle();
        }

        private static const DEFAULT_RECT_X:Number=-DEFAULT_RECT_W / 2;

        private static const DEFAULT_RECT_W:Number=640;

        private static const DEFAULT_RECT_H:Number=480;

        private static const DEFAULT_RECT_Y:Number=-DEFAULT_RECT_H / 2;

        public var cullingRectangle:flash.geom.Rectangle;

        private static var hitRect:flash.geom.Rectangle;
    }
}


//          class ViewportObjectFilter
package org.papervision3d.core.culling 
{
    import flash.utils.*;
    import org.papervision3d.objects.*;
    
    public class ViewportObjectFilter extends Object implements org.papervision3d.core.culling.IObjectCuller
    {
        public function ViewportObjectFilter(arg1:int)
        {
            super();
            this.mode = arg1;
            this.init();
            return;
        }

        public function addObject(arg1:org.papervision3d.objects.DisplayObject3D):void
        {
            this.objects[arg1] = arg1;
            return;
        }

        public function get mode():int
        {
            return this._mode;
        }

        public function set mode(arg1:int):void
        {
            this._mode = arg1;
            return;
        }

        public function removeObject(arg1:org.papervision3d.objects.DisplayObject3D):void
        {
            delete this.objects[arg1];
            return;
        }

        private function init():void
        {
            this.objects = new flash.utils.Dictionary(true);
            return;
        }

        public function testObject(arg1:org.papervision3d.objects.DisplayObject3D):int
        {
            if (this.objects[arg1])
            {
                return 1 - this._mode;
            }
            return this.mode;
        }

        public function destroy():void
        {
            this.objects = null;
            return;
        }

        protected var _mode:int;

        protected var objects:flash.utils.Dictionary;
    }
}


//        package data
//          class UserData
package org.papervision3d.core.data 
{
    public class UserData extends Object
    {
        public function UserData(arg1:*=null)
        {
            super();
            this.data = arg1;
            return;
        }

        public var data:*;
    }
}


//        package geom
//          package renderables
//            class AbstractRenderable
package org.papervision3d.core.geom.renderables 
{
    import org.papervision3d.core.data.*;
    import org.papervision3d.core.render.command.*;
    import org.papervision3d.objects.*;
    
    public class AbstractRenderable extends Object implements org.papervision3d.core.geom.renderables.IRenderable
    {
        public function AbstractRenderable()
        {
            super();
            return;
        }

        public function set userData(arg1:org.papervision3d.core.data.UserData):void
        {
            this._userData = arg1;
            return;
        }

        public function get userData():org.papervision3d.core.data.UserData
        {
            return this._userData;
        }

        public function getRenderListItem():org.papervision3d.core.render.command.IRenderListItem
        {
            return null;
        }

        public var _userData:org.papervision3d.core.data.UserData;

        public var instance:org.papervision3d.objects.DisplayObject3D;
    }
}


//            class IRenderable
package org.papervision3d.core.geom.renderables 
{
    import org.papervision3d.core.render.command.*;
    
    public interface IRenderable
    {
        function getRenderListItem():org.papervision3d.core.render.command.IRenderListItem;
    }
}


//            class Line3D
package org.papervision3d.core.geom.renderables 
{
    import org.papervision3d.core.geom.*;
    import org.papervision3d.core.render.command.*;
    import org.papervision3d.materials.special.*;
    
    public class Line3D extends org.papervision3d.core.geom.renderables.AbstractRenderable implements org.papervision3d.core.geom.renderables.IRenderable
    {
        public function Line3D(arg1:org.papervision3d.core.geom.Lines3D, arg2:org.papervision3d.materials.special.LineMaterial, arg3:Number, arg4:org.papervision3d.core.geom.renderables.Vertex3D, arg5:org.papervision3d.core.geom.renderables.Vertex3D)
        {
            super();
            this.size = arg3;
            this.material = arg2;
            this.v0 = arg4;
            this.v1 = arg5;
            this.cV = arg5;
            this.instance = arg1;
            this.renderCommand = new org.papervision3d.core.render.command.RenderLine(this);
            return;
        }

        public function addControlVertex(arg1:Number, arg2:Number, arg3:Number):void
        {
            this.cV = new org.papervision3d.core.geom.renderables.Vertex3D(arg1, arg2, arg3);
            if (instance.geometry.vertices.indexOf(this.cV) == -1)
            {
                instance.geometry.vertices.push(this.cV);
            }
            this.renderCommand.cV = this.cV.vertex3DInstance;
            return;
        }

        public override function getRenderListItem():org.papervision3d.core.render.command.IRenderListItem
        {
            return this.renderCommand;
        }

        public var size:Number;

        public var material:org.papervision3d.materials.special.LineMaterial;

        public var cV:org.papervision3d.core.geom.renderables.Vertex3D;

        public var renderCommand:org.papervision3d.core.render.command.RenderLine;

        public var v0:org.papervision3d.core.geom.renderables.Vertex3D;

        public var v1:org.papervision3d.core.geom.renderables.Vertex3D;
    }
}


//            class Particle
package org.papervision3d.core.geom.renderables 
{
    import flash.geom.*;
    import org.papervision3d.core.render.command.*;
    import org.papervision3d.materials.special.*;
    
    public class Particle extends org.papervision3d.core.geom.renderables.AbstractRenderable implements org.papervision3d.core.geom.renderables.IRenderable
    {
        public function Particle(arg1:org.papervision3d.materials.special.ParticleMaterial, arg2:Number=1, arg3:Number=0, arg4:Number=0, arg5:Number=0)
        {
            super();
            this.material = arg1;
            this.size = arg2;
            this.renderCommand = new org.papervision3d.core.render.command.RenderParticle(this);
            this.renderRect = new flash.geom.Rectangle();
            this.vertex3D = new org.papervision3d.core.geom.renderables.Vertex3D(arg3, arg4, arg5);
            this.drawMatrix = new flash.geom.Matrix();
            return;
        }

        public function updateRenderRect():void
        {
            this.material.updateRenderRect(this);
            return;
        }

        public function set x(arg1:Number):void
        {
            this.vertex3D.x = arg1;
            return;
        }

        public function set y(arg1:Number):void
        {
            this.vertex3D.y = arg1;
            return;
        }

        public function set z(arg1:Number):void
        {
            this.vertex3D.z = arg1;
            return;
        }

        public function get y():Number
        {
            return this.vertex3D.y;
        }

        public function get z():Number
        {
            return this.vertex3D.z;
        }

        public override function getRenderListItem():org.papervision3d.core.render.command.IRenderListItem
        {
            return this.renderCommand;
        }

        public function get x():Number
        {
            return this.vertex3D.x;
        }

        public var size:Number;

        public var renderScale:Number;

        public var vertex3D:org.papervision3d.core.geom.renderables.Vertex3D;

        public var renderRect:flash.geom.Rectangle;

        public var rotationZ:Number=0;

        public var renderCommand:org.papervision3d.core.render.command.RenderParticle;

        public var drawMatrix:flash.geom.Matrix;

        public var material:org.papervision3d.materials.special.ParticleMaterial;
    }
}


//            class Triangle3D
package org.papervision3d.core.geom.renderables 
{
    import org.papervision3d.core.math.*;
    import org.papervision3d.core.proto.*;
    import org.papervision3d.core.render.command.*;
    import org.papervision3d.materials.*;
    import org.papervision3d.materials.special.*;
    import org.papervision3d.objects.*;
    
    public class Triangle3D extends org.papervision3d.core.geom.renderables.AbstractRenderable implements org.papervision3d.core.geom.renderables.IRenderable
    {
        public function Triangle3D(arg1:org.papervision3d.objects.DisplayObject3D, arg2:Array, arg3:org.papervision3d.core.proto.MaterialObject3D=null, arg4:Array=null)
        {
            super();
            this.instance = arg1;
            this.faceNormal = new org.papervision3d.core.math.Number3D();
            if (arg2 && arg2.length == 3)
            {
                this.vertices = arg2;
                this.v0 = arg2[0];
                this.v1 = arg2[1];
                this.v2 = arg2[2];
                this.createNormal();
            }
            else 
            {
                arg2 = new Array();
                var loc1:*;
                arg2[0] = loc1 = new org.papervision3d.core.geom.renderables.Vertex3D();
                this.v0 = loc1;
                arg2[1] = loc1 = new org.papervision3d.core.geom.renderables.Vertex3D();
                this.v1 = loc1;
                arg2[2] = loc1 = new org.papervision3d.core.geom.renderables.Vertex3D();
                this.v2 = loc1;
            }
            this.material = arg3;
            this.uv = arg4;
            var loc2:*;
            this.id = _totalFaces++;
            this.renderCommand = new org.papervision3d.core.render.command.RenderTriangle(this);
            return;
        }

        public function set uv(arg1:Array):void
        {
            if (arg1 && arg1.length == 3)
            {
                this.uv0 = org.papervision3d.core.math.NumberUV(arg1[0]);
                this.uv1 = org.papervision3d.core.math.NumberUV(arg1[1]);
                this.uv2 = org.papervision3d.core.math.NumberUV(arg1[2]);
            }
            this._uvArray = arg1;
            return;
        }

        public function createNormal():void
        {
            var loc1:*;
            loc1 = this.v0.getPosition();
            var loc2:*;
            loc2 = this.v1.getPosition();
            var loc3:*;
            loc3 = this.v2.getPosition();
            loc2.minusEq(loc1);
            loc3.minusEq(loc1);
            this.faceNormal = org.papervision3d.core.math.Number3D.cross(loc2, loc3, this.faceNormal);
            this.faceNormal.normalize();
            return;
        }

        public override function getRenderListItem():org.papervision3d.core.render.command.IRenderListItem
        {
            return this.renderCommand;
        }

        public function reset(arg1:org.papervision3d.objects.DisplayObject3D, arg2:Array, arg3:org.papervision3d.core.proto.MaterialObject3D, arg4:Array):void
        {
            var loc1:*;
            loc1 = null;
            this.instance = arg1;
            this.renderCommand.instance = arg1;
            this.renderCommand.renderer = arg3;
            this.vertices = arg2;
            this.updateVertices();
            this.material = arg3;
            this.uv = arg4;
            if (arg3 as org.papervision3d.materials.BitmapMaterial)
            {
                org.papervision3d.materials.BitmapMaterial(arg3).uvMatrices[this.renderCommand] = null;
            }
            if (arg3 as org.papervision3d.materials.special.CompositeMaterial)
            {
                var loc2:*;
                loc2 = 0;
                var loc3:*;
                loc3 = org.papervision3d.materials.special.CompositeMaterial(arg3).materials;
                for each (loc1 in loc3)
                {
                    if (!(loc1 as org.papervision3d.materials.BitmapMaterial))
                    {
                        continue;
                    }
                    org.papervision3d.materials.BitmapMaterial(loc1).uvMatrices[this.renderCommand] = null;
                }
            }
            return;
        }

        public function get uv():Array
        {
            return this._uvArray;
        }

        public function updateVertices():void
        {
            this.v0 = this.vertices[0];
            this.v1 = this.vertices[1];
            this.v2 = this.vertices[2];
            return;
        }

        
        {
            _totalFaces = 0;
        }

        public var _uvArray:Array;

        public var renderCommand:org.papervision3d.core.render.command.RenderTriangle;

        public var id:Number;

        public var material:org.papervision3d.core.proto.MaterialObject3D;

        public var faceNormal:org.papervision3d.core.math.Number3D;

        public var screenZ:Number;

        public var uv0:org.papervision3d.core.math.NumberUV;

        public var uv1:org.papervision3d.core.math.NumberUV;

        public var _materialName:String;

        public var visible:Boolean;

        public var uv2:org.papervision3d.core.math.NumberUV;

        public var vertices:Array;

        public var v0:org.papervision3d.core.geom.renderables.Vertex3D;

        public var v1:org.papervision3d.core.geom.renderables.Vertex3D;

        public var v2:org.papervision3d.core.geom.renderables.Vertex3D;

        private static var _totalFaces:Number=0;
    }
}


//            class Triangle3DInstance
package org.papervision3d.core.geom.renderables 
{
    import flash.display.*;
    import org.papervision3d.core.math.*;
    import org.papervision3d.objects.*;
    
    public class Triangle3DInstance extends Object
    {
        public function Triangle3DInstance(arg1:org.papervision3d.core.geom.renderables.Triangle3D, arg2:org.papervision3d.objects.DisplayObject3D)
        {
            super();
            this.instance = arg2;
            this.faceNormal = new org.papervision3d.core.math.Number3D();
            return;
        }

        public var container:flash.display.Sprite;

        public var instance:org.papervision3d.objects.DisplayObject3D;

        public var visible:Boolean=false;

        public var faceNormal:org.papervision3d.core.math.Number3D;

        public var screenZ:Number;
    }
}


//            class Vertex3D
package org.papervision3d.core.geom.renderables 
{
    import flash.utils.*;
    import org.papervision3d.core.math.*;
    import org.papervision3d.core.render.command.*;
    
    public class Vertex3D extends org.papervision3d.core.geom.renderables.AbstractRenderable implements org.papervision3d.core.geom.renderables.IRenderable
    {
        public function Vertex3D(arg1:Number=0, arg2:Number=0, arg3:Number=0)
        {
            this.position = new org.papervision3d.core.math.Number3D();
            super();
            var loc1:*;
            this.position.x = loc1 = arg1;
            this.x = loc1;
            this.position.y = loc1 = arg2;
            this.y = loc1;
            this.position.z = loc1 = arg3;
            this.z = loc1;
            this.vertex3DInstance = new org.papervision3d.core.geom.renderables.Vertex3DInstance();
            this.normal = new org.papervision3d.core.math.Number3D();
            this.connectedFaces = new flash.utils.Dictionary();
            return;
        }

        public function perspective(arg1:Number):org.papervision3d.core.geom.renderables.Vertex3DInstance
        {
            this.persp = 1 / (1 + this.z / arg1);
            return new org.papervision3d.core.geom.renderables.Vertex3DInstance(this.x * this.persp, this.y * this.persp, this.z);
        }

        public function toNumber3D():org.papervision3d.core.math.Number3D
        {
            return new org.papervision3d.core.math.Number3D(this.x, this.y, this.z);
        }

        public function clone():org.papervision3d.core.geom.renderables.Vertex3D
        {
            var loc1:*;
            loc1 = new org.papervision3d.core.geom.renderables.Vertex3D(this.x, this.y, this.z);
            loc1.extra = this.extra;
            loc1.vertex3DInstance = this.vertex3DInstance.clone();
            loc1.normal = this.normal.clone();
            return loc1;
        }

        public function getPosition():org.papervision3d.core.math.Number3D
        {
            this.position.x = this.x;
            this.position.y = this.y;
            this.position.z = this.z;
            return this.position;
        }

        public function calculateNormal():void
        {
            var loc1:*;
            loc1 = null;
            var loc2:*;
            loc2 = NaN;
            var loc3:*;
            loc3 = null;
            loc2 = 0;
            this.normal.reset();
            var loc4:*;
            loc4 = 0;
            var loc5:*;
            loc5 = this.connectedFaces;
            for each (loc1 in loc5)
            {
                if (!loc1.faceNormal)
                {
                    continue;
                }
                loc2 = (loc2 + 1);
                this.normal.plusEq(loc1.faceNormal);
            }
            loc3 = this.getPosition();
            loc3.x = loc3.x / loc2;
            loc3.y = loc3.y / loc2;
            loc3.z = loc3.z / loc2;
            loc3.normalize();
            this.normal.plusEq(loc3);
            this.normal.normalize();
            return;
        }

        public override function getRenderListItem():org.papervision3d.core.render.command.IRenderListItem
        {
            return null;
        }

        public static function weighted(arg1:org.papervision3d.core.geom.renderables.Vertex3D, arg2:org.papervision3d.core.geom.renderables.Vertex3D, arg3:Number, arg4:Number):org.papervision3d.core.geom.renderables.Vertex3D
        {
            var loc1:*;
            loc1 = arg3 + arg4;
            var loc2:*;
            loc2 = arg3 / loc1;
            var loc3:*;
            loc3 = arg4 / loc1;
            return new Vertex3D(arg1.x * loc2 + arg2.x * loc3, arg1.y * loc2 + arg2.y * loc3, arg1.z * loc2 + arg2.z * loc3);
        }

        public var z:Number;

        public var vertex3DInstance:org.papervision3d.core.geom.renderables.Vertex3DInstance;

        public var extra:Object;

        public var timestamp:Number;

        public var normal:org.papervision3d.core.math.Number3D;

        protected var position:org.papervision3d.core.math.Number3D;

        public var connectedFaces:flash.utils.Dictionary;

        public var x:Number;

        public var y:Number;

        private var persp:Number=0;
    }
}


//            class Vertex3DInstance
package org.papervision3d.core.geom.renderables 
{
    import org.papervision3d.core.math.*;
    
    public class Vertex3DInstance extends Object
    {
        public function Vertex3DInstance(arg1:Number=0, arg2:Number=0, arg3:Number=0)
        {
            super();
            this.x = arg1;
            this.y = arg2;
            this.z = arg3;
            this.visible = false;
            this.normal = new org.papervision3d.core.math.Number3D();
            return;
        }

        public function deperspective(arg1:Number):org.papervision3d.core.geom.renderables.Vertex3D
        {
            this.persp = 1 + this.z / arg1;
            return new org.papervision3d.core.geom.renderables.Vertex3D(this.x * this.persp, this.y * this.persp, this.z);
        }

        public function distance(arg1:org.papervision3d.core.geom.renderables.Vertex3DInstance):Number
        {
            return Math.sqrt((this.x - arg1.x) * (this.x - arg1.x) + (this.y - arg1.y) * (this.y - arg1.y));
        }

        public function clone():org.papervision3d.core.geom.renderables.Vertex3DInstance
        {
            var loc1:*;
            loc1 = new org.papervision3d.core.geom.renderables.Vertex3DInstance(this.x, this.y, this.z);
            loc1.visible = this.visible;
            loc1.extra = this.extra;
            return loc1;
        }

        public function distanceSqr(arg1:org.papervision3d.core.geom.renderables.Vertex3DInstance):Number
        {
            return (this.x - arg1.x) * (this.x - arg1.x) + (this.y - arg1.y) * (this.y - arg1.y);
        }

        public static function cross(arg1:org.papervision3d.core.geom.renderables.Vertex3DInstance, arg2:org.papervision3d.core.geom.renderables.Vertex3DInstance):Number
        {
            return arg1.x * arg2.y - arg2.x * arg1.y;
        }

        public static function dot(arg1:org.papervision3d.core.geom.renderables.Vertex3DInstance, arg2:org.papervision3d.core.geom.renderables.Vertex3DInstance):Number
        {
            return arg1.x * arg2.x + arg1.y * arg2.y;
        }

        public static function subTo(arg1:org.papervision3d.core.geom.renderables.Vertex3DInstance, arg2:org.papervision3d.core.geom.renderables.Vertex3DInstance, arg3:org.papervision3d.core.geom.renderables.Vertex3DInstance):void
        {
            arg3.x = arg2.x - arg1.x;
            arg3.y = arg2.y - arg1.y;
            return;
        }

        public static function median(arg1:org.papervision3d.core.geom.renderables.Vertex3DInstance, arg2:org.papervision3d.core.geom.renderables.Vertex3DInstance, arg3:Number):org.papervision3d.core.geom.renderables.Vertex3DInstance
        {
            var loc1:*;
            loc1 = (arg1.z + arg2.z) / 2;
            var loc2:*;
            loc2 = arg3 + arg1.z;
            var loc3:*;
            loc3 = arg3 + arg2.z;
            var loc4:*;
            loc4 = 1 / (arg3 + loc1) / 2;
            return new Vertex3DInstance((arg1.x * loc2 + arg2.x * loc3) * loc4, (arg1.y * loc2 + arg2.y * loc3) * loc4, loc1);
        }

        public static function sub(arg1:org.papervision3d.core.geom.renderables.Vertex3DInstance, arg2:org.papervision3d.core.geom.renderables.Vertex3DInstance):org.papervision3d.core.geom.renderables.Vertex3DInstance
        {
            return new Vertex3DInstance(arg2.x - arg1.x, arg2.y - arg1.y);
        }

        public var y:Number;

        private var persp:Number=0;

        public var normal:org.papervision3d.core.math.Number3D;

        public var visible:Boolean;

        public var extra:Object;

        public var x:Number;

        public var z:Number;
    }
}


//          class Lines3D
package org.papervision3d.core.geom 
{
    import org.papervision3d.core.geom.renderables.*;
    import org.papervision3d.core.log.*;
    import org.papervision3d.core.render.command.*;
    import org.papervision3d.core.render.data.*;
    import org.papervision3d.core.render.draw.*;
    import org.papervision3d.materials.special.*;
    import org.papervision3d.objects.*;
    
    public class Lines3D extends org.papervision3d.core.geom.Vertices3D
    {
        public function Lines3D(arg1:org.papervision3d.materials.special.LineMaterial=null, arg2:String=null)
        {
            super(null, arg2);
            if (arg1)
            {
                this.material = arg1;
            }
            else 
            {
                this.material = new org.papervision3d.materials.special.LineMaterial();
            }
            this.init();
            return;
        }

        private function init():void
        {
            this.lines = new Array();
            return;
        }

        public function removeAllLines():void
        {
            while (this.lines.length > 0) 
            {
                this.removeLine(this.lines[0]);
            }
            return;
        }

        public function addLine(arg1:org.papervision3d.core.geom.renderables.Line3D):void
        {
            this.lines.push(arg1);
            arg1.instance = this;
            if (geometry.vertices.indexOf(arg1.v0) == -1)
            {
                geometry.vertices.push(arg1.v0);
            }
            if (geometry.vertices.indexOf(arg1.v1) == -1)
            {
                geometry.vertices.push(arg1.v1);
            }
            if (arg1.cV)
            {
                if (geometry.vertices.indexOf(arg1.cV) == -1)
                {
                    geometry.vertices.push(arg1.cV);
                }
            }
            return;
        }

        public function addNewSegmentedLine(arg1:Number, arg2:Number, arg3:Number, arg4:Number, arg5:Number, arg6:Number, arg7:Number, arg8:Number):Array
        {
            var loc5:*;
            loc5 = null;
            var loc7:*;
            loc7 = null;
            var loc1:*;
            loc1 = (arg6 - arg3) / arg2;
            var loc2:*;
            loc2 = (arg7 - arg4) / arg2;
            var loc3:*;
            loc3 = (arg8 - arg5) / arg2;
            var loc4:*;
            loc4 = new Array();
            var loc6:*;
            loc6 = new org.papervision3d.core.geom.renderables.Vertex3D(arg3, arg4, arg5);
            var loc8:*;
            loc8 = 0;
            while (loc8 <= arg2) 
            {
                loc7 = new org.papervision3d.core.geom.renderables.Vertex3D(arg3 + loc1 * loc8, arg4 + loc2 * loc8, arg5 + loc3 * loc8);
                loc5 = new org.papervision3d.core.geom.renderables.Line3D(this, material as org.papervision3d.materials.special.LineMaterial, arg1, loc6, loc7);
                this.addLine(loc5);
                loc4.push(loc5);
                loc6 = loc7;
                loc8 = (loc8 + 1);
            }
            return loc4;
        }

        public function removeLine(arg1:org.papervision3d.core.geom.renderables.Line3D):void
        {
            var loc1:*;
            loc1 = this.lines.indexOf(arg1);
            if (loc1 > -1)
            {
                this.lines.splice(loc1, 1);
            }
            else 
            {
                org.papervision3d.core.log.PaperLogger.warning("Papervision3D Lines3D.removeLine : WARNING removal of non-existant line attempted. ");
            }
            return;
        }

        public override function project(arg1:org.papervision3d.objects.DisplayObject3D, arg2:org.papervision3d.core.render.data.RenderSessionData):Number
        {
            var loc1:*;
            loc1 = null;
            var loc2:*;
            loc2 = NaN;
            var loc3:*;
            loc3 = null;
            super.project(arg1, arg2);
            var loc4:*;
            loc4 = 0;
            var loc5:*;
            loc5 = this.lines;
            for each (loc1 in loc5)
            {
                if (!arg2.viewPort.lineCuller.testLine(loc1))
                {
                    continue;
                }
                (loc3 = loc1.renderCommand).renderer = loc1.material;
                loc3.size = loc1.size;
                var loc6:*;
                loc3.screenZ = loc6 = (loc1.v0.vertex3DInstance.z + loc1.v1.vertex3DInstance.z) / 2;
                loc2 = loc2 + loc6;
                loc3.v0 = loc1.v0.vertex3DInstance;
                loc3.v1 = loc1.v1.vertex3DInstance;
                arg2.renderer.addToRenderList(loc3);
            }
            return loc2 / (this.lines.length + 1);
        }

        public function addNewLine(arg1:Number, arg2:Number, arg3:Number, arg4:Number, arg5:Number, arg6:Number, arg7:Number):org.papervision3d.core.geom.renderables.Line3D
        {
            var loc1:*;
            loc1 = new org.papervision3d.core.geom.renderables.Line3D(this, material as org.papervision3d.materials.special.LineMaterial, arg1, new org.papervision3d.core.geom.renderables.Vertex3D(arg2, arg3, arg4), new org.papervision3d.core.geom.renderables.Vertex3D(arg5, arg6, arg7));
            this.addLine(loc1);
            return loc1;
        }

        private var _material:org.papervision3d.core.render.draw.ILineDrawer;

        public var lines:Array;
    }
}


//          class TriangleMesh3D
package org.papervision3d.core.geom 
{
    import flash.utils.*;
    import org.papervision3d.core.culling.*;
    import org.papervision3d.core.geom.renderables.*;
    import org.papervision3d.core.math.*;
    import org.papervision3d.core.proto.*;
    import org.papervision3d.core.render.command.*;
    import org.papervision3d.core.render.data.*;
    import org.papervision3d.core.render.draw.*;
    import org.papervision3d.objects.*;
    
    public class TriangleMesh3D extends org.papervision3d.core.geom.Vertices3D
    {
        public function TriangleMesh3D(arg1:org.papervision3d.core.proto.MaterialObject3D, arg2:Array, arg3:Array, arg4:String=null)
        {
            this._dtStore = new Array();
            this._dtActive = new Array();
            super(arg2, arg4);
            this.geometry.faces = arg3 || new Array();
            this.material = arg1 || org.papervision3d.core.proto.MaterialObject3D.DEFAULT;
            return;
        }

        public function projectTexture(arg1:String="x", arg2:String="y"):void
        {
            var loc8:*;
            loc8 = null;
            var loc9:*;
            loc9 = null;
            var loc10:*;
            loc10 = null;
            var loc11:*;
            loc11 = null;
            var loc12:*;
            loc12 = null;
            var loc13:*;
            loc13 = null;
            var loc14:*;
            loc14 = null;
            var loc15:*;
            loc15 = null;
            var loc16:*;
            loc16 = null;
            var loc1:*;
            loc1 = this.geometry.faces;
            var loc2:*;
            var loc3:*;
            loc3 = (loc2 = this.boundingBox()).min[arg1];
            var loc4:*;
            loc4 = loc2.size[arg1];
            var loc5:*;
            loc5 = loc2.min[arg2];
            var loc6:*;
            loc6 = loc2.size[arg2];
            var loc7:*;
            loc7 = this.material;
            var loc17:*;
            loc17 = 0;
            var loc18:*;
            loc18 = loc1;
            for (loc8 in loc18)
            {
                loc11 = (loc10 = (loc9 = loc1[Number(loc8)]).vertices)[0];
                loc12 = loc10[1];
                loc13 = loc10[2];
                loc14 = new org.papervision3d.core.math.NumberUV((loc11[arg1] - loc3) / loc4, (loc11[arg2] - loc5) / loc6);
                loc15 = new org.papervision3d.core.math.NumberUV((loc12[arg1] - loc3) / loc4, (loc12[arg2] - loc5) / loc6);
                loc16 = new org.papervision3d.core.math.NumberUV((loc13[arg1] - loc3) / loc4, (loc13[arg2] - loc5) / loc6);
                loc9.uv = [loc14, loc15, loc16];
            }
            return;
        }

        public function quarterFaces():void
        {
            var loc4:*;
            loc4 = null;
            var loc6:*;
            loc6 = null;
            var loc7:*;
            loc7 = null;
            var loc8:*;
            loc8 = null;
            var loc9:*;
            loc9 = null;
            var loc10:*;
            loc10 = null;
            var loc11:*;
            loc11 = null;
            var loc12:*;
            loc12 = null;
            var loc13:*;
            loc13 = null;
            var loc14:*;
            loc14 = null;
            var loc15:*;
            loc15 = null;
            var loc16:*;
            loc16 = null;
            var loc17:*;
            loc17 = null;
            var loc18:*;
            loc18 = null;
            var loc19:*;
            loc19 = null;
            var loc20:*;
            loc20 = null;
            var loc21:*;
            loc21 = null;
            var loc1:*;
            loc1 = new Array();
            var loc2:*;
            loc2 = new Array();
            var loc3:*;
            loc3 = this.geometry.faces;
            var loc5:*;
            loc5 = loc3.length;
            for (;;) 
            {
                var loc22:*;
                loc4 = loc22 = loc3[--loc5];
                if (!loc22)
                {
                    break;
                }
                loc6 = loc4.v0;
                loc7 = loc4.v1;
                loc8 = loc4.v2;
                loc9 = new org.papervision3d.core.geom.renderables.Vertex3D((loc6.x + loc7.x) / 2, (loc6.y + loc7.y) / 2, (loc6.z + loc7.z) / 2);
                loc10 = new org.papervision3d.core.geom.renderables.Vertex3D((loc7.x + loc8.x) / 2, (loc7.y + loc8.y) / 2, (loc7.z + loc8.z) / 2);
                loc11 = new org.papervision3d.core.geom.renderables.Vertex3D((loc8.x + loc6.x) / 2, (loc8.y + loc6.y) / 2, (loc8.z + loc6.z) / 2);
                this.geometry.vertices.push(loc9, loc10, loc11);
                loc12 = loc4.uv[0];
                loc13 = loc4.uv[1];
                loc14 = loc4.uv[2];
                loc15 = new org.papervision3d.core.math.NumberUV((loc12.u + loc13.u) / 2, (loc12.v + loc13.v) / 2);
                loc16 = new org.papervision3d.core.math.NumberUV((loc13.u + loc14.u) / 2, (loc13.v + loc14.v) / 2);
                loc17 = new org.papervision3d.core.math.NumberUV((loc14.u + loc12.u) / 2, (loc14.v + loc12.v) / 2);
                loc18 = new org.papervision3d.core.geom.renderables.Triangle3D(this, [loc6, loc9, loc11], loc4.material, [loc12, loc15, loc17]);
                loc19 = new org.papervision3d.core.geom.renderables.Triangle3D(this, [loc9, loc7, loc10], loc4.material, [loc15, loc13, loc16]);
                loc20 = new org.papervision3d.core.geom.renderables.Triangle3D(this, [loc11, loc10, loc8], loc4.material, [loc17, loc16, loc14]);
                loc21 = new org.papervision3d.core.geom.renderables.Triangle3D(this, [loc9, loc10, loc11], loc4.material, [loc15, loc16, loc17]);
                loc2.push(loc18, loc19, loc20, loc21);
            }
            this.geometry.faces = loc2;
            this.mergeVertices();
            this.geometry.ready = true;
            return;
        }

        public override function set material(arg1:org.papervision3d.core.proto.MaterialObject3D):void
        {
            var loc1:*;
            loc1 = null;
            super.material = arg1;
            var loc2:*;
            loc2 = 0;
            var loc3:*;
            loc3 = geometry.faces;
            for each (loc1 in loc3)
            {
                loc1.material = arg1;
            }
            return;
        }

        public function mergeVertices():void
        {
            var loc3:*;
            loc3 = null;
            var loc4:*;
            loc4 = null;
            var loc5:*;
            loc5 = null;
            var loc1:*;
            loc1 = new flash.utils.Dictionary();
            var loc2:*;
            loc2 = new Array();
            var loc6:*;
            loc6 = 0;
            var loc7:*;
            loc7 = this.geometry.vertices;
            for each (loc3 in loc7)
            {
                var loc8:*;
                loc8 = 0;
                var loc9:*;
                loc9 = loc1;
                for each (loc5 in loc9)
                {
                    if (!(loc3.x == loc5.x && loc3.y == loc5.y && loc3.z == loc5.z))
                    {
                        continue;
                    }
                    loc1[loc3] = loc5;
                    break;
                }
                if (loc1[loc3])
                {
                    continue;
                }
                loc1[loc3] = loc3;
                loc2.push(loc3);
            }
            this.geometry.vertices = loc2;
            loc6 = 0;
            loc7 = geometry.faces;
            for each (loc4 in loc7)
            {
                loc4.vertices[0] = loc8 = loc1[loc4.v0];
                loc4.v0 = loc8;
                loc4.vertices[1] = loc8 = loc1[loc4.v1];
                loc4.v1 = loc8;
                loc4.vertices[2] = loc8 = loc1[loc4.v2];
                loc4.v2 = loc8;
            }
            return;
        }

        public override function project(arg1:org.papervision3d.objects.DisplayObject3D, arg2:org.papervision3d.core.render.data.RenderSessionData):Number
        {
            var loc3:*;
            loc3 = null;
            var loc4:*;
            loc4 = null;
            var loc5:*;
            loc5 = NaN;
            var loc6:*;
            loc6 = NaN;
            var loc7:*;
            loc7 = null;
            var loc8:*;
            loc8 = null;
            var loc9:*;
            loc9 = null;
            var loc10:*;
            loc10 = null;
            var loc11:*;
            loc11 = null;
            var loc12:*;
            loc12 = null;
            var loc13:*;
            loc13 = null;
            var loc14:*;
            loc14 = null;
            this._dtStore = [];
            this._dtActive = new Array();
            var loc1:*;
            loc1 = this.geometry.vertices.length;
            var loc2:*;
            loc2 = [];
            if (arg2.clipping && this.useClipping && !this.culled && (arg2.camera.useCulling ? cullTest == 0 : true))
            {
                super.projectEmpty(arg1, arg2);
                arg2.clipping.setDisplayObject(this, arg2);
                var loc15:*;
                loc15 = 0;
                var loc16:*;
                loc16 = this.geometry.faces;
                for each (loc3 in loc16)
                {
                    if (arg2.clipping.testFace(loc3, this, arg2))
                    {
                        arg2.clipping.clipFace(loc3, this, loc13, arg2, loc2);
                        continue;
                    }
                    loc2.push(loc3);
                }
                super.project(arg1, arg2);
                arg2.camera.projectFaces(loc2, this, arg2);
            }
            else 
            {
                super.project(arg1, arg2);
                loc2 = this.geometry.faces;
            }
            if (!this.culled)
            {
                loc4 = this.geometry.faces;
                loc5 = 0;
                loc6 = 0;
                loc7 = arg2.triangleCuller;
                loc15 = 0;
                loc16 = loc2;
                for each (loc12 in loc16)
                {
                    loc13 = loc12.material ? loc12.material : material;
                    loc8 = loc12.v0.vertex3DInstance;
                    loc9 = loc12.v1.vertex3DInstance;
                    loc10 = loc12.v2.vertex3DInstance;
                    if (loc7.testFace(loc12, loc8, loc9, loc10))
                    {
                        loc14 = loc12.renderCommand;
                        var loc17:*;
                        loc14.screenZ = loc17 = this.setScreenZ(meshSort, loc8, loc9, loc10);
                        loc5 = loc5 + loc17;
                        loc6 = (loc6 + 1);
                        loc14.renderer = loc13 as org.papervision3d.core.render.draw.ITriangleDrawer;
                        loc14.v0 = loc8;
                        loc14.v1 = loc9;
                        loc14.v2 = loc10;
                        loc14.uv0 = loc12.uv0;
                        loc14.uv1 = loc12.uv1;
                        loc14.uv2 = loc12.uv2;
                        if (arg2.quadrantTree)
                        {
                            if (loc14.create == null)
                            {
                                loc14.create = this.createRenderTriangle;
                            }
                            loc14.update();
                            if (loc14.area < 0 && (loc12.material.doubleSided || loc12.material.oneSide && loc12.material.opposite))
                            {
                                loc14.area = -loc14.area;
                            }
                        }
                        arg2.renderer.addToRenderList(loc14);
                        continue;
                    }
                    var loc18:*;
                    loc18 = ((loc17 = arg2.renderStatistics).culledTriangles + 1);
                    loc17.culledTriangles = loc18;
                }
                if (loc1)
                {
                    while (this.geometry.vertices.length > loc1) 
                    {
                        this.geometry.vertices.pop();
                    }
                }
                this.screenZ = loc15 = loc5 / loc6;
                return loc15;
            }
            loc16 = ((loc15 = arg2.renderStatistics).culledObjects + 1);
            loc15.culledObjects = loc16;
            return 0;
        }

        public function createRenderTriangle(arg1:org.papervision3d.core.geom.renderables.Triangle3D, arg2:org.papervision3d.core.proto.MaterialObject3D, arg3:org.papervision3d.core.geom.renderables.Vertex3DInstance, arg4:org.papervision3d.core.geom.renderables.Vertex3DInstance, arg5:org.papervision3d.core.geom.renderables.Vertex3DInstance, arg6:org.papervision3d.core.math.NumberUV, arg7:org.papervision3d.core.math.NumberUV, arg8:org.papervision3d.core.math.NumberUV):org.papervision3d.core.render.command.RenderTriangle
        {
            if (this._dtStore.length)
            {
                var loc1:*;
                this._tri = loc1 = this._dtStore.pop();
                this._dtActive.push(loc1);
            }
            else 
            {
                this._tri = loc1 = new org.papervision3d.core.render.command.RenderTriangle(arg1);
                this._dtActive.push(loc1);
            }
            this._tri.instance = this;
            this._tri.triangle = arg1;
            this._tri.renderableInstance = arg1;
            this._tri.renderer = arg2;
            this._tri.create = this.createRenderTriangle;
            this._tri.v0 = arg3;
            this._tri.v1 = arg4;
            this._tri.v2 = arg5;
            this._tri.uv0 = arg6;
            this._tri.uv1 = arg7;
            this._tri.uv2 = arg8;
            this._tri.update();
            return this._tri;
        }

        protected function setScreenZ(arg1:uint, arg2:org.papervision3d.core.geom.renderables.Vertex3DInstance, arg3:org.papervision3d.core.geom.renderables.Vertex3DInstance, arg4:org.papervision3d.core.geom.renderables.Vertex3DInstance):Number
        {
            var loc1:*;
            loc1 = arg1;
            switch (loc1) 
            {
                case org.papervision3d.objects.DisplayObject3D.MESH_SORT_CENTER:
                {
                    return (arg2.z + arg3.z + arg4.z) / 3;
                }
                case org.papervision3d.objects.DisplayObject3D.MESH_SORT_FAR:
                {
                    return Math.max(arg2.z, arg3.z, arg4.z);
                }
                case org.papervision3d.objects.DisplayObject3D.MESH_SORT_CLOSE:
                {
                    return Math.min(arg2.z, arg3.z, arg4.z);
                }
            }
            return 0;
        }

        public override function clone():org.papervision3d.objects.DisplayObject3D
        {
            var loc1:*;
            loc1 = super.clone();
            var loc2:*;
            loc2 = new org.papervision3d.core.geom.TriangleMesh3D(this.material, [], [], loc1.name);
            if (this.materials)
            {
                loc2.materials = this.materials.clone();
            }
            if (loc1.geometry)
            {
                loc2.geometry = loc1.geometry.clone(loc2);
            }
            loc2.copyTransform(this);
            return loc2;
        }

        private var _tri:org.papervision3d.core.render.command.RenderTriangle;

        private var _dtStore:Array;

        private var _dtActive:Array;
    }
}


//          class Vertices3D
package org.papervision3d.core.geom 
{
    import org.papervision3d.core.culling.*;
    import org.papervision3d.core.geom.renderables.*;
    import org.papervision3d.core.math.*;
    import org.papervision3d.core.proto.*;
    import org.papervision3d.core.render.data.*;
    import org.papervision3d.objects.*;
    
    public class Vertices3D extends org.papervision3d.objects.DisplayObject3D
    {
        public function Vertices3D(arg1:Array, arg2:String=null)
        {
            super(arg2, new org.papervision3d.core.proto.GeometryObject3D());
            this.geometry.vertices = arg1 || new Array();
            return;
        }

        public override function project(arg1:org.papervision3d.objects.DisplayObject3D, arg2:org.papervision3d.core.render.data.RenderSessionData):Number
        {
            super.project(arg1, arg2);
            if (this.culled)
            {
                return 0;
            }
            if (arg2.camera as org.papervision3d.core.culling.IObjectCuller)
            {
                return this.projectFrustum(arg1, arg2);
            }
            if (!this.geometry || !this.geometry.vertices)
            {
                return 0;
            }
            return arg2.camera.projectVertices(this.geometry.vertices, this, arg2);
        }

        public function projectEmpty(arg1:org.papervision3d.objects.DisplayObject3D, arg2:org.papervision3d.core.render.data.RenderSessionData):Number
        {
            return super.project(arg1, arg2);
        }

        public function worldBoundingBox():Object
        {
            var loc3:*;
            loc3 = null;
            var loc4:*;
            loc4 = null;
            var loc1:*;
            loc1 = this.geometry.vertices;
            var loc2:*;
            loc2 = new Object();
            loc2.min = new org.papervision3d.core.math.Number3D(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
            loc2.max = new org.papervision3d.core.math.Number3D(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE);
            loc2.size = new org.papervision3d.core.math.Number3D();
            var loc5:*;
            loc5 = 0;
            var loc6:*;
            loc6 = loc1;
            for each (loc4 in loc6)
            {
                loc3 = loc4.getPosition();
                org.papervision3d.core.math.Matrix3D.multiplyVector(this.world, loc3);
                loc2.min.x = Math.min(loc3.x, loc2.min.x);
                loc2.min.y = Math.min(loc3.y, loc2.min.y);
                loc2.min.z = Math.min(loc3.z, loc2.min.z);
                loc2.max.x = Math.max(loc3.x, loc2.max.x);
                loc2.max.y = Math.max(loc3.y, loc2.max.y);
                loc2.max.z = Math.max(loc3.z, loc2.max.z);
            }
            loc2.size.x = loc2.max.x - loc2.min.x;
            loc2.size.y = loc2.max.y - loc2.min.y;
            loc2.size.z = loc2.max.z - loc2.min.z;
            return loc2;
        }

        public function boundingBox():Object
        {
            var loc3:*;
            loc3 = null;
            var loc1:*;
            loc1 = this.geometry.vertices;
            var loc2:*;
            loc2 = new Object();
            loc2.min = new org.papervision3d.core.math.Number3D(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
            loc2.max = new org.papervision3d.core.math.Number3D(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE);
            loc2.size = new org.papervision3d.core.math.Number3D();
            var loc4:*;
            loc4 = 0;
            var loc5:*;
            loc5 = loc1;
            for each (loc3 in loc5)
            {
                loc2.min.x = Math.min(loc3.x, loc2.min.x);
                loc2.min.y = Math.min(loc3.y, loc2.min.y);
                loc2.min.z = Math.min(loc3.z, loc2.min.z);
                loc2.max.x = Math.max(loc3.x, loc2.max.x);
                loc2.max.y = Math.max(loc3.y, loc2.max.y);
                loc2.max.z = Math.max(loc3.z, loc2.max.z);
            }
            loc2.size.x = loc2.max.x - loc2.min.x;
            loc2.size.y = loc2.max.y - loc2.min.y;
            loc2.size.z = loc2.max.z - loc2.min.z;
            return loc2;
        }

        public function projectFrustum(arg1:org.papervision3d.objects.DisplayObject3D, arg2:org.papervision3d.core.render.data.RenderSessionData):Number
        {
            return 0;
        }

        public function transformVertices(arg1:org.papervision3d.core.math.Matrix3D):void
        {
            geometry.transformVertices(arg1);
            return;
        }

        public override function clone():org.papervision3d.objects.DisplayObject3D
        {
            var loc1:*;
            loc1 = super.clone();
            var loc2:*;
            loc2 = new org.papervision3d.core.geom.Vertices3D(null, loc1.name);
            loc2.material = loc1.material;
            if (loc1.materials)
            {
                loc2.materials = loc1.materials.clone();
            }
            if (this.geometry)
            {
                loc2.geometry = this.geometry.clone(loc2);
            }
            loc2.copyTransform(this);
            return loc2;
        }
    }
}


//        package log
//          package event
//            class PaperLoggerEvent
package org.papervision3d.core.log.event 
{
    import flash.events.*;
    import org.papervision3d.core.log.*;
    
    public class PaperLoggerEvent extends flash.events.Event
    {
        public function PaperLoggerEvent(arg1:org.papervision3d.core.log.PaperLogVO)
        {
            super(TYPE_LOGEVENT);
            this.paperLogVO = arg1;
            return;
        }

        public static const TYPE_LOGEVENT:String="logEvent";

        public var paperLogVO:org.papervision3d.core.log.PaperLogVO;
    }
}


//          class AbstractPaperLogger
package org.papervision3d.core.log 
{
    import org.papervision3d.core.log.event.*;
    
    public class AbstractPaperLogger extends Object implements org.papervision3d.core.log.IPaperLogger
    {
        public function AbstractPaperLogger()
        {
            super();
            return;
        }

        public function registerWithPaperLogger(arg1:org.papervision3d.core.log.PaperLogger):void
        {
            arg1.addEventListener(org.papervision3d.core.log.event.PaperLoggerEvent.TYPE_LOGEVENT, this.onLogEvent);
            return;
        }

        public function debug(arg1:String, arg2:Object=null, arg3:Array=null):void
        {
            return;
        }

        public function warning(arg1:String, arg2:Object=null, arg3:Array=null):void
        {
            return;
        }

        public function log(arg1:String, arg2:Object=null, arg3:Array=null):void
        {
            return;
        }

        public function fatal(arg1:String, arg2:Object=null, arg3:Array=null):void
        {
            return;
        }

        public function error(arg1:String, arg2:Object=null, arg3:Array=null):void
        {
            return;
        }

        protected function onLogEvent(arg1:org.papervision3d.core.log.event.PaperLoggerEvent):void
        {
            var loc1:*;
            loc1 = arg1.paperLogVO;
            var loc2:*;
            loc2 = loc1.level;
            switch (loc2) 
            {
                case org.papervision3d.core.log.LogLevel.LOG:
                {
                    this.log(loc1.msg, loc1.object, loc1.arg);
                    break;
                }
                case org.papervision3d.core.log.LogLevel.INFO:
                {
                    this.info(loc1.msg, loc1.object, loc1.arg);
                    break;
                }
                case org.papervision3d.core.log.LogLevel.ERROR:
                {
                    this.error(loc1.msg, loc1.object, loc1.arg);
                    break;
                }
                case org.papervision3d.core.log.LogLevel.DEBUG:
                {
                    this.debug(loc1.msg, loc1.object, loc1.arg);
                    break;
                }
                case org.papervision3d.core.log.LogLevel.WARNING:
                {
                    this.warning(loc1.msg, loc1.object, loc1.arg);
                    break;
                }
                case org.papervision3d.core.log.LogLevel.FATAL:
                {
                    this.fatal(loc1.msg, loc1.object, loc1.arg);
                    break;
                }
                default:
                {
                    this.log(loc1.msg, loc1.object, loc1.arg);
                    break;
                }
            }
            return;
        }

        public function unregisterFromPaperLogger(arg1:org.papervision3d.core.log.PaperLogger):void
        {
            arg1.removeEventListener(org.papervision3d.core.log.event.PaperLoggerEvent.TYPE_LOGEVENT, this.onLogEvent);
            return;
        }

        public function info(arg1:String, arg2:Object=null, arg3:Array=null):void
        {
            return;
        }
    }
}


//          class IPaperLogger
package org.papervision3d.core.log 
{
    public interface IPaperLogger
    {
        function debug(arg1:String, arg2:Object=null, arg3:Array=null):void;

        function log(arg1:String, arg2:Object=null, arg3:Array=null):void;

        function error(arg1:String, arg2:Object=null, arg3:Array=null):void;

        function fatal(arg1:String, arg2:Object=null, arg3:Array=null):void;

        function warning(arg1:String, arg2:Object=null, arg3:Array=null):void;

        function info(arg1:String, arg2:Object=null, arg3:Array=null):void;
    }
}


//          class LogLevel
package org.papervision3d.core.log 
{
    public class LogLevel extends Object
    {
        public function LogLevel()
        {
            super();
            return;
        }

        public static const FATAL:int=5;

        public static const ERROR:int=4;

        public static const LOG:int=0;

        public static const INFO:int=1;

        public static const DEBUG:int=2;

        public static const WARNING:int=3;
    }
}


//          class PaperLogVO
package org.papervision3d.core.log 
{
    public class PaperLogVO extends Object
    {
        public function PaperLogVO(arg1:int, arg2:String, arg3:Object, arg4:Array)
        {
            super();
            this.level = arg1;
            this.msg = arg2;
            this.object = arg3;
            this.arg = arg4;
            return;
        }

        public var msg:String;

        public var level:int;

        public var arg:Array;

        public var object:Object;
    }
}


//          class PaperLogger
package org.papervision3d.core.log 
{
    import flash.events.*;
    import org.papervision3d.core.log.event.*;
    
    public class PaperLogger extends flash.events.EventDispatcher
    {
        public function PaperLogger()
        {
            super();
            if (instance)
            {
                throw new Error("Don\'t call the PaperLogger constructor directly");
            }
            this.traceLogger = new org.papervision3d.core.log.PaperTraceLogger();
            this.registerLogger(this.traceLogger);
            return;
        }

        public function registerLogger(arg1:org.papervision3d.core.log.AbstractPaperLogger):void
        {
            arg1.registerWithPaperLogger(this);
            return;
        }

        public function _debug(arg1:String, arg2:Object=null, ... rest):void
        {
            var loc1:*;
            loc1 = new org.papervision3d.core.log.PaperLogVO(org.papervision3d.core.log.LogLevel.DEBUG, arg1, arg2, rest);
            var loc2:*;
            loc2 = new org.papervision3d.core.log.event.PaperLoggerEvent(loc1);
            dispatchEvent(loc2);
            return;
        }

        public function _log(arg1:String, arg2:Object=null, ... rest):void
        {
            var loc1:*;
            loc1 = new org.papervision3d.core.log.PaperLogVO(org.papervision3d.core.log.LogLevel.LOG, arg1, arg2, rest);
            var loc2:*;
            loc2 = new org.papervision3d.core.log.event.PaperLoggerEvent(loc1);
            dispatchEvent(loc2);
            return;
        }

        public function _error(arg1:String, arg2:Object=null, ... rest):void
        {
            var loc1:*;
            loc1 = new org.papervision3d.core.log.PaperLogVO(org.papervision3d.core.log.LogLevel.ERROR, arg1, arg2, rest);
            var loc2:*;
            loc2 = new org.papervision3d.core.log.event.PaperLoggerEvent(loc1);
            dispatchEvent(loc2);
            return;
        }

        public function unregisterLogger(arg1:org.papervision3d.core.log.AbstractPaperLogger):void
        {
            arg1.unregisterFromPaperLogger(this);
            return;
        }

        public function _info(arg1:String, arg2:Object=null, ... rest):void
        {
            var loc1:*;
            loc1 = new org.papervision3d.core.log.PaperLogVO(org.papervision3d.core.log.LogLevel.INFO, arg1, arg2, rest);
            var loc2:*;
            loc2 = new org.papervision3d.core.log.event.PaperLoggerEvent(loc1);
            dispatchEvent(loc2);
            return;
        }

        public function _warning(arg1:String, arg2:Object=null, ... rest):void
        {
            var loc1:*;
            loc1 = new org.papervision3d.core.log.PaperLogVO(org.papervision3d.core.log.LogLevel.WARNING, arg1, arg2, rest);
            var loc2:*;
            loc2 = new org.papervision3d.core.log.event.PaperLoggerEvent(loc1);
            dispatchEvent(loc2);
            return;
        }

        public static function debug(arg1:String, arg2:Object=null, ... rest):void
        {
            getInstance()._debug(arg1);
            return;
        }

        public static function log(arg1:String, arg2:Object=null, ... rest):void
        {
            getInstance()._log(arg1);
            return;
        }

        public static function error(arg1:String, arg2:Object=null, ... rest):void
        {
            getInstance()._error(arg1);
            return;
        }

        public static function getInstance():org.papervision3d.core.log.PaperLogger
        {
            if (!instance)
            {
                instance = new PaperLogger();
            }
            return instance;
        }

        public static function warning(arg1:String, arg2:Object=null, ... rest):void
        {
            getInstance()._warning(arg1);
            return;
        }

        public static function info(arg1:String, arg2:Object=null, ... rest):void
        {
            getInstance()._info(arg1);
            return;
        }

        public var traceLogger:org.papervision3d.core.log.PaperTraceLogger;

        private static var instance:org.papervision3d.core.log.PaperLogger;
    }
}


//          class PaperTraceLogger
package org.papervision3d.core.log 
{
    public class PaperTraceLogger extends org.papervision3d.core.log.AbstractPaperLogger implements org.papervision3d.core.log.IPaperLogger
    {
        public function PaperTraceLogger()
        {
            super();
            return;
        }

        public override function warning(arg1:String, arg2:Object=null, arg3:Array=null):void
        {
            trace("WARNING:", arg1, arg3);
            return;
        }

        public override function log(arg1:String, arg2:Object=null, arg3:Array=null):void
        {
            trace("LOG:", arg1, arg3);
            return;
        }

        public override function error(arg1:String, arg2:Object=null, arg3:Array=null):void
        {
            trace("ERROR:", arg1, arg3);
            return;
        }

        public override function fatal(arg1:String, arg2:Object=null, arg3:Array=null):void
        {
            trace("FATAL:", arg1, arg3);
            return;
        }

        public override function info(arg1:String, arg2:Object=null, arg3:Array=null):void
        {
            trace("INFO:", arg1, arg3);
            return;
        }

        public override function debug(arg1:String, arg2:Object=null, arg3:Array=null):void
        {
            trace("DEBUG:", arg1, arg3);
            return;
        }
    }
}


//        package material
//          class AbstractLightShadeMaterial
package org.papervision3d.core.material 
{
    import flash.utils.*;
    import org.papervision3d.core.math.*;
    import org.papervision3d.core.proto.*;
    import org.papervision3d.core.render.data.*;
    import org.papervision3d.core.render.draw.*;
    import org.papervision3d.core.render.material.*;
    import org.papervision3d.materials.utils.*;
    import org.papervision3d.objects.*;
    
    public class AbstractLightShadeMaterial extends org.papervision3d.core.material.TriangleMaterial implements org.papervision3d.core.render.draw.ITriangleDrawer, org.papervision3d.core.render.material.IUpdateBeforeMaterial
    {
        public function AbstractLightShadeMaterial()
        {
            super();
            this.init();
            return;
        }

        public function updateBeforeRender(arg1:org.papervision3d.core.render.data.RenderSessionData):void
        {
            var loc1:*;
            loc1 = null;
            var loc2:*;
            loc2 = null;
            var loc3:*;
            loc3 = 0;
            var loc4:*;
            loc4 = objects;
            for (loc1 in loc4)
            {
                loc2 = loc1 as org.papervision3d.objects.DisplayObject3D;
                this.lightMatrices[loc1] = org.papervision3d.materials.utils.LightMatrix.getLightMatrix(this.light, loc2, arg1, this.lightMatrices[loc1]);
            }
            return;
        }

        protected function init():void
        {
            this.lightMatrices = new flash.utils.Dictionary();
            return;
        }

        public function get light():org.papervision3d.core.proto.LightObject3D
        {
            return this._light;
        }

        public function set light(arg1:org.papervision3d.core.proto.LightObject3D):void
        {
            this._light = arg1;
            return;
        }

        public var lightMatrices:flash.utils.Dictionary;

        private var _light:org.papervision3d.core.proto.LightObject3D;

        protected static var lightMatrix:org.papervision3d.core.math.Matrix3D;
    }
}


//          class TriangleMaterial
package org.papervision3d.core.material 
{
    import flash.display.*;
    import flash.geom.*;
    import org.papervision3d.core.proto.*;
    import org.papervision3d.core.render.command.*;
    import org.papervision3d.core.render.data.*;
    import org.papervision3d.core.render.draw.*;
    
    public class TriangleMaterial extends org.papervision3d.core.proto.MaterialObject3D implements org.papervision3d.core.render.draw.ITriangleDrawer
    {
        public function TriangleMaterial()
        {
            super();
            return;
        }

        public override function drawTriangle(arg1:org.papervision3d.core.render.command.RenderTriangle, arg2:flash.display.Graphics, arg3:org.papervision3d.core.render.data.RenderSessionData, arg4:flash.display.BitmapData=null, arg5:flash.geom.Matrix=null):void
        {
            return;
        }

        public override function drawRT(arg1:org.papervision3d.core.render.command.RenderTriangle, arg2:flash.display.Graphics, arg3:org.papervision3d.core.render.data.RenderSessionData):void
        {
            return;
        }
    }
}


//        package math
//          package util
//            class FastRectangleTools
package org.papervision3d.core.math.util 
{
    import flash.geom.*;
    import org.papervision3d.core.math.*;
    
    public class FastRectangleTools extends Object
    {
        public function FastRectangleTools()
        {
            super();
            return;
        }

        public static function getRotatedBounds(arg1:flash.geom.Rectangle, arg2:Number, arg3:flash.geom.Rectangle=null):flash.geom.Rectangle
        {
            if (!arg3)
            {
                arg3 = new flash.geom.Rectangle();
            }
            arg2 = arg2 * org.papervision3d.core.math.Number3D.toRADIANS;
            var loc1:*;
            loc1 = arg1.width;
            var loc2:*;
            loc2 = arg1.height;
            var loc3:*;
            loc3 = Math.abs(Math.sin(arg2));
            var loc4:*;
            loc4 = Math.abs(Math.cos(arg2));
            arg3.left = arg1.x - 0.5 * (loc1 * loc4 + loc2 * loc3);
            arg3.right = arg1.x + 0.5 * (loc1 * loc4 + loc2 * loc3);
            arg3.top = arg1.y - 0.5 * (loc1 * loc3 + loc2 * loc4);
            arg3.bottom = arg1.y + 0.5 * (loc1 * loc3 + loc2 * loc4);
            return arg3;
        }

        public static function intersection(arg1:flash.geom.Rectangle, arg2:flash.geom.Rectangle, arg3:flash.geom.Rectangle=null):flash.geom.Rectangle
        {
            if (!arg3)
            {
                arg3 = new flash.geom.Rectangle();
            }
            if (!intersects(arg1, arg2))
            {
                var loc1:*;
                arg3.height = loc1 = 0;
                arg3.width = loc1 = loc1;
                arg3.y = loc1 = loc1;
                arg3.x = loc1;
                return arg3;
            }
            arg3.left = arg1.left > arg2.left ? arg1.left : arg2.left;
            arg3.right = arg1.right < arg2.right ? arg1.right : arg2.right;
            arg3.top = arg1.top > arg2.top ? arg1.top : arg2.top;
            arg3.bottom = arg1.bottom < arg2.bottom ? arg1.bottom : arg2.bottom;
            return arg3;
        }

        public static function intersects(arg1:flash.geom.Rectangle, arg2:flash.geom.Rectangle):Boolean
        {
            if (!(arg1.right < arg2.left || arg1.left > arg2.right) && !(arg1.bottom < arg2.top || arg1.top > arg2.bottom))
            {
                return true;
            }
            return false;
        }
    }
}


//            class GLU
package org.papervision3d.core.math.util 
{
    public class GLU extends Object
    {
        public function GLU()
        {
            super();
            return;
        }

        public static function unProject(arg1:Number, arg2:Number, arg3:Number, arg4:Array, arg5:Array, arg6:Array, arg7:Array):Boolean
        {
            var loc1:*;
            loc1 = new Array(16);
            var loc2:*;
            loc2 = new Array(4);
            multMatrices(arg4, arg5, loc1);
            if (!invertMatrix(loc1, loc1))
            {
                return false;
            }
            loc2[0] = arg1;
            loc2[1] = arg2;
            loc2[2] = arg3;
            loc2[3] = 1;
            loc2[0] = (loc2[0] - arg6[0]) / arg6[2];
            loc2[1] = (loc2[1] - arg6[1]) / arg6[3];
            loc2[0] = (loc2[0] * 2 - 1);
            loc2[1] = (loc2[1] * 2 - 1);
            loc2[2] = (loc2[2] * 2 - 1);
            multMatrixVec(loc1, loc2, arg7);
            if (arg7[3] == 0)
            {
                return false;
            }
            arg7[0] = arg7[0] / arg7[3];
            arg7[1] = arg7[1] / arg7[3];
            arg7[2] = arg7[2] / arg7[3];
            return true;
        }

        public static function scale(arg1:Array, arg2:Number, arg3:Number, arg4:Number):void
        {
            makeIdentity(arg1);
            arg1[0] = arg2;
            arg1[5] = arg3;
            arg1[10] = arg4;
            return;
        }

        public static function multMatrixVec(arg1:Array, arg2:Array, arg3:Array):void
        {
            var loc1:*;
            loc1 = 0;
            loc1 = 0;
            while (loc1 < 4) 
            {
                arg3[loc1] = arg2[0] * arg1[int(0 * 4 + loc1)] + arg2[1] * arg1[int(1 * 4 + loc1)] + arg2[2] * arg1[int(2 * 4 + loc1)] + arg2[3] * arg1[int(3 * 4 + loc1)];
                ++loc1;
            }
            return;
        }

        public static function invertMatrix(arg1:Array, arg2:Array):Boolean
        {
            var loc1:*;
            loc1 = 0;
            var loc2:*;
            loc2 = 0;
            var loc3:*;
            loc3 = 0;
            var loc4:*;
            loc4 = 0;
            var loc5:*;
            loc5 = NaN;
            var loc6:*;
            loc6 = new Array(4);
            loc1 = 0;
            while (loc1 < 4) 
            {
                loc6[loc1] = new Array(4);
                loc2 = 0;
                while (loc2 < 4) 
                {
                    loc6[loc1][loc2] = arg1[(loc1 * 4 + loc2)];
                    ++loc2;
                }
                ++loc1;
            }
            makeIdentity(arg2);
            loc1 = 0;
            while (loc1 < 4) 
            {
                loc4 = loc1;
                loc2 = loc1 + 1;
                while (loc2 < 4) 
                {
                    if (Math.abs(loc6[loc2][loc1]) > Math.abs(loc6[loc1][loc1]))
                    {
                        loc4 = loc2;
                    }
                    ++loc2;
                }
                if (loc4 != loc1)
                {
                    loc3 = 0;
                    while (loc3 < 4) 
                    {
                        loc5 = loc6[loc1][loc3];
                        loc6[loc1][loc3] = loc6[loc4][loc3];
                        loc6[loc4][loc3] = loc5;
                        loc5 = arg2[(loc1 * 4 + loc3)];
                        arg2[(loc1 * 4 + loc3)] = arg2[(loc4 * 4 + loc3)];
                        arg2[(loc4 * 4 + loc3)] = loc5;
                        ++loc3;
                    }
                }
                if (loc6[loc1][loc1] == 0)
                {
                    return false;
                }
                loc5 = loc6[loc1][loc1];
                loc3 = 0;
                while (loc3 < 4) 
                {
                    loc6[loc1][loc3] = loc6[loc1][loc3] / loc5;
                    arg2[(loc1 * 4 + loc3)] = arg2[(loc1 * 4 + loc3)] / loc5;
                    ++loc3;
                }
                loc2 = 0;
                while (loc2 < 4) 
                {
                    if (loc2 != loc1)
                    {
                        loc5 = loc6[loc2][loc1];
                        loc3 = 0;
                        while (loc3 < 4) 
                        {
                            loc6[loc2][loc3] = loc6[loc2][loc3] - loc6[loc1][loc3] * loc5;
                            arg2[(loc2 * 4 + loc3)] = arg2[(loc2 * 4 + loc3)] - arg2[(loc1 * 4 + loc3)] * loc5;
                            ++loc3;
                        }
                    }
                    ++loc2;
                }
                ++loc1;
            }
            return true;
        }

        public static function ortho(arg1:Array, arg2:Number, arg3:Number, arg4:Number, arg5:Number, arg6:Number, arg7:Number):Boolean
        {
            var loc1:*;
            loc1 = (arg3 + arg2) / (arg3 - arg2);
            var loc2:*;
            loc2 = (arg4 + arg5) / (arg4 - arg5);
            var loc3:*;
            loc3 = (arg7 + arg6) / (arg7 - arg6);
            makeIdentity(arg1);
            arg1[0] = 2 / (arg3 - arg2);
            arg1[5] = 2 / (arg4 - arg5);
            arg1[10] = -2 / (arg7 - arg6);
            arg1[12] = loc1;
            arg1[13] = loc2;
            arg1[14] = loc3;
            return true;
        }

        public static function multMatrices(arg1:Array, arg2:Array, arg3:Array):void
        {
            var loc1:*;
            loc1 = 0;
            var loc2:*;
            loc2 = 0;
            loc1 = 0;
            while (loc1 < 4) 
            {
                loc2 = 0;
                while (loc2 < 4) 
                {
                    arg3[int(loc1 * 4 + loc2)] = arg1[int(loc1 * 4 + 0)] * arg2[int(0 * 4 + loc2)] + arg1[int(loc1 * 4 + 1)] * arg2[int(1 * 4 + loc2)] + arg1[int(loc1 * 4 + 2)] * arg2[int(2 * 4 + loc2)] + arg1[int(loc1 * 4 + 3)] * arg2[int(3 * 4 + loc2)];
                    ++loc2;
                }
                ++loc1;
            }
            return;
        }

        public static function perspective(arg1:Array, arg2:Number, arg3:Number, arg4:Number, arg5:Number):Boolean
        {
            var loc1:*;
            loc1 = NaN;
            var loc2:*;
            loc2 = NaN;
            var loc3:*;
            loc3 = NaN;
            var loc4:*;
            loc4 = arg2 / 2 * Math.PI / 180;
            loc3 = arg5 - arg4;
            loc1 = Math.sin(loc4);
            if (loc3 == 0 || loc1 == 0 || arg3 == 0)
            {
                return false;
            }
            loc2 = Math.cos(loc4) / loc1;
            makeIdentity(arg1);
            arg1[0] = loc2 / arg3;
            arg1[5] = loc2;
            arg1[10] = (-(arg5 + arg4)) / loc3;
            arg1[11] = -1;
            arg1[14] = (-2 * arg4 * arg5) / loc3;
            arg1[15] = 0;
            return true;
        }

        public static function makeIdentity(arg1:Array):void
        {
            arg1[(0 + 4 * 0)] = 1;
            arg1[(0 + 4 * 1)] = 0;
            arg1[(0 + 4 * 2)] = 0;
            arg1[(0 + 4 * 3)] = 0;
            arg1[(1 + 4 * 0)] = 0;
            arg1[(1 + 4 * 1)] = 1;
            arg1[(1 + 4 * 2)] = 0;
            arg1[(1 + 4 * 3)] = 0;
            arg1[(2 + 4 * 0)] = 0;
            arg1[(2 + 4 * 1)] = 0;
            arg1[(2 + 4 * 2)] = 1;
            arg1[(2 + 4 * 3)] = 0;
            arg1[(3 + 4 * 0)] = 0;
            arg1[(3 + 4 * 1)] = 0;
            arg1[(3 + 4 * 2)] = 0;
            arg1[(3 + 4 * 3)] = 1;
            return;
        }
    }
}


//          class AxisAlignedBoundingBox
package org.papervision3d.core.math 
{
    import org.papervision3d.core.geom.renderables.*;
    
    public class AxisAlignedBoundingBox extends Object
    {
        public function AxisAlignedBoundingBox(arg1:Number, arg2:Number, arg3:Number, arg4:Number, arg5:Number, arg6:Number)
        {
            super();
            this.minX = arg1;
            this.minY = arg2;
            this.minZ = arg3;
            this.maxX = arg4;
            this.maxY = arg5;
            this.maxZ = arg6;
            this.createBoxVertices();
            return;
        }

        protected function createBoxVertices():void
        {
            this._vertices = new Array();
            this._vertices.push(new org.papervision3d.core.geom.renderables.Vertex3D(this.minX, this.minY, this.minZ));
            this._vertices.push(new org.papervision3d.core.geom.renderables.Vertex3D(this.minX, this.minY, this.maxZ));
            this._vertices.push(new org.papervision3d.core.geom.renderables.Vertex3D(this.minX, this.maxY, this.minZ));
            this._vertices.push(new org.papervision3d.core.geom.renderables.Vertex3D(this.minX, this.maxY, this.maxZ));
            this._vertices.push(new org.papervision3d.core.geom.renderables.Vertex3D(this.maxX, this.minY, this.minZ));
            this._vertices.push(new org.papervision3d.core.geom.renderables.Vertex3D(this.maxX, this.minY, this.maxZ));
            this._vertices.push(new org.papervision3d.core.geom.renderables.Vertex3D(this.maxX, this.maxY, this.minZ));
            this._vertices.push(new org.papervision3d.core.geom.renderables.Vertex3D(this.maxX, this.maxY, this.maxZ));
            return;
        }

        public function getBoxVertices():Array
        {
            return this._vertices;
        }

        public function merge(arg1:org.papervision3d.core.math.AxisAlignedBoundingBox):void
        {
            this.minX = Math.min(this.minX, arg1.minX);
            this.minY = Math.min(this.minY, arg1.minY);
            this.minZ = Math.min(this.minZ, arg1.minZ);
            this.maxX = Math.max(this.maxX, arg1.maxX);
            this.maxY = Math.max(this.maxY, arg1.maxY);
            this.maxZ = Math.max(this.maxZ, arg1.maxZ);
            this.createBoxVertices();
            return;
        }

        public static function createFromVertices(arg1:Array):org.papervision3d.core.math.AxisAlignedBoundingBox
        {
            var loc7:*;
            loc7 = null;
            var loc1:*;
            loc1 = Number.MAX_VALUE;
            var loc2:*;
            loc2 = Number.MAX_VALUE;
            var loc3:*;
            loc3 = Number.MAX_VALUE;
            var loc4:*;
            loc4 = -loc1;
            var loc5:*;
            loc5 = -loc2;
            var loc6:*;
            loc6 = -loc3;
            var loc8:*;
            loc8 = 0;
            var loc9:*;
            loc9 = arg1;
            for each (loc7 in loc9)
            {
                loc1 = Math.min(loc1, loc7.x);
                loc2 = Math.min(loc2, loc7.y);
                loc3 = Math.min(loc3, loc7.z);
                loc4 = Math.max(loc4, loc7.x);
                loc5 = Math.max(loc5, loc7.y);
                loc6 = Math.max(loc6, loc7.z);
            }
            return new AxisAlignedBoundingBox(loc1, loc2, loc3, loc4, loc5, loc6);
        }

        public var minX:Number;

        public var minY:Number;

        public var minZ:Number;

        public var maxX:Number;

        public var maxY:Number;

        public var maxZ:Number;

        protected var _vertices:Array;
    }
}


//          class BoundingSphere
package org.papervision3d.core.math 
{
    import org.papervision3d.core.geom.renderables.*;
    
    public class BoundingSphere extends Object
    {
        public function BoundingSphere(arg1:Number)
        {
            super();
            this.maxDistance = arg1;
            this.radius = Math.sqrt(arg1);
            return;
        }

        public static function getFromVertices(arg1:Array):org.papervision3d.core.math.BoundingSphere
        {
            var loc2:*;
            loc2 = NaN;
            var loc3:*;
            loc3 = null;
            var loc1:*;
            loc1 = 0;
            var loc4:*;
            loc4 = 0;
            var loc5:*;
            loc5 = arg1;
            for each (loc3 in loc5)
            {
                loc2 = loc3.x * loc3.x + loc3.y * loc3.y + loc3.z * loc3.z;
                loc1 = loc2 > loc1 ? loc2 : loc1;
            }
            return new BoundingSphere(loc1);
        }

        public var maxDistance:Number;

        public var radius:Number;
    }
}


//          class Matrix3D
package org.papervision3d.core.math 
{
    import org.papervision3d.*;
    
    public class Matrix3D extends Object
    {
        public function Matrix3D(arg1:Array=null)
        {
            super();
            this.reset(arg1);
            return;
        }

        public function calculateMultiply3x3(arg1:org.papervision3d.core.math.Matrix3D, arg2:org.papervision3d.core.math.Matrix3D):void
        {
            var loc1:*;
            loc1 = arg1.n11;
            var loc2:*;
            loc2 = arg2.n11;
            var loc3:*;
            loc3 = arg1.n21;
            var loc4:*;
            loc4 = arg2.n21;
            var loc5:*;
            loc5 = arg1.n31;
            var loc6:*;
            loc6 = arg2.n31;
            var loc7:*;
            loc7 = arg1.n12;
            var loc8:*;
            loc8 = arg2.n12;
            var loc9:*;
            loc9 = arg1.n22;
            var loc10:*;
            loc10 = arg2.n22;
            var loc11:*;
            loc11 = arg1.n32;
            var loc12:*;
            loc12 = arg2.n32;
            var loc13:*;
            loc13 = arg1.n13;
            var loc14:*;
            loc14 = arg2.n13;
            var loc15:*;
            loc15 = arg1.n23;
            var loc16:*;
            loc16 = arg2.n23;
            var loc17:*;
            loc17 = arg1.n33;
            var loc18:*;
            loc18 = arg2.n33;
            this.n11 = loc1 * loc2 + loc7 * loc4 + loc13 * loc6;
            this.n12 = loc1 * loc8 + loc7 * loc10 + loc13 * loc12;
            this.n13 = loc1 * loc14 + loc7 * loc16 + loc13 * loc18;
            this.n21 = loc3 * loc2 + loc9 * loc4 + loc15 * loc6;
            this.n22 = loc3 * loc8 + loc9 * loc10 + loc15 * loc12;
            this.n23 = loc3 * loc14 + loc9 * loc16 + loc15 * loc18;
            this.n31 = loc5 * loc2 + loc11 * loc4 + loc17 * loc6;
            this.n32 = loc5 * loc8 + loc11 * loc10 + loc17 * loc12;
            this.n33 = loc5 * loc14 + loc11 * loc16 + loc17 * loc18;
            return;
        }

        public function calculateMultiply4x4(arg1:org.papervision3d.core.math.Matrix3D, arg2:org.papervision3d.core.math.Matrix3D):void
        {
            var loc1:*;
            loc1 = arg1.n11;
            var loc2:*;
            loc2 = arg2.n11;
            var loc3:*;
            loc3 = arg1.n21;
            var loc4:*;
            loc4 = arg2.n21;
            var loc5:*;
            loc5 = arg1.n31;
            var loc6:*;
            loc6 = arg2.n31;
            var loc7:*;
            loc7 = arg1.n41;
            var loc8:*;
            loc8 = arg2.n41;
            var loc9:*;
            loc9 = arg1.n12;
            var loc10:*;
            loc10 = arg2.n12;
            var loc11:*;
            loc11 = arg1.n22;
            var loc12:*;
            loc12 = arg2.n22;
            var loc13:*;
            loc13 = arg1.n32;
            var loc14:*;
            loc14 = arg2.n32;
            var loc15:*;
            loc15 = arg1.n42;
            var loc16:*;
            loc16 = arg2.n42;
            var loc17:*;
            loc17 = arg1.n13;
            var loc18:*;
            loc18 = arg2.n13;
            var loc19:*;
            loc19 = arg1.n23;
            var loc20:*;
            loc20 = arg2.n23;
            var loc21:*;
            loc21 = arg1.n33;
            var loc22:*;
            loc22 = arg2.n33;
            var loc23:*;
            loc23 = arg1.n43;
            var loc24:*;
            loc24 = arg2.n43;
            var loc25:*;
            loc25 = arg1.n14;
            var loc26:*;
            loc26 = arg2.n14;
            var loc27:*;
            loc27 = arg1.n24;
            var loc28:*;
            loc28 = arg2.n24;
            var loc29:*;
            loc29 = arg1.n34;
            var loc30:*;
            loc30 = arg2.n34;
            var loc31:*;
            loc31 = arg1.n44;
            var loc32:*;
            loc32 = arg2.n44;
            this.n11 = loc1 * loc2 + loc9 * loc4 + loc17 * loc6;
            this.n12 = loc1 * loc10 + loc9 * loc12 + loc17 * loc14;
            this.n13 = loc1 * loc18 + loc9 * loc20 + loc17 * loc22;
            this.n14 = loc1 * loc26 + loc9 * loc28 + loc17 * loc30 + loc25;
            this.n21 = loc3 * loc2 + loc11 * loc4 + loc19 * loc6;
            this.n22 = loc3 * loc10 + loc11 * loc12 + loc19 * loc14;
            this.n23 = loc3 * loc18 + loc11 * loc20 + loc19 * loc22;
            this.n24 = loc3 * loc26 + loc11 * loc28 + loc19 * loc30 + loc27;
            this.n31 = loc5 * loc2 + loc13 * loc4 + loc21 * loc6;
            this.n32 = loc5 * loc10 + loc13 * loc12 + loc21 * loc14;
            this.n33 = loc5 * loc18 + loc13 * loc20 + loc21 * loc22;
            this.n34 = loc5 * loc26 + loc13 * loc28 + loc21 * loc30 + loc29;
            this.n41 = loc7 * loc2 + loc15 * loc4 + loc23 * loc6;
            this.n42 = loc7 * loc10 + loc15 * loc12 + loc23 * loc14;
            this.n43 = loc7 * loc18 + loc15 * loc20 + loc23 * loc22;
            this.n44 = loc7 * loc26 + loc15 * loc28 + loc23 * loc30 + loc31;
            return;
        }

        public function calculateSkewSymmetric(arg1:org.papervision3d.core.math.Number3D):void
        {
            this.n11 = 0;
            this.n12 = -arg1.z;
            this.n13 = arg1.y;
            this.n21 = arg1.z;
            this.n22 = 0;
            this.n23 = -arg1.x;
            this.n31 = -arg1.y;
            this.n32 = arg1.x;
            this.n33 = 0;
            return;
        }

        public function get det():Number
        {
            return (this.n11 * this.n22 - this.n21 * this.n12) * this.n33 - (this.n11 * this.n32 - this.n31 * this.n12) * this.n23 + (this.n21 * this.n32 - this.n31 * this.n22) * this.n13;
        }

        public function copy(arg1:org.papervision3d.core.math.Matrix3D):org.papervision3d.core.math.Matrix3D
        {
            this.n11 = arg1.n11;
            this.n12 = arg1.n12;
            this.n13 = arg1.n13;
            this.n14 = arg1.n14;
            this.n21 = arg1.n21;
            this.n22 = arg1.n22;
            this.n23 = arg1.n23;
            this.n24 = arg1.n24;
            this.n31 = arg1.n31;
            this.n32 = arg1.n32;
            this.n33 = arg1.n33;
            this.n34 = arg1.n34;
            return this;
        }

        public function copy3x3(arg1:org.papervision3d.core.math.Matrix3D):org.papervision3d.core.math.Matrix3D
        {
            this.n11 = arg1.n11;
            this.n12 = arg1.n12;
            this.n13 = arg1.n13;
            this.n21 = arg1.n21;
            this.n22 = arg1.n22;
            this.n23 = arg1.n23;
            this.n31 = arg1.n31;
            this.n32 = arg1.n32;
            this.n33 = arg1.n33;
            return this;
        }

        public function calculateAdd(arg1:org.papervision3d.core.math.Matrix3D, arg2:org.papervision3d.core.math.Matrix3D):void
        {
            this.n11 = arg1.n11 + arg2.n11;
            this.n12 = arg1.n12 + arg2.n12;
            this.n13 = arg1.n13 + arg2.n13;
            this.n14 = arg1.n14 + arg2.n14;
            this.n21 = arg1.n21 + arg2.n21;
            this.n22 = arg1.n22 + arg2.n22;
            this.n23 = arg1.n23 + arg2.n23;
            this.n24 = arg1.n24 + arg2.n24;
            this.n31 = arg1.n31 + arg2.n31;
            this.n32 = arg1.n32 + arg2.n32;
            this.n33 = arg1.n33 + arg2.n33;
            this.n34 = arg1.n34 + arg2.n34;
            return;
        }

        public function calculateMultiply(arg1:org.papervision3d.core.math.Matrix3D, arg2:org.papervision3d.core.math.Matrix3D):void
        {
            var loc1:*;
            loc1 = arg1.n11;
            var loc2:*;
            loc2 = arg2.n11;
            var loc3:*;
            loc3 = arg1.n21;
            var loc4:*;
            loc4 = arg2.n21;
            var loc5:*;
            loc5 = arg1.n31;
            var loc6:*;
            loc6 = arg2.n31;
            var loc7:*;
            loc7 = arg1.n12;
            var loc8:*;
            loc8 = arg2.n12;
            var loc9:*;
            loc9 = arg1.n22;
            var loc10:*;
            loc10 = arg2.n22;
            var loc11:*;
            loc11 = arg1.n32;
            var loc12:*;
            loc12 = arg2.n32;
            var loc13:*;
            loc13 = arg1.n13;
            var loc14:*;
            loc14 = arg2.n13;
            var loc15:*;
            loc15 = arg1.n23;
            var loc16:*;
            loc16 = arg2.n23;
            var loc17:*;
            loc17 = arg1.n33;
            var loc18:*;
            loc18 = arg2.n33;
            var loc19:*;
            loc19 = arg1.n14;
            var loc20:*;
            loc20 = arg2.n14;
            var loc21:*;
            loc21 = arg1.n24;
            var loc22:*;
            loc22 = arg2.n24;
            var loc23:*;
            loc23 = arg1.n34;
            var loc24:*;
            loc24 = arg2.n34;
            this.n11 = loc1 * loc2 + loc7 * loc4 + loc13 * loc6;
            this.n12 = loc1 * loc8 + loc7 * loc10 + loc13 * loc12;
            this.n13 = loc1 * loc14 + loc7 * loc16 + loc13 * loc18;
            this.n14 = loc1 * loc20 + loc7 * loc22 + loc13 * loc24 + loc19;
            this.n21 = loc3 * loc2 + loc9 * loc4 + loc15 * loc6;
            this.n22 = loc3 * loc8 + loc9 * loc10 + loc15 * loc12;
            this.n23 = loc3 * loc14 + loc9 * loc16 + loc15 * loc18;
            this.n24 = loc3 * loc20 + loc9 * loc22 + loc15 * loc24 + loc21;
            this.n31 = loc5 * loc2 + loc11 * loc4 + loc17 * loc6;
            this.n32 = loc5 * loc8 + loc11 * loc10 + loc17 * loc12;
            this.n33 = loc5 * loc14 + loc11 * loc16 + loc17 * loc18;
            this.n34 = loc5 * loc20 + loc11 * loc22 + loc17 * loc24 + loc23;
            return;
        }

        public function reset(arg1:Array=null):void
        {
            if (!arg1 || arg1.length < 12)
            {
                var loc1:*;
                this.n44 = loc1 = 1;
                this.n33 = loc1 = loc1;
                this.n22 = loc1 = loc1;
                this.n11 = loc1;
                this.n43 = loc1 = 0;
                this.n42 = loc1 = loc1;
                this.n41 = loc1 = loc1;
                this.n34 = loc1 = loc1;
                this.n32 = loc1 = loc1;
                this.n31 = loc1 = loc1;
                this.n24 = loc1 = loc1;
                this.n23 = loc1 = loc1;
                this.n21 = loc1 = loc1;
                this.n14 = loc1 = loc1;
                this.n13 = loc1 = loc1;
                this.n12 = loc1;
            }
            else 
            {
                this.n11 = arg1[0];
                this.n12 = arg1[1];
                this.n13 = arg1[2];
                this.n14 = arg1[3];
                this.n21 = arg1[4];
                this.n22 = arg1[5];
                this.n23 = arg1[6];
                this.n24 = arg1[7];
                this.n31 = arg1[8];
                this.n32 = arg1[9];
                this.n33 = arg1[10];
                this.n34 = arg1[11];
                if (arg1.length != 16)
                {
                    this.n43 = loc1 = 0;
                    this.n42 = loc1 = loc1;
                    this.n41 = loc1;
                    this.n44 = 1;
                }
                else 
                {
                    this.n41 = arg1[12];
                    this.n42 = arg1[13];
                    this.n43 = arg1[14];
                    this.n44 = arg1[15];
                }
            }
            return;
        }

        public function invert():void
        {
            temp.copy(this);
            this.calculateInverse(temp);
            return;
        }

        public function calculateInverse(arg1:org.papervision3d.core.math.Matrix3D):void
        {
            var loc2:*;
            loc2 = NaN;
            var loc3:*;
            loc3 = NaN;
            var loc4:*;
            loc4 = NaN;
            var loc5:*;
            loc5 = NaN;
            var loc6:*;
            loc6 = NaN;
            var loc7:*;
            loc7 = NaN;
            var loc8:*;
            loc8 = NaN;
            var loc9:*;
            loc9 = NaN;
            var loc10:*;
            loc10 = NaN;
            var loc11:*;
            loc11 = NaN;
            var loc12:*;
            loc12 = NaN;
            var loc13:*;
            loc13 = NaN;
            var loc1:*;
            loc1 = arg1.det;
            if (Math.abs(loc1) > 0.001)
            {
                loc1 = 1 / loc1;
                loc2 = arg1.n11;
                loc3 = arg1.n21;
                loc4 = arg1.n31;
                loc5 = arg1.n12;
                loc6 = arg1.n22;
                loc7 = arg1.n32;
                loc8 = arg1.n13;
                loc9 = arg1.n23;
                loc10 = arg1.n33;
                loc11 = arg1.n14;
                loc12 = arg1.n24;
                loc13 = arg1.n34;
                this.n11 = loc1 * (loc6 * loc10 - loc7 * loc9);
                this.n12 = (-loc1) * (loc5 * loc10 - loc7 * loc8);
                this.n13 = loc1 * (loc5 * loc9 - loc6 * loc8);
                this.n14 = (-loc1) * (loc5 * (loc9 * loc13 - loc10 * loc12) - loc6 * (loc8 * loc13 - loc10 * loc11) + loc7 * (loc8 * loc12 - loc9 * loc11));
                this.n21 = (-loc1) * (loc3 * loc10 - loc4 * loc9);
                this.n22 = loc1 * (loc2 * loc10 - loc4 * loc8);
                this.n23 = (-loc1) * (loc2 * loc9 - loc3 * loc8);
                this.n24 = loc1 * (loc2 * (loc9 * loc13 - loc10 * loc12) - loc3 * (loc8 * loc13 - loc10 * loc11) + loc4 * (loc8 * loc12 - loc9 * loc11));
                this.n31 = loc1 * (loc3 * loc7 - loc4 * loc6);
                this.n32 = (-loc1) * (loc2 * loc7 - loc4 * loc5);
                this.n33 = loc1 * (loc2 * loc6 - loc3 * loc5);
                this.n34 = (-loc1) * (loc2 * (loc6 * loc13 - loc7 * loc12) - loc3 * (loc5 * loc13 - loc7 * loc11) + loc4 * (loc5 * loc12 - loc6 * loc11));
            }
            return;
        }

        public function calculateTranspose():void
        {
            var loc1:*;
            loc1 = this.n11;
            var loc2:*;
            loc2 = this.n21;
            var loc3:*;
            loc3 = this.n31;
            var loc4:*;
            loc4 = this.n41;
            var loc5:*;
            loc5 = this.n12;
            var loc6:*;
            loc6 = this.n22;
            var loc7:*;
            loc7 = this.n32;
            var loc8:*;
            loc8 = this.n42;
            var loc9:*;
            loc9 = this.n13;
            var loc10:*;
            loc10 = this.n23;
            var loc11:*;
            loc11 = this.n33;
            var loc12:*;
            loc12 = this.n43;
            var loc13:*;
            loc13 = this.n14;
            var loc14:*;
            loc14 = this.n24;
            var loc15:*;
            loc15 = this.n34;
            var loc16:*;
            loc16 = this.n44;
            this.n11 = loc1;
            this.n12 = loc2;
            this.n13 = loc3;
            this.n14 = loc4;
            this.n21 = loc5;
            this.n22 = loc6;
            this.n23 = loc7;
            this.n24 = loc8;
            this.n31 = loc9;
            this.n32 = loc10;
            this.n33 = loc11;
            this.n34 = loc12;
            this.n41 = loc13;
            this.n42 = loc14;
            this.n43 = loc15;
            this.n44 = loc16;
            return;
        }

        public function toString():String
        {
            var loc1:*;
            loc1 = "";
            loc1 = loc1 + int(this.n11 * 1000) / 1000 + "\t\t" + int(this.n12 * 1000) / 1000 + "\t\t" + int(this.n13 * 1000) / 1000 + "\t\t" + int(this.n14 * 1000) / 1000 + "\n";
            loc1 = loc1 + int(this.n21 * 1000) / 1000 + "\t\t" + int(this.n22 * 1000) / 1000 + "\t\t" + int(this.n23 * 1000) / 1000 + "\t\t" + int(this.n24 * 1000) / 1000 + "\n";
            loc1 = loc1 + int(this.n31 * 1000) / 1000 + "\t\t" + int(this.n32 * 1000) / 1000 + "\t\t" + int(this.n33 * 1000) / 1000 + "\t\t" + int(this.n34 * 1000) / 1000 + "\n";
            loc1 = loc1 + int(this.n41 * 1000) / 1000 + "\t\t" + int(this.n42 * 1000) / 1000 + "\t\t" + int(this.n43 * 1000) / 1000 + "\t\t" + int(this.n44 * 1000) / 1000 + "\n";
            return loc1;
        }

        public static function rotationMatrixWithReference(arg1:org.papervision3d.core.math.Number3D, arg2:Number, arg3:org.papervision3d.core.math.Number3D):org.papervision3d.core.math.Matrix3D
        {
            var loc1:*;
            loc1 = org.papervision3d.core.math.Matrix3D.translationMatrix(arg3.x, -arg3.y, arg3.z);
            loc1.calculateMultiply(loc1, org.papervision3d.core.math.Matrix3D.rotationMatrix(arg1.x, arg1.y, arg1.z, arg2));
            loc1.calculateMultiply(loc1, org.papervision3d.core.math.Matrix3D.translationMatrix(-arg3.x, arg3.y, -arg3.z));
            return loc1;
        }

        public static function multiplyVector(arg1:org.papervision3d.core.math.Matrix3D, arg2:org.papervision3d.core.math.Number3D):void
        {
            var loc2:*;
            loc2 = NaN;
            var loc3:*;
            loc3 = NaN;
            var loc1:*;
            loc1 = arg2.x;
            loc2 = arg2.y;
            loc3 = arg2.z;
            arg2.x = loc1 * arg1.n11 + loc2 * arg1.n12 + loc3 * arg1.n13 + arg1.n14;
            arg2.y = loc1 * arg1.n21 + loc2 * arg1.n22 + loc3 * arg1.n23 + arg1.n24;
            arg2.z = loc1 * arg1.n31 + loc2 * arg1.n32 + loc3 * arg1.n33 + arg1.n34;
            return;
        }

        public static function multiplyVector4x4(arg1:org.papervision3d.core.math.Matrix3D, arg2:org.papervision3d.core.math.Number3D):void
        {
            var loc1:*;
            loc1 = NaN;
            var loc2:*;
            loc2 = NaN;
            var loc4:*;
            loc4 = NaN;
            loc1 = arg2.x;
            loc2 = arg2.y;
            var loc3:*;
            loc3 = arg2.z;
            loc4 = 1 / (loc1 * arg1.n41 + loc2 * arg1.n42 + loc3 * arg1.n43 + arg1.n44);
            arg2.x = loc1 * arg1.n11 + loc2 * arg1.n12 + loc3 * arg1.n13 + arg1.n14;
            arg2.y = loc1 * arg1.n21 + loc2 * arg1.n22 + loc3 * arg1.n23 + arg1.n24;
            arg2.z = loc1 * arg1.n31 + loc2 * arg1.n32 + loc3 * arg1.n33 + arg1.n34;
            arg2.x = arg2.x * loc4;
            arg2.y = arg2.y * loc4;
            arg2.z = arg2.z * loc4;
            return;
        }

        public static function multiply3x3(arg1:org.papervision3d.core.math.Matrix3D, arg2:org.papervision3d.core.math.Matrix3D):org.papervision3d.core.math.Matrix3D
        {
            var loc1:*;
            loc1 = new Matrix3D();
            loc1.calculateMultiply3x3(arg1, arg2);
            return loc1;
        }

        public static function normalizeQuaternion(arg1:Object):Object
        {
            var loc1:*;
            loc1 = magnitudeQuaternion(arg1);
            arg1.x = arg1.x / loc1;
            arg1.y = arg1.y / loc1;
            arg1.z = arg1.z / loc1;
            arg1.w = arg1.w / loc1;
            return arg1;
        }

        public static function multiplyVector3x3(arg1:org.papervision3d.core.math.Matrix3D, arg2:org.papervision3d.core.math.Number3D):void
        {
            var loc1:*;
            loc1 = arg2.x;
            var loc2:*;
            loc2 = arg2.y;
            var loc3:*;
            loc3 = arg2.z;
            arg2.x = loc1 * arg1.n11 + loc2 * arg1.n12 + loc3 * arg1.n13;
            arg2.y = loc1 * arg1.n21 + loc2 * arg1.n22 + loc3 * arg1.n23;
            arg2.z = loc1 * arg1.n31 + loc2 * arg1.n32 + loc3 * arg1.n33;
            return;
        }

        public static function axis2quaternion(arg1:Number, arg2:Number, arg3:Number, arg4:Number):Object
        {
            var loc1:*;
            loc1 = Math.sin(arg4 / 2);
            var loc2:*;
            loc2 = Math.cos(arg4 / 2);
            var loc3:*;
            (loc3 = new Object()).x = arg1 * loc1;
            loc3.y = arg2 * loc1;
            loc3.z = arg3 * loc1;
            loc3.w = loc2;
            return normalizeQuaternion(loc3);
        }

        public static function translationMatrix(arg1:Number, arg2:Number, arg3:Number):org.papervision3d.core.math.Matrix3D
        {
            var loc1:*;
            (loc1 = IDENTITY).n14 = arg1;
            loc1.n24 = arg2;
            loc1.n34 = arg3;
            return loc1;
        }

        public static function magnitudeQuaternion(arg1:Object):Number
        {
            return Math.sqrt(arg1.w * arg1.w + arg1.x * arg1.x + arg1.y * arg1.y + arg1.z * arg1.z);
        }

        public static function rotationX(arg1:Number):org.papervision3d.core.math.Matrix3D
        {
            var loc1:*;
            loc1 = IDENTITY;
            var loc2:*;
            loc2 = Math.cos(arg1);
            var loc3:*;
            loc3 = Math.sin(arg1);
            loc1.n22 = loc2;
            loc1.n23 = -loc3;
            loc1.n32 = loc3;
            loc1.n33 = loc2;
            return loc1;
        }

        public static function rotationY(arg1:Number):org.papervision3d.core.math.Matrix3D
        {
            var loc1:*;
            loc1 = IDENTITY;
            var loc2:*;
            loc2 = Math.cos(arg1);
            var loc3:*;
            loc3 = Math.sin(arg1);
            loc1.n11 = loc2;
            loc1.n13 = -loc3;
            loc1.n31 = loc3;
            loc1.n33 = loc2;
            return loc1;
        }

        public static function rotationZ(arg1:Number):org.papervision3d.core.math.Matrix3D
        {
            var loc1:*;
            loc1 = IDENTITY;
            var loc2:*;
            loc2 = Math.cos(arg1);
            var loc3:*;
            loc3 = Math.sin(arg1);
            loc1.n11 = loc2;
            loc1.n12 = -loc3;
            loc1.n21 = loc3;
            loc1.n22 = loc2;
            return loc1;
        }

        public static function clone(arg1:org.papervision3d.core.math.Matrix3D):org.papervision3d.core.math.Matrix3D
        {
            return new Matrix3D([arg1.n11, arg1.n12, arg1.n13, arg1.n14, arg1.n21, arg1.n22, arg1.n23, arg1.n24, arg1.n31, arg1.n32, arg1.n33, arg1.n34]);
        }

        public static function rotationMatrix(arg1:Number, arg2:Number, arg3:Number, arg4:Number, arg5:org.papervision3d.core.math.Matrix3D=null):org.papervision3d.core.math.Matrix3D
        {
            var loc1:*;
            loc1 = null;
            if (arg5)
            {
                loc1 = arg5;
            }
            else 
            {
                loc1 = IDENTITY;
            }
            var loc2:*;
            loc2 = Math.cos(arg4);
            var loc3:*;
            loc3 = Math.sin(arg4);
            var loc4:*;
            loc4 = 1 - loc2;
            var loc5:*;
            loc5 = arg1 * arg2 * loc4;
            var loc6:*;
            loc6 = arg2 * arg3 * loc4;
            var loc7:*;
            loc7 = arg1 * arg3 * loc4;
            var loc8:*;
            loc8 = loc3 * arg3;
            var loc9:*;
            loc9 = loc3 * arg2;
            var loc10:*;
            loc10 = loc3 * arg1;
            loc1.n11 = loc2 + arg1 * arg1 * loc4;
            loc1.n12 = -loc8 + loc5;
            loc1.n13 = loc9 + loc7;
            loc1.n14 = 0;
            loc1.n21 = loc8 + loc5;
            loc1.n22 = loc2 + arg2 * arg2 * loc4;
            loc1.n23 = -loc10 + loc6;
            loc1.n24 = 0;
            loc1.n31 = -loc9 + loc7;
            loc1.n32 = loc10 + loc6;
            loc1.n33 = loc2 + arg3 * arg3 * loc4;
            loc1.n34 = 0;
            return loc1;
        }

        public static function add(arg1:org.papervision3d.core.math.Matrix3D, arg2:org.papervision3d.core.math.Matrix3D):org.papervision3d.core.math.Matrix3D
        {
            var loc1:*;
            loc1 = new Matrix3D();
            loc1.calculateAdd(arg1, arg2);
            return loc1;
        }

        public static function multiply(arg1:org.papervision3d.core.math.Matrix3D, arg2:org.papervision3d.core.math.Matrix3D):org.papervision3d.core.math.Matrix3D
        {
            var loc1:*;
            loc1 = new Matrix3D();
            loc1.calculateMultiply(arg1, arg2);
            return loc1;
        }

        public static function euler2quaternion(arg1:Number, arg2:Number, arg3:Number, arg4:org.papervision3d.core.math.Quaternion=null):org.papervision3d.core.math.Quaternion
        {
            var loc9:*;
            loc9 = null;
            var loc1:*;
            loc1 = Math.sin(arg1 * 0.5);
            var loc2:*;
            loc2 = Math.cos(arg1 * 0.5);
            var loc3:*;
            loc3 = Math.sin(arg2 * 0.5);
            var loc4:*;
            loc4 = Math.cos(arg2 * 0.5);
            var loc5:*;
            loc5 = Math.sin(arg3 * 0.5);
            var loc6:*;
            loc6 = Math.cos(arg3 * 0.5);
            var loc7:*;
            loc7 = loc2 * loc4;
            var loc8:*;
            loc8 = loc1 * loc3;
            if (arg4)
            {
                loc9 = arg4;
            }
            else 
            {
                loc9 = new org.papervision3d.core.math.Quaternion();
            }
            loc9.x = loc5 * loc7 - loc6 * loc8;
            loc9.y = loc6 * loc1 * loc4 + loc5 * loc2 * loc3;
            loc9.z = loc6 * loc2 * loc3 - loc5 * loc1 * loc4;
            loc9.w = loc6 * loc7 + loc5 * loc8;
            return loc9;
        }

        public static function quaternion2matrix(arg1:Number, arg2:Number, arg3:Number, arg4:Number, arg5:org.papervision3d.core.math.Matrix3D=null):org.papervision3d.core.math.Matrix3D
        {
            var loc10:*;
            loc10 = null;
            var loc1:*;
            loc1 = arg1 * arg1;
            var loc2:*;
            loc2 = arg1 * arg2;
            var loc3:*;
            loc3 = arg1 * arg3;
            var loc4:*;
            loc4 = arg1 * arg4;
            var loc5:*;
            loc5 = arg2 * arg2;
            var loc6:*;
            loc6 = arg2 * arg3;
            var loc7:*;
            loc7 = arg2 * arg4;
            var loc8:*;
            loc8 = arg3 * arg3;
            var loc9:*;
            loc9 = arg3 * arg4;
            if (arg5)
            {
                loc10 = arg5;
            }
            else 
            {
                loc10 = IDENTITY;
            }
            loc10.n11 = 1 - 2 * (loc5 + loc8);
            loc10.n12 = 2 * (loc2 - loc9);
            loc10.n13 = 2 * (loc3 + loc7);
            loc10.n21 = 2 * (loc2 + loc9);
            loc10.n22 = 1 - 2 * (loc1 + loc8);
            loc10.n23 = 2 * (loc6 - loc4);
            loc10.n31 = 2 * (loc3 - loc7);
            loc10.n32 = 2 * (loc6 + loc4);
            loc10.n33 = 1 - 2 * (loc1 + loc5);
            return loc10;
        }

        public static function inverse(arg1:org.papervision3d.core.math.Matrix3D):org.papervision3d.core.math.Matrix3D
        {
            var loc1:*;
            loc1 = new Matrix3D();
            loc1.calculateInverse(arg1);
            return loc1;
        }

        public static function euler2matrix(arg1:org.papervision3d.core.math.Number3D):org.papervision3d.core.math.Matrix3D
        {
            temp.reset();
            var loc1:*;
            loc1 = temp;
            loc1 = temp;
            var loc2:*;
            loc2 = arg1.x * toRADIANS;
            var loc3:*;
            loc3 = arg1.y * toRADIANS;
            var loc4:*;
            loc4 = arg1.z * toRADIANS;
            var loc5:*;
            loc5 = Math.cos(loc2);
            var loc6:*;
            loc6 = Math.sin(loc2);
            var loc7:*;
            loc7 = Math.cos(loc3);
            var loc8:*;
            loc8 = Math.sin(loc3);
            var loc9:*;
            loc9 = Math.cos(loc4);
            var loc10:*;
            loc10 = Math.sin(loc4);
            var loc11:*;
            loc11 = loc5 * loc8;
            var loc12:*;
            loc12 = loc6 * loc8;
            loc1.n11 = loc7 * loc9;
            loc1.n12 = (-loc7) * loc10;
            loc1.n13 = loc8;
            loc1.n21 = loc12 * loc9 + loc5 * loc10;
            loc1.n22 = (-loc12) * loc10 + loc5 * loc9;
            loc1.n23 = (-loc6) * loc7;
            loc1.n31 = (-loc11) * loc9 + loc6 * loc10;
            loc1.n32 = loc11 * loc10 + loc6 * loc9;
            loc1.n33 = loc5 * loc7;
            return loc1;
        }

        public static function scaleMatrix(arg1:Number, arg2:Number, arg3:Number):org.papervision3d.core.math.Matrix3D
        {
            var loc1:*;
            (loc1 = IDENTITY).n11 = arg1;
            loc1.n22 = arg2;
            loc1.n33 = arg3;
            return loc1;
        }

        public static function rotateAxis(arg1:org.papervision3d.core.math.Matrix3D, arg2:org.papervision3d.core.math.Number3D):void
        {
            var loc1:*;
            loc1 = arg2.x;
            var loc2:*;
            loc2 = arg2.y;
            var loc3:*;
            loc3 = arg2.z;
            arg2.x = loc1 * arg1.n11 + loc2 * arg1.n12 + loc3 * arg1.n13;
            arg2.y = loc1 * arg1.n21 + loc2 * arg1.n22 + loc3 * arg1.n23;
            arg2.z = loc1 * arg1.n31 + loc2 * arg1.n32 + loc3 * arg1.n33;
            arg2.normalize();
            return;
        }

        public static function matrix2euler(arg1:org.papervision3d.core.math.Matrix3D, arg2:org.papervision3d.core.math.Number3D=null, arg3:org.papervision3d.core.math.Number3D=null):org.papervision3d.core.math.Number3D
        {
            arg2 = arg2 || new org.papervision3d.core.math.Number3D();
            var loc1:*;
            loc1 = arg3 && arg3.x == 1 ? 1 : Math.sqrt(arg1.n11 * arg1.n11 + arg1.n21 * arg1.n21 + arg1.n31 * arg1.n31);
            var loc2:*;
            loc2 = arg3 && arg3.y == 1 ? 1 : Math.sqrt(arg1.n12 * arg1.n12 + arg1.n22 * arg1.n22 + arg1.n32 * arg1.n32);
            var loc3:*;
            loc3 = arg3 && arg3.z == 1 ? 1 : Math.sqrt(arg1.n13 * arg1.n13 + arg1.n23 * arg1.n23 + arg1.n33 * arg1.n33);
            var loc4:*;
            loc4 = arg1.n11 / loc1;
            var loc5:*;
            loc5 = arg1.n21 / loc2;
            var loc6:*;
            loc6 = arg1.n31 / loc3;
            var loc7:*;
            loc7 = arg1.n32 / loc3;
            var loc8:*;
            loc8 = arg1.n33 / loc3;
            loc6 = (loc6 = loc6 > 1 ? 1 : loc6) < -1 ? -1 : loc6;
            arg2.y = Math.asin(-loc6);
            arg2.z = Math.atan2(loc5, loc4);
            arg2.x = Math.atan2(loc7, loc8);
            if (org.papervision3d.Papervision3D.useDEGREES)
            {
                arg2.x = arg2.x * toDEGREES;
                arg2.y = arg2.y * toDEGREES;
                arg2.z = arg2.z * toDEGREES;
            }
            return arg2;
        }

        public static function multiplyQuaternion(arg1:Object, arg2:Object):Object
        {
            var loc1:*;
            loc1 = arg1.x;
            var loc2:*;
            loc2 = arg1.y;
            var loc3:*;
            loc3 = arg1.z;
            var loc4:*;
            loc4 = arg1.w;
            var loc5:*;
            loc5 = arg2.x;
            var loc6:*;
            loc6 = arg2.y;
            var loc7:*;
            loc7 = arg2.z;
            var loc8:*;
            loc8 = arg2.w;
            var loc9:*;
            (loc9 = new Object()).x = loc4 * loc5 + loc1 * loc8 + loc2 * loc7 - loc3 * loc6;
            loc9.y = loc4 * loc6 + loc2 * loc8 + loc3 * loc5 - loc1 * loc7;
            loc9.z = loc4 * loc7 + loc3 * loc8 + loc1 * loc6 - loc2 * loc5;
            loc9.w = loc4 * loc8 - loc1 * loc5 - loc2 * loc6 - loc3 * loc7;
            return loc9;
        }

        public static function get IDENTITY():org.papervision3d.core.math.Matrix3D
        {
            return new Matrix3D([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
        }

        
        {
            temp = Matrix3D.IDENTITY;
            n3Di = org.papervision3d.core.math.Number3D.ZERO;
            n3Dj = org.papervision3d.core.math.Number3D.ZERO;
            n3Dk = org.papervision3d.core.math.Number3D.ZERO;
            toDEGREES = 180 / Math.PI;
            toRADIANS = Math.PI / 180;
            _sin = Math.sin;
            _cos = Math.cos;
        }

        public var n31:Number;

        public var n32:Number;

        public var n11:Number;

        public var n34:Number;

        public var n13:Number;

        public var n14:Number;

        public var n33:Number;

        public var n12:Number;

        public var n41:Number;

        public var n42:Number;

        public var n21:Number;

        public var n22:Number;

        public var n23:Number;

        public var n24:Number;

        public var n44:Number;

        public var n43:Number;

        private static var _cos:Function;

        private static var _sin:Function;

        private static var temp:org.papervision3d.core.math.Matrix3D;

        private static var n3Di:org.papervision3d.core.math.Number3D;

        private static var n3Dj:org.papervision3d.core.math.Number3D;

        private static var n3Dk:org.papervision3d.core.math.Number3D;

        private static var toDEGREES:Number=57.2957795131;

        private static var toRADIANS:Number=0.0174532925199;
    }
}


//          class Number2D
package org.papervision3d.core.math 
{
    import org.papervision3d.*;
    
    public class Number2D extends Object
    {
        public function Number2D(arg1:Number=0, arg2:Number=0)
        {
            super();
            this.x = arg1;
            this.y = arg2;
            return;
        }

        public function isModuloLessThan(arg1:Number):Boolean
        {
            return this.moduloSquared < arg1 * arg1;
        }

        public function reverse():void
        {
            this.x = -this.x;
            this.y = -this.y;
            return;
        }

        public function divideEq(arg1:Number):void
        {
            this.x = this.x / arg1;
            this.y = this.y / arg1;
            return;
        }

        public function plusEq(arg1:org.papervision3d.core.math.Number2D):void
        {
            this.x = this.x + arg1.x;
            this.y = this.y + arg1.y;
            return;
        }

        public function multiplyEq(arg1:Number):void
        {
            this.x = this.x * arg1;
            this.y = this.y * arg1;
            return;
        }

        public function isModuloGreaterThan(arg1:Number):Boolean
        {
            return this.moduloSquared > arg1 * arg1;
        }

        public function toString():String
        {
            var loc1:*;
            loc1 = Math.round(this.x * 1000) / 1000;
            var loc2:*;
            loc2 = Math.round(this.y * 1000) / 1000;
            return "[" + loc1 + ", " + loc2 + "]";
        }

        public function reset(arg1:Number=0, arg2:Number=0):void
        {
            this.x = arg1;
            this.y = arg2;
            return;
        }

        public function get moduloSquared():Number
        {
            return this.x * this.x + this.y * this.y;
        }

        public function normalise():void
        {
            var loc1:*;
            loc1 = this.modulo;
            this.x = this.x / loc1;
            this.y = this.y / loc1;
            return;
        }

        public function get modulo():Number
        {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }

        public function copyTo(arg1:org.papervision3d.core.math.Number2D):void
        {
            arg1.x = this.x;
            arg1.y = this.y;
            return;
        }

        public function angle():Number
        {
            if (org.papervision3d.Papervision3D.useDEGREES)
            {
                return RADTODEG * Math.atan2(this.y, this.x);
            }
            return Math.atan2(this.y, this.x);
        }

        public function rotate(arg1:Number):void
        {
            var loc3:*;
            loc3 = null;
            if (org.papervision3d.Papervision3D.useDEGREES)
            {
                arg1 = arg1 * DEGTORAD;
            }
            var loc1:*;
            loc1 = Math.cos(arg1);
            var loc2:*;
            loc2 = Math.sin(arg1);
            loc3 = this.clone();
            this.x = loc3.x * loc1 - loc3.y * loc2;
            this.y = loc3.x * loc2 + loc3.y * loc1;
            return;
        }

        public function minusEq(arg1:org.papervision3d.core.math.Number2D):void
        {
            this.x = this.x - arg1.x;
            this.y = this.y - arg1.y;
            return;
        }

        public function clone():org.papervision3d.core.math.Number2D
        {
            return new org.papervision3d.core.math.Number2D(this.x, this.y);
        }

        public function isModuloEqualTo(arg1:Number):Boolean
        {
            return this.moduloSquared == arg1 * arg1;
        }

        public function copyFrom(arg1:org.papervision3d.core.math.Number2D):void
        {
            this.x = arg1.x;
            this.y = arg1.y;
            return;
        }

        public static function multiplyScalar(arg1:org.papervision3d.core.math.Number2D, arg2:Number):org.papervision3d.core.math.Number2D
        {
            return new Number2D(arg1.x * arg2, arg1.y * arg2);
        }

        public static function add(arg1:org.papervision3d.core.math.Number2D, arg2:org.papervision3d.core.math.Number2D):org.papervision3d.core.math.Number2D
        {
            return new Number2D(arg1.x + arg2.x, arg1.y + arg2.y);
        }

        public static function dot(arg1:org.papervision3d.core.math.Number2D, arg2:org.papervision3d.core.math.Number2D):Number
        {
            return arg1.x * arg2.x + arg1.y * arg2.y;
        }

        public static function subtract(arg1:org.papervision3d.core.math.Number2D, arg2:org.papervision3d.core.math.Number2D):org.papervision3d.core.math.Number2D
        {
            return new Number2D(arg1.x - arg2.x, arg1.y - arg2.y);
        }

        public static const DEGTORAD:Number=Math.PI / 180;

        public static const RADTODEG:Number=180 / Math.PI;

        public var x:Number;

        public var y:Number;
    }
}


//          class Number3D
package org.papervision3d.core.math 
{
    import org.papervision3d.*;
    
    public class Number3D extends Object
    {
        public function Number3D(arg1:Number=0, arg2:Number=0, arg3:Number=0)
        {
            super();
            this.x = arg1;
            this.y = arg2;
            this.z = arg3;
            return;
        }

        public function isModuloLessThan(arg1:Number):Boolean
        {
            return this.moduloSquared < arg1 * arg1;
        }

        public function rotateX(arg1:Number):void
        {
            if (org.papervision3d.Papervision3D.useDEGREES)
            {
                arg1 = arg1 * toRADIANS;
            }
            var loc1:*;
            loc1 = Math.cos(arg1);
            var loc2:*;
            loc2 = Math.sin(arg1);
            temp.copyFrom(this);
            this.y = temp.y * loc1 - temp.z * loc2;
            this.z = temp.y * loc2 + temp.z * loc1;
            return;
        }

        public function rotateY(arg1:Number):void
        {
            if (org.papervision3d.Papervision3D.useDEGREES)
            {
                arg1 = arg1 * toRADIANS;
            }
            var loc1:*;
            loc1 = Math.cos(arg1);
            var loc2:*;
            loc2 = Math.sin(arg1);
            temp.copyFrom(this);
            this.x = temp.x * loc1 + temp.z * loc2;
            this.z = temp.x * (-loc2) + temp.z * loc1;
            return;
        }

        public function plusEq(arg1:org.papervision3d.core.math.Number3D):void
        {
            this.x = this.x + arg1.x;
            this.y = this.y + arg1.y;
            this.z = this.z + arg1.z;
            return;
        }

        public function multiplyEq(arg1:Number):void
        {
            this.x = this.x * arg1;
            this.y = this.y * arg1;
            this.z = this.z * arg1;
            return;
        }

        public function toString():String
        {
            return "x:" + Math.round(this.x * 100) / 100 + " y:" + Math.round(this.y * 100) / 100 + " z:" + Math.round(this.z * 100) / 100;
        }

        public function normalize():void
        {
            var loc1:*;
            loc1 = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
            if (!(loc1 == 0) && !(loc1 == 1))
            {
                loc1 = 1 / loc1;
                this.x = this.x * loc1;
                this.y = this.y * loc1;
                this.z = this.z * loc1;
            }
            return;
        }

        public function rotateZ(arg1:Number):void
        {
            if (org.papervision3d.Papervision3D.useDEGREES)
            {
                arg1 = arg1 * toRADIANS;
            }
            var loc1:*;
            loc1 = Math.cos(arg1);
            var loc2:*;
            loc2 = Math.sin(arg1);
            temp.copyFrom(this);
            this.x = temp.x * loc1 - temp.y * loc2;
            this.y = temp.x * loc2 + temp.y * loc1;
            return;
        }

        public function reset(arg1:Number=0, arg2:Number=0, arg3:Number=0):void
        {
            this.x = arg1;
            this.y = arg2;
            this.z = arg3;
            return;
        }

        public function get moduloSquared():Number
        {
            return this.x * this.x + this.y * this.y + this.z * this.z;
        }

        public function get modulo():Number
        {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        }

        public function copyTo(arg1:org.papervision3d.core.math.Number3D):void
        {
            arg1.x = this.x;
            arg1.y = this.y;
            arg1.z = this.z;
            return;
        }

        public function isModuloGreaterThan(arg1:Number):Boolean
        {
            return this.moduloSquared > arg1 * arg1;
        }

        public function minusEq(arg1:org.papervision3d.core.math.Number3D):void
        {
            this.x = this.x - arg1.x;
            this.y = this.y - arg1.y;
            this.z = this.z - arg1.z;
            return;
        }

        public function clone():org.papervision3d.core.math.Number3D
        {
            return new org.papervision3d.core.math.Number3D(this.x, this.y, this.z);
        }

        public function isModuloEqualTo(arg1:Number):Boolean
        {
            return this.moduloSquared == arg1 * arg1;
        }

        public function copyFrom(arg1:org.papervision3d.core.math.Number3D):void
        {
            this.x = arg1.x;
            this.y = arg1.y;
            this.z = arg1.z;
            return;
        }

        public static function sub(arg1:org.papervision3d.core.math.Number3D, arg2:org.papervision3d.core.math.Number3D):org.papervision3d.core.math.Number3D
        {
            return new Number3D(arg1.x - arg2.x, arg1.y - arg2.y, arg1.z - arg2.z);
        }

        public static function add(arg1:org.papervision3d.core.math.Number3D, arg2:org.papervision3d.core.math.Number3D):org.papervision3d.core.math.Number3D
        {
            return new Number3D(arg1.x + arg2.x, arg1.y + arg2.y, arg1.z + arg2.z);
        }

        public static function cross(arg1:org.papervision3d.core.math.Number3D, arg2:org.papervision3d.core.math.Number3D, arg3:org.papervision3d.core.math.Number3D=null):org.papervision3d.core.math.Number3D
        {
            if (!arg3)
            {
                arg3 = ZERO;
            }
            arg3.reset(arg2.y * arg1.z - arg2.z * arg1.y, arg2.z * arg1.x - arg2.x * arg1.z, arg2.x * arg1.y - arg2.y * arg1.x);
            return arg3;
        }

        public static function dot(arg1:org.papervision3d.core.math.Number3D, arg2:org.papervision3d.core.math.Number3D):Number
        {
            return arg1.x * arg2.x + arg1.y * arg2.y + arg2.z * arg1.z;
        }

        public static function get ZERO():org.papervision3d.core.math.Number3D
        {
            return new Number3D(0, 0, 0);
        }

        
        {
            temp = Number3D.ZERO;
            toDEGREES = 180 / Math.PI;
            toRADIANS = Math.PI / 180;
        }

        public var x:Number;

        public var y:Number;

        public var z:Number;

        public static var toDEGREES:Number=57.2957795131;

        private static var temp:org.papervision3d.core.math.Number3D;

        public static var toRADIANS:Number=0.0174532925199;
    }
}


//          class NumberUV
package org.papervision3d.core.math 
{
    public class NumberUV extends Object
    {
        public function NumberUV(arg1:Number=0, arg2:Number=0)
        {
            super();
            this.u = arg1;
            this.v = arg2;
            return;
        }

        public function toString():String
        {
            return "u:" + this.u + " v:" + this.v;
        }

        public function clone():org.papervision3d.core.math.NumberUV
        {
            return new org.papervision3d.core.math.NumberUV(this.u, this.v);
        }

        public static function get ZERO():org.papervision3d.core.math.NumberUV
        {
            return new NumberUV(0, 0);
        }

        public static function median(arg1:org.papervision3d.core.math.NumberUV, arg2:org.papervision3d.core.math.NumberUV):org.papervision3d.core.math.NumberUV
        {
            if (arg1 == null)
            {
                return null;
            }
            if (arg2 == null)
            {
                return null;
            }
            return new NumberUV((arg1.u + arg2.u) / 2, (arg1.v + arg2.v) / 2);
        }

        public static function weighted(arg1:org.papervision3d.core.math.NumberUV, arg2:org.papervision3d.core.math.NumberUV, arg3:Number, arg4:Number):org.papervision3d.core.math.NumberUV
        {
            if (arg1 == null)
            {
                return null;
            }
            if (arg2 == null)
            {
                return null;
            }
            var loc1:*;
            loc1 = arg3 + arg4;
            var loc2:*;
            loc2 = arg3 / loc1;
            var loc3:*;
            loc3 = arg4 / loc1;
            return new NumberUV(arg1.u * loc2 + arg2.u * loc3, arg1.v * loc2 + arg2.v * loc3);
        }

        public var u:Number;

        public var v:Number;
    }
}


//          class Quaternion
package org.papervision3d.core.math 
{
    public class Quaternion extends Object
    {
        public function Quaternion(arg1:Number=0, arg2:Number=0, arg3:Number=0, arg4:Number=1)
        {
            super();
            this.x = arg1;
            this.y = arg2;
            this.z = arg3;
            this.w = arg4;
            this._matrix = org.papervision3d.core.math.Matrix3D.IDENTITY;
            return;
        }

        public function get matrix():org.papervision3d.core.math.Matrix3D
        {
            var loc1:*;
            loc1 = this.x * this.x;
            var loc2:*;
            loc2 = this.x * this.y;
            var loc3:*;
            loc3 = this.x * this.z;
            var loc4:*;
            loc4 = this.x * this.w;
            var loc5:*;
            loc5 = this.y * this.y;
            var loc6:*;
            loc6 = this.y * this.z;
            var loc7:*;
            loc7 = this.y * this.w;
            var loc8:*;
            loc8 = this.z * this.z;
            var loc9:*;
            loc9 = this.z * this.w;
            this._matrix.n11 = 1 - 2 * (loc5 + loc8);
            this._matrix.n12 = 2 * (loc2 - loc9);
            this._matrix.n13 = 2 * (loc3 + loc7);
            this._matrix.n21 = 2 * (loc2 + loc9);
            this._matrix.n22 = 1 - 2 * (loc1 + loc8);
            this._matrix.n23 = 2 * (loc6 - loc4);
            this._matrix.n31 = 2 * (loc3 - loc7);
            this._matrix.n32 = 2 * (loc6 + loc4);
            this._matrix.n33 = 1 - 2 * (loc1 + loc5);
            return this._matrix;
        }

        public function setFromEuler(arg1:Number, arg2:Number, arg3:Number, arg4:Boolean=false):void
        {
            if (arg4)
            {
                arg1 = arg1 * DEGTORAD;
                arg2 = arg2 * DEGTORAD;
                arg3 = arg3 * DEGTORAD;
            }
            var loc1:*;
            loc1 = Math.sin(arg1 * 0.5);
            var loc2:*;
            loc2 = Math.cos(arg1 * 0.5);
            var loc3:*;
            loc3 = Math.sin(arg2 * 0.5);
            var loc4:*;
            loc4 = Math.cos(arg2 * 0.5);
            var loc5:*;
            loc5 = Math.sin(arg3 * 0.5);
            var loc6:*;
            loc6 = Math.cos(arg3 * 0.5);
            var loc7:*;
            loc7 = loc2 * loc4;
            var loc8:*;
            loc8 = loc1 * loc3;
            this.x = loc5 * loc7 - loc6 * loc8;
            this.y = loc6 * loc1 * loc4 + loc5 * loc2 * loc3;
            this.z = loc6 * loc2 * loc3 - loc5 * loc1 * loc4;
            this.w = loc6 * loc7 + loc5 * loc8;
            return;
        }

        public function setFromAxisAngle(arg1:Number, arg2:Number, arg3:Number, arg4:Number):void
        {
            var loc1:*;
            loc1 = Math.sin(arg4 / 2);
            var loc2:*;
            loc2 = Math.cos(arg4 / 2);
            this.x = arg1 * loc1;
            this.y = arg2 * loc1;
            this.z = arg3 * loc1;
            this.w = loc2;
            this.normalize();
            return;
        }

        public function calculateMultiply(arg1:org.papervision3d.core.math.Quaternion, arg2:org.papervision3d.core.math.Quaternion):void
        {
            this.x = arg1.w * arg2.x + arg1.x * arg2.w + arg1.y * arg2.z - arg1.z * arg2.y;
            this.y = arg1.w * arg2.y - arg1.x * arg2.z + arg1.y * arg2.w + arg1.z * arg2.x;
            this.z = arg1.w * arg2.z + arg1.x * arg2.y - arg1.y * arg2.x + arg1.z * arg2.w;
            this.w = arg1.w * arg2.w - arg1.x * arg2.x - arg1.y * arg2.y - arg1.z * arg2.z;
            return;
        }

        public function toString():String
        {
            return "Quaternion: x:" + this.x + " y:" + this.y + " z:" + this.z + " w:" + this.w;
        }

        public function normalize():void
        {
            var loc2:*;
            loc2 = NaN;
            var loc1:*;
            loc1 = this.modulo;
            if (Math.abs(loc1) < EPSILON)
            {
                var loc3:*;
                this.z = loc3 = 0;
                this.y = loc3 = loc3;
                this.x = loc3;
                this.w = 1;
            }
            else 
            {
                loc2 = 1 / loc1;
                this.x = this.x * loc2;
                this.y = this.y * loc2;
                this.z = this.z * loc2;
                this.w = this.w * loc2;
            }
            return;
        }

        public function toEuler():org.papervision3d.core.math.Number3D
        {
            var loc1:*;
            loc1 = new org.papervision3d.core.math.Number3D();
            var loc2:*;
            loc2 = this;
            var loc3:*;
            loc3 = loc2.x * loc2.y + loc2.z * loc2.w;
            if (loc3 > 0.499)
            {
                loc1.x = 2 * Math.atan2(loc2.x, loc2.w);
                loc1.y = Math.PI / 2;
                loc1.z = 0;
                return loc1;
            }
            if (loc3 < -0.499)
            {
                loc1.x = -2 * Math.atan2(loc2.x, loc2.w);
                loc1.y = (-Math.PI) / 2;
                loc1.z = 0;
                return loc1;
            }
            var loc4:*;
            loc4 = loc2.x * loc2.x;
            var loc5:*;
            loc5 = loc2.y * loc2.y;
            var loc6:*;
            loc6 = loc2.z * loc2.z;
            loc1.x = Math.atan2(2 * loc2.y * loc2.w - 2 * loc2.x * loc2.z, 1 - 2 * loc5 - 2 * loc6);
            loc1.y = Math.asin(2 * loc3);
            loc1.z = Math.atan2(2 * loc2.x * loc2.w - 2 * loc2.y * loc2.z, 1 - 2 * loc4 - 2 * loc6);
            return loc1;
        }

        public function get modulo():Number
        {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
        }

        public function clone():org.papervision3d.core.math.Quaternion
        {
            return new org.papervision3d.core.math.Quaternion(this.x, this.y, this.z, this.w);
        }

        public function mult(arg1:org.papervision3d.core.math.Quaternion):void
        {
            var loc1:*;
            loc1 = this.w;
            var loc2:*;
            loc2 = this.x;
            var loc3:*;
            loc3 = this.y;
            var loc4:*;
            loc4 = this.z;
            this.x = loc1 * arg1.x + loc2 * arg1.w + loc3 * arg1.z - loc4 * arg1.y;
            this.y = loc1 * arg1.y - loc2 * arg1.z + loc3 * arg1.w + loc4 * arg1.x;
            this.z = loc1 * arg1.z + loc2 * arg1.y - loc3 * arg1.x + loc4 * arg1.w;
            this.w = loc1 * arg1.w - loc2 * arg1.x - loc3 * arg1.y - loc4 * arg1.z;
            return;
        }

        public static function sub(arg1:org.papervision3d.core.math.Quaternion, arg2:org.papervision3d.core.math.Quaternion):org.papervision3d.core.math.Quaternion
        {
            return new Quaternion(arg1.x - arg2.x, arg1.y - arg2.y, arg1.z - arg2.z, arg1.w - arg2.w);
        }

        public static function add(arg1:org.papervision3d.core.math.Quaternion, arg2:org.papervision3d.core.math.Quaternion):org.papervision3d.core.math.Quaternion
        {
            return new Quaternion(arg1.x + arg2.x, arg1.y + arg2.y, arg1.z + arg2.z, arg1.w + arg2.w);
        }

        public static function createFromEuler(arg1:Number, arg2:Number, arg3:Number, arg4:Boolean=false):org.papervision3d.core.math.Quaternion
        {
            if (arg4)
            {
                arg1 = arg1 * DEGTORAD;
                arg2 = arg2 * DEGTORAD;
                arg3 = arg3 * DEGTORAD;
            }
            var loc1:*;
            loc1 = Math.sin(arg1 * 0.5);
            var loc2:*;
            loc2 = Math.cos(arg1 * 0.5);
            var loc3:*;
            loc3 = Math.sin(arg2 * 0.5);
            var loc4:*;
            loc4 = Math.cos(arg2 * 0.5);
            var loc5:*;
            loc5 = Math.sin(arg3 * 0.5);
            var loc6:*;
            loc6 = Math.cos(arg3 * 0.5);
            var loc7:*;
            loc7 = loc2 * loc4;
            var loc8:*;
            loc8 = loc1 * loc3;
            var loc9:*;
            (loc9 = new Quaternion()).x = loc5 * loc7 - loc6 * loc8;
            loc9.y = loc6 * loc1 * loc4 + loc5 * loc2 * loc3;
            loc9.z = loc6 * loc2 * loc3 - loc5 * loc1 * loc4;
            loc9.w = loc6 * loc7 + loc5 * loc8;
            return loc9;
        }

        public static function createFromMatrix(arg1:org.papervision3d.core.math.Matrix3D):org.papervision3d.core.math.Quaternion
        {
            var loc2:*;
            loc2 = NaN;
            var loc4:*;
            loc4 = 0;
            var loc5:*;
            loc5 = 0;
            var loc6:*;
            loc6 = 0;
            var loc8:*;
            loc8 = null;
            var loc9:*;
            loc9 = null;
            var loc1:*;
            loc1 = new Quaternion();
            var loc3:*;
            loc3 = new Array(4);
            var loc7:*;
            if ((loc7 = arg1.n11 + arg1.n22 + arg1.n33) > 0)
            {
                loc2 = Math.sqrt(loc7 + 1);
                loc1.w = loc2 / 2;
                loc2 = 0.5 / loc2;
                loc1.x = (arg1.n32 - arg1.n23) * loc2;
                loc1.y = (arg1.n13 - arg1.n31) * loc2;
                loc1.z = (arg1.n21 - arg1.n12) * loc2;
            }
            else 
            {
                loc8 = [1, 2, 0];
                loc9 = [[arg1.n11, arg1.n12, arg1.n13, arg1.n14], [arg1.n21, arg1.n22, arg1.n23, arg1.n24], [arg1.n31, arg1.n32, arg1.n33, arg1.n34]];
                loc4 = 0;
                if (loc9[1][1] > loc9[0][0])
                {
                    loc4 = 1;
                }
                if (loc9[2][2] > loc9[loc4][loc4])
                {
                    loc4 = 2;
                }
                loc5 = loc8[loc4];
                loc6 = loc8[loc5];
                loc2 = Math.sqrt(loc9[loc4][loc4] - (loc9[loc5][loc5] + loc9[loc6][loc6]) + 1);
                loc3[loc4] = loc2 * 0.5;
                if (loc2 != 0)
                {
                    loc2 = 0.5 / loc2;
                }
                loc3[3] = (loc9[loc6][loc5] - loc9[loc5][loc6]) * loc2;
                loc3[loc5] = (loc9[loc5][loc4] + loc9[loc4][loc5]) * loc2;
                loc3[loc6] = (loc9[loc6][loc4] + loc9[loc4][loc6]) * loc2;
                loc1.x = loc3[0];
                loc1.y = loc3[1];
                loc1.z = loc3[2];
                loc1.w = loc3[3];
            }
            return loc1;
        }

        public static function dot(arg1:org.papervision3d.core.math.Quaternion, arg2:org.papervision3d.core.math.Quaternion):Number
        {
            return arg1.x * arg2.x + arg1.y * arg2.y + arg1.z * arg2.z + arg1.w * arg2.w;
        }

        public static function multiply(arg1:org.papervision3d.core.math.Quaternion, arg2:org.papervision3d.core.math.Quaternion):org.papervision3d.core.math.Quaternion
        {
            var loc1:*;
            loc1 = new Quaternion();
            loc1.x = arg1.w * arg2.x + arg1.x * arg2.w + arg1.y * arg2.z - arg1.z * arg2.y;
            loc1.y = arg1.w * arg2.y - arg1.x * arg2.z + arg1.y * arg2.w + arg1.z * arg2.x;
            loc1.z = arg1.w * arg2.z + arg1.x * arg2.y - arg1.y * arg2.x + arg1.z * arg2.w;
            loc1.w = arg1.w * arg2.w - arg1.x * arg2.x - arg1.y * arg2.y - arg1.z * arg2.z;
            return loc1;
        }

        public static function createFromAxisAngle(arg1:Number, arg2:Number, arg3:Number, arg4:Number):org.papervision3d.core.math.Quaternion
        {
            var loc1:*;
            (loc1 = new Quaternion()).setFromAxisAngle(arg1, arg2, arg3, arg4);
            return loc1;
        }

        public static function slerp(arg1:org.papervision3d.core.math.Quaternion, arg2:org.papervision3d.core.math.Quaternion, arg3:Number):org.papervision3d.core.math.Quaternion
        {
            var loc2:*;
            loc2 = NaN;
            var loc3:*;
            loc3 = NaN;
            var loc4:*;
            loc4 = NaN;
            var loc5:*;
            loc5 = NaN;
            var loc1:*;
            if ((loc1 = arg1.w * arg2.w + arg1.x * arg2.x + arg1.y * arg2.y + arg1.z * arg2.z) < 0)
            {
                arg1.x = arg1.x * -1;
                arg1.y = arg1.y * -1;
                arg1.z = arg1.z * -1;
                arg1.w = arg1.w * -1;
                loc1 = loc1 * -1;
            }
            if (loc1 + 1 > EPSILON)
            {
                if (1 - loc1 >= EPSILON)
                {
                    loc4 = Math.acos(loc1);
                    loc5 = 1 / Math.sin(loc4);
                    loc2 = Math.sin(loc4 * (1 - arg3)) * loc5;
                    loc3 = Math.sin(loc4 * arg3) * loc5;
                }
                else 
                {
                    loc2 = 1 - arg3;
                    loc3 = arg3;
                }
            }
            else 
            {
                arg2.y = -arg1.y;
                arg2.x = arg1.x;
                arg2.w = -arg1.w;
                arg2.z = arg1.z;
                loc2 = Math.sin(Math.PI * (0.5 - arg3));
                loc3 = Math.sin(Math.PI * arg3);
            }
            return new Quaternion(loc2 * arg1.x + loc3 * arg2.x, loc2 * arg1.y + loc3 * arg2.y, loc2 * arg1.z + loc3 * arg2.z, loc2 * arg1.w + loc3 * arg2.w);
        }

        public static function createFromOrthoMatrix(arg1:org.papervision3d.core.math.Matrix3D):org.papervision3d.core.math.Quaternion
        {
            var loc1:*;
            loc1 = new Quaternion();
            loc1.w = Math.sqrt(Math.max(0, 1 + arg1.n11 + arg1.n22 + arg1.n33)) / 2;
            loc1.x = Math.sqrt(Math.max(0, 1 + arg1.n11 - arg1.n22 - arg1.n33)) / 2;
            loc1.y = Math.sqrt(Math.max(0, 1 - arg1.n11 + arg1.n22 - arg1.n33)) / 2;
            loc1.z = Math.sqrt(Math.max(0, 1 - arg1.n11 - arg1.n22 + arg1.n33)) / 2;
            loc1.x = arg1.n32 - arg1.n23 < 0 ? loc1.x < 0 ? loc1.x : -loc1.x : loc1.x < 0 ? -loc1.x : loc1.x;
            loc1.y = arg1.n13 - arg1.n31 < 0 ? loc1.y < 0 ? loc1.y : -loc1.y : loc1.y < 0 ? -loc1.y : loc1.y;
            loc1.z = arg1.n21 - arg1.n12 < 0 ? loc1.z < 0 ? loc1.z : -loc1.z : loc1.z < 0 ? -loc1.z : loc1.z;
            return loc1;
        }

        public static function conjugate(arg1:org.papervision3d.core.math.Quaternion):org.papervision3d.core.math.Quaternion
        {
            var loc1:*;
            loc1 = new Quaternion();
            loc1.x = -arg1.x;
            loc1.y = -arg1.y;
            loc1.z = -arg1.z;
            loc1.w = arg1.w;
            return loc1;
        }

        public static function slerpOld(arg1:org.papervision3d.core.math.Quaternion, arg2:org.papervision3d.core.math.Quaternion, arg3:Number):org.papervision3d.core.math.Quaternion
        {
            var loc1:*;
            loc1 = new Quaternion();
            var loc2:*;
            loc2 = arg1.w * arg2.w + arg1.x * arg2.x + arg1.y * arg2.y + arg1.z * arg2.z;
            if (Math.abs(loc2) >= 1)
            {
                loc1.w = arg1.w;
                loc1.x = arg1.x;
                loc1.y = arg1.y;
                loc1.z = arg1.z;
                return loc1;
            }
            var loc3:*;
            loc3 = Math.acos(loc2);
            var loc4:*;
            loc4 = Math.sqrt(1 - loc2 * loc2);
            if (Math.abs(loc4) < 0.001)
            {
                loc1.w = arg1.w * 0.5 + arg2.w * 0.5;
                loc1.x = arg1.x * 0.5 + arg2.x * 0.5;
                loc1.y = arg1.y * 0.5 + arg2.y * 0.5;
                loc1.z = arg1.z * 0.5 + arg2.z * 0.5;
                return loc1;
            }
            var loc5:*;
            loc5 = Math.sin((1 - arg3) * loc3) / loc4;
            var loc6:*;
            loc6 = Math.sin(arg3 * loc3) / loc4;
            loc1.w = arg1.w * loc5 + arg2.w * loc6;
            loc1.x = arg1.x * loc5 + arg2.x * loc6;
            loc1.y = arg1.y * loc5 + arg2.y * loc6;
            loc1.z = arg1.z * loc5 + arg2.z * loc6;
            return loc1;
        }

        public static const EPSILON:Number=1e-006;

        public static const DEGTORAD:Number=Math.PI / 180;

        public static const RADTODEG:Number=180 / Math.PI;

        private var _matrix:org.papervision3d.core.math.Matrix3D;

        public var w:Number;

        public var x:Number;

        public var y:Number;

        public var z:Number;
    }
}


//        package ns
//          namespace pv3dview
package org.papervision3d.core.ns 
{
    public namespace pv3dview="org.papervision3d.core.ns:pv3dview";
}


//        package proto
//          class CameraObject3D
package org.papervision3d.core.proto 
{
    import flash.geom.*;
    import org.papervision3d.*;
    import org.papervision3d.core.culling.*;
    import org.papervision3d.core.log.*;
    import org.papervision3d.core.math.*;
    import org.papervision3d.core.math.util.*;
    import org.papervision3d.core.render.data.*;
    import org.papervision3d.objects.*;
    
    public class CameraObject3D extends org.papervision3d.objects.DisplayObject3D
    {
        public function CameraObject3D(arg1:Number=500, arg2:Number=3)
        {
            super();
            this.x = DEFAULT_POS.x;
            this.y = DEFAULT_POS.y;
            this.z = DEFAULT_POS.z;
            this.zoom = arg2;
            this.focus = arg1;
            this.eye = org.papervision3d.core.math.Matrix3D.IDENTITY;
            this.viewport = DEFAULT_VIEWPORT;
            this.sort = true;
            this._ortho = false;
            this._orthoScaleMatrix = org.papervision3d.core.math.Matrix3D.scaleMatrix(1, 1, 1);
            if (org.papervision3d.Papervision3D.useRIGHTHANDED)
            {
                DEFAULT_UP.y = -1;
                this.yUP = false;
                this.lookAt(org.papervision3d.objects.DisplayObject3D.ZERO);
            }
            else 
            {
                this.yUP = true;
            }
            return;
        }

        public function get target():org.papervision3d.objects.DisplayObject3D
        {
            return this._target;
        }

        public function get useProjectionMatrix():Boolean
        {
            return this._useProjectionMatrix;
        }

        public function set fov(arg1:Number):void
        {
            if (!this.viewport || this.viewport.isEmpty())
            {
                org.papervision3d.core.log.PaperLogger.warning("CameraObject3D#viewport not set, can\'t set fov!");
                return;
            }
            var loc1:*;
            loc1 = 0;
            var loc2:*;
            loc2 = 0;
            var loc3:*;
            loc3 = 0;
            if (this._target)
            {
                loc1 = this._target.world.n14;
                loc2 = this._target.world.n24;
                loc3 = this._target.world.n34;
            }
            var loc4:*;
            loc4 = this.viewport.height / 2;
            var loc5:*;
            loc5 = arg1 / 2 * Math.PI / 180;
            this.focus = loc4 / Math.tan(loc5) / this.zoom;
            return;
        }

        public function pan(arg1:Number):void
        {
            return;
        }

        public function get far():Number
        {
            return this._far;
        }

        public function set target(arg1:org.papervision3d.objects.DisplayObject3D):void
        {
            this._target = arg1;
            return;
        }

        public function projectFaces(arg1:Array, arg2:org.papervision3d.objects.DisplayObject3D, arg3:org.papervision3d.core.render.data.RenderSessionData):Number
        {
            return 0;
        }

        public function get useCulling():Boolean
        {
            return this._useCulling;
        }

        public function set far(arg1:Number):void
        {
            if (arg1 > this.focus)
            {
                this._far = arg1;
            }
            return;
        }

        public function get near():Number
        {
            return this.focus;
        }

        public function transformView(arg1:org.papervision3d.core.math.Matrix3D=null):void
        {
            if (this.yUP)
            {
                this.eye.calculateMultiply(arg1 || this.transform, _flipY);
                this.eye.invert();
            }
            else 
            {
                this.eye.calculateInverse(arg1 || this.transform);
            }
            return;
        }

        public function set useProjectionMatrix(arg1:Boolean):void
        {
            this._useProjectionMatrix = arg1;
            return;
        }

        public function tilt(arg1:Number):void
        {
            return;
        }

        public override function lookAt(arg1:org.papervision3d.objects.DisplayObject3D, arg2:org.papervision3d.core.math.Number3D=null):void
        {
            if (this.yUP)
            {
                super.lookAt(arg1, arg2);
            }
            else 
            {
                super.lookAt(arg1, arg2 || DEFAULT_UP);
            }
            return;
        }

        public function get ortho():Boolean
        {
            return this._ortho;
        }

        public function orbit(arg1:Number, arg2:Number, arg3:Boolean=true, arg4:org.papervision3d.objects.DisplayObject3D=null):void
        {
            return;
        }

        public function get fov():Number
        {
            if (!this.viewport || this.viewport.isEmpty())
            {
                org.papervision3d.core.log.PaperLogger.warning("CameraObject3D#viewport not set, can\'t calculate fov!");
                return NaN;
            }
            var loc1:*;
            loc1 = 0;
            var loc2:*;
            loc2 = 0;
            var loc3:*;
            loc3 = 0;
            if (this._target)
            {
                loc1 = this._target.world.n14;
                loc2 = this._target.world.n24;
                loc3 = this._target.world.n34;
            }
            var loc4:*;
            loc4 = this.x - loc1;
            var loc5:*;
            loc5 = this.y - loc2;
            var loc6:*;
            loc6 = this.z - loc3;
            var loc7:*;
            loc7 = this.focus;
            var loc8:*;
            loc8 = this.zoom;
            var loc9:*;
            loc9 = Math.sqrt(loc4 * loc4 + loc5 * loc5 + loc6 * loc6) + loc7;
            var loc10:*;
            loc10 = this.viewport.height / 2;
            var loc11:*;
            loc11 = 180 / Math.PI;
            return Math.atan(loc9 / loc7 / loc8 * loc10 / loc9) * loc11 * 2;
        }

        public function set near(arg1:Number):void
        {
            if (arg1 > 0)
            {
                this.focus = arg1;
            }
            return;
        }

        public function set useCulling(arg1:Boolean):void
        {
            this._useCulling = arg1;
            return;
        }

        public function set orthoScale(arg1:Number):void
        {
            this._orthoScale = arg1 > 0 ? arg1 : 0.0001;
            this._orthoScaleMatrix.n11 = this._orthoScale;
            this._orthoScaleMatrix.n22 = this._orthoScale;
            this._orthoScaleMatrix.n33 = this._orthoScale;
            return;
        }

        public function unproject(arg1:Number, arg2:Number, arg3:Number=0):org.papervision3d.core.math.Number3D
        {
            var loc1:*;
            loc1 = null;
            var loc2:*;
            loc2 = null;
            var loc3:*;
            loc3 = null;
            var loc4:*;
            loc4 = null;
            var loc5:*;
            loc5 = null;
            var loc6:*;
            loc6 = null;
            var loc7:*;
            loc7 = null;
            var loc8:*;
            loc8 = null;
            var loc9:*;
            loc9 = NaN;
            if (this._useProjectionMatrix)
            {
                if (!this.viewport)
                {
                    return null;
                }
                loc2 = this.transform;
                loc3 = [(-this.viewport.width) / 2, (-this.viewport.height) / 2, this.viewport.width, this.viewport.height];
                loc4 = [loc2.n11, loc2.n21, loc2.n31, loc2.n41, loc2.n12, loc2.n22, loc2.n32, loc2.n42, loc2.n13, loc2.n23, loc2.n33, loc2.n43, loc2.n14, loc2.n24, loc2.n34, loc2.n44];
                loc5 = new Array(16);
                loc6 = new Array(4);
                org.papervision3d.core.math.util.GLU.invertMatrix(loc4, loc4);
                if (this._ortho)
                {
                    loc7 = new Array(16);
                    loc8 = new Array(16);
                    org.papervision3d.core.math.util.GLU.ortho(loc8, this.viewport.width / 2, (-this.viewport.width) / 2, (-this.viewport.height) / 2, this.viewport.height / 2, this.far, this.near);
                    org.papervision3d.core.math.util.GLU.scale(loc7, this._orthoScale, this._orthoScale, 1);
                    org.papervision3d.core.math.util.GLU.multMatrices(loc7, loc8, loc5);
                }
                else 
                {
                    org.papervision3d.core.math.util.GLU.perspective(loc5, this.fov, this.viewport.width / this.viewport.height, -this.near, -this.far);
                }
                org.papervision3d.core.math.util.GLU.unProject(-arg1, arg2, arg3, loc4, loc5, loc3, loc6);
                (loc1 = new org.papervision3d.core.math.Number3D()).x = loc6[0];
                loc1.y = loc6[1];
                loc1.z = loc6[2];
            }
            else 
            {
                loc9 = this.focus * this.zoom / this.focus;
                loc1 = new org.papervision3d.core.math.Number3D(arg1 / loc9, (this.yUP ? -arg2 : arg2) / loc9, this.focus);
                org.papervision3d.core.math.Matrix3D.multiplyVector3x3(transform, loc1);
            }
            return loc1;
        }

        public function set ortho(arg1:Boolean):void
        {
            this._ortho = arg1;
            return;
        }

        public function projectVertices(arg1:Array, arg2:org.papervision3d.objects.DisplayObject3D, arg3:org.papervision3d.core.render.data.RenderSessionData):Number
        {
            return 0;
        }

        public function get orthoScale():Number
        {
            return this._orthoScale;
        }

        
        {
            DEFAULT_POS = new org.papervision3d.core.math.Number3D(0, 0, -1000);
            DEFAULT_UP = new org.papervision3d.core.math.Number3D(0, 1, 0);
            DEFAULT_VIEWPORT = new flash.geom.Rectangle(0, 0, 550, 400);
            _flipY = org.papervision3d.core.math.Matrix3D.scaleMatrix(1, -1, 1);
        }

        protected var _orthoScale:Number=1;

        public var culler:org.papervision3d.core.culling.IObjectCuller;

        public var sort:Boolean;

        public var viewport:flash.geom.Rectangle;

        protected var _target:org.papervision3d.objects.DisplayObject3D;

        protected var _orthoScaleMatrix:org.papervision3d.core.math.Matrix3D;

        public var eye:org.papervision3d.core.math.Matrix3D;

        protected var _ortho:Boolean;

        protected var _useCulling:Boolean;

        public var zoom:Number;

        public var yUP:Boolean;

        public var focus:Number;

        protected var _useProjectionMatrix:Boolean;

        protected var _far:Number;

        public static var DEFAULT_VIEWPORT:flash.geom.Rectangle;

        public static var DEFAULT_POS:org.papervision3d.core.math.Number3D;

        public static var DEFAULT_UP:org.papervision3d.core.math.Number3D;

        private static var _flipY:org.papervision3d.core.math.Matrix3D;
    }
}


//          class DisplayObjectContainer3D
package org.papervision3d.core.proto 
{
    import flash.events.*;
    import flash.utils.*;
    import org.papervision3d.core.log.*;
    import org.papervision3d.objects.*;
    
    public class DisplayObjectContainer3D extends flash.events.EventDispatcher
    {
        public function DisplayObjectContainer3D()
        {
            super();
            this._children = new flash.utils.Dictionary(false);
            this._childrenByName = new flash.utils.Dictionary(true);
            this._childrenTotal = 0;
            return;
        }

        private function findChildByName(arg1:String, arg2:org.papervision3d.objects.DisplayObject3D=null):org.papervision3d.objects.DisplayObject3D
        {
            var loc1:*;
            loc1 = null;
            var loc2:*;
            loc2 = null;
            arg2 = arg2 || org.papervision3d.objects.DisplayObject3D(this);
            if (!arg2)
            {
                return null;
            }
            if (arg2.name == arg1)
            {
                return arg2;
            }
            var loc3:*;
            loc3 = 0;
            var loc4:*;
            loc4 = arg2.children;
            for each (loc1 in loc4)
            {
                if (!(loc2 = this.findChildByName(arg1, loc1)))
                {
                    continue;
                }
                return loc2;
            }
            return null;
        }

        public function getChildByName(arg1:String, arg2:Boolean=false):org.papervision3d.objects.DisplayObject3D
        {
            if (arg2)
            {
                return this.findChildByName(arg1);
            }
            return this._childrenByName[arg1];
        }

        public override function toString():String
        {
            return this.childrenList();
        }

        public function addChildren(arg1:org.papervision3d.objects.DisplayObject3D):org.papervision3d.core.proto.DisplayObjectContainer3D
        {
            var loc1:*;
            loc1 = null;
            var loc2:*;
            loc2 = 0;
            var loc3:*;
            loc3 = arg1.children;
            for each (loc1 in loc3)
            {
                arg1.removeChild(loc1);
                this.addChild(loc1);
            }
            return this;
        }

        public function get numChildren():int
        {
            return this._childrenTotal;
        }

        public function removeChild(arg1:org.papervision3d.objects.DisplayObject3D):org.papervision3d.objects.DisplayObject3D
        {
            if (arg1 && this._children[arg1])
            {
                delete this._childrenByName[this._children[arg1]];
                delete this._children[arg1];
                arg1.parent = null;
                arg1.root = null;
                var loc1:*;
                var loc2:*;
                loc2 = ((loc1 = this)._childrenTotal - 1);
                loc1._childrenTotal = loc2;
                return arg1;
            }
            return null;
        }

        public function removeChildByName(arg1:String):org.papervision3d.objects.DisplayObject3D
        {
            return this.removeChild(this.getChildByName(arg1));
        }

        public function addChild(arg1:org.papervision3d.objects.DisplayObject3D, arg2:String=null):org.papervision3d.objects.DisplayObject3D
        {
            if (arg1.parent)
            {
                org.papervision3d.core.log.PaperLogger.error("DisplayObjectContainer.addChild : DisplayObject3D already has a parent, ie is already added to scene.");
            }
            arg2 = arg2 || arg1.name || String(arg1.id);
            this._children[arg1] = arg2;
            this._childrenByName[arg2] = arg1;
            var loc1:*;
            var loc2:*;
            loc2 = ((loc1 = this)._childrenTotal + 1);
            loc1._childrenTotal = loc2;
            arg1.parent = this;
            arg1.root = this.root;
            return arg1;
        }

        public function childrenList():String
        {
            var loc2:*;
            loc2 = null;
            var loc1:*;
            loc1 = "";
            var loc3:*;
            loc3 = 0;
            var loc4:*;
            loc4 = this._children;
            for (loc2 in loc4)
            {
                loc1 = loc1 + loc2 + "\n";
            }
            return loc1;
        }

        public function get children():Object
        {
            return this._childrenByName;
        }

        protected var _childrenByName:Object;

        public var root:org.papervision3d.core.proto.DisplayObjectContainer3D;

        private var _childrenTotal:int;

        protected var _children:flash.utils.Dictionary;
    }
}


//          class GeometryObject3D
package org.papervision3d.core.proto 
{
    import flash.events.*;
    import flash.utils.*;
    import org.papervision3d.core.geom.renderables.*;
    import org.papervision3d.core.math.*;
    import org.papervision3d.objects.*;
    
    public class GeometryObject3D extends flash.events.EventDispatcher
    {
        public function GeometryObject3D()
        {
            super();
            this.dirty = true;
            return;
        }

        public function transformVertices(arg1:org.papervision3d.core.math.Matrix3D):void
        {
            var loc14:*;
            loc14 = null;
            var loc15:*;
            loc15 = NaN;
            var loc16:*;
            loc16 = NaN;
            var loc17:*;
            loc17 = NaN;
            var loc18:*;
            loc18 = NaN;
            var loc19:*;
            loc19 = NaN;
            var loc20:*;
            loc20 = NaN;
            var loc1:*;
            loc1 = arg1.n11;
            var loc2:*;
            loc2 = arg1.n12;
            var loc3:*;
            loc3 = arg1.n13;
            var loc4:*;
            loc4 = arg1.n21;
            var loc5:*;
            loc5 = arg1.n22;
            var loc6:*;
            loc6 = arg1.n23;
            var loc7:*;
            loc7 = arg1.n31;
            var loc8:*;
            loc8 = arg1.n32;
            var loc9:*;
            loc9 = arg1.n33;
            var loc10:*;
            loc10 = arg1.n14;
            var loc11:*;
            loc11 = arg1.n24;
            var loc12:*;
            loc12 = arg1.n34;
            var loc13:*;
            loc13 = this.vertices.length;
            for (;;) 
            {
                var loc21:*;
                loc14 = loc21 = this.vertices[--loc13];
                if (!loc21)
                {
                    break;
                }
                loc15 = loc14.x;
                loc16 = loc14.y;
                loc17 = loc14.z;
                loc18 = loc15 * loc1 + loc16 * loc2 + loc17 * loc3 + loc10;
                loc19 = loc15 * loc4 + loc16 * loc5 + loc17 * loc6 + loc11;
                loc20 = loc15 * loc7 + loc16 * loc8 + loc17 * loc9 + loc12;
                loc14.x = loc18;
                loc14.y = loc19;
                loc14.z = loc20;
            }
            return;
        }

        public function set ready(arg1:Boolean):void
        {
            if (arg1)
            {
                this.createVertexNormals();
                this.dirty = false;
            }
            this._ready = arg1;
            return;
        }

        public function flipFaces():void
        {
            var loc1:*;
            loc1 = null;
            var loc2:*;
            loc2 = null;
            var loc3:*;
            loc3 = 0;
            var loc4:*;
            loc4 = this.faces;
            for each (loc1 in loc4)
            {
                loc2 = loc1.v0;
                loc1.v0 = loc1.v2;
                loc1.v2 = loc2;
                loc1.createNormal();
            }
            this.ready = true;
            return;
        }

        private function createVertexNormals():void
        {
            var loc2:*;
            loc2 = null;
            var loc3:*;
            loc3 = null;
            var loc1:*;
            loc1 = new flash.utils.Dictionary(true);
            var loc4:*;
            loc4 = 0;
            var loc5:*;
            loc5 = this.faces;
            for each (loc2 in loc5)
            {
                loc2.v0.connectedFaces[loc2] = loc2;
                loc2.v1.connectedFaces[loc2] = loc2;
                loc2.v2.connectedFaces[loc2] = loc2;
                loc1[loc2.v0] = loc2.v0;
                loc1[loc2.v1] = loc2.v1;
                loc1[loc2.v2] = loc2.v2;
            }
            loc4 = 0;
            loc5 = loc1;
            for each (loc3 in loc5)
            {
                loc3.calculateNormal();
            }
            return;
        }

        public function get boundingSphere():org.papervision3d.core.math.BoundingSphere
        {
            if (this._boundingSphereDirty)
            {
                this._boundingSphere = org.papervision3d.core.math.BoundingSphere.getFromVertices(this.vertices);
                this._boundingSphereDirty = false;
            }
            return this._boundingSphere;
        }

        public function clone(arg1:org.papervision3d.objects.DisplayObject3D=null):org.papervision3d.core.proto.GeometryObject3D
        {
            var loc4:*;
            loc4 = 0;
            var loc5:*;
            loc5 = null;
            var loc6:*;
            loc6 = null;
            var loc7:*;
            loc7 = null;
            var loc8:*;
            loc8 = null;
            var loc9:*;
            loc9 = null;
            var loc10:*;
            loc10 = null;
            var loc1:*;
            loc1 = new flash.utils.Dictionary(true);
            var loc2:*;
            loc2 = new flash.utils.Dictionary(true);
            var loc3:*;
            (loc3 = new org.papervision3d.core.proto.GeometryObject3D()).vertices = new Array();
            loc3.faces = new Array();
            loc4 = 0;
            while (loc4 < this.vertices.length) 
            {
                loc6 = this.vertices[loc4];
                loc2[loc6] = loc6.clone();
                loc3.vertices.push(loc2[loc6]);
                ++loc4;
            }
            loc4 = 0;
            while (loc4 < this.faces.length) 
            {
                loc7 = this.faces[loc4];
                loc8 = loc2[loc7.v0];
                loc9 = loc2[loc7.v1];
                loc10 = loc2[loc7.v2];
                loc3.faces.push(new org.papervision3d.core.geom.renderables.Triangle3D(arg1, [loc8, loc9, loc10], loc7.material, loc7.uv));
                loc1[loc7.material] = loc7.material;
                ++loc4;
            }
            var loc11:*;
            loc11 = 0;
            var loc12:*;
            loc12 = loc1;
            for each (loc5 in loc12)
            {
                if (!loc5)
                {
                    continue;
                }
                loc5.registerObject(arg1);
            }
            return loc3;
        }

        public function get ready():Boolean
        {
            return this._ready;
        }

        public function get aabb():org.papervision3d.core.math.AxisAlignedBoundingBox
        {
            if (this._aabbDirty)
            {
                this._aabb = org.papervision3d.core.math.AxisAlignedBoundingBox.createFromVertices(this.vertices);
                this._aabbDirty = false;
            }
            return this._aabb;
        }

        protected var _boundingSphereDirty:Boolean=true;

        public var dirty:Boolean;

        protected var _aabbDirty:Boolean=true;

        public var _ready:Boolean=false;

        protected var _boundingSphere:org.papervision3d.core.math.BoundingSphere;

        public var faces:Array;

        private var _numInstances:uint=0;

        public var vertices:Array;

        protected var _aabb:org.papervision3d.core.math.AxisAlignedBoundingBox;
    }
}


//          class LightObject3D
package org.papervision3d.core.proto 
{
    import org.papervision3d.core.math.*;
    import org.papervision3d.materials.*;
    import org.papervision3d.objects.*;
    import org.papervision3d.objects.primitives.*;
    
    public class LightObject3D extends org.papervision3d.objects.DisplayObject3D
    {
        public function LightObject3D(arg1:Boolean=false, arg2:Boolean=false)
        {
            super();
            this.lightMatrix = org.papervision3d.core.math.Matrix3D.IDENTITY;
            this.showLight = arg1;
            this.flipped = arg2;
            return;
        }

        public function get showLight():Boolean
        {
            return this._showLight;
        }

        public function set showLight(arg1:Boolean):void
        {
            if (this._showLight)
            {
                removeChild(this.displaySphere);
            }
            if (arg1)
            {
                this.displaySphere = new org.papervision3d.objects.primitives.Sphere(new org.papervision3d.materials.WireframeMaterial(16776960), 10, 3, 2);
                addChild(this.displaySphere);
            }
            this._showLight = arg1;
            return;
        }

        public var flipped:Boolean;

        public var lightMatrix:org.papervision3d.core.math.Matrix3D;

        private var _showLight:Boolean;

        private var displaySphere:org.papervision3d.objects.primitives.Sphere;
    }
}


//          class MaterialObject3D
package org.papervision3d.core.proto 
{
    import flash.display.*;
    import flash.events.*;
    import flash.geom.*;
    import flash.utils.*;
    import org.papervision3d.core.render.command.*;
    import org.papervision3d.core.render.data.*;
    import org.papervision3d.core.render.draw.*;
    import org.papervision3d.core.render.material.*;
    import org.papervision3d.materials.*;
    import org.papervision3d.objects.*;
    
    public class MaterialObject3D extends flash.events.EventDispatcher implements org.papervision3d.core.render.draw.ITriangleDrawer
    {
        public function MaterialObject3D()
        {
            this.lineColor = DEFAULT_COLOR;
            this.fillColor = DEFAULT_COLOR;
            super();
            var loc1:*;
            var loc2:*;
            this.id = _totalMaterialObjects++;
            org.papervision3d.core.render.material.MaterialManager.registerMaterial(this);
            this.objects = new flash.utils.Dictionary(true);
            return;
        }

        public function getObjectList():flash.utils.Dictionary
        {
            return this.objects;
        }

        public override function toString():String
        {
            return "[MaterialObject3D] bitmap:" + this.bitmap + " lineColor:" + this.lineColor + " fillColor:" + this.fillColor;
        }

        public function drawRT(arg1:org.papervision3d.core.render.command.RenderTriangle, arg2:flash.display.Graphics, arg3:org.papervision3d.core.render.data.RenderSessionData):void
        {
            return;
        }

        public function get doubleSided():Boolean
        {
            return !this.oneSide;
        }

        public function unregisterObject(arg1:org.papervision3d.objects.DisplayObject3D):void
        {
            if (this.objects && this.objects[arg1])
            {
                this.objects[arg1] = null;
            }
            return;
        }

        public function set doubleSided(arg1:Boolean):void
        {
            this.oneSide = !arg1;
            return;
        }

        public function registerObject(arg1:org.papervision3d.objects.DisplayObject3D):void
        {
            this.objects[arg1] = true;
            return;
        }

        public function updateBitmap():void
        {
            return;
        }

        public function clone():org.papervision3d.core.proto.MaterialObject3D
        {
            var loc1:*;
            loc1 = new org.papervision3d.core.proto.MaterialObject3D();
            loc1.copy(this);
            return loc1;
        }

        public function isUpdateable():Boolean
        {
            return !this.baked;
        }

        public function copy(arg1:org.papervision3d.core.proto.MaterialObject3D):void
        {
            this.bitmap = arg1.bitmap;
            this.smooth = arg1.smooth;
            this.lineColor = arg1.lineColor;
            this.lineAlpha = arg1.lineAlpha;
            this.fillColor = arg1.fillColor;
            this.fillAlpha = arg1.fillAlpha;
            this.oneSide = arg1.oneSide;
            this.opposite = arg1.opposite;
            this.invisible = arg1.invisible;
            this.name = arg1.name;
            this.maxU = arg1.maxU;
            this.maxV = arg1.maxV;
            return;
        }

        public function destroy():void
        {
            this.objects = null;
            this.bitmap = null;
            org.papervision3d.core.render.material.MaterialManager.unRegisterMaterial(this);
            return;
        }

        public function drawTriangle(arg1:org.papervision3d.core.render.command.RenderTriangle, arg2:flash.display.Graphics, arg3:org.papervision3d.core.render.data.RenderSessionData, arg4:flash.display.BitmapData=null, arg5:flash.geom.Matrix=null):void
        {
            return;
        }

        public static function get DEFAULT():org.papervision3d.core.proto.MaterialObject3D
        {
            var loc1:*;
            loc1 = new org.papervision3d.materials.WireframeMaterial();
            loc1.lineColor = 16777215 * Math.random();
            loc1.lineAlpha = 1;
            loc1.fillColor = DEFAULT_COLOR;
            loc1.fillAlpha = 1;
            loc1.doubleSided = false;
            return loc1;
        }

        public static function get DEBUG():org.papervision3d.core.proto.MaterialObject3D
        {
            var loc1:*;
            loc1 = new MaterialObject3D();
            loc1.lineColor = 16777215 * Math.random();
            loc1.lineAlpha = 1;
            loc1.fillColor = DEBUG_COLOR;
            loc1.fillAlpha = 0.37;
            loc1.doubleSided = true;
            return loc1;
        }

        
        {
            _totalMaterialObjects = 0;
            DEFAULT_COLOR = 0;
            DEBUG_COLOR = 16711935;
        }

        public var widthOffset:Number=0;

        public var name:String;

        public var heightOffset:Number=0;

        public var fillAlpha:Number=0;

        public var fillColor:Number;

        public var id:Number;

        protected var objects:flash.utils.Dictionary;

        public var baked:Boolean=false;

        public var invisible:Boolean=false;

        public var smooth:Boolean=false;

        public var bitmap:flash.display.BitmapData;

        public var lineAlpha:Number=0;

        public var lineColor:Number;

        public var lineThickness:Number=1;

        public var interactive:Boolean=false;

        public var oneSide:Boolean=true;

        public var opposite:Boolean=false;

        public var maxU:Number;

        public var tiled:Boolean=false;

        public var maxV:Number;

        public static var DEFAULT_COLOR:int=0;

        public static var DEBUG_COLOR:int=16711935;

        private static var _totalMaterialObjects:Number=0;
    }
}


//          class SceneObject3D
package org.papervision3d.core.proto 
{
    import org.papervision3d.*;
    import org.papervision3d.core.log.*;
    import org.papervision3d.materials.utils.*;
    import org.papervision3d.objects.*;
    
    public class SceneObject3D extends org.papervision3d.core.proto.DisplayObjectContainer3D
    {
        public function SceneObject3D()
        {
            super();
            this.objects = new Array();
            this.materials = new org.papervision3d.materials.utils.MaterialsList();
            org.papervision3d.core.log.PaperLogger.info(org.papervision3d.Papervision3D.NAME + " " + org.papervision3d.Papervision3D.VERSION + " (" + org.papervision3d.Papervision3D.DATE + ")\n");
            this.root = this;
            return;
        }

        public override function removeChild(arg1:org.papervision3d.objects.DisplayObject3D):org.papervision3d.objects.DisplayObject3D
        {
            super.removeChild(arg1);
            var loc1:*;
            loc1 = 0;
            while (loc1 < this.objects.length) 
            {
                if (this.objects[loc1] === arg1)
                {
                    this.objects.splice(loc1, 1);
                    return arg1;
                }
                ++loc1;
            }
            return arg1;
        }

        public override function addChild(arg1:org.papervision3d.objects.DisplayObject3D, arg2:String=null):org.papervision3d.objects.DisplayObject3D
        {
            var loc1:*;
            loc1 = super.addChild(arg1, arg2 ? arg2 : arg1.name);
            arg1.scene = this;
            arg1.parent = null;
            this.objects.push(loc1);
            return loc1;
        }

        public var objects:Array;

        public var materials:org.papervision3d.materials.utils.MaterialsList;
    }
}


//        package render
//          package command
//            class AbstractRenderListItem
package org.papervision3d.core.render.command 
{
    import flash.display.*;
    import org.papervision3d.core.render.data.*;
    
    public class AbstractRenderListItem extends Object implements org.papervision3d.core.render.command.IRenderListItem
    {
        public function AbstractRenderListItem()
        {
            super();
            return;
        }

        public function render(arg1:org.papervision3d.core.render.data.RenderSessionData, arg2:flash.display.Graphics):void
        {
            return;
        }

        public var screenZ:Number;
    }
}


//            class IRenderListItem
package org.papervision3d.core.render.command 
{
    import flash.display.*;
    import org.papervision3d.core.render.data.*;
    
    public interface IRenderListItem
    {
        function render(arg1:org.papervision3d.core.render.data.RenderSessionData, arg2:flash.display.Graphics):void;
    }
}


//            class RenderLine
package org.papervision3d.core.render.command 
{
    import flash.display.*;
    import flash.geom.*;
    import org.papervision3d.core.geom.renderables.*;
    import org.papervision3d.core.math.*;
    import org.papervision3d.core.render.data.*;
    import org.papervision3d.materials.special.*;
    
    public class RenderLine extends org.papervision3d.core.render.command.RenderableListItem implements org.papervision3d.core.render.command.IRenderListItem
    {
        public function RenderLine(arg1:org.papervision3d.core.geom.renderables.Line3D)
        {
            super();
            this.renderable = org.papervision3d.core.geom.renderables.Line3D;
            this.renderableInstance = arg1;
            this.line = arg1;
            this.instance = arg1.instance;
            this.v0 = arg1.v0.vertex3DInstance;
            this.v1 = arg1.v1.vertex3DInstance;
            this.cV = arg1.cV.vertex3DInstance;
            this.p = new org.papervision3d.core.math.Number2D();
            this.l1 = new org.papervision3d.core.math.Number2D();
            this.l2 = new org.papervision3d.core.math.Number2D();
            this.v = new org.papervision3d.core.math.Number2D();
            this.cp3d = new org.papervision3d.core.math.Number3D();
            return;
        }

        public override function render(arg1:org.papervision3d.core.render.data.RenderSessionData, arg2:flash.display.Graphics):void
        {
            this.renderer.drawLine(this, arg2, arg1);
            return;
        }

        public override function getZ(arg1:Number, arg2:Number, arg3:Number):Number
        {
            this.ax = this.v0.x;
            this.ay = this.v0.y;
            this.az = this.v0.z;
            this.bx = this.v1.x;
            this.by = this.v1.y;
            this.bz = this.v1.z;
            if (this.ax == arg1 && this.ay == arg2)
            {
                return this.az;
            }
            if (this.bx == arg1 && this.by == arg2)
            {
                return this.bz;
            }
            this.dx = this.bx - this.ax;
            this.dy = this.by - this.ay;
            this.azf = this.az / arg3;
            this.bzf = this.bz / arg3;
            this.faz = 1 + this.azf;
            this.fbz = 1 + this.bzf;
            this.xfocus = arg1;
            this.yfocus = arg2;
            this.axf = this.ax * this.faz - arg1 * this.azf;
            this.bxf = this.bx * this.fbz - arg1 * this.bzf;
            this.ayf = this.ay * this.faz - arg2 * this.azf;
            this.byf = this.by * this.fbz - arg2 * this.bzf;
            this.det = this.dx * (this.axf - this.bxf) + this.dy * (this.ayf - this.byf);
            this.db = this.dx * (this.axf - arg1) + this.dy * (this.ayf - arg2);
            this.da = this.dx * (arg1 - this.bxf) + this.dy * (arg2 - this.byf);
            return (this.da * this.az + this.db * this.bz) / this.det;
        }

        public override function hitTestPoint2D(arg1:flash.geom.Point, arg2:org.papervision3d.core.render.data.RenderHitData):org.papervision3d.core.render.data.RenderHitData
        {
            var loc1:*;
            loc1 = NaN;
            var loc2:*;
            loc2 = NaN;
            var loc3:*;
            loc3 = NaN;
            if (this.renderer.interactive)
            {
                loc1 = this.line.size;
                this.p.reset(arg1.x, arg1.y);
                this.l1.reset(this.line.v0.vertex3DInstance.x, this.line.v0.vertex3DInstance.y);
                this.l2.reset(this.line.v1.vertex3DInstance.x, this.line.v1.vertex3DInstance.y);
                this.v.copyFrom(this.l2);
                this.v.minusEq(this.l1);
                if ((loc2 = ((this.p.x - this.l1.x) * (this.l2.x - this.l1.x) + (this.p.y - this.l1.y) * (this.l2.y - this.l1.y)) / (this.v.x * this.v.x + this.v.y * this.v.y)) > 0 && loc2 < 1)
                {
                    this.v.multiplyEq(loc2);
                    this.v.plusEq(this.l1);
                    this.v.minusEq(this.p);
                    if ((loc3 = this.v.x * this.v.x + this.v.y * this.v.y) < loc1 * loc1)
                    {
                        arg2.displayObject3D = this.line.instance;
                        arg2.material = this.renderer;
                        arg2.renderable = this.line;
                        arg2.hasHit = true;
                        this.cp3d.reset(this.line.v1.x - this.line.v0.x, this.line.v1.y - this.line.v0.y, this.line.v1.x - this.line.v0.x);
                        this.cp3d.x = this.cp3d.x * loc2;
                        this.cp3d.y = this.cp3d.y * loc2;
                        this.cp3d.z = this.cp3d.z * loc2;
                        this.cp3d.x = this.cp3d.x + this.line.v0.x;
                        this.cp3d.y = this.cp3d.y + this.line.v0.y;
                        this.cp3d.z = this.cp3d.z + this.line.v0.z;
                        arg2.x = this.cp3d.x;
                        arg2.y = this.cp3d.y;
                        arg2.z = this.cp3d.z;
                        arg2.u = 0;
                        arg2.v = 0;
                        return arg2;
                    }
                }
            }
            return arg2;
        }

        
        {
            lineVector = org.papervision3d.core.math.Number3D.ZERO;
            mouseVector = org.papervision3d.core.math.Number3D.ZERO;
        }

        public var size:Number;

        private var fbz:Number;

        private var db:Number;

        private var bzf:Number;

        private var axf:Number;

        public var v1:org.papervision3d.core.geom.renderables.Vertex3DInstance;

        private var dx:Number;

        private var dy:Number;

        private var faz:Number;

        private var det:Number;

        private var ayf:Number;

        private var da:Number;

        private var ax:Number;

        private var ay:Number;

        private var az:Number;

        public var renderer:org.papervision3d.materials.special.LineMaterial;

        private var l1:org.papervision3d.core.math.Number2D;

        private var l2:org.papervision3d.core.math.Number2D;

        private var azf:Number;

        private var bxf:Number;

        public var cV:org.papervision3d.core.geom.renderables.Vertex3DInstance;

        private var bx:Number;

        private var by:Number;

        private var bz:Number;

        public var length:Number;

        private var xfocus:Number;

        private var cp3d:org.papervision3d.core.math.Number3D;

        private var byf:Number;

        private var p:org.papervision3d.core.math.Number2D;

        private var v:org.papervision3d.core.math.Number2D;

        public var v0:org.papervision3d.core.geom.renderables.Vertex3DInstance;

        public var line:org.papervision3d.core.geom.renderables.Line3D;

        private var yfocus:Number;

        private static var mouseVector:org.papervision3d.core.math.Number3D;

        private static var lineVector:org.papervision3d.core.math.Number3D;
    }
}


//            class RenderParticle
package org.papervision3d.core.render.command 
{
    import flash.display.*;
    import flash.geom.*;
    import org.papervision3d.core.geom.renderables.*;
    import org.papervision3d.core.render.data.*;
    import org.papervision3d.materials.special.*;
    
    public class RenderParticle extends org.papervision3d.core.render.command.RenderableListItem implements org.papervision3d.core.render.command.IRenderListItem
    {
        public function RenderParticle(arg1:org.papervision3d.core.geom.renderables.Particle)
        {
            super();
            this.particle = arg1;
            this.renderableInstance = arg1;
            this.renderable = org.papervision3d.core.geom.renderables.Particle;
            this.instance = arg1.instance;
            return;
        }

        public override function render(arg1:org.papervision3d.core.render.data.RenderSessionData, arg2:flash.display.Graphics):void
        {
            this.particle.material.drawParticle(this.particle, arg2, arg1);
            return;
        }

        public override function hitTestPoint2D(arg1:flash.geom.Point, arg2:org.papervision3d.core.render.data.RenderHitData):org.papervision3d.core.render.data.RenderHitData
        {
            this.renderMat = this.particle.material;
            if (this.renderMat.interactive)
            {
                if (this.particle.renderRect.contains(arg1.x, arg1.y))
                {
                    arg2.displayObject3D = this.particle.instance;
                    arg2.material = this.renderMat;
                    arg2.renderable = this.particle;
                    arg2.hasHit = true;
                    arg2.x = this.particle.x;
                    arg2.y = this.particle.y;
                    arg2.z = this.particle.z;
                    arg2.u = 0;
                    arg2.v = 0;
                    return arg2;
                }
            }
            return arg2;
        }

        public var renderMat:org.papervision3d.materials.special.ParticleMaterial;

        public var particle:org.papervision3d.core.geom.renderables.Particle;
    }
}


//            class RenderTriangle
package org.papervision3d.core.render.command 
{
    import flash.display.*;
    import flash.geom.*;
    import org.papervision3d.core.geom.renderables.*;
    import org.papervision3d.core.math.*;
    import org.papervision3d.core.proto.*;
    import org.papervision3d.core.render.data.*;
    import org.papervision3d.core.render.draw.*;
    import org.papervision3d.materials.*;
    
    public class RenderTriangle extends org.papervision3d.core.render.command.RenderableListItem implements org.papervision3d.core.render.command.IRenderListItem
    {
        public function RenderTriangle(arg1:org.papervision3d.core.geom.renderables.Triangle3D)
        {
            this.position = new org.papervision3d.core.math.Number3D();
            super();
            this.triangle = arg1;
            this.instance = arg1.instance;
            renderableInstance = arg1;
            renderable = org.papervision3d.core.geom.renderables.Triangle3D;
            this.v0 = arg1.v0.vertex3DInstance;
            this.v1 = arg1.v1.vertex3DInstance;
            this.v2 = arg1.v2.vertex3DInstance;
            this.uv0 = arg1.uv0;
            this.uv1 = arg1.uv1;
            this.uv2 = arg1.uv2;
            this.renderer = arg1.material;
            this.update();
            return;
        }

        private function deepHitTest(arg1:org.papervision3d.core.geom.renderables.Triangle3D, arg2:org.papervision3d.core.geom.renderables.Vertex3DInstance, arg3:org.papervision3d.core.render.data.RenderHitData):org.papervision3d.core.render.data.RenderHitData
        {
            var loc41:*;
            loc41 = null;
            var loc42:*;
            loc42 = null;
            var loc1:*;
            loc1 = arg1.v0.vertex3DInstance;
            var loc2:*;
            loc2 = arg1.v1.vertex3DInstance;
            var loc3:*;
            var loc4:*;
            loc4 = (loc3 = arg1.v2.vertex3DInstance).x - loc1.x;
            var loc5:*;
            loc5 = loc3.y - loc1.y;
            var loc6:*;
            loc6 = loc2.x - loc1.x;
            var loc7:*;
            loc7 = loc2.y - loc1.y;
            var loc8:*;
            loc8 = arg2.x - loc1.x;
            var loc9:*;
            loc9 = arg2.y - loc1.y;
            var loc10:*;
            loc10 = loc4 * loc4 + loc5 * loc5;
            var loc11:*;
            loc11 = loc4 * loc6 + loc5 * loc7;
            var loc12:*;
            loc12 = loc4 * loc8 + loc5 * loc9;
            var loc13:*;
            loc13 = loc6 * loc6 + loc7 * loc7;
            var loc14:*;
            loc14 = loc6 * loc8 + loc7 * loc9;
            var loc15:*;
            loc15 = 1 / (loc10 * loc13 - loc11 * loc11);
            var loc16:*;
            loc16 = (loc13 * loc12 - loc11 * loc14) * loc15;
            var loc17:*;
            loc17 = (loc10 * loc14 - loc11 * loc12) * loc15;
            var loc18:*;
            loc18 = arg1.v2.x - arg1.v0.x;
            var loc19:*;
            loc19 = arg1.v2.y - arg1.v0.y;
            var loc20:*;
            loc20 = arg1.v2.z - arg1.v0.z;
            var loc21:*;
            loc21 = arg1.v1.x - arg1.v0.x;
            var loc22:*;
            loc22 = arg1.v1.y - arg1.v0.y;
            var loc23:*;
            loc23 = arg1.v1.z - arg1.v0.z;
            var loc24:*;
            loc24 = arg1.v0.x + loc18 * loc16 + loc21 * loc17;
            var loc25:*;
            loc25 = arg1.v0.y + loc19 * loc16 + loc22 * loc17;
            var loc26:*;
            loc26 = arg1.v0.z + loc20 * loc16 + loc23 * loc17;
            var loc27:*;
            var loc28:*;
            loc28 = (loc27 = arg1.uv)[0].u;
            var loc29:*;
            loc29 = loc27[1].u;
            var loc30:*;
            loc30 = loc27[2].u;
            var loc31:*;
            loc31 = loc27[0].v;
            var loc32:*;
            loc32 = loc27[1].v;
            var loc33:*;
            loc33 = loc27[2].v;
            var loc34:*;
            loc34 = (loc29 - loc28) * loc17 + (loc30 - loc28) * loc16 + loc28;
            var loc35:*;
            loc35 = (loc32 - loc31) * loc17 + (loc33 - loc31) * loc16 + loc31;
            if (this.triangle.material)
            {
                this.renderMat = arg1.material;
            }
            else 
            {
                this.renderMat = arg1.instance.material;
            }
            var loc36:*;
            loc36 = this.renderMat.bitmap;
            var loc37:*;
            loc37 = 1;
            var loc38:*;
            loc38 = 1;
            var loc39:*;
            loc39 = 0;
            var loc40:*;
            loc40 = 0;
            if (this.renderMat as org.papervision3d.materials.MovieMaterial)
            {
                if (loc42 = (loc41 = this.renderMat as org.papervision3d.materials.MovieMaterial).rect)
                {
                    loc39 = loc42.x;
                    loc40 = loc42.y;
                    loc37 = loc42.width;
                    loc38 = loc42.height;
                }
            }
            else 
            {
                if (loc36)
                {
                    loc37 = org.papervision3d.materials.BitmapMaterial.AUTO_MIP_MAPPING ? this.renderMat.widthOffset : loc36.width;
                    loc38 = org.papervision3d.materials.BitmapMaterial.AUTO_MIP_MAPPING ? this.renderMat.heightOffset : loc36.height;
                }
            }
            arg3.displayObject3D = arg1.instance;
            arg3.material = this.renderMat;
            arg3.renderable = arg1;
            arg3.hasHit = true;
            this.position.x = loc24;
            this.position.y = loc25;
            this.position.z = loc26;
            org.papervision3d.core.math.Matrix3D.multiplyVector(arg1.instance.world, this.position);
            arg3.x = this.position.x;
            arg3.y = this.position.y;
            arg3.z = this.position.z;
            arg3.u = loc34 * loc37 + loc39;
            arg3.v = loc38 - loc35 * loc38 + loc40;
            return arg3;
        }

        public override function hitTestPoint2D(arg1:flash.geom.Point, arg2:org.papervision3d.core.render.data.RenderHitData):org.papervision3d.core.render.data.RenderHitData
        {
            this.renderMat = this.triangle.material;
            if (!this.renderMat)
            {
                this.renderMat = this.triangle.instance.material;
            }
            if (this.renderMat && this.renderMat.interactive)
            {
                this.vPointL = org.papervision3d.core.render.command.RenderTriangle.vPoint;
                this.vPointL.x = arg1.x;
                this.vPointL.y = arg1.y;
                this.vx0 = this.triangle.v0.vertex3DInstance;
                this.vx1 = this.triangle.v1.vertex3DInstance;
                this.vx2 = this.triangle.v2.vertex3DInstance;
                if (this.sameSide(this.vPointL, this.vx0, this.vx1, this.vx2))
                {
                    if (this.sameSide(this.vPointL, this.vx1, this.vx0, this.vx2))
                    {
                        if (this.sameSide(this.vPointL, this.vx2, this.vx0, this.vx1))
                        {
                            return this.deepHitTest(this.triangle, this.vPointL, arg2);
                        }
                    }
                }
            }
            return arg2;
        }

        public function fivepointcut(arg1:org.papervision3d.core.geom.renderables.Vertex3DInstance, arg2:org.papervision3d.core.geom.renderables.Vertex3DInstance, arg3:org.papervision3d.core.geom.renderables.Vertex3DInstance, arg4:org.papervision3d.core.geom.renderables.Vertex3DInstance, arg5:org.papervision3d.core.geom.renderables.Vertex3DInstance, arg6:org.papervision3d.core.math.NumberUV, arg7:org.papervision3d.core.math.NumberUV, arg8:org.papervision3d.core.math.NumberUV, arg9:org.papervision3d.core.math.NumberUV, arg10:org.papervision3d.core.math.NumberUV):Array
        {
            if (arg1.distanceSqr(arg4) < arg2.distanceSqr(arg5))
            {
                return [this.create(renderableInstance, this.renderer, arg1, arg2, arg4, arg6, arg7, arg9), this.create(renderableInstance, this.renderer, arg2, arg3, arg4, arg7, arg8, arg9), this.create(renderableInstance, this.renderer, arg1, arg4, arg5, arg6, arg9, arg10)];
            }
            return [this.create(renderableInstance, this.renderer, arg1, arg2, arg5, arg6, arg7, arg10), this.create(renderableInstance, this.renderer, arg2, arg3, arg4, arg7, arg8, arg9), this.create(renderableInstance, this.renderer, arg2, arg4, arg5, arg7, arg9, arg10)];
        }

        public override function render(arg1:org.papervision3d.core.render.data.RenderSessionData, arg2:flash.display.Graphics):void
        {
            this.renderer.drawTriangle(this, arg2, arg1);
            return;
        }

        public final override function quarter(arg1:Number):Array
        {
            if (area < 20)
            {
                return null;
            }
            this.v01 = org.papervision3d.core.geom.renderables.Vertex3DInstance.median(this.v0, this.v1, arg1);
            this.v12 = org.papervision3d.core.geom.renderables.Vertex3DInstance.median(this.v1, this.v2, arg1);
            this.v20 = org.papervision3d.core.geom.renderables.Vertex3DInstance.median(this.v2, this.v0, arg1);
            this.uv01 = org.papervision3d.core.math.NumberUV.median(this.uv0, this.uv1);
            this.uv12 = org.papervision3d.core.math.NumberUV.median(this.uv1, this.uv2);
            this.uv20 = org.papervision3d.core.math.NumberUV.median(this.uv2, this.uv0);
            return [this.create(renderableInstance, this.renderer, this.v0, this.v01, this.v20, this.uv0, this.uv01, this.uv20), this.create(renderableInstance, this.renderer, this.v1, this.v12, this.v01, this.uv1, this.uv12, this.uv01), this.create(renderableInstance, this.renderer, this.v2, this.v20, this.v12, this.uv2, this.uv20, this.uv12), this.create(renderableInstance, this.renderer, this.v01, this.v12, this.v20, this.uv01, this.uv12, this.uv20)];
        }

        public final override function getZ(arg1:Number, arg2:Number, arg3:Number):Number
        {
            this.ax = this.v0.x;
            this.ay = this.v0.y;
            this.az = this.v0.z;
            this.bx = this.v1.x;
            this.by = this.v1.y;
            this.bz = this.v1.z;
            this.cx = this.v2.x;
            this.cy = this.v2.y;
            this.cz = this.v2.z;
            if (this.ax == arg1 && this.ay == arg2)
            {
                return this.az;
            }
            if (this.bx == arg1 && this.by == arg2)
            {
                return this.bz;
            }
            if (this.cx == arg1 && this.cy == arg2)
            {
                return this.cz;
            }
            this.azf = this.az / arg3;
            this.bzf = this.bz / arg3;
            this.czf = this.cz / arg3;
            this.faz = 1 + this.azf;
            this.fbz = 1 + this.bzf;
            this.fcz = 1 + this.czf;
            this.axf = this.ax * this.faz - arg1 * this.azf;
            this.bxf = this.bx * this.fbz - arg1 * this.bzf;
            this.cxf = this.cx * this.fcz - arg1 * this.czf;
            this.ayf = this.ay * this.faz - arg2 * this.azf;
            this.byf = this.by * this.fbz - arg2 * this.bzf;
            this.cyf = this.cy * this.fcz - arg2 * this.czf;
            this.det = this.axf * (this.byf - this.cyf) + this.bxf * (this.cyf - this.ayf) + this.cxf * (this.ayf - this.byf);
            this.da = arg1 * (this.byf - this.cyf) + this.bxf * (this.cyf - arg2) + this.cxf * (arg2 - this.byf);
            this.db = this.axf * (arg2 - this.cyf) + arg1 * (this.cyf - this.ayf) + this.cxf * (this.ayf - arg2);
            this.dc = this.axf * (this.byf - arg2) + this.bxf * (arg2 - this.ayf) + arg1 * (this.ayf - this.byf);
            return (this.da * this.az + this.db * this.bz + this.dc * this.cz) / this.det;
        }

        public override function update():void
        {
            if (this.v0.x > this.v1.x)
            {
                if (this.v0.x > this.v2.x)
                {
                    maxX = this.v0.x;
                }
                else 
                {
                    maxX = this.v2.x;
                }
            }
            else 
            {
                if (this.v1.x > this.v2.x)
                {
                    maxX = this.v1.x;
                }
                else 
                {
                    maxX = this.v2.x;
                }
            }
            if (this.v0.x < this.v1.x)
            {
                if (this.v0.x < this.v2.x)
                {
                    minX = this.v0.x;
                }
                else 
                {
                    minX = this.v2.x;
                }
            }
            else 
            {
                if (this.v1.x < this.v2.x)
                {
                    minX = this.v1.x;
                }
                else 
                {
                    minX = this.v2.x;
                }
            }
            if (this.v0.y > this.v1.y)
            {
                if (this.v0.y > this.v2.y)
                {
                    maxY = this.v0.y;
                }
                else 
                {
                    maxY = this.v2.y;
                }
            }
            else 
            {
                if (this.v1.y > this.v2.y)
                {
                    maxY = this.v1.y;
                }
                else 
                {
                    maxY = this.v2.y;
                }
            }
            if (this.v0.y < this.v1.y)
            {
                if (this.v0.y < this.v2.y)
                {
                    minY = this.v0.y;
                }
                else 
                {
                    minY = this.v2.y;
                }
            }
            else 
            {
                if (this.v1.y < this.v2.y)
                {
                    minY = this.v1.y;
                }
                else 
                {
                    minY = this.v2.y;
                }
            }
            if (this.v0.z > this.v1.z)
            {
                if (this.v0.z > this.v2.z)
                {
                    maxZ = this.v0.z;
                }
                else 
                {
                    maxZ = this.v2.z;
                }
            }
            else 
            {
                if (this.v1.z > this.v2.z)
                {
                    maxZ = this.v1.z;
                }
                else 
                {
                    maxZ = this.v2.z;
                }
            }
            if (this.v0.z < this.v1.z)
            {
                if (this.v0.z < this.v2.z)
                {
                    minZ = this.v0.z;
                }
                else 
                {
                    minZ = this.v2.z;
                }
            }
            else 
            {
                if (this.v1.z < this.v2.z)
                {
                    minZ = this.v1.z;
                }
                else 
                {
                    minZ = this.v2.z;
                }
            }
            screenZ = (this.v0.z + this.v1.z + this.v2.z) / 3;
            area = 0.5 * (this.v0.x * (this.v2.y - this.v1.y) + this.v1.x * (this.v0.y - this.v2.y) + this.v2.x * (this.v1.y - this.v0.y));
            return;
        }

        public function sameSide(arg1:org.papervision3d.core.geom.renderables.Vertex3DInstance, arg2:org.papervision3d.core.geom.renderables.Vertex3DInstance, arg3:org.papervision3d.core.geom.renderables.Vertex3DInstance, arg4:org.papervision3d.core.geom.renderables.Vertex3DInstance):Boolean
        {
            org.papervision3d.core.geom.renderables.Vertex3DInstance.subTo(arg4, arg3, resBA);
            org.papervision3d.core.geom.renderables.Vertex3DInstance.subTo(arg1, arg3, resPA);
            org.papervision3d.core.geom.renderables.Vertex3DInstance.subTo(arg2, arg3, resRA);
            return org.papervision3d.core.geom.renderables.Vertex3DInstance.cross(resBA, resPA) * org.papervision3d.core.geom.renderables.Vertex3DInstance.cross(resBA, resRA) >= 0;
        }

        
        {
            resBA = new org.papervision3d.core.geom.renderables.Vertex3DInstance();
            resPA = new org.papervision3d.core.geom.renderables.Vertex3DInstance();
            resRA = new org.papervision3d.core.geom.renderables.Vertex3DInstance();
            vPoint = new org.papervision3d.core.geom.renderables.Vertex3DInstance();
        }

        public var triangle:org.papervision3d.core.geom.renderables.Triangle3D;

        private var bzf:Number;

        private var axf:Number;

        private var det:Number;

        private var v12:org.papervision3d.core.geom.renderables.Vertex3DInstance;

        private var faz:Number;

        private var position:org.papervision3d.core.math.Number3D;

        private var ayf:Number;

        private var au:Number;

        private var av:Number;

        private var ax:Number;

        private var ay:Number;

        private var az:Number;

        private var v20:org.papervision3d.core.geom.renderables.Vertex3DInstance;

        private var fbz:Number;

        private var azf:Number;

        private var bu:Number;

        private var bv:Number;

        private var bx:Number;

        private var by:Number;

        private var bz:Number;

        private var fcz:Number;

        private var uv01:org.papervision3d.core.math.NumberUV;

        private var cu:Number;

        private var cv:Number;

        private var cx:Number;

        private var cy:Number;

        private var cz:Number;

        public var v0:org.papervision3d.core.geom.renderables.Vertex3DInstance;

        public var v1:org.papervision3d.core.geom.renderables.Vertex3DInstance;

        private var da:Number;

        private var db:Number;

        private var dc:Number;

        public var container:flash.display.Sprite;

        private var uv12:org.papervision3d.core.math.NumberUV;

        public var v2:org.papervision3d.core.geom.renderables.Vertex3DInstance;

        private var cxf:Number;

        private var uv20:org.papervision3d.core.math.NumberUV;

        protected var vx0:org.papervision3d.core.geom.renderables.Vertex3DInstance;

        public var uv0:org.papervision3d.core.math.NumberUV;

        public var uv1:org.papervision3d.core.math.NumberUV;

        public var uv2:org.papervision3d.core.math.NumberUV;

        protected var vx1:org.papervision3d.core.geom.renderables.Vertex3DInstance;

        protected var vx2:org.papervision3d.core.geom.renderables.Vertex3DInstance;

        public var renderer:org.papervision3d.core.render.draw.ITriangleDrawer;

        private var cyf:Number;

        private var czf:Number;

        private var bxf:Number;

        protected var vPointL:org.papervision3d.core.geom.renderables.Vertex3DInstance;

        public var renderMat:org.papervision3d.core.proto.MaterialObject3D;

        private var byf:Number;

        private var v01:org.papervision3d.core.geom.renderables.Vertex3DInstance;

        public var create:Function;

        protected static var resPA:org.papervision3d.core.geom.renderables.Vertex3DInstance;

        protected static var resBA:org.papervision3d.core.geom.renderables.Vertex3DInstance;

        protected static var vPoint:org.papervision3d.core.geom.renderables.Vertex3DInstance;

        protected static var resRA:org.papervision3d.core.geom.renderables.Vertex3DInstance;
    }
}


//            class RenderableListItem
package org.papervision3d.core.render.command 
{
    import flash.geom.*;
    import org.papervision3d.core.geom.renderables.*;
    import org.papervision3d.core.render.data.*;
    import org.papervision3d.objects.*;
    
    public class RenderableListItem extends org.papervision3d.core.render.command.AbstractRenderListItem
    {
        public function RenderableListItem()
        {
            super();
            return;
        }

        public function getZ(arg1:Number, arg2:Number, arg3:Number):Number
        {
            return screenZ;
        }

        public function update():void
        {
            return;
        }

        public function hitTestPoint2D(arg1:flash.geom.Point, arg2:org.papervision3d.core.render.data.RenderHitData):org.papervision3d.core.render.data.RenderHitData
        {
            return arg2;
        }

        public function quarter(arg1:Number):Array
        {
            return [];
        }

        public var minX:Number;

        public var minY:Number;

        public var minZ:Number;

        public var area:Number;

        public var instance:org.papervision3d.objects.DisplayObject3D;

        public var renderableInstance:org.papervision3d.core.geom.renderables.AbstractRenderable;

        public var renderable:Class;

        public var maxX:Number;

        public var maxY:Number;

        public var maxZ:Number;

        public var quadrant:org.papervision3d.core.render.data.QuadTreeNode;
    }
}


//          package data
//            class QuadTree
package org.papervision3d.core.render.data 
{
    import flash.display.*;
    import org.papervision3d.core.clipping.draw.*;
    import org.papervision3d.core.render.command.*;
    import org.papervision3d.objects.*;
    
    public final class QuadTree extends Object
    {
        public function QuadTree()
        {
            super();
            return;
        }

        public function get maxLevel():uint
        {
            return this._maxlevel;
        }

        public function remove(arg1:org.papervision3d.core.render.command.RenderableListItem):void
        {
            this._center = arg1.quadrant.center;
            this._center.splice(this._center.indexOf(arg1), 1);
            return;
        }

        public function set maxLevel(arg1:uint):void
        {
            this._maxlevel = arg1;
            if (this._root)
            {
                this._root.maxlevel = this._maxlevel;
            }
            return;
        }

        public function getOverlaps(arg1:org.papervision3d.core.render.command.RenderableListItem, arg2:org.papervision3d.objects.DisplayObject3D=null):Array
        {
            this._result = [];
            this._minX = arg1.minX;
            this._minY = arg1.minY;
            this._maxX = arg1.maxX;
            this._maxY = arg1.maxY;
            this._except = arg2;
            this.getList(arg1.quadrant);
            this.getParent(arg1.quadrant);
            return this._result;
        }

        public function get clip():org.papervision3d.core.clipping.draw.Clipping
        {
            return this._clip;
        }

        public function render(arg1:org.papervision3d.core.render.data.RenderSessionData, arg2:flash.display.Graphics):void
        {
            this._root.render(-Infinity, arg1, arg2);
            return;
        }

        public function list():Array
        {
            this._result = [];
            this._minX = -1000000;
            this._minY = -1000000;
            this._maxX = 1000000;
            this._maxY = 1000000;
            this._except = null;
            this.getList(this._root);
            return this._result;
        }

        public function getRoot():org.papervision3d.core.render.data.QuadTreeNode
        {
            return this._root;
        }

        private function getList(arg1:org.papervision3d.core.render.data.QuadTreeNode):void
        {
            if (!arg1)
            {
                return;
            }
            if (arg1.onlysourceFlag && this._except == arg1.onlysource)
            {
                return;
            }
            if (this._minX < arg1.xdiv)
            {
                if (arg1.lefttopFlag && this._minY < arg1.ydiv)
                {
                    this.getList(arg1.lefttop);
                }
                if (arg1.leftbottomFlag && this._maxY > arg1.ydiv)
                {
                    this.getList(arg1.leftbottom);
                }
            }
            if (this._maxX > arg1.xdiv)
            {
                if (arg1.righttopFlag && this._minY < arg1.ydiv)
                {
                    this.getList(arg1.righttop);
                }
                if (arg1.rightbottomFlag && this._maxY > arg1.ydiv)
                {
                    this.getList(arg1.rightbottom);
                }
            }
            this._children = arg1.center;
            if (this._children != null)
            {
                this.i = this._children.length;
                for (;;) 
                {
                    var loc1:*;
                    var loc2:*;
                    loc2 = ((loc1 = this).i - 1);
                    loc1.i = loc2;
                    if (!(loc1 = this).i)
                    {
                        break;
                    }
                    this._child = this._children[this.i];
                    if (!((this._except == null || !(this._child.instance == this._except)) && this._child.maxX > this._minX && this._child.minX < this._maxX && this._child.maxY > this._minY && this._child.minY < this._maxY))
                    {
                        continue;
                    }
                    this._result.push(this._child);
                }
            }
            return;
        }

        private function getParent(arg1:org.papervision3d.core.render.data.QuadTreeNode=null):void
        {
            if (!arg1)
            {
                return;
            }
            arg1 = arg1.parent;
            if (arg1 == null || arg1.onlysourceFlag && this._except == arg1.onlysource)
            {
                return;
            }
            this._children = arg1.center;
            if (this._children != null)
            {
                this.i = this._children.length;
                for (;;) 
                {
                    var loc1:*;
                    var loc2:*;
                    loc2 = ((loc1 = this).i - 1);
                    loc1.i = loc2;
                    if (!(loc1 = this).i)
                    {
                        break;
                    }
                    this._child = this._children[this.i];
                    if (!((this._except == null || !(this._child.instance == this._except)) && this._child.maxX > this._minX && this._child.minX < this._maxX && this._child.maxY > this._minY && this._child.minY < this._maxY))
                    {
                        continue;
                    }
                    this._result.push(this._child);
                }
            }
            this.getParent(arg1);
            return;
        }

        public function add(arg1:org.papervision3d.core.render.command.RenderableListItem):void
        {
            if (this._clip.check(arg1))
            {
                this._root.push(arg1);
            }
            return;
        }

        public function set clip(arg1:org.papervision3d.core.clipping.draw.Clipping):void
        {
            this._clip = arg1;
            this._rect = this._clip.asRectangleClipping();
            if (this._root)
            {
                this._root.reset((this._rect.minX + this._rect.maxX) / 2, (this._rect.minY + this._rect.maxY) / 2, this._rect.maxX - this._rect.minX, this._rect.maxY - this._rect.minY, this._maxlevel);
            }
            else 
            {
                this._root = new org.papervision3d.core.render.data.QuadTreeNode((this._rect.minX + this._rect.maxX) / 2, (this._rect.minY + this._rect.maxY) / 2, this._rect.maxX - this._rect.minX, this._rect.maxY - this._rect.minY, 0, null, this._maxlevel);
            }
            return;
        }

        private var _root:org.papervision3d.core.render.data.QuadTreeNode;

        private var _rect:org.papervision3d.core.clipping.draw.RectangleClipping;

        private var _result:Array;

        private var _maxlevel:uint=4;

        private var _maxX:Number;

        private var _maxY:Number;

        private var _child:org.papervision3d.core.render.command.RenderableListItem;

        private var _children:Array;

        private var _minX:Number;

        private var _minY:Number;

        private var i:int;

        private var _clip:org.papervision3d.core.clipping.draw.Clipping;

        private var _center:Array;

        private var _except:org.papervision3d.objects.DisplayObject3D;
    }
}


//            class QuadTreeNode
package org.papervision3d.core.render.data 
{
    import flash.display.*;
    import flash.geom.*;
    import org.papervision3d.core.render.command.*;
    import org.papervision3d.objects.*;
    
    public final class QuadTreeNode extends Object
    {
        public function QuadTreeNode(arg1:Number, arg2:Number, arg3:Number, arg4:Number, arg5:int, arg6:org.papervision3d.core.render.data.QuadTreeNode=null, arg7:uint=4)
        {
            super();
            this.level = arg5;
            this.xdiv = arg1;
            this.ydiv = arg2;
            this.halfwidth = arg3 / 2;
            this.halfheight = arg4 / 2;
            this.parent = arg6;
            this.maxlevel = arg7;
            return;
        }

        public function reset(arg1:Number, arg2:Number, arg3:Number, arg4:Number, arg5:uint):void
        {
            this.xdiv = arg1;
            this.ydiv = arg2;
            this.halfwidth = arg3 / 2;
            this.halfheight = arg4 / 2;
            this.lefttopFlag = false;
            this.leftbottomFlag = false;
            this.righttopFlag = false;
            this.rightbottomFlag = false;
            this.onlysourceFlag = true;
            this.onlysource = null;
            this.render_center_length = -1;
            this.render_center_index = -1;
            this.hasContent = false;
            this.maxlevel = arg5;
            return;
        }

        public function push(arg1:org.papervision3d.core.render.command.RenderableListItem):void
        {
            this.hasContent = true;
            if (this.onlysourceFlag)
            {
                if (!(this.onlysource == null) && !(this.onlysource == arg1.instance))
                {
                    this.onlysourceFlag = false;
                }
                this.onlysource = arg1.instance;
            }
            if (this.level < this.maxlevel)
            {
                if (arg1.maxX <= this.xdiv)
                {
                    if (arg1.maxY <= this.ydiv)
                    {
                        if (this.lefttop != null)
                        {
                            if (!this.lefttopFlag)
                            {
                                this.lefttopFlag = true;
                                this.lefttop.reset(this.xdiv - this.halfwidth / 2, this.ydiv - this.halfheight / 2, this.halfwidth, this.halfheight, this.maxlevel);
                            }
                        }
                        else 
                        {
                            this.lefttopFlag = true;
                            this.lefttop = new org.papervision3d.core.render.data.QuadTreeNode(this.xdiv - this.halfwidth / 2, this.ydiv - this.halfheight / 2, this.halfwidth, this.halfheight, this.level + 1, this, this.maxlevel);
                        }
                        this.lefttop.push(arg1);
                        return;
                    }
                    if (arg1.minY >= this.ydiv)
                    {
                        if (this.leftbottom != null)
                        {
                            if (!this.leftbottomFlag)
                            {
                                this.leftbottomFlag = true;
                                this.leftbottom.reset(this.xdiv - this.halfwidth / 2, this.ydiv + this.halfheight / 2, this.halfwidth, this.halfheight, this.maxlevel);
                            }
                        }
                        else 
                        {
                            this.leftbottomFlag = true;
                            this.leftbottom = new org.papervision3d.core.render.data.QuadTreeNode(this.xdiv - this.halfwidth / 2, this.ydiv + this.halfheight / 2, this.halfwidth, this.halfheight, this.level + 1, this, this.maxlevel);
                        }
                        this.leftbottom.push(arg1);
                        return;
                    }
                }
                else 
                {
                    if (arg1.minX >= this.xdiv)
                    {
                        if (arg1.maxY <= this.ydiv)
                        {
                            if (this.righttop != null)
                            {
                                if (!this.righttopFlag)
                                {
                                    this.righttopFlag = true;
                                    this.righttop.reset(this.xdiv + this.halfwidth / 2, this.ydiv - this.halfheight / 2, this.halfwidth, this.halfheight, this.maxlevel);
                                }
                            }
                            else 
                            {
                                this.righttopFlag = true;
                                this.righttop = new org.papervision3d.core.render.data.QuadTreeNode(this.xdiv + this.halfwidth / 2, this.ydiv - this.halfheight / 2, this.halfwidth, this.halfheight, this.level + 1, this, this.maxlevel);
                            }
                            this.righttop.push(arg1);
                            return;
                        }
                        if (arg1.minY >= this.ydiv)
                        {
                            if (this.rightbottom != null)
                            {
                                if (!this.rightbottomFlag)
                                {
                                    this.rightbottomFlag = true;
                                    this.rightbottom.reset(this.xdiv + this.halfwidth / 2, this.ydiv + this.halfheight / 2, this.halfwidth, this.halfheight, this.maxlevel);
                                }
                            }
                            else 
                            {
                                this.rightbottomFlag = true;
                                this.rightbottom = new org.papervision3d.core.render.data.QuadTreeNode(this.xdiv + this.halfwidth / 2, this.ydiv + this.halfheight / 2, this.halfwidth, this.halfheight, this.level + 1, this, this.maxlevel);
                            }
                            this.rightbottom.push(arg1);
                            return;
                        }
                    }
                }
            }
            if (this.center == null)
            {
                this.center = new Array();
            }
            this.center.push(arg1);
            arg1.quadrant = this;
            return;
        }

        public function render(arg1:Number, arg2:org.papervision3d.core.render.data.RenderSessionData, arg3:flash.display.Graphics):void
        {
            var loc1:*;
            loc1 = null;
            if (this.render_center_length == -1)
            {
                if (this.center == null)
                {
                    this.render_center_length = 0;
                }
                else 
                {
                    this.render_center_length = this.center.length;
                    if (this.render_center_length > 1)
                    {
                        this.center.sortOn("screenZ", Array.DESCENDING | Array.NUMERIC);
                    }
                }
                this.render_center_index = 0;
            }
            while (this.render_center_index < this.render_center_length) 
            {
                if ((loc1 = this.center[this.render_center_index]).screenZ < arg1)
                {
                    break;
                }
                this.render_other(loc1.screenZ, arg2, arg3);
                loc1.render(arg2, arg3);
                arg2.viewPort.lastRenderList.push(loc1);
                var loc2:*;
                var loc3:*;
                loc3 = ((loc2 = this).render_center_index + 1);
                loc2.render_center_index = loc3;
            }
            if (this.render_center_index == this.render_center_length)
            {
                this.center = null;
            }
            this.render_other(arg1, arg2, arg3);
            return;
        }

        public function getRect():flash.geom.Rectangle
        {
            return new flash.geom.Rectangle(this.xdiv, this.ydiv, this.halfwidth * 2, this.halfheight * 2);
        }

        private function render_other(arg1:Number, arg2:org.papervision3d.core.render.data.RenderSessionData, arg3:flash.display.Graphics):void
        {
            if (this.lefttopFlag)
            {
                this.lefttop.render(arg1, arg2, arg3);
            }
            if (this.leftbottomFlag)
            {
                this.leftbottom.render(arg1, arg2, arg3);
            }
            if (this.righttopFlag)
            {
                this.righttop.render(arg1, arg2, arg3);
            }
            if (this.rightbottomFlag)
            {
                this.rightbottom.render(arg1, arg2, arg3);
            }
            return;
        }

        public var parent:org.papervision3d.core.render.data.QuadTreeNode;

        public var create:Function;

        private var level:int;

        public var righttopFlag:Boolean;

        public var hasContent:Boolean=false;

        public var rightbottom:org.papervision3d.core.render.data.QuadTreeNode;

        public var righttop:org.papervision3d.core.render.data.QuadTreeNode;

        public var rightbottomFlag:Boolean;

        public var onlysource:org.papervision3d.objects.DisplayObject3D;

        public var xdiv:Number;

        private var halfheight:Number;

        public var center:Array;

        public var maxlevel:int=4;

        private var render_center_length:int=-1;

        public var onlysourceFlag:Boolean=true;

        private var render_center_index:int=-1;

        private var halfwidth:Number;

        public var lefttop:org.papervision3d.core.render.data.QuadTreeNode;

        public var ydiv:Number;

        public var leftbottom:org.papervision3d.core.render.data.QuadTreeNode;

        public var lefttopFlag:Boolean;

        public var leftbottomFlag:Boolean;
    }
}


//            class RenderHitData
package org.papervision3d.core.render.data 
{
    import org.papervision3d.core.geom.renderables.*;
    import org.papervision3d.core.proto.*;
    import org.papervision3d.objects.*;
    
    public class RenderHitData extends Object
    {
        public function RenderHitData()
        {
            super();
            return;
        }

        public function clear():void
        {
            this.startTime = 0;
            this.endTime = 0;
            this.hasHit = false;
            this.displayObject3D = null;
            this.material = null;
            this.renderable = null;
            this.u = 0;
            this.v = 0;
            this.x = 0;
            this.y = 0;
            this.z = 0;
            return;
        }

        public function clone():org.papervision3d.core.render.data.RenderHitData
        {
            var loc1:*;
            loc1 = new org.papervision3d.core.render.data.RenderHitData();
            loc1.startTime = this.startTime;
            loc1.endTime = this.endTime;
            loc1.hasHit = this.hasHit;
            loc1.displayObject3D = this.displayObject3D;
            loc1.material = this.material;
            loc1.renderable = this.renderable;
            loc1.u = this.u;
            loc1.v = this.v;
            loc1.x = this.x;
            loc1.y = this.y;
            loc1.z = this.z;
            return loc1;
        }

        public function toString():String
        {
            return this.displayObject3D + " " + this.renderable;
        }

        public var y:Number;

        public var z:Number;

        public var endTime:int=0;

        public var startTime:int=0;

        public var displayObject3D:org.papervision3d.objects.DisplayObject3D;

        public var hasHit:Boolean=false;

        public var material:org.papervision3d.core.proto.MaterialObject3D;

        public var renderable:org.papervision3d.core.geom.renderables.IRenderable;

        public var u:Number;

        public var v:Number;

        public var x:Number;
    }
}


//            class RenderSessionData
package org.papervision3d.core.render.data 
{
    import flash.display.*;
    import org.papervision3d.core.clipping.*;
    import org.papervision3d.core.culling.*;
    import org.papervision3d.core.proto.*;
    import org.papervision3d.core.render.*;
    import org.papervision3d.view.*;
    
    public class RenderSessionData extends Object
    {
        public function RenderSessionData()
        {
            super();
            this.renderStatistics = new org.papervision3d.core.render.data.RenderStatistics();
            return;
        }

        public function destroy():void
        {
            this.triangleCuller = null;
            this.particleCuller = null;
            this.viewPort = null;
            this.container = null;
            this.scene = null;
            this.camera = null;
            this.renderer = null;
            this.renderStatistics = null;
            this.renderObjects = null;
            this.renderLayers = null;
            this.clipping = null;
            this.quadrantTree = null;
            return;
        }

        public function clone():org.papervision3d.core.render.data.RenderSessionData
        {
            var loc1:*;
            loc1 = new org.papervision3d.core.render.data.RenderSessionData();
            loc1.triangleCuller = this.triangleCuller;
            loc1.particleCuller = this.particleCuller;
            loc1.viewPort = this.viewPort;
            loc1.container = this.container;
            loc1.scene = this.scene;
            loc1.camera = this.camera;
            loc1.renderer = this.renderer;
            loc1.renderStatistics = this.renderStatistics.clone();
            loc1.clipping = this.clipping;
            loc1.quadrantTree = this.quadrantTree;
            return loc1;
        }

        public var container:flash.display.Sprite;

        public var renderer:org.papervision3d.core.render.IRenderEngine;

        public var particleCuller:org.papervision3d.core.culling.IParticleCuller;

        public var viewPort:org.papervision3d.view.Viewport3D;

        public var triangleCuller:org.papervision3d.core.culling.ITriangleCuller;

        public var clipping:org.papervision3d.core.clipping.DefaultClipping;

        public var scene:org.papervision3d.core.proto.SceneObject3D;

        public var renderStatistics:org.papervision3d.core.render.data.RenderStatistics;

        public var renderObjects:Array;

        public var camera:org.papervision3d.core.proto.CameraObject3D;

        public var renderLayers:Array;

        public var quadrantTree:org.papervision3d.core.render.data.QuadTree;

        public var sorted:Boolean;
    }
}


//            class RenderStatistics
package org.papervision3d.core.render.data 
{
    public class RenderStatistics extends Object
    {
        public function RenderStatistics()
        {
            super();
            return;
        }

        public function clear():void
        {
            this.projectionTime = 0;
            this.renderTime = 0;
            this.rendered = 0;
            this.particles = 0;
            this.triangles = 0;
            this.culledTriangles = 0;
            this.culledParticles = 0;
            this.lines = 0;
            this.shadedTriangles = 0;
            this.filteredObjects = 0;
            this.culledObjects = 0;
            return;
        }

        public function clone():org.papervision3d.core.render.data.RenderStatistics
        {
            var loc1:*;
            loc1 = new org.papervision3d.core.render.data.RenderStatistics();
            loc1.projectionTime = this.projectionTime;
            loc1.renderTime = this.renderTime;
            loc1.rendered = this.rendered;
            loc1.particles = this.particles;
            loc1.triangles = this.triangles;
            loc1.culledTriangles = this.culledTriangles;
            loc1.lines = this.lines;
            loc1.shadedTriangles = this.shadedTriangles;
            loc1.filteredObjects = this.filteredObjects;
            loc1.culledObjects = this.culledObjects;
            return loc1;
        }

        public function toString():String
        {
            return new String("ProjectionTime:" + this.projectionTime + " RenderTime:" + this.renderTime + " Particles:" + this.particles + " CulledParticles :" + this.culledParticles + " Triangles:" + this.triangles + " ShadedTriangles :" + this.shadedTriangles + " CulledTriangles:" + this.culledTriangles + " FilteredObjects:" + this.filteredObjects + " CulledObjects:" + this.culledObjects + "");
        }

        public var renderTime:int=0;

        public var culledObjects:int=0;

        public var shadedTriangles:int=0;

        public var culledParticles:int=0;

        public var culledTriangles:int=0;

        public var triangles:int=0;

        public var particles:int=0;

        public var rendered:int=0;

        public var projectionTime:int=0;

        public var filteredObjects:int=0;

        public var lines:int=0;
    }
}


//          package draw
//            class ILineDrawer
package org.papervision3d.core.render.draw 
{
    import flash.display.*;
    import org.papervision3d.core.render.command.*;
    import org.papervision3d.core.render.data.*;
    
    public interface ILineDrawer
    {
        function drawLine(arg1:org.papervision3d.core.render.command.RenderLine, arg2:flash.display.Graphics, arg3:org.papervision3d.core.render.data.RenderSessionData):void;
    }
}


//            class IParticleDrawer
package org.papervision3d.core.render.draw 
{
    import flash.display.*;
    import org.papervision3d.core.geom.renderables.*;
    import org.papervision3d.core.render.data.*;
    
    public interface IParticleDrawer
    {
        function drawParticle(arg1:org.papervision3d.core.geom.renderables.Particle, arg2:flash.display.Graphics, arg3:org.papervision3d.core.render.data.RenderSessionData):void;

        function updateRenderRect(arg1:org.papervision3d.core.geom.renderables.Particle):void;
    }
}


//            class ITriangleDrawer
package org.papervision3d.core.render.draw 
{
    import flash.display.*;
    import flash.geom.*;
    import org.papervision3d.core.render.command.*;
    import org.papervision3d.core.render.data.*;
    
    public interface ITriangleDrawer
    {
        function drawTriangle(arg1:org.papervision3d.core.render.command.RenderTriangle, arg2:flash.display.Graphics, arg3:org.papervision3d.core.render.data.RenderSessionData, arg4:flash.display.BitmapData=null, arg5:flash.geom.Matrix=null):void;

        function drawRT(arg1:org.papervision3d.core.render.command.RenderTriangle, arg2:flash.display.Graphics, arg3:org.papervision3d.core.render.data.RenderSessionData):void;
    }
}


//          package filter
//            class BasicRenderFilter
package org.papervision3d.core.render.filter 
{
    public class BasicRenderFilter extends Object implements org.papervision3d.core.render.filter.IRenderFilter
    {
        public function BasicRenderFilter()
        {
            super();
            return;
        }

        public function filter(arg1:Array):int
        {
            return 0;
        }
    }
}


//            class IRenderFilter
package org.papervision3d.core.render.filter 
{
    public interface IRenderFilter
    {
        function filter(arg1:Array):int;
    }
}


//          package material
//            class IUpdateAfterMaterial
package org.papervision3d.core.render.material 
{
    import org.papervision3d.core.render.data.*;
    
    public interface IUpdateAfterMaterial
    {
        function updateAfterRender(arg1:org.papervision3d.core.render.data.RenderSessionData):void;
    }
}


//            class IUpdateBeforeMaterial
package org.papervision3d.core.render.material 
{
    import org.papervision3d.core.render.data.*;
    
    public interface IUpdateBeforeMaterial
    {
        function isUpdateable():Boolean;

        function updateBeforeRender(arg1:org.papervision3d.core.render.data.RenderSessionData):void;
    }
}


//            class MaterialManager
package org.papervision3d.core.render.material 
{
    import flash.utils.*;
    import org.papervision3d.core.proto.*;
    import org.papervision3d.core.render.data.*;
    
    public class MaterialManager extends Object
    {
        public function MaterialManager()
        {
            super();
            if (instance)
            {
                throw new Error("Only 1 instance of materialmanager allowed");
            }
            this.init();
            return;
        }

        private function init():void
        {
            this.materials = new flash.utils.Dictionary(true);
            return;
        }

        private function _unRegisterMaterial(arg1:org.papervision3d.core.proto.MaterialObject3D):void
        {
            delete this.materials[arg1];
            return;
        }

        public function updateMaterialsAfterRender(arg1:org.papervision3d.core.render.data.RenderSessionData):void
        {
            var loc1:*;
            loc1 = null;
            var loc2:*;
            loc2 = undefined;
            var loc3:*;
            loc3 = 0;
            var loc4:*;
            loc4 = this.materials;
            for (loc2 in loc4)
            {
                if (!(loc2 as org.papervision3d.core.render.material.IUpdateAfterMaterial))
                {
                    continue;
                }
                loc1 = loc2 as org.papervision3d.core.render.material.IUpdateAfterMaterial;
                loc1.updateAfterRender(arg1);
            }
            return;
        }

        private function _registerMaterial(arg1:org.papervision3d.core.proto.MaterialObject3D):void
        {
            this.materials[arg1] = true;
            return;
        }

        public function updateMaterialsBeforeRender(arg1:org.papervision3d.core.render.data.RenderSessionData):void
        {
            var loc1:*;
            loc1 = null;
            var loc2:*;
            loc2 = undefined;
            var loc3:*;
            loc3 = 0;
            var loc4:*;
            loc4 = this.materials;
            for (loc2 in loc4)
            {
                if (!(loc2 as org.papervision3d.core.render.material.IUpdateBeforeMaterial))
                {
                    continue;
                }
                loc1 = loc2 as org.papervision3d.core.render.material.IUpdateBeforeMaterial;
                if (!loc1.isUpdateable())
                {
                    continue;
                }
                loc1.updateBeforeRender(arg1);
            }
            return;
        }

        public static function getInstance():org.papervision3d.core.render.material.MaterialManager
        {
            if (!instance)
            {
                instance = new MaterialManager();
            }
            return instance;
        }

        public static function unRegisterMaterial(arg1:org.papervision3d.core.proto.MaterialObject3D):void
        {
            getInstance()._unRegisterMaterial(arg1);
            return;
        }

        public static function registerMaterial(arg1:org.papervision3d.core.proto.MaterialObject3D):void
        {
            getInstance()._registerMaterial(arg1);
            return;
        }

        private var materials:flash.utils.Dictionary;

        private static var instance:org.papervision3d.core.render.material.MaterialManager;
    }
}


//          package project
//            class BasicProjectionPipeline
package org.papervision3d.core.render.project 
{
    import org.papervision3d.core.render.data.*;
    import org.papervision3d.objects.*;
    
    public class BasicProjectionPipeline extends org.papervision3d.core.render.project.ProjectionPipeline
    {
        public function BasicProjectionPipeline()
        {
            super();
            this.init();
            return;
        }

        protected function init():void
        {
            return;
        }

        public override function project(arg1:org.papervision3d.core.render.data.RenderSessionData):void
        {
            var loc2:*;
            loc2 = null;
            var loc4:*;
            loc4 = NaN;
            arg1.camera.transformView();
            var loc1:*;
            loc1 = arg1.renderObjects;
            var loc3:*;
            loc3 = loc1.length;
            if (arg1.camera.useProjectionMatrix)
            {
                var loc5:*;
                loc5 = 0;
                var loc6:*;
                loc6 = loc1;
                for each (loc2 in loc6)
                {
                    if (!loc2.visible)
                    {
                        continue;
                    }
                    if (arg1.viewPort.viewportObjectFilter)
                    {
                        if (loc4 = arg1.viewPort.viewportObjectFilter.testObject(loc2))
                        {
                            this.projectObject(loc2, arg1, loc4);
                        }
                        else 
                        {
                            var loc7:*;
                            var loc8:*;
                            loc8 = ((loc7 = arg1.renderStatistics).filteredObjects + 1);
                            loc7.filteredObjects = loc8;
                        }
                        continue;
                    }
                    this.projectObject(loc2, arg1, 1);
                }
            }
            else 
            {
                loc5 = 0;
                loc6 = loc1;
                for each (loc2 in loc6)
                {
                    if (!loc2.visible)
                    {
                        continue;
                    }
                    if (arg1.viewPort.viewportObjectFilter)
                    {
                        if (loc4 = arg1.viewPort.viewportObjectFilter.testObject(loc2))
                        {
                            this.projectObject(loc2, arg1, loc4);
                        }
                        else 
                        {
                            loc8 = ((loc7 = arg1.renderStatistics).filteredObjects + 1);
                            loc7.filteredObjects = loc8;
                        }
                        continue;
                    }
                    this.projectObject(loc2, arg1, 1);
                }
            }
            return;
        }

        protected function projectObject(arg1:org.papervision3d.objects.DisplayObject3D, arg2:org.papervision3d.core.render.data.RenderSessionData, arg3:Number):void
        {
            arg1.cullTest = arg3;
            if (arg1.parent)
            {
                arg1.project(arg1.parent as org.papervision3d.objects.DisplayObject3D, arg2);
            }
            else 
            {
                arg1.project(arg2.camera, arg2);
            }
            return;
        }
    }
}


//            class ProjectionPipeline
package org.papervision3d.core.render.project 
{
    import org.papervision3d.core.render.data.*;
    
    public class ProjectionPipeline extends Object
    {
        public function ProjectionPipeline()
        {
            super();
            return;
        }

        public function project(arg1:org.papervision3d.core.render.data.RenderSessionData):void
        {
            return;
        }
    }
}


//          package shader
//            class IShaderRenderer
package org.papervision3d.core.render.shader 
{
    import flash.display.*;
    import org.papervision3d.core.render.data.*;
    import org.papervision3d.materials.shaders.*;
    
    public interface IShaderRenderer
    {
        function destroy():void;

        function getLayerForShader(arg1:org.papervision3d.materials.shaders.Shader):flash.display.Sprite;

        function clear():void;

        function render(arg1:org.papervision3d.core.render.data.RenderSessionData):void;
    }
}


//            class ShaderObjectData
package org.papervision3d.core.render.shader 
{
    import flash.display.*;
    import flash.geom.*;
    import flash.utils.*;
    import org.papervision3d.core.geom.renderables.*;
    import org.papervision3d.materials.*;
    import org.papervision3d.materials.shaders.*;
    import org.papervision3d.objects.*;
    
    public class ShaderObjectData extends Object
    {
        public function ShaderObjectData(arg1:org.papervision3d.objects.DisplayObject3D, arg2:org.papervision3d.materials.BitmapMaterial, arg3:org.papervision3d.materials.shaders.ShadedMaterial)
        {
            this.origin = new flash.geom.Point(0, 0);
            super();
            this.shaderRenderer = new org.papervision3d.core.render.shader.ShaderRenderer();
            this.lightMatrices = new flash.utils.Dictionary();
            this.uvMatrices = new flash.utils.Dictionary();
            this.object = arg1;
            this.material = arg2;
            this.shadedMaterial = arg3;
            this.triangleUVS = new flash.utils.Dictionary();
            this.renderTriangleUVS = new flash.utils.Dictionary();
            this.triangleBitmaps = new flash.utils.Dictionary();
            this.triangleRects = new flash.utils.Dictionary();
            return;
        }

        public function getPerTriUVForDraw(arg1:org.papervision3d.core.geom.renderables.Triangle3D):flash.geom.Matrix
        {
            var loc1:*;
            loc1 = null;
            var loc2:*;
            loc2 = NaN;
            var loc3:*;
            loc3 = NaN;
            var loc4:*;
            loc4 = NaN;
            var loc5:*;
            loc5 = NaN;
            var loc6:*;
            loc6 = NaN;
            var loc7:*;
            loc7 = NaN;
            var loc8:*;
            loc8 = NaN;
            var loc9:*;
            loc9 = NaN;
            var loc10:*;
            loc10 = null;
            if (!this.triangleUVS[arg1])
            {
                var loc11:*;
                this.triangleUVS[arg1] = loc11 = new flash.geom.Matrix();
                loc1 = loc11;
                loc2 = this.material.bitmap.width;
                loc3 = this.material.bitmap.height;
                loc4 = arg1.uv[0].u * loc2;
                loc5 = (1 - arg1.uv[0].v) * loc3;
                loc6 = arg1.uv[1].u * loc2;
                loc7 = (1 - arg1.uv[1].v) * loc3;
                loc8 = arg1.uv[2].u * loc2;
                loc9 = (1 - arg1.uv[2].v) * loc3;
                loc10 = this.getRectFor(arg1);
                loc1.tx = loc4 - loc10.x;
                loc1.ty = loc5 - loc10.y;
                loc1.a = loc6 - loc4;
                loc1.b = loc7 - loc5;
                loc1.c = loc8 - loc4;
                loc1.d = loc9 - loc5;
                loc1.invert();
            }
            return this.triangleUVS[arg1];
        }

        public function getRectFor(arg1:org.papervision3d.core.geom.renderables.Triangle3D):flash.geom.Rectangle
        {
            var loc1:*;
            loc1 = NaN;
            var loc2:*;
            loc2 = NaN;
            var loc3:*;
            loc3 = NaN;
            var loc4:*;
            loc4 = NaN;
            var loc5:*;
            loc5 = NaN;
            var loc6:*;
            loc6 = NaN;
            var loc7:*;
            loc7 = NaN;
            var loc8:*;
            loc8 = NaN;
            var loc9:*;
            loc9 = NaN;
            var loc10:*;
            loc10 = NaN;
            var loc11:*;
            loc11 = NaN;
            var loc12:*;
            loc12 = NaN;
            var loc13:*;
            loc13 = NaN;
            var loc14:*;
            loc14 = NaN;
            if (!this.triangleRects[arg1])
            {
                loc1 = this.material.bitmap.width;
                loc2 = this.material.bitmap.height;
                loc3 = arg1.uv[0].u * loc1;
                loc4 = (1 - arg1.uv[0].v) * loc2;
                loc5 = arg1.uv[1].u * loc1;
                loc6 = (1 - arg1.uv[1].v) * loc2;
                loc7 = arg1.uv[2].u * loc1;
                loc8 = (1 - arg1.uv[2].v) * loc2;
                loc9 = Math.min(Math.min(loc3, loc5), loc7);
                loc10 = Math.min(Math.min(loc4, loc6), loc8);
                loc11 = Math.max(Math.max(loc3, loc5), loc7);
                loc12 = Math.max(Math.max(loc4, loc6), loc8);
                loc13 = loc11 - loc9;
                loc14 = loc12 - loc10;
                if (loc13 <= 0)
                {
                    loc13 = 1;
                }
                if (loc14 <= 0)
                {
                    loc14 = 1;
                }
                var loc15:*;
                this.triangleRects[arg1] = loc15 = new flash.geom.Rectangle(loc9, loc10, loc13, loc14);
                return loc15;
            }
            return this.triangleRects[arg1];
        }

        private function perturbUVMatrix(arg1:flash.geom.Matrix, arg2:org.papervision3d.core.geom.renderables.Triangle3D, arg3:Number=2):void
        {
            var loc1:*;
            loc1 = this.material.bitmap.width;
            var loc2:*;
            loc2 = this.material.bitmap.height;
            var loc3:*;
            loc3 = arg2.uv[0].u;
            var loc4:*;
            loc4 = 1 - arg2.uv[0].v;
            var loc5:*;
            loc5 = arg2.uv[1].u;
            var loc6:*;
            loc6 = 1 - arg2.uv[1].v;
            var loc7:*;
            loc7 = arg2.uv[2].u;
            var loc8:*;
            loc8 = 1 - arg2.uv[2].v;
            var loc9:*;
            loc9 = loc3 * loc1;
            var loc10:*;
            loc10 = loc4 * loc2;
            var loc11:*;
            loc11 = loc5 * loc1;
            var loc12:*;
            loc12 = loc6 * loc2;
            var loc13:*;
            loc13 = loc7 * loc1;
            var loc14:*;
            loc14 = loc8 * loc2;
            var loc15:*;
            loc15 = (loc7 + loc5 + loc3) / 3;
            var loc16:*;
            loc16 = (loc8 + loc6 + loc4) / 3;
            var loc17:*;
            loc17 = loc3 - loc15;
            var loc18:*;
            loc18 = loc4 - loc16;
            var loc19:*;
            loc19 = loc5 - loc15;
            var loc20:*;
            loc20 = loc6 - loc16;
            var loc21:*;
            loc21 = loc7 - loc15;
            var loc22:*;
            loc22 = loc8 - loc16;
            var loc23:*;
            loc23 = loc17 < 0 ? -loc17 : loc17;
            var loc24:*;
            loc24 = loc18 < 0 ? -loc18 : loc18;
            var loc25:*;
            loc25 = loc19 < 0 ? -loc19 : loc19;
            var loc26:*;
            loc26 = loc20 < 0 ? -loc20 : loc20;
            var loc27:*;
            loc27 = loc21 < 0 ? -loc21 : loc21;
            var loc28:*;
            loc28 = loc22 < 0 ? -loc22 : loc22;
            var loc29:*;
            loc29 = loc23 > loc24 ? 1 / loc23 : 1 / loc24;
            var loc30:*;
            loc30 = loc25 > loc26 ? 1 / loc25 : 1 / loc26;
            var loc31:*;
            loc31 = loc27 > loc28 ? 1 / loc27 : 1 / loc28;
            loc9 = loc9 - (-loc17) * loc29 * arg3;
            loc10 = loc10 - (-loc18) * loc29 * arg3;
            loc11 = loc11 - (-loc19) * loc30 * arg3;
            loc12 = loc12 - (-loc20) * loc30 * arg3;
            loc13 = loc13 - (-loc21) * loc31 * arg3;
            loc14 = loc14 - (-loc22) * loc31 * arg3;
            arg1.tx = loc9;
            arg1.ty = loc10;
            arg1.a = loc11 - loc9;
            arg1.b = loc12 - loc10;
            arg1.c = loc13 - loc9;
            arg1.d = loc14 - loc10;
            return;
        }

        public function getOutputBitmapFor(arg1:org.papervision3d.core.geom.renderables.Triangle3D):flash.display.BitmapData
        {
            var loc1:*;
            loc1 = null;
            var loc2:*;
            loc2 = null;
            var loc3:*;
            loc3 = null;
            if (this.triangleBitmaps[arg1])
            {
                loc1 = this.getRectFor(arg1);
            }
            else 
            {
                loc1 = this.getRectFor(arg1);
                var loc4:*;
                this.triangleBitmaps[arg1] = loc4 = new flash.display.BitmapData(Math.ceil(loc1.width), Math.ceil(loc1.height), false, 0);
                loc2 = loc4;
                loc3 = new flash.geom.Rectangle(0, 0, loc2.width, loc2.height);
                loc2.copyPixels(this.material.bitmap, loc3, this.origin);
            }
            if (this.material.bitmap && loc1)
            {
                this.triangleBitmaps[arg1].copyPixels(this.material.bitmap, loc1, this.origin);
            }
            return this.triangleBitmaps[arg1];
        }

        public function updateBeforeRender():void
        {
            return;
        }

        public function getPerTriUVForShader(arg1:org.papervision3d.core.geom.renderables.Triangle3D):flash.geom.Matrix
        {
            var loc1:*;
            loc1 = null;
            var loc2:*;
            loc2 = NaN;
            var loc3:*;
            loc3 = NaN;
            var loc4:*;
            loc4 = NaN;
            var loc5:*;
            loc5 = NaN;
            var loc6:*;
            loc6 = NaN;
            var loc7:*;
            loc7 = NaN;
            var loc8:*;
            loc8 = NaN;
            var loc9:*;
            loc9 = NaN;
            var loc10:*;
            loc10 = null;
            if (!this.renderTriangleUVS[arg1])
            {
                var loc11:*;
                this.renderTriangleUVS[arg1] = loc11 = new flash.geom.Matrix();
                loc1 = loc11;
                loc2 = this.material.bitmap.width;
                loc3 = this.material.bitmap.height;
                loc4 = arg1.uv[0].u * loc2;
                loc5 = (1 - arg1.uv[0].v) * loc3;
                loc6 = arg1.uv[1].u * loc2;
                loc7 = (1 - arg1.uv[1].v) * loc3;
                loc8 = arg1.uv[2].u * loc2;
                loc9 = (1 - arg1.uv[2].v) * loc3;
                loc10 = this.getRectFor(arg1);
                loc1.tx = loc4 - loc10.x;
                loc1.ty = loc5 - loc10.y;
                loc1.a = loc6 - loc4;
                loc1.b = loc7 - loc5;
                loc1.c = loc8 - loc4;
                loc1.d = loc9 - loc5;
            }
            return this.renderTriangleUVS[arg1];
        }

        public function getUVMatrixForTriangle(arg1:org.papervision3d.core.geom.renderables.Triangle3D, arg2:Boolean=false):flash.geom.Matrix
        {
            var loc1:*;
            loc1 = null;
            var loc2:*;
            loc2 = NaN;
            var loc3:*;
            loc3 = NaN;
            var loc4:*;
            loc4 = NaN;
            var loc5:*;
            loc5 = NaN;
            var loc6:*;
            loc6 = NaN;
            var loc7:*;
            loc7 = NaN;
            var loc8:*;
            loc8 = NaN;
            var loc9:*;
            loc9 = NaN;
            var loc10:*;
            loc1 = loc10 = this.uvMatrices[arg1];
            if (!loc10)
            {
                loc1 = new flash.geom.Matrix();
                if (arg2)
                {
                    this.perturbUVMatrix(loc1, arg1, 2);
                }
                else 
                {
                    if (this.material.bitmap)
                    {
                        loc2 = this.material.bitmap.width;
                        loc3 = this.material.bitmap.height;
                        loc4 = arg1.uv[0].u * loc2;
                        loc5 = (1 - arg1.uv[0].v) * loc3;
                        loc6 = arg1.uv[1].u * loc2;
                        loc7 = (1 - arg1.uv[1].v) * loc3;
                        loc8 = arg1.uv[2].u * loc2;
                        loc9 = (1 - arg1.uv[2].v) * loc3;
                        loc1.tx = loc4;
                        loc1.ty = loc5;
                        loc1.a = loc6 - loc4;
                        loc1.b = loc7 - loc5;
                        loc1.c = loc8 - loc4;
                        loc1.d = loc9 - loc5;
                    }
                }
                if (this.material.bitmap)
                {
                    this.uvMatrices[arg1] = loc1;
                }
            }
            return loc1;
        }

        public function destroy():void
        {
            var loc1:*;
            loc1 = null;
            var loc2:*;
            loc2 = 0;
            var loc3:*;
            loc3 = this.uvMatrices;
            for each (loc1 in loc3)
            {
                this.uvMatrices[loc1] = null;
            }
            this.uvMatrices = null;
            this.shaderRenderer.destroy();
            this.shaderRenderer = null;
            this.lightMatrices = null;
            return;
        }

        public var shaderRenderer:org.papervision3d.core.render.shader.ShaderRenderer;

        public var triangleUVS:flash.utils.Dictionary;

        public var renderTriangleUVS:flash.utils.Dictionary;

        public var lightMatrices:flash.utils.Dictionary;

        public var shadedMaterial:org.papervision3d.materials.shaders.ShadedMaterial;

        public var uvMatrices:flash.utils.Dictionary;

        private var origin:flash.geom.Point;

        public var material:org.papervision3d.materials.BitmapMaterial;

        public var triangleRects:flash.utils.Dictionary;

        protected var triangleBitmaps:flash.utils.Dictionary;

        public var object:org.papervision3d.objects.DisplayObject3D;
    }
}


//            class ShaderRenderer
package org.papervision3d.core.render.shader 
{
    import flash.display.*;
    import flash.events.*;
    import flash.geom.*;
    import flash.utils.*;
    import org.papervision3d.core.render.data.*;
    import org.papervision3d.materials.shaders.*;
    
    public class ShaderRenderer extends flash.events.EventDispatcher implements org.papervision3d.core.render.shader.IShaderRenderer
    {
        public function ShaderRenderer()
        {
            super();
            this.container = new flash.display.Sprite();
            this.bitmapLayer = new flash.display.Sprite();
            this.bitmapContainer = new flash.display.Bitmap();
            this.bitmapLayer.addChild(this.bitmapContainer);
            this.bitmapLayer.blendMode = flash.display.BlendMode.NORMAL;
            this.shadeLayers = new flash.utils.Dictionary();
            this.container.addChild(this.bitmapLayer);
            return;
        }

        public function clear():void
        {
            var loc1:*;
            loc1 = null;
            var loc2:*;
            loc2 = 0;
            var loc3:*;
            loc3 = this.shadeLayers;
            for each (loc1 in loc3)
            {
                if (!(this.inputBitmap && this.inputBitmap.width > 0 && this.inputBitmap.height > 0))
                {
                    continue;
                }
                loc1.graphics.clear();
                loc1.graphics.beginFill(0, 1);
                loc1.graphics.drawRect(0, 0, this.inputBitmap.width, this.inputBitmap.height);
                loc1.graphics.endFill();
            }
            return;
        }

        public function render(arg1:org.papervision3d.core.render.data.RenderSessionData):void
        {
            if (this.outputBitmap)
            {
                this.outputBitmap.fillRect(this.outputBitmap.rect, 0);
                this.bitmapContainer.bitmapData = this.inputBitmap;
                this.outputBitmap.draw(this.container, null, null, null, this.outputBitmap.rect, false);
                if (this.outputBitmap.transparent)
                {
                    this.outputBitmap.copyChannel(this.inputBitmap, this.outputBitmap.rect, new flash.geom.Point(0, 0), flash.display.BitmapDataChannel.ALPHA, flash.display.BitmapDataChannel.ALPHA);
                }
            }
            return;
        }

        public function get inputBitmap():flash.display.BitmapData
        {
            return this._inputBitmapData;
        }

        public function set inputBitmap(arg1:flash.display.BitmapData):void
        {
            if (arg1 != null)
            {
                if (this._inputBitmapData != arg1)
                {
                    this._inputBitmapData = arg1;
                    if (this.outputBitmap)
                    {
                        if (!(this._inputBitmapData.width == this.outputBitmap.width) || !(this._inputBitmapData.height == this.outputBitmap.height))
                        {
                            this.resizedInput = true;
                            this.outputBitmap.dispose();
                            this.outputBitmap = this._inputBitmapData.clone();
                        }
                    }
                    else 
                    {
                        this.resizedInput = true;
                        this.outputBitmap = this._inputBitmapData.clone();
                    }
                }
            }
            return;
        }

        public function getLayerForShader(arg1:org.papervision3d.materials.shaders.Shader):flash.display.Sprite
        {
            var loc1:*;
            loc1 = new flash.display.Sprite();
            this.shadeLayers[arg1] = loc1;
            var loc2:*;
            loc2 = new flash.display.Sprite();
            loc1.addChild(loc2);
            if (this.inputBitmap != null)
            {
                loc2.graphics.beginFill(0, 0);
                loc2.graphics.drawRect(0, 0, this.inputBitmap.width, this.inputBitmap.height);
                loc2.graphics.endFill();
            }
            this.container.addChild(loc1);
            loc1.blendMode = arg1.layerBlendMode;
            return loc1;
        }

        public function destroy():void
        {
            this.bitmapLayer = null;
            this.outputBitmap.dispose();
            return;
        }

        public var container:flash.display.Sprite;

        public var shadeLayers:flash.utils.Dictionary;

        public var outputBitmap:flash.display.BitmapData;

        public var bitmapContainer:flash.display.Bitmap;

        public var resizedInput:Boolean=false;

        public var bitmapLayer:flash.display.Sprite;

        private var _inputBitmapData:flash.display.BitmapData;
    }
}


//          package sort
//            class BasicRenderSorter
package org.papervision3d.core.render.sort 
{
    public class BasicRenderSorter extends Object implements org.papervision3d.core.render.sort.IRenderSorter
    {
        public function BasicRenderSorter()
        {
            super();
            return;
        }

        public function sort(arg1:Array):void
        {
            arg1.sortOn("screenZ", Array.NUMERIC);
            return;
        }
    }
}


//            class IRenderSorter
package org.papervision3d.core.render.sort 
{
    public interface IRenderSorter
    {
        function sort(arg1:Array):void;
    }
}


//          class AbstractRenderEngine
package org.papervision3d.core.render 
{
    import flash.events.*;
    import org.papervision3d.core.proto.*;
    import org.papervision3d.core.render.command.*;
    import org.papervision3d.core.render.data.*;
    import org.papervision3d.view.*;
    
    public class AbstractRenderEngine extends flash.events.EventDispatcher implements org.papervision3d.core.render.IRenderEngine
    {
        public function AbstractRenderEngine(arg1:flash.events.IEventDispatcher=null)
        {
            super(arg1);
            return;
        }

        public function addToRenderList(arg1:org.papervision3d.core.render.command.RenderableListItem):int
        {
            return 0;
        }

        public function removeFromRenderList(arg1:org.papervision3d.core.render.command.IRenderListItem):int
        {
            return 0;
        }

        public function renderScene(arg1:org.papervision3d.core.proto.SceneObject3D, arg2:org.papervision3d.core.proto.CameraObject3D, arg3:org.papervision3d.view.Viewport3D):org.papervision3d.core.render.data.RenderStatistics
        {
            return null;
        }
    }
}


//          class IRenderEngine
package org.papervision3d.core.render 
{
    import org.papervision3d.core.proto.*;
    import org.papervision3d.core.render.command.*;
    import org.papervision3d.core.render.data.*;
    import org.papervision3d.view.*;
    
    public interface IRenderEngine
    {
        function addToRenderList(arg1:org.papervision3d.core.render.command.RenderableListItem):int;

        function removeFromRenderList(arg1:org.papervision3d.core.render.command.IRenderListItem):int;

        function renderScene(arg1:org.papervision3d.core.proto.SceneObject3D, arg2:org.papervision3d.core.proto.CameraObject3D, arg3:org.papervision3d.view.Viewport3D):org.papervision3d.core.render.data.RenderStatistics;
    }
}


//        package utils
//          package virtualmouse
//            class IVirtualMouseEvent
package org.papervision3d.core.utils.virtualmouse 
{
    public interface IVirtualMouseEvent
    {
    }
}


//            class VirtualMouse
package org.papervision3d.core.utils.virtualmouse 
{
    import flash.display.*;
    import flash.events.*;
    import flash.geom.*;
    import flash.utils.*;
    import org.papervision3d.core.log.*;
    
    public class VirtualMouse extends flash.events.EventDispatcher
    {
        public function VirtualMouse(arg1:flash.display.Stage=null, arg2:flash.display.Sprite=null, arg3:Number=0, arg4:Number=0)
        {
            this.disabledEvents = new Object();
            this.ignoredInstances = new flash.utils.Dictionary(true);
            this.eventEvent = org.papervision3d.core.utils.virtualmouse.VirtualMouseEvent;
            this.mouseEventEvent = org.papervision3d.core.utils.virtualmouse.VirtualMouseMouseEvent;
            super();
            this.stage = arg1;
            this.container = arg2;
            this.location = new flash.geom.Point(arg3, arg4);
            this.lastLocation = this.location.clone();
            addEventListener(UPDATE, this.handleUpdate);
            this.update();
            return;
        }

        public function get mouseIsDown():Boolean
        {
            return _mouseIsDown;
        }

        public function get container():flash.display.Sprite
        {
            return this._container;
        }

        public function exitContainer():void
        {
            if (!this.container)
            {
                return;
            }
            var loc1:*;
            loc1 = this.target.globalToLocal(this.location);
            if (!this.disabledEvents[flash.events.MouseEvent.MOUSE_OUT])
            {
                this._lastEvent = new this.mouseEventEvent(flash.events.MouseEvent.MOUSE_OUT, true, false, loc1.x, loc1.y, this.container, this.ctrlKey, this.altKey, this.shiftKey, _mouseIsDown, this.delta);
                this.container.dispatchEvent(new this.mouseEventEvent(flash.events.MouseEvent.MOUSE_OUT, true, false, loc1.x, loc1.y, this.container, this.ctrlKey, this.altKey, this.shiftKey, _mouseIsDown, this.delta));
                dispatchEvent(new this.mouseEventEvent(flash.events.MouseEvent.MOUSE_OUT, true, false, loc1.x, loc1.y, this.container, this.ctrlKey, this.altKey, this.shiftKey, _mouseIsDown, this.delta));
            }
            if (!this.disabledEvents[flash.events.MouseEvent.ROLL_OUT])
            {
                this._lastEvent = new this.mouseEventEvent(flash.events.MouseEvent.ROLL_OUT, false, false, loc1.x, loc1.y, this.container, this.ctrlKey, this.altKey, this.shiftKey, _mouseIsDown, this.delta);
                this.container.dispatchEvent(new this.mouseEventEvent(flash.events.MouseEvent.ROLL_OUT, false, false, loc1.x, loc1.y, this.container, this.ctrlKey, this.altKey, this.shiftKey, _mouseIsDown, this.delta));
                dispatchEvent(new this.mouseEventEvent(flash.events.MouseEvent.ROLL_OUT, false, false, loc1.x, loc1.y, this.container, this.ctrlKey, this.altKey, this.shiftKey, _mouseIsDown, this.delta));
            }
            if (this.target != this.container)
            {
                if (!this.disabledEvents[flash.events.MouseEvent.MOUSE_OUT])
                {
                    this._lastEvent = new this.mouseEventEvent(flash.events.MouseEvent.MOUSE_OUT, true, false, loc1.x, loc1.y, this.container, this.ctrlKey, this.altKey, this.shiftKey, _mouseIsDown, this.delta);
                    this.target.dispatchEvent(new this.mouseEventEvent(flash.events.MouseEvent.MOUSE_OUT, true, false, loc1.x, loc1.y, this.container, this.ctrlKey, this.altKey, this.shiftKey, _mouseIsDown, this.delta));
                    dispatchEvent(new this.mouseEventEvent(flash.events.MouseEvent.MOUSE_OUT, true, false, loc1.x, loc1.y, this.container, this.ctrlKey, this.altKey, this.shiftKey, _mouseIsDown, this.delta));
                }
                if (!this.disabledEvents[flash.events.MouseEvent.ROLL_OUT])
                {
                    this._lastEvent = new this.mouseEventEvent(flash.events.MouseEvent.ROLL_OUT, false, false, loc1.x, loc1.y, this.container, this.ctrlKey, this.altKey, this.shiftKey, _mouseIsDown, this.delta);
                    this.target.dispatchEvent(new this.mouseEventEvent(flash.events.MouseEvent.ROLL_OUT, false, false, loc1.x, loc1.y, this.container, this.ctrlKey, this.altKey, this.shiftKey, _mouseIsDown, this.delta));
                    dispatchEvent(new this.mouseEventEvent(flash.events.MouseEvent.ROLL_OUT, false, false, loc1.x, loc1.y, this.container, this.ctrlKey, this.altKey, this.shiftKey, _mouseIsDown, this.delta));
                }
            }
            this.target = this._stage;
            return;
        }

        public function release():void
        {
            this.updateMouseDown = true;
            _mouseIsDown = false;
            if (!this.isLocked)
            {
                this.update();
            }
            return;
        }

        private function keyHandler(arg1:flash.events.KeyboardEvent):void
        {
            this.altKey = arg1.altKey;
            this.ctrlKey = arg1.ctrlKey;
            this.shiftKey = arg1.shiftKey;
            return;
        }

        public function click():void
        {
            this.press();
            this.release();
            return;
        }

        public function disableEvent(arg1:String):void
        {
            this.disabledEvents[arg1] = true;
            return;
        }

        public function set container(arg1:flash.display.Sprite):void
        {
            this._container = arg1;
            return;
        }

        public function get lastEvent():flash.events.Event
        {
            return this._lastEvent;
        }

        private function handleUpdate(arg1:flash.events.Event):void
        {
            var loc3:*;
            loc3 = null;
            var loc4:*;
            loc4 = null;
            var loc8:*;
            loc8 = false;
            if (!this.container)
            {
                return;
            }
            if (this.container.scrollRect)
            {
                org.papervision3d.core.log.PaperLogger.warning("The container that virtualMouse is trying to test against has a scrollRect defined, and may cause an issue with finding objects under a defined point.  Use MovieMaterial.rect to set a rectangle area instead");
            }
            var loc1:*;
            loc1 = new flash.geom.Point();
            loc1.x = this.container.x;
            loc1.y = this.container.y;
            var loc9:*;
            this.container.y = loc9 = 0;
            this.container.x = loc9;
            var loc2:*;
            loc2 = this.container.getObjectsUnderPoint(this.location);
            this.container.x = loc1.x;
            this.container.y = loc1.y;
            var loc5:*;
            loc5 = loc2.length;
            while (loc5--) 
            {
                loc4 = loc2[loc5];
                while (loc4) 
                {
                    if (this.ignoredInstances[loc4])
                    {
                        loc3 = null;
                        break;
                    }
                    if (loc3 && loc4 as flash.display.SimpleButton)
                    {
                        loc3 = null;
                    }
                    else 
                    {
                        if (loc3 && !flash.display.DisplayObjectContainer(loc4).mouseChildren)
                        {
                            loc3 = null;
                        }
                    }
                    if (!loc3 && loc4 as flash.display.InteractiveObject && flash.display.InteractiveObject(loc4).mouseEnabled)
                    {
                        loc3 = flash.display.InteractiveObject(loc4);
                    }
                    loc4 = loc4.parent;
                }
                if (!loc3)
                {
                    continue;
                }
                break;
            }
            if (!loc3)
            {
                loc3 = this.container;
            }
            var loc6:*;
            loc6 = this.target.globalToLocal(this.location);
            var loc7:*;
            loc7 = loc3.globalToLocal(this.location);
            if (!(this.lastLocation.x == this.location.x) || !(this.lastLocation.y == this.location.y))
            {
                loc8 = false;
                if (this.stage)
                {
                    loc8 = this.location.x >= 0 && this.location.y >= 0 && this.location.x <= this.stage.stageWidth && this.location.y <= this.stage.stageHeight;
                }
                if (!loc8 && this.lastWithinStage && !this.disabledEvents[flash.events.Event.MOUSE_LEAVE])
                {
                    this._lastEvent = new this.eventEvent(flash.events.Event.MOUSE_LEAVE, false, false);
                    this.stage.dispatchEvent(this._lastEvent);
                    dispatchEvent(this._lastEvent);
                }
                if (loc8 && !this.disabledEvents[flash.events.MouseEvent.MOUSE_MOVE])
                {
                    this._lastEvent = new this.mouseEventEvent(flash.events.MouseEvent.MOUSE_MOVE, true, false, loc7.x, loc7.y, loc3, this.ctrlKey, this.altKey, this.shiftKey, _mouseIsDown, this.delta);
                    loc3.dispatchEvent(this._lastEvent);
                    dispatchEvent(this._lastEvent);
                }
                this.lastWithinStage = loc8;
            }
            if (loc3 != this.target)
            {
                if (!this.disabledEvents[flash.events.MouseEvent.MOUSE_OUT])
                {
                    this._lastEvent = new this.mouseEventEvent(flash.events.MouseEvent.MOUSE_OUT, true, false, loc6.x, loc6.y, loc3, this.ctrlKey, this.altKey, this.shiftKey, _mouseIsDown, this.delta);
                    this.target.dispatchEvent(this._lastEvent);
                    dispatchEvent(this._lastEvent);
                }
                if (!this.disabledEvents[flash.events.MouseEvent.ROLL_OUT])
                {
                    this._lastEvent = new this.mouseEventEvent(flash.events.MouseEvent.ROLL_OUT, false, false, loc6.x, loc6.y, loc3, this.ctrlKey, this.altKey, this.shiftKey, _mouseIsDown, this.delta);
                    this.target.dispatchEvent(this._lastEvent);
                    dispatchEvent(this._lastEvent);
                }
                if (!this.disabledEvents[flash.events.MouseEvent.MOUSE_OVER])
                {
                    this._lastEvent = new this.mouseEventEvent(flash.events.MouseEvent.MOUSE_OVER, true, false, loc7.x, loc7.y, this.target, this.ctrlKey, this.altKey, this.shiftKey, _mouseIsDown, this.delta);
                    loc3.dispatchEvent(this._lastEvent);
                    dispatchEvent(this._lastEvent);
                }
                if (!this.disabledEvents[flash.events.MouseEvent.ROLL_OVER])
                {
                    this._lastEvent = new this.mouseEventEvent(flash.events.MouseEvent.ROLL_OVER, false, false, loc7.x, loc7.y, this.target, this.ctrlKey, this.altKey, this.shiftKey, _mouseIsDown, this.delta);
                    loc3.dispatchEvent(this._lastEvent);
                    dispatchEvent(this._lastEvent);
                }
            }
            if (this.updateMouseDown)
            {
                if (_mouseIsDown)
                {
                    if (!this.disabledEvents[flash.events.MouseEvent.MOUSE_DOWN])
                    {
                        this._lastEvent = new this.mouseEventEvent(flash.events.MouseEvent.MOUSE_DOWN, true, false, loc7.x, loc7.y, loc3, this.ctrlKey, this.altKey, this.shiftKey, _mouseIsDown, this.delta);
                        loc3.dispatchEvent(this._lastEvent);
                        dispatchEvent(this._lastEvent);
                    }
                    this.lastDownTarget = loc3;
                    this.updateMouseDown = false;
                }
                else 
                {
                    if (!this.disabledEvents[flash.events.MouseEvent.MOUSE_UP])
                    {
                        this._lastEvent = new this.mouseEventEvent(flash.events.MouseEvent.MOUSE_UP, true, false, loc7.x, loc7.y, loc3, this.ctrlKey, this.altKey, this.shiftKey, _mouseIsDown, this.delta);
                        loc3.dispatchEvent(this._lastEvent);
                        dispatchEvent(this._lastEvent);
                    }
                    if (!this.disabledEvents[flash.events.MouseEvent.CLICK] && loc3 == this.lastDownTarget)
                    {
                        this._lastEvent = new this.mouseEventEvent(flash.events.MouseEvent.CLICK, true, false, loc7.x, loc7.y, loc3, this.ctrlKey, this.altKey, this.shiftKey, _mouseIsDown, this.delta);
                        loc3.dispatchEvent(this._lastEvent);
                        dispatchEvent(this._lastEvent);
                    }
                    this.lastDownTarget = null;
                    this.updateMouseDown = false;
                }
            }
            if (this.isDoubleClickEvent && !this.disabledEvents[flash.events.MouseEvent.DOUBLE_CLICK] && loc3.doubleClickEnabled)
            {
                this._lastEvent = new this.mouseEventEvent(flash.events.MouseEvent.DOUBLE_CLICK, true, false, loc7.x, loc7.y, loc3, this.ctrlKey, this.altKey, this.shiftKey, _mouseIsDown, this.delta);
                loc3.dispatchEvent(this._lastEvent);
                dispatchEvent(this._lastEvent);
            }
            this.lastLocation = this.location.clone();
            this.lastMouseDown = _mouseIsDown;
            this.target = loc3;
            return;
        }

        public function getLocation():flash.geom.Point
        {
            return this.location.clone();
        }

        public function lock():void
        {
            this.isLocked = true;
            return;
        }

        public function get useNativeEvents():Boolean
        {
            return this._useNativeEvents;
        }

        public function setLocation(arg1:*, arg2:*=null):void
        {
            var loc1:*;
            loc1 = null;
            if (arg1 as flash.geom.Point)
            {
                loc1 = arg1 as flash.geom.Point;
                this.location.x = loc1.x;
                this.location.y = loc1.y;
            }
            else 
            {
                this.location.x = Number(arg1);
                this.location.y = Number(arg2);
            }
            if (!this.isLocked)
            {
                this.update();
            }
            return;
        }

        public function unignore(arg1:flash.display.DisplayObject):void
        {
            if (this.ignoredInstances)
            {
                delete this.ignoredInstances[arg1];
            }
            return;
        }

        public function doubleClick():void
        {
            if (this.isLocked)
            {
                this.release();
            }
            else 
            {
                this.click();
                this.press();
                this.isDoubleClickEvent = true;
                this.release();
                this.isDoubleClickEvent = false;
            }
            return;
        }

        public function update():void
        {
            dispatchEvent(new flash.events.Event(UPDATE, false, false));
            return;
        }

        public function unlock():void
        {
            this.isLocked = false;
            this.update();
            return;
        }

        public function ignore(arg1:flash.display.DisplayObject):void
        {
            this.ignoredInstances[arg1] = true;
            return;
        }

        public function enableEvent(arg1:String):void
        {
            if (this.disabledEvents)
            {
                delete this.disabledEvents[arg1];
            }
            return;
        }

        public function press():void
        {
            this.updateMouseDown = true;
            _mouseIsDown = true;
            if (!this.isLocked)
            {
                this.update();
            }
            return;
        }

        public function set useNativeEvents(arg1:Boolean):void
        {
            if (arg1 == this._useNativeEvents)
            {
                return;
            }
            this._useNativeEvents = arg1;
            if (this._useNativeEvents)
            {
                this.eventEvent = org.papervision3d.core.utils.virtualmouse.VirtualMouseEvent;
                this.mouseEventEvent = org.papervision3d.core.utils.virtualmouse.VirtualMouseMouseEvent;
            }
            else 
            {
                this.eventEvent = flash.events.Event;
                this.mouseEventEvent = flash.events.MouseEvent;
            }
            return;
        }

        public function set x(arg1:Number):void
        {
            this.location.x = arg1;
            if (!this.isLocked)
            {
                this.update();
            }
            return;
        }

        public function set y(arg1:Number):void
        {
            this.location.y = arg1;
            if (!this.isLocked)
            {
                this.update();
            }
            return;
        }

        public function get y():Number
        {
            return this.location.y;
        }

        public function set stage(arg1:flash.display.Stage):void
        {
            var loc1:*;
            loc1 = false;
            if (this._stage)
            {
                loc1 = true;
                this._stage.removeEventListener(flash.events.KeyboardEvent.KEY_DOWN, this.keyHandler);
                this._stage.removeEventListener(flash.events.KeyboardEvent.KEY_UP, this.keyHandler);
            }
            else 
            {
                loc1 = false;
            }
            this._stage = arg1;
            if (this._stage)
            {
                this._stage.addEventListener(flash.events.KeyboardEvent.KEY_DOWN, this.keyHandler);
                this._stage.addEventListener(flash.events.KeyboardEvent.KEY_UP, this.keyHandler);
                this.target = this._stage;
                if (!loc1)
                {
                    this.update();
                }
            }
            return;
        }

        public function get stage():flash.display.Stage
        {
            return this._stage;
        }

        public function get x():Number
        {
            return this.location.x;
        }

        
        {
            _mouseIsDown = false;
        }

        public static const UPDATE:String="update";

        private var _container:flash.display.Sprite;

        private var _stage:flash.display.Stage;

        private var lastDownTarget:flash.display.DisplayObject;

        private var target:flash.display.InteractiveObject;

        private var updateMouseDown:Boolean=false;

        private var eventEvent:Class;

        private var _lastEvent:flash.events.Event;

        private var mouseEventEvent:Class;

        private var location:flash.geom.Point;

        private var delta:int=0;

        private var disabledEvents:Object;

        private var ignoredInstances:flash.utils.Dictionary;

        private var isLocked:Boolean=false;

        private var lastWithinStage:Boolean=true;

        private var lastLocation:flash.geom.Point;

        private var isDoubleClickEvent:Boolean=false;

        private var lastMouseDown:Boolean=false;

        private var ctrlKey:Boolean=false;

        private var altKey:Boolean=false;

        private var _useNativeEvents:Boolean=false;

        private var shiftKey:Boolean=false;

        private static var _mouseIsDown:Boolean=false;
    }
}


//            class VirtualMouseEvent
package org.papervision3d.core.utils.virtualmouse 
{
    import flash.events.*;
    
    public class VirtualMouseEvent extends flash.events.Event implements org.papervision3d.core.utils.virtualmouse.IVirtualMouseEvent
    {
        public function VirtualMouseEvent(arg1:String, arg2:Boolean=false, arg3:Boolean=false)
        {
            super(arg1, arg2, arg3);
            return;
        }
    }
}


//            class VirtualMouseMouseEvent
package org.papervision3d.core.utils.virtualmouse 
{
    import flash.display.*;
    import flash.events.*;
    
    public class VirtualMouseMouseEvent extends flash.events.MouseEvent implements org.papervision3d.core.utils.virtualmouse.IVirtualMouseEvent
    {
        public function VirtualMouseMouseEvent(arg1:String, arg2:Boolean=false, arg3:Boolean=false, arg4:Number=NaN, arg5:Number=NaN, arg6:flash.display.InteractiveObject=null, arg7:Boolean=false, arg8:Boolean=false, arg9:Boolean=false, arg10:Boolean=false, arg11:int=0)
        {
            super(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11);
            return;
        }
    }
}


//          class InteractiveSceneManager
package org.papervision3d.core.utils 
{
    import flash.display.*;
    import flash.events.*;
    import flash.geom.*;
    import org.papervision3d.core.geom.renderables.*;
    import org.papervision3d.core.proto.*;
    import org.papervision3d.core.render.data.*;
    import org.papervision3d.core.utils.virtualmouse.*;
    import org.papervision3d.events.*;
    import org.papervision3d.materials.*;
    import org.papervision3d.objects.*;
    import org.papervision3d.view.*;
    
    public class InteractiveSceneManager extends flash.events.EventDispatcher
    {
        public function InteractiveSceneManager(arg1:org.papervision3d.view.Viewport3D)
        {
            this.virtualMouse = new org.papervision3d.core.utils.virtualmouse.VirtualMouse();
            this.mouse3D = new org.papervision3d.core.utils.Mouse3D();
            this.currentMousePos = new flash.geom.Point();
            this.lastMousePos = new flash.geom.Point();
            super();
            this.viewport = arg1;
            this.container = arg1.containerSprite;
            this.init();
            return;
        }

        protected function handleMouseClick(arg1:flash.events.MouseEvent):void
        {
            if (arg1 as org.papervision3d.core.utils.virtualmouse.IVirtualMouseEvent)
            {
                return;
            }
            if (this.renderHitData && this.renderHitData.hasHit)
            {
                this.dispatchObjectEvent(org.papervision3d.events.InteractiveScene3DEvent.OBJECT_CLICK, this.currentDisplayObject3D);
            }
            return;
        }

        protected function handleEnterFrame(arg1:flash.events.Event):void
        {
            var loc2:*;
            loc2 = null;
            var loc1:*;
            loc1 = this.hasMouseMoved();
            if (loc1 || this._viewportRendered)
            {
                this.updateRenderHitData();
                this._viewportRendered = false;
                if (arg1 as org.papervision3d.core.utils.virtualmouse.IVirtualMouseEvent)
                {
                    return;
                }
                if (this.virtualMouse && this.renderHitData)
                {
                    loc2 = this.currentMaterial as org.papervision3d.materials.MovieMaterial;
                    if (loc2)
                    {
                        this.virtualMouse.container = loc2.movie as flash.display.Sprite;
                    }
                    if (this.virtualMouse.container)
                    {
                        this.virtualMouse.setLocation(this.renderHitData.u, this.renderHitData.v);
                    }
                    if (org.papervision3d.core.utils.Mouse3D.enabled && this.renderHitData && this.renderHitData.hasHit)
                    {
                        this.mouse3D.updatePosition(this.renderHitData);
                    }
                    this.dispatchObjectEvent(org.papervision3d.events.InteractiveScene3DEvent.OBJECT_MOVE, this.currentDisplayObject3D);
                }
                else 
                {
                    if (this.renderHitData && this.renderHitData.hasHit)
                    {
                        this.dispatchObjectEvent(org.papervision3d.events.InteractiveScene3DEvent.OBJECT_MOVE, this.currentDisplayObject3D);
                    }
                }
            }
            this.lastMousePos.x = this.currentMousePos.x;
            this.lastMousePos.y = this.currentMousePos.y;
            return;
        }

        public function updateAfterRender():void
        {
            this._viewportRendered = true;
            return;
        }

        public function initListeners():void
        {
            if (this.viewport.interactive)
            {
                this.container.addEventListener(flash.events.MouseEvent.MOUSE_DOWN, this.handleMousePress, false, 0, true);
                this.container.addEventListener(flash.events.MouseEvent.MOUSE_UP, this.handleMouseRelease, false, 0, true);
                this.container.addEventListener(flash.events.MouseEvent.CLICK, this.handleMouseClick, false, 0, true);
                this.container.addEventListener(flash.events.MouseEvent.DOUBLE_CLICK, this.handleMouseDoubleClick, false, 0, true);
                this.container.stage.addEventListener(flash.events.Event.ENTER_FRAME, this.handleEnterFrame, false, 0, true);
            }
            return;
        }

        protected function initVirtualMouse():void
        {
            this.virtualMouse.stage = this.container.stage;
            this.virtualMouse.container = this.container;
            return;
        }

        protected function handleMouseOver(arg1:org.papervision3d.objects.DisplayObject3D):void
        {
            if (this.hasMouseMoved())
            {
                this.dispatchObjectEvent(org.papervision3d.events.InteractiveScene3DEvent.OBJECT_OVER, arg1);
            }
            return;
        }

        protected function resolveRenderHitData():void
        {
            this.renderHitData = this.viewport.hitTestPoint2D(this.currentMousePos) as org.papervision3d.core.render.data.RenderHitData;
            return;
        }

        public function updateRenderHitData():void
        {
            this.resolveRenderHitData();
            this.currentDisplayObject3D = this.renderHitData.displayObject3D;
            this.currentMaterial = this.renderHitData.material;
            this.manageOverOut();
            return;
        }

        protected function hasMouseMoved():Boolean
        {
            this.currentMousePos.x = this.container.mouseX;
            this.currentMousePos.y = this.container.mouseY;
            return !this.currentMousePos.equals(this.lastMousePos);
        }

        protected function dispatchObjectEvent(arg1:String, arg2:org.papervision3d.objects.DisplayObject3D):void
        {
            var loc1:*;
            loc1 = NaN;
            var loc2:*;
            loc2 = NaN;
            var loc3:*;
            loc3 = null;
            if (this.renderHitData && this.renderHitData.hasHit)
            {
                loc1 = this.renderHitData.u ? this.renderHitData.u : 0;
                loc2 = this.renderHitData.v ? this.renderHitData.v : 0;
                (loc3 = new org.papervision3d.events.InteractiveScene3DEvent(arg1, arg2, this.container, this.renderHitData.renderable as org.papervision3d.core.geom.renderables.Triangle3D, loc1, loc2, this.renderHitData)).renderHitData = this.renderHitData;
                dispatchEvent(loc3);
                arg2.dispatchEvent(loc3);
            }
            else 
            {
                dispatchEvent(new org.papervision3d.events.InteractiveScene3DEvent(arg1, arg2, this.container));
                if (arg2)
                {
                    arg2.dispatchEvent(new org.papervision3d.events.InteractiveScene3DEvent(arg1, arg2, this.container));
                }
            }
            return;
        }

        protected function handleMouseDoubleClick(arg1:flash.events.MouseEvent):void
        {
            if (arg1 as org.papervision3d.core.utils.virtualmouse.IVirtualMouseEvent)
            {
                return;
            }
            if (this.renderHitData && this.renderHitData.hasHit)
            {
                this.dispatchObjectEvent(org.papervision3d.events.InteractiveScene3DEvent.OBJECT_DOUBLE_CLICK, this.currentDisplayObject3D);
            }
            return;
        }

        protected function handleMouseRelease(arg1:flash.events.MouseEvent):void
        {
            if (arg1 as org.papervision3d.core.utils.virtualmouse.IVirtualMouseEvent)
            {
                return;
            }
            MOUSE_IS_DOWN = false;
            if (this.virtualMouse)
            {
                this.virtualMouse.release();
            }
            if (org.papervision3d.core.utils.Mouse3D.enabled && this.renderHitData && !(this.renderHitData.renderable == null))
            {
                this.mouse3D.updatePosition(this.renderHitData);
            }
            if (this.renderHitData && this.renderHitData.hasHit)
            {
                this.dispatchObjectEvent(org.papervision3d.events.InteractiveScene3DEvent.OBJECT_RELEASE, this.currentDisplayObject3D);
            }
            return;
        }

        protected function handleAddedToStage(arg1:flash.events.Event):void
        {
            this.container.removeEventListener(flash.events.Event.ADDED_TO_STAGE, this.handleAddedToStage);
            this.initVirtualMouse();
            this.initListeners();
            return;
        }

        protected function handleMouseOut(arg1:org.papervision3d.objects.DisplayObject3D):void
        {
            var loc1:*;
            loc1 = null;
            if (!this.hasMouseMoved())
            {
                return;
            }
            if (arg1)
            {
                loc1 = arg1.material as org.papervision3d.materials.MovieMaterial;
                if (loc1)
                {
                    this.virtualMouse.exitContainer();
                }
            }
            this.dispatchObjectEvent(org.papervision3d.events.InteractiveScene3DEvent.OBJECT_OUT, arg1);
            return;
        }

        protected function manageOverOut():void
        {
            if (!this.enableOverOut)
            {
                return;
            }
            if (this.renderHitData && this.renderHitData.hasHit)
            {
                if (!this.currentMouseDO3D && this.currentDisplayObject3D)
                {
                    this.handleMouseOver(this.currentDisplayObject3D);
                    this.currentMouseDO3D = this.currentDisplayObject3D;
                }
                else 
                {
                    if (this.currentMouseDO3D && !(this.currentMouseDO3D == this.currentDisplayObject3D))
                    {
                        this.handleMouseOut(this.currentMouseDO3D);
                        this.handleMouseOver(this.currentDisplayObject3D);
                        this.currentMouseDO3D = this.currentDisplayObject3D;
                    }
                }
            }
            else 
            {
                if (this.currentMouseDO3D != null)
                {
                    this.handleMouseOut(this.currentMouseDO3D);
                    this.currentMouseDO3D = null;
                }
            }
            return;
        }

        public function destroy():void
        {
            this.viewport = null;
            this.renderHitData = null;
            this.currentDisplayObject3D = null;
            this.currentMaterial = null;
            this.currentMouseDO3D = null;
            this.virtualMouse.stage = null;
            this.virtualMouse.container = null;
            this.container.removeEventListener(flash.events.MouseEvent.MOUSE_DOWN, this.handleMousePress);
            this.container.removeEventListener(flash.events.MouseEvent.MOUSE_UP, this.handleMouseRelease);
            this.container.removeEventListener(flash.events.MouseEvent.CLICK, this.handleMouseClick);
            this.container.removeEventListener(flash.events.MouseEvent.DOUBLE_CLICK, this.handleMouseDoubleClick);
            if (this.container.stage)
            {
                this.container.stage.removeEventListener(flash.events.Event.ENTER_FRAME, this.handleEnterFrame);
            }
            this.container = null;
            return;
        }

        public function init():void
        {
            if (this.container)
            {
                if (this.container.stage)
                {
                    this.initVirtualMouse();
                    this.initListeners();
                }
                else 
                {
                    this.container.addEventListener(flash.events.Event.ADDED_TO_STAGE, this.handleAddedToStage, false, 0, true);
                }
            }
            return;
        }

        protected function handleMousePress(arg1:flash.events.MouseEvent):void
        {
            if (arg1 as org.papervision3d.core.utils.virtualmouse.IVirtualMouseEvent)
            {
                return;
            }
            MOUSE_IS_DOWN = true;
            if (this.virtualMouse)
            {
                this.virtualMouse.press();
            }
            if (org.papervision3d.core.utils.Mouse3D.enabled && this.renderHitData && !(this.renderHitData.renderable == null))
            {
                this.mouse3D.updatePosition(this.renderHitData);
            }
            if (this.renderHitData && this.renderHitData.hasHit)
            {
                this.dispatchObjectEvent(org.papervision3d.events.InteractiveScene3DEvent.OBJECT_PRESS, this.currentDisplayObject3D);
            }
            return;
        }

        
        {
            MOUSE_IS_DOWN = false;
        }

        public var currentMaterial:org.papervision3d.core.proto.MaterialObject3D;

        public var container:flash.display.Sprite;

        public var currentMousePos:flash.geom.Point;

        public var debug:Boolean=false;

        public var mouse3D:org.papervision3d.core.utils.Mouse3D;

        public var enableOverOut:Boolean=true;

        public var currentDisplayObject3D:org.papervision3d.objects.DisplayObject3D;

        public var _viewportRendered:Boolean=false;

        public var virtualMouse:org.papervision3d.core.utils.virtualmouse.VirtualMouse;

        public var lastMousePos:flash.geom.Point;

        public var viewport:org.papervision3d.view.Viewport3D;

        public var renderHitData:org.papervision3d.core.render.data.RenderHitData;

        public var currentMouseDO3D:org.papervision3d.objects.DisplayObject3D=null;

        public static var MOUSE_IS_DOWN:Boolean=false;
    }
}


//          class Mouse3D
package org.papervision3d.core.utils 
{
    import org.papervision3d.core.geom.renderables.*;
    import org.papervision3d.core.math.*;
    import org.papervision3d.core.render.data.*;
    import org.papervision3d.objects.*;
    
    public class Mouse3D extends org.papervision3d.objects.DisplayObject3D
    {
        public function Mouse3D()
        {
            this.target = new org.papervision3d.core.math.Number3D();
            super();
            return;
        }

        public function updatePosition(arg1:org.papervision3d.core.render.data.RenderHitData):void
        {
            var loc2:*;
            loc2 = null;
            var loc4:*;
            loc4 = null;
            var loc5:*;
            loc5 = null;
            var loc1:*;
            loc1 = arg1.renderable as org.papervision3d.core.geom.renderables.Triangle3D;
            this.target.x = loc1.faceNormal.x;
            this.target.y = loc1.faceNormal.y;
            this.target.z = loc1.faceNormal.z;
            var loc3:*;
            (loc3 = org.papervision3d.core.math.Number3D.sub(this.target, position)).normalize();
            if (loc3.modulo > 0.1)
            {
                (loc4 = org.papervision3d.core.math.Number3D.cross(loc3, UP)).normalize();
                (loc5 = org.papervision3d.core.math.Number3D.cross(loc3, loc4)).normalize();
                loc2 = this.transform;
                loc2.n11 = loc4.x;
                loc2.n21 = loc4.y;
                loc2.n31 = loc4.z;
                loc2.n12 = -loc5.x;
                loc2.n22 = -loc5.y;
                loc2.n32 = -loc5.z;
                loc2.n13 = loc3.x;
                loc2.n23 = loc3.y;
                loc2.n33 = loc3.z;
            }
            else 
            {
                loc2 = org.papervision3d.core.math.Matrix3D.IDENTITY;
            }
            this.transform = org.papervision3d.core.math.Matrix3D.multiply(loc1.instance.world, loc2);
            x = arg1.x;
            y = arg1.y;
            z = arg1.z;
            return;
        }

        
        {
            UP = new org.papervision3d.core.math.Number3D(0, 1, 0);
            enabled = false;
        }

        private var target:org.papervision3d.core.math.Number3D;

        public static var enabled:Boolean=false;

        private static var UP:org.papervision3d.core.math.Number3D;
    }
}


//          class StopWatch
package org.papervision3d.core.utils 
{
    import flash.events.*;
    import flash.utils.*;
    
    public class StopWatch extends flash.events.EventDispatcher
    {
        public function StopWatch()
        {
            super();
            return;
        }

        public function start():void
        {
            if (!this.isRunning)
            {
                this.startTime = flash.utils.getTimer();
                this.isRunning = true;
            }
            return;
        }

        public function stop():int
        {
            if (this.isRunning)
            {
                this.stopTime = flash.utils.getTimer();
                this.elapsedTime = this.stopTime - this.startTime;
                this.isRunning = false;
                return this.elapsedTime;
            }
            return 0;
        }

        public function reset():void
        {
            this.isRunning = false;
            return;
        }

        private var startTime:int;

        private var elapsedTime:int;

        private var isRunning:Boolean;

        private var stopTime:int;
    }
}


//        package view
//          class IView
package org.papervision3d.core.view 
{
    public interface IView
    {
        function stopRendering(arg1:Boolean=false, arg2:Boolean=false):void;

        function startRendering():void;

        function singleRender():void;
    }
}


//          class IViewport3D
package org.papervision3d.core.view 
{
    import org.papervision3d.core.render.data.*;
    
    public interface IViewport3D
    {
        function updateAfterRender(arg1:org.papervision3d.core.render.data.RenderSessionData):void;

        function updateBeforeRender(arg1:org.papervision3d.core.render.data.RenderSessionData):void;
    }
}


//      package events
//        class FileLoadEvent
package org.papervision3d.events 
{
    import flash.events.*;
    
    public class FileLoadEvent extends flash.events.Event
    {
        public function FileLoadEvent(arg1:String, arg2:String="", arg3:Number=-1, arg4:Number=-1, arg5:String="", arg6:Object=null, arg7:Boolean=false, arg8:Boolean=false)
        {
            super(arg1, arg7, arg8);
            this.file = arg2;
            this.bytesLoaded = arg3;
            this.bytesTotal = arg4;
            this.message = arg5;
            this.dataObj = arg6;
            return;
        }

        public override function clone():flash.events.Event
        {
            return new org.papervision3d.events.FileLoadEvent(type, this.file, this.bytesLoaded, this.bytesTotal, this.message, this.dataObj, bubbles, cancelable);
        }

        public static const COLLADA_MATERIALS_DONE:String="colladaMaterialsDone";

        public static const LOAD_PROGRESS:String="loadProgress";

        public static const ANIMATIONS_COMPLETE:String="animationsComplete";

        public static const SECURITY_LOAD_ERROR:String="securityLoadError";

        public static const LOAD_ERROR:String="loadError";

        public static const LOAD_COMPLETE:String="loadComplete";

        public static const ANIMATIONS_PROGRESS:String="animationsProgress";

        public var bytesLoaded:Number=-1;

        public var bytesTotal:Number=-1;

        public var file:String="";

        public var dataObj:Object=null;

        public var message:String="";
    }
}


//        class InteractiveScene3DEvent
package org.papervision3d.events 
{
    import flash.display.*;
    import flash.events.*;
    import org.papervision3d.core.geom.renderables.*;
    import org.papervision3d.core.render.data.*;
    import org.papervision3d.objects.*;
    
    public class InteractiveScene3DEvent extends flash.events.Event
    {
        public function InteractiveScene3DEvent(arg1:String, arg2:org.papervision3d.objects.DisplayObject3D=null, arg3:flash.display.Sprite=null, arg4:org.papervision3d.core.geom.renderables.Triangle3D=null, arg5:Number=0, arg6:Number=0, arg7:org.papervision3d.core.render.data.RenderHitData=null, arg8:Boolean=false, arg9:Boolean=false)
        {
            super(arg1, arg8, arg9);
            this.displayObject3D = arg2;
            this.sprite = arg3;
            this.face3d = arg4;
            this.x = arg5;
            this.y = arg6;
            this.renderHitData = arg7;
            return;
        }

        public override function toString():String
        {
            return "Type : " + type + ", DO3D : " + this.displayObject3D + " Sprite : " + this.sprite + " Face : " + this.face3d;
        }

        public static const OBJECT_ADDED:String="objectAdded";

        public static const OBJECT_PRESS:String="mousePress";

        public static const OBJECT_RELEASE:String="mouseRelease";

        public static const OBJECT_CLICK:String="mouseClick";

        public static const OBJECT_RELEASE_OUTSIDE:String="mouseReleaseOutside";

        public static const OBJECT_OUT:String="mouseOut";

        public static const OBJECT_MOVE:String="mouseMove";

        public static const OBJECT_OVER:String="mouseOver";

        public static const OBJECT_DOUBLE_CLICK:String="mouseDoubleClick";

        public var y:Number=0;

        public var sprite:flash.display.Sprite=null;

        public var renderHitData:org.papervision3d.core.render.data.RenderHitData;

        public var face3d:org.papervision3d.core.geom.renderables.Triangle3D=null;

        public var x:Number=0;

        public var displayObject3D:org.papervision3d.objects.DisplayObject3D=null;
    }
}


//        class RendererEvent
package org.papervision3d.events 
{
    import flash.events.*;
    import org.papervision3d.core.render.data.*;
    
    public class RendererEvent extends flash.events.Event
    {
        public function RendererEvent(arg1:String, arg2:org.papervision3d.core.render.data.RenderSessionData)
        {
            super(arg1);
            this.renderSessionData = arg2;
            return;
        }

        public function clear():void
        {
            this.renderSessionData = null;
            return;
        }

        public override function clone():flash.events.Event
        {
            return new org.papervision3d.events.RendererEvent(type, this.renderSessionData);
        }

        public static const PROJECTION_DONE:String="projectionDone";

        public static const RENDER_DONE:String="renderDone";

        public var renderSessionData:org.papervision3d.core.render.data.RenderSessionData;
    }
}


//      package lights
//        class PointLight3D
package org.papervision3d.lights 
{
    import org.papervision3d.core.math.*;
    import org.papervision3d.core.proto.*;
    
    public class PointLight3D extends org.papervision3d.core.proto.LightObject3D
    {
        public function PointLight3D(arg1:Boolean=false, arg2:Boolean=false)
        {
            super(arg1, arg2);
            x = DEFAULT_POS.x;
            y = DEFAULT_POS.y;
            z = DEFAULT_POS.z;
            return;
        }

        
        {
            DEFAULT_POS = new org.papervision3d.core.math.Number3D(0, 0, -1000);
        }

        public static var DEFAULT_POS:org.papervision3d.core.math.Number3D;
    }
}


//      package materials
//        package shaders
//          class ILightShader
package org.papervision3d.materials.shaders 
{
    import org.papervision3d.core.render.data.*;
    import org.papervision3d.core.render.shader.*;
    
    public interface ILightShader
    {
        function updateLightMatrix(arg1:org.papervision3d.core.render.shader.ShaderObjectData, arg2:org.papervision3d.core.render.data.RenderSessionData):void;
    }
}


//          class IShader
package org.papervision3d.materials.shaders 
{
    import flash.display.*;
    import org.papervision3d.core.geom.renderables.*;
    import org.papervision3d.core.render.data.*;
    import org.papervision3d.core.render.shader.*;
    
    public interface IShader
    {
        function updateAfterRender(arg1:org.papervision3d.core.render.data.RenderSessionData, arg2:org.papervision3d.core.render.shader.ShaderObjectData):void;

        function destroy():void;

        function renderLayer(arg1:org.papervision3d.core.geom.renderables.Triangle3D, arg2:org.papervision3d.core.render.data.RenderSessionData, arg3:org.papervision3d.core.render.shader.ShaderObjectData):void;

        function renderTri(arg1:org.papervision3d.core.geom.renderables.Triangle3D, arg2:org.papervision3d.core.render.data.RenderSessionData, arg3:org.papervision3d.core.render.shader.ShaderObjectData, arg4:flash.display.BitmapData):void;
    }
}


//          class ShadedMaterial
package org.papervision3d.materials.shaders 
{
    import flash.display.*;
    import flash.geom.*;
    import flash.utils.*;
    import org.papervision3d.core.log.*;
    import org.papervision3d.core.material.*;
    import org.papervision3d.core.render.command.*;
    import org.papervision3d.core.render.data.*;
    import org.papervision3d.core.render.draw.*;
    import org.papervision3d.core.render.material.*;
    import org.papervision3d.core.render.shader.*;
    import org.papervision3d.materials.*;
    import org.papervision3d.objects.*;
    
    public class ShadedMaterial extends org.papervision3d.core.material.TriangleMaterial implements org.papervision3d.core.render.draw.ITriangleDrawer, org.papervision3d.core.render.material.IUpdateBeforeMaterial, org.papervision3d.core.render.material.IUpdateAfterMaterial
    {
        public function ShadedMaterial(arg1:org.papervision3d.materials.BitmapMaterial, arg2:org.papervision3d.materials.shaders.Shader, arg3:int=0)
        {
            super();
            this.shader = arg2;
            this.material = arg1;
            this.shaderCompositeMode = arg3;
            this.init();
            return;
        }

        public override function registerObject(arg1:org.papervision3d.objects.DisplayObject3D):void
        {
            super.registerObject(arg1);
            var loc2:*;
            this.shaderObjectData[arg1] = loc2 = new org.papervision3d.core.render.shader.ShaderObjectData(arg1, this.material, this);
            var loc1:*;
            loc1 = loc2;
            loc1.shaderRenderer.inputBitmap = this.material.bitmap;
            this.shader.setContainerForObject(arg1, loc1.shaderRenderer.getLayerForShader(this.shader));
            return;
        }

        public function updateAfterRender(arg1:org.papervision3d.core.render.data.RenderSessionData):void
        {
            var loc1:*;
            loc1 = null;
            var loc2:*;
            loc2 = 0;
            var loc3:*;
            loc3 = this.shaderObjectData;
            for each (loc1 in loc3)
            {
                this.shader.updateAfterRender(arg1, loc1);
                if (this.shaderCompositeMode != org.papervision3d.materials.shaders.ShaderCompositeModes.PER_LAYER)
                {
                    continue;
                }
                loc1.shaderRenderer.render(arg1);
            }
            return;
        }

        public override function drawTriangle(arg1:org.papervision3d.core.render.command.RenderTriangle, arg2:flash.display.Graphics, arg3:org.papervision3d.core.render.data.RenderSessionData, arg4:flash.display.BitmapData=null, arg5:flash.geom.Matrix=null):void
        {
            var loc1:*;
            loc1 = org.papervision3d.core.render.shader.ShaderObjectData(this.shaderObjectData[arg1.renderableInstance.instance]);
            if (this.shaderCompositeMode != org.papervision3d.materials.shaders.ShaderCompositeModes.PER_LAYER)
            {
                if (this.shaderCompositeMode == org.papervision3d.materials.shaders.ShaderCompositeModes.PER_TRIANGLE_IN_BITMAP)
                {
                    bmp = loc1.getOutputBitmapFor(arg1.triangle);
                    this.material.drawTriangle(arg1, arg2, arg3, bmp, loc1.triangleUVS[arg1.triangle] ? loc1.triangleUVS[arg1.triangle] : loc1.getPerTriUVForDraw(arg1.triangle));
                    this.shader.renderTri(arg1.triangle, arg3, loc1, bmp);
                }
            }
            else 
            {
                this.material.drawTriangle(arg1, arg2, arg3, loc1.shaderRenderer.outputBitmap);
                this.shader.renderLayer(arg1.triangle, arg3, loc1);
            }
            return;
        }

        private function init():void
        {
            this.shaderObjectData = new flash.utils.Dictionary();
            return;
        }

        public function set shaderCompositeMode(arg1:int):void
        {
            this._shaderCompositeMode = arg1;
            return;
        }

        public function get shaderCompositeMode():int
        {
            return this._shaderCompositeMode;
        }

        public function getOutputBitmapDataFor(arg1:org.papervision3d.objects.DisplayObject3D):flash.display.BitmapData
        {
            var loc1:*;
            loc1 = null;
            if (this.shaderCompositeMode != org.papervision3d.materials.shaders.ShaderCompositeModes.PER_LAYER)
            {
                org.papervision3d.core.log.PaperLogger.warning("getOutputBitmapDataFor only works on per layer mode");
            }
            else 
            {
                if (this.shaderObjectData[arg1])
                {
                    loc1 = org.papervision3d.core.render.shader.ShaderObjectData(this.shaderObjectData[arg1]);
                    return loc1.shaderRenderer.outputBitmap;
                }
                org.papervision3d.core.log.PaperLogger.warning("object not registered with shaded material");
            }
            return null;
        }

        public override function destroy():void
        {
            var loc1:*;
            loc1 = null;
            super.destroy();
            var loc2:*;
            loc2 = 0;
            var loc3:*;
            loc3 = this.shaderObjectData;
            for each (loc1 in loc3)
            {
                loc1.destroy();
            }
            this.material = null;
            this.shader = null;
            return;
        }

        public override function unregisterObject(arg1:org.papervision3d.objects.DisplayObject3D):void
        {
            super.unregisterObject(arg1);
            var loc1:*;
            loc1 = this.shaderObjectData[arg1];
            loc1.destroy();
            delete this.shaderObjectData[arg1];
            return;
        }

        public function updateBeforeRender(arg1:org.papervision3d.core.render.data.RenderSessionData):void
        {
            var loc1:*;
            loc1 = null;
            var loc2:*;
            loc2 = null;
            var loc3:*;
            loc3 = 0;
            var loc4:*;
            loc4 = this.shaderObjectData;
            for each (loc1 in loc4)
            {
                loc1.shaderRenderer.inputBitmap = this.material.bitmap;
                if (this.shaderCompositeMode == org.papervision3d.materials.shaders.ShaderCompositeModes.PER_LAYER)
                {
                    if (loc1.shaderRenderer.resizedInput)
                    {
                        loc1.shaderRenderer.resizedInput = false;
                        loc1.uvMatrices = new flash.utils.Dictionary();
                    }
                    loc1.shaderRenderer.clear();
                }
                if (!(this.shader as org.papervision3d.materials.shaders.ILightShader))
                {
                    continue;
                }
                loc2 = this.shader as org.papervision3d.materials.shaders.ILightShader;
                loc2.updateLightMatrix(loc1, arg1);
            }
            return;
        }

        public var shader:org.papervision3d.materials.shaders.Shader;

        private var _shaderCompositeMode:int;

        public var material:org.papervision3d.materials.BitmapMaterial;

        public var shaderObjectData:flash.utils.Dictionary;

        private static var bmp:flash.display.BitmapData;
    }
}


//          class Shader
package org.papervision3d.materials.shaders 
{
    import flash.display.*;
    import flash.events.*;
    import flash.filters.*;
    import flash.utils.*;
    import org.papervision3d.core.geom.renderables.*;
    import org.papervision3d.core.render.data.*;
    import org.papervision3d.core.render.shader.*;
    import org.papervision3d.objects.*;
    
    public class Shader extends flash.events.EventDispatcher implements org.papervision3d.materials.shaders.IShader
    {
        public function Shader()
        {
            super();
            this.layers = new flash.utils.Dictionary(true);
            return;
        }

        public function set layerBlendMode(arg1:String):void
        {
            this._blendMode = arg1;
            return;
        }

        public function setContainerForObject(arg1:org.papervision3d.objects.DisplayObject3D, arg2:flash.display.Sprite):void
        {
            this.layers[arg1] = arg2;
            return;
        }

        public function updateAfterRender(arg1:org.papervision3d.core.render.data.RenderSessionData, arg2:org.papervision3d.core.render.shader.ShaderObjectData):void
        {
            return;
        }

        public function set filter(arg1:flash.filters.BitmapFilter):void
        {
            this._filter = arg1;
            return;
        }

        public function get layerBlendMode():String
        {
            return this._blendMode;
        }

        public function get filter():flash.filters.BitmapFilter
        {
            return this._filter;
        }

        public function destroy():void
        {
            return;
        }

        public function renderTri(arg1:org.papervision3d.core.geom.renderables.Triangle3D, arg2:org.papervision3d.core.render.data.RenderSessionData, arg3:org.papervision3d.core.render.shader.ShaderObjectData, arg4:flash.display.BitmapData):void
        {
            return;
        }

        public function renderLayer(arg1:org.papervision3d.core.geom.renderables.Triangle3D, arg2:org.papervision3d.core.render.data.RenderSessionData, arg3:org.papervision3d.core.render.shader.ShaderObjectData):void
        {
            return;
        }

        protected var layers:flash.utils.Dictionary;

        protected var _blendMode:String="multiply";

        protected var _filter:flash.filters.BitmapFilter;

        protected var _object:org.papervision3d.objects.DisplayObject3D;
    }
}


//          class ShaderCompositeModes
package org.papervision3d.materials.shaders 
{
    public class ShaderCompositeModes extends Object
    {
        public function ShaderCompositeModes()
        {
            super();
            return;
        }

        
        {
            PER_LAYER = 0;
            PER_TRIANGLE_IN_BITMAP = 1;
        }

        public static var PER_TRIANGLE_IN_BITMAP:int=1;

        public static var PER_LAYER:int=0;
    }
}


//        package special
//          class CompositeMaterial
package org.papervision3d.materials.special 
{
    import flash.display.*;
    import flash.geom.*;
    import org.papervision3d.core.material.*;
    import org.papervision3d.core.proto.*;
    import org.papervision3d.core.render.command.*;
    import org.papervision3d.core.render.data.*;
    import org.papervision3d.core.render.draw.*;
    import org.papervision3d.objects.*;
    
    public class CompositeMaterial extends org.papervision3d.core.material.TriangleMaterial implements org.papervision3d.core.render.draw.ITriangleDrawer
    {
        public function CompositeMaterial()
        {
            super();
            this.init();
            return;
        }

        private function init():void
        {
            this.materials = new Array();
            return;
        }

        public override function registerObject(arg1:org.papervision3d.objects.DisplayObject3D):void
        {
            var loc1:*;
            loc1 = null;
            super.registerObject(arg1);
            var loc2:*;
            loc2 = 0;
            var loc3:*;
            loc3 = this.materials;
            for each (loc1 in loc3)
            {
                loc1.registerObject(arg1);
            }
            return;
        }

        public override function drawTriangle(arg1:org.papervision3d.core.render.command.RenderTriangle, arg2:flash.display.Graphics, arg3:org.papervision3d.core.render.data.RenderSessionData, arg4:flash.display.BitmapData=null, arg5:flash.geom.Matrix=null):void
        {
            var loc1:*;
            loc1 = null;
            var loc2:*;
            loc2 = 0;
            var loc3:*;
            loc3 = this.materials;
            for each (loc1 in loc3)
            {
                if (loc1.invisible)
                {
                    continue;
                }
                loc1.drawTriangle(arg1, arg2, arg3);
            }
            return;
        }

        public function removeAllMaterials():void
        {
            this.materials = new Array();
            return;
        }

        public override function unregisterObject(arg1:org.papervision3d.objects.DisplayObject3D):void
        {
            var loc1:*;
            loc1 = null;
            super.unregisterObject(arg1);
            var loc2:*;
            loc2 = 0;
            var loc3:*;
            loc3 = this.materials;
            for each (loc1 in loc3)
            {
                loc1.unregisterObject(arg1);
            }
            return;
        }

        public function removeMaterial(arg1:org.papervision3d.core.proto.MaterialObject3D):void
        {
            this.materials.splice(this.materials.indexOf(arg1), 1);
            return;
        }

        public function addMaterial(arg1:org.papervision3d.core.proto.MaterialObject3D):void
        {
            var loc1:*;
            loc1 = null;
            var loc2:*;
            loc2 = null;
            this.materials.push(arg1);
            var loc3:*;
            loc3 = 0;
            var loc4:*;
            loc4 = objects;
            for (loc1 in loc4)
            {
                loc2 = loc1 as org.papervision3d.objects.DisplayObject3D;
                arg1.registerObject(loc2);
            }
            return;
        }

        public var materials:Array;
    }
}


//          class LineMaterial
package org.papervision3d.materials.special 
{
    import flash.display.*;
    import org.papervision3d.core.proto.*;
    import org.papervision3d.core.render.command.*;
    import org.papervision3d.core.render.data.*;
    import org.papervision3d.core.render.draw.*;
    
    public class LineMaterial extends org.papervision3d.core.proto.MaterialObject3D implements org.papervision3d.core.render.draw.ILineDrawer
    {
        public function LineMaterial(arg1:Number=16711680, arg2:Number=1)
        {
            super();
            this.lineColor = arg1;
            this.lineAlpha = arg2;
            return;
        }

        public function drawLine(arg1:org.papervision3d.core.render.command.RenderLine, arg2:flash.display.Graphics, arg3:org.papervision3d.core.render.data.RenderSessionData):void
        {
            arg2.lineStyle(arg1.size, lineColor, lineAlpha);
            arg2.moveTo(arg1.v0.x, arg1.v0.y);
            if (arg1.cV)
            {
                arg2.curveTo(arg1.cV.x, arg1.cV.y, arg1.v1.x, arg1.v1.y);
            }
            else 
            {
                arg2.lineTo(arg1.v1.x, arg1.v1.y);
            }
            arg2.moveTo(0, 0);
            arg2.lineStyle();
            return;
        }
    }
}


//          class ParticleMaterial
package org.papervision3d.materials.special 
{
    import flash.display.*;
    import flash.geom.*;
    import org.papervision3d.core.geom.renderables.*;
    import org.papervision3d.core.log.*;
    import org.papervision3d.core.proto.*;
    import org.papervision3d.core.render.data.*;
    import org.papervision3d.core.render.draw.*;
    
    public class ParticleMaterial extends org.papervision3d.core.proto.MaterialObject3D implements org.papervision3d.core.render.draw.IParticleDrawer
    {
        public function ParticleMaterial(arg1:Number, arg2:Number, arg3:int=0, arg4:Number=1)
        {
            super();
            this.shape = arg3;
            this.fillAlpha = arg2;
            this.fillColor = arg1;
            this.scale = arg4;
            return;
        }

        public function drawParticle(arg1:org.papervision3d.core.geom.renderables.Particle, arg2:flash.display.Graphics, arg3:org.papervision3d.core.render.data.RenderSessionData):void
        {
            arg2.beginFill(fillColor, fillAlpha);
            var loc1:*;
            loc1 = arg1.renderRect;
            if (this.shape != SHAPE_SQUARE)
            {
                if (this.shape != SHAPE_CIRCLE)
                {
                    org.papervision3d.core.log.PaperLogger.warning("Particle material has no valid shape - Must be ParticleMaterial.SHAPE_SQUARE or ParticleMaterial.SHAPE_CIRCLE");
                }
                else 
                {
                    arg2.drawCircle(loc1.x + loc1.width / 2, loc1.y + loc1.width / 2, loc1.width / 2);
                }
            }
            else 
            {
                arg2.drawRect(loc1.x, loc1.y, loc1.width, loc1.height);
            }
            arg2.endFill();
            var loc2:*;
            var loc3:*;
            loc3 = ((loc2 = arg3.renderStatistics).particles + 1);
            loc2.particles = loc3;
            return;
        }

        public function updateRenderRect(arg1:org.papervision3d.core.geom.renderables.Particle):void
        {
            var loc1:*;
            loc1 = arg1.renderRect;
            if (arg1.size != 0)
            {
                loc1.width = arg1.renderScale * arg1.size * this.scale;
                loc1.height = arg1.renderScale * arg1.size * this.scale;
            }
            else 
            {
                loc1.width = 1;
                loc1.height = 1;
            }
            loc1.x = arg1.vertex3D.vertex3DInstance.x - loc1.width / 2;
            loc1.y = arg1.vertex3D.vertex3DInstance.y - loc1.width / 2;
            return;
        }

        
        {
            SHAPE_SQUARE = 0;
            SHAPE_CIRCLE = 1;
        }

        public var shape:int;

        public var scale:Number;

        public static var SHAPE_SQUARE:int=0;

        public static var SHAPE_CIRCLE:int=1;
    }
}


//        package utils
//          class LightMatrix
package org.papervision3d.materials.utils 
{
    import org.papervision3d.*;
    import org.papervision3d.core.math.*;
    import org.papervision3d.core.proto.*;
    import org.papervision3d.core.render.data.*;
    import org.papervision3d.lights.*;
    import org.papervision3d.objects.*;
    
    public class LightMatrix extends Object
    {
        public function LightMatrix()
        {
            super();
            return;
        }

        public static function getLightMatrix(arg1:org.papervision3d.core.proto.LightObject3D, arg2:org.papervision3d.objects.DisplayObject3D, arg3:org.papervision3d.core.render.data.RenderSessionData, arg4:org.papervision3d.core.math.Matrix3D):org.papervision3d.core.math.Matrix3D
        {
            var loc2:*;
            loc2 = null;
            var loc3:*;
            loc3 = null;
            var loc1:*;
            loc1 = arg4 ? arg4 : org.papervision3d.core.math.Matrix3D.IDENTITY;
            if (arg1 == null)
            {
                arg1 = new org.papervision3d.lights.PointLight3D();
                arg1.copyPosition(arg3.camera);
            }
            _targetPos.reset();
            _lightPos.reset();
            _lightDir.reset();
            _lightUp.reset();
            _lightSide.reset();
            if (!arg2)
            {
                return loc1;
            }
            loc2 = arg1.transform;
            loc3 = arg2.world;
            _lightPos.x = -loc2.n14;
            _lightPos.y = -loc2.n24;
            _lightPos.z = -loc2.n34;
            _targetPos.x = -loc3.n14;
            _targetPos.y = -loc3.n24;
            _targetPos.z = -loc3.n34;
            _lightDir.x = _targetPos.x - _lightPos.x;
            _lightDir.y = _targetPos.y - _lightPos.y;
            _lightDir.z = _targetPos.z - _lightPos.z;
            invMatrix.calculateInverse(arg2.world);
            org.papervision3d.core.math.Matrix3D.multiplyVector3x3(invMatrix, _lightDir);
            _lightDir.normalize();
            _lightSide.x = _lightDir.y * UP.z - _lightDir.z * UP.y;
            _lightSide.y = _lightDir.z * UP.x - _lightDir.x * UP.z;
            _lightSide.z = _lightDir.x * UP.y - _lightDir.y * UP.x;
            _lightSide.normalize();
            _lightUp.x = _lightSide.y * _lightDir.z - _lightSide.z * _lightDir.y;
            _lightUp.y = _lightSide.z * _lightDir.x - _lightSide.x * _lightDir.z;
            _lightUp.z = _lightSide.x * _lightDir.y - _lightSide.y * _lightDir.x;
            _lightUp.normalize();
            if (org.papervision3d.Papervision3D.useRIGHTHANDED || arg2.flipLightDirection)
            {
                _lightDir.x = -_lightDir.x;
                _lightDir.y = -_lightDir.y;
                _lightDir.z = -_lightDir.z;
            }
            loc1.n11 = _lightSide.x;
            loc1.n12 = _lightSide.y;
            loc1.n13 = _lightSide.z;
            loc1.n21 = _lightUp.x;
            loc1.n22 = _lightUp.y;
            loc1.n23 = _lightUp.z;
            loc1.n31 = _lightDir.x;
            loc1.n32 = _lightDir.y;
            loc1.n33 = _lightDir.z;
            return loc1;
        }

        
        {
            lightMatrix = org.papervision3d.core.math.Matrix3D.IDENTITY;
            invMatrix = org.papervision3d.core.math.Matrix3D.IDENTITY;
            _targetPos = new org.papervision3d.core.math.Number3D();
            _lightPos = new org.papervision3d.core.math.Number3D();
            _lightDir = new org.papervision3d.core.math.Number3D();
            _lightUp = new org.papervision3d.core.math.Number3D();
            _lightSide = new org.papervision3d.core.math.Number3D();
            UP = new org.papervision3d.core.math.Number3D(0, 1, 0);
        }

        private static var _targetPos:org.papervision3d.core.math.Number3D;

        private static var _lightUp:org.papervision3d.core.math.Number3D;

        private static var _lightSide:org.papervision3d.core.math.Number3D;

        private static var _lightDir:org.papervision3d.core.math.Number3D;

        private static var lightMatrix:org.papervision3d.core.math.Matrix3D;

        private static var invMatrix:org.papervision3d.core.math.Matrix3D;

        protected static var UP:org.papervision3d.core.math.Number3D;

        private static var _lightPos:org.papervision3d.core.math.Number3D;
    }
}


//          class MaterialsList
package org.papervision3d.materials.utils 
{
    import flash.utils.*;
    import org.papervision3d.core.proto.*;
    
    public class MaterialsList extends Object
    {
        public function MaterialsList(arg1:*=null)
        {
            var loc1:*;
            loc1 = null;
            var loc2:*;
            loc2 = null;
            super();
            this.materialsByName = new flash.utils.Dictionary(true);
            this._materials = new flash.utils.Dictionary(false);
            this._materialsTotal = 0;
            if (arg1)
            {
                if (arg1 as Array)
                {
                    var loc3:*;
                    loc3 = 0;
                    var loc4:*;
                    loc4 = arg1;
                    for (loc1 in loc4)
                    {
                        this.addMaterial(arg1[loc1]);
                    }
                }
                else 
                {
                    if (arg1 as Object)
                    {
                        loc3 = 0;
                        loc4 = arg1;
                        for (loc2 in loc4)
                        {
                            this.addMaterial(arg1[loc2], loc2);
                        }
                    }
                }
            }
            return;
        }

        public function get numMaterials():int
        {
            return this._materialsTotal;
        }

        public function addMaterial(arg1:org.papervision3d.core.proto.MaterialObject3D, arg2:String=null):org.papervision3d.core.proto.MaterialObject3D
        {
            arg2 = arg2 || arg1.name || String(arg1.id);
            this._materials[arg1] = arg2;
            this.materialsByName[arg2] = arg1;
            var loc1:*;
            var loc2:*;
            loc2 = ((loc1 = this)._materialsTotal + 1);
            loc1._materialsTotal = loc2;
            return arg1;
        }

        public function removeMaterial(arg1:org.papervision3d.core.proto.MaterialObject3D):org.papervision3d.core.proto.MaterialObject3D
        {
            if (this._materials[arg1])
            {
                delete this.materialsByName[this._materials[arg1]];
                delete this._materials[arg1];
                var loc1:*;
                var loc2:*;
                loc2 = ((loc1 = this)._materialsTotal - 1);
                loc1._materialsTotal = loc2;
            }
            return arg1;
        }

        public function toString():String
        {
            var loc2:*;
            loc2 = null;
            var loc1:*;
            loc1 = "";
            var loc3:*;
            loc3 = 0;
            var loc4:*;
            loc4 = this.materialsByName;
            for each (loc2 in loc4)
            {
                loc1 = loc1 + this._materials[loc2] + "\n";
            }
            return loc1;
        }

        public function removeMaterialByName(arg1:String):org.papervision3d.core.proto.MaterialObject3D
        {
            return this.removeMaterial(this.getMaterialByName(arg1));
        }

        public function clone():org.papervision3d.materials.utils.MaterialsList
        {
            var loc2:*;
            loc2 = null;
            var loc1:*;
            loc1 = new org.papervision3d.materials.utils.MaterialsList();
            var loc3:*;
            loc3 = 0;
            var loc4:*;
            loc4 = this.materialsByName;
            for each (loc2 in loc4)
            {
                loc1.addMaterial(loc2.clone(), this._materials[loc2]);
            }
            return loc1;
        }

        public function getMaterialByName(arg1:String):org.papervision3d.core.proto.MaterialObject3D
        {
            return this.materialsByName[arg1] ? this.materialsByName[arg1] : this.materialsByName["all"];
        }

        protected var _materials:flash.utils.Dictionary;

        public var materialsByName:flash.utils.Dictionary;

        private var _materialsTotal:int;
    }
}


//          class PrecisionMode
package org.papervision3d.materials.utils 
{
    public class PrecisionMode extends Object
    {
        public function PrecisionMode()
        {
            super();
            return;
        }

        
        {
            ORIGINAL = 0;
            STABLE = 1;
        }

        public static var ORIGINAL:int=0;

        public static var STABLE:int=1;
    }
}


//          class RenderRecStorage
package org.papervision3d.materials.utils 
{
    import flash.geom.*;
    import org.papervision3d.core.geom.renderables.*;
    
    public class RenderRecStorage extends Object
    {
        public function RenderRecStorage()
        {
            this.v0 = new org.papervision3d.core.geom.renderables.Vertex3DInstance();
            this.v1 = new org.papervision3d.core.geom.renderables.Vertex3DInstance();
            this.v2 = new org.papervision3d.core.geom.renderables.Vertex3DInstance();
            this.mat = new flash.geom.Matrix();
            super();
            return;
        }

        public var mat:flash.geom.Matrix;

        public var v0:org.papervision3d.core.geom.renderables.Vertex3DInstance;

        public var v1:org.papervision3d.core.geom.renderables.Vertex3DInstance;

        public var v2:org.papervision3d.core.geom.renderables.Vertex3DInstance;
    }
}


//        class BitmapFileMaterial
package org.papervision3d.materials 
{
    import flash.display.*;
    import flash.events.*;
    import flash.geom.*;
    import flash.net.*;
    import flash.system.*;
    import flash.utils.*;
    import org.papervision3d.core.log.*;
    import org.papervision3d.core.proto.*;
    import org.papervision3d.core.render.command.*;
    import org.papervision3d.core.render.data.*;
    import org.papervision3d.core.render.draw.*;
    import org.papervision3d.events.*;
    
    public class BitmapFileMaterial extends org.papervision3d.materials.BitmapMaterial implements org.papervision3d.core.render.draw.ITriangleDrawer
    {
        public function BitmapFileMaterial(arg1:String="", arg2:Boolean=false)
        {
            super(null, arg2);
            this.url = arg1;
            this.loaded = false;
            this.fillAlpha = 1;
            this.fillColor = LOADING_COLOR;
            if (arg1.length > 0)
            {
                this.texture = arg1;
            }
            return;
        }

        protected function loadBitmapProgressHandler(arg1:flash.events.ProgressEvent):void
        {
            var loc1:*;
            loc1 = new org.papervision3d.events.FileLoadEvent(org.papervision3d.events.FileLoadEvent.LOAD_PROGRESS, this.url, arg1.bytesLoaded, arg1.bytesTotal);
            dispatchEvent(loc1);
            return;
        }

        public override function destroy():void
        {
            if (this.bitmapLoader)
            {
                this.bitmapLoader.unload();
            }
            super.destroy();
            return;
        }

        protected function setupAsyncLoadCompleteCallback():void
        {
            var loc1:*;
            loc1 = new flash.utils.Timer(1, 1);
            loc1.addEventListener(flash.events.TimerEvent.TIMER_COMPLETE, this.dispatchAsyncLoadCompleteEvent);
            loc1.start();
            return;
        }

        protected function removeLoaderListeners():void
        {
            this.bitmapLoader.contentLoaderInfo.removeEventListener(flash.events.ProgressEvent.PROGRESS, this.loadBitmapProgressHandler);
            this.bitmapLoader.contentLoaderInfo.removeEventListener(flash.events.Event.COMPLETE, this.loadBitmapCompleteHandler);
            this.bitmapLoader.contentLoaderInfo.removeEventListener(flash.events.IOErrorEvent.IO_ERROR, this.loadBitmapErrorHandler);
            return;
        }

        protected function getBitmapForFilename(arg1:String):flash.display.BitmapData
        {
            var loc1:*;
            loc1 = undefined;
            var loc2:*;
            loc2 = null;
            var loc3:*;
            loc3 = 0;
            var loc4:*;
            loc4 = _bitmapMaterials;
            for (loc1 in loc4)
            {
                loc2 = loc1 as org.papervision3d.materials.BitmapFileMaterial;
                if (loc2.url != arg1)
                {
                    continue;
                }
                return loc2.bitmap;
            }
            return null;
        }

        public function get bitmapMaterials():flash.utils.Dictionary
        {
            return _bitmapMaterials;
        }

        protected function loadNextBitmap():void
        {
            var file:String;
            var loaderContext:flash.system.LoaderContext;
            var request:flash.net.URLRequest;

            var loc1:*;
            loaderContext = null;
            file = _waitingBitmaps[0];
            request = new flash.net.URLRequest(file);
            this.bitmapLoader = new flash.display.Loader();
            this.bitmapLoader.contentLoaderInfo.addEventListener(flash.events.ProgressEvent.PROGRESS, this.loadBitmapProgressHandler);
            this.bitmapLoader.contentLoaderInfo.addEventListener(flash.events.Event.COMPLETE, this.loadBitmapCompleteHandler);
            this.bitmapLoader.contentLoaderInfo.addEventListener(flash.events.IOErrorEvent.IO_ERROR, this.loadBitmapErrorHandler);
            try
            {
                loaderContext = new flash.system.LoaderContext();
                loaderContext.checkPolicyFile = this.checkPolicyFile;
                this.bitmapLoader.load(request, loaderContext);
                _loaderUrls[this.bitmapLoader] = file;
                _loadingIdle = false;
                org.papervision3d.core.log.PaperLogger.info("BitmapFileMaterial: Loading bitmap from " + file);
            }
            catch (error:Error)
            {
                _waitingBitmaps.shift();
                _loadingIdle = true;
                org.papervision3d.core.log.PaperLogger.info("[ERROR] BitmapFileMaterial: Unable to load file " + undefined.message);
            }
            return;
        }

        protected function dispatchAsyncLoadCompleteEvent(arg1:flash.events.TimerEvent):void
        {
            this.loadComplete();
            return;
        }

        protected function createBitmapFromURL(arg1:String):flash.display.BitmapData
        {
            var loc1:*;
            loc1 = null;
            if (arg1 == "")
            {
                return null;
            }
            loc1 = this.getBitmapForFilename(arg1);
            if (loc1)
            {
                bitmap = super.createBitmap(loc1);
                this.setupAsyncLoadCompleteCallback();
                return loc1;
            }
            this.queueBitmap(arg1);
            return loadingBitmap;
        }

        public override function get texture():Object
        {
            return this._texture;
        }

        protected function loadBitmapCompleteHandler(arg1:flash.events.Event):void
        {
            var loc4:*;
            loc4 = null;
            var loc1:*;
            loc1 = flash.display.Bitmap(this.bitmapLoader.content);
            this.removeLoaderListeners();
            var loc2:*;
            loc2 = _loaderUrls[this.bitmapLoader];
            var loc3:*;
            loc3 = super.createBitmap(loc1.bitmapData);
            var loc5:*;
            loc5 = 0;
            var loc6:*;
            loc6 = _subscribedMaterials[loc2];
            for each (loc4 in loc6)
            {
                loc4.bitmap = loc3;
                loc4.maxU = this.maxU;
                loc4.maxV = this.maxV;
                loc4.resetMapping();
                loc4.loadComplete();
            }
            _subscribedMaterials[loc2] = null;
            _bitmapMaterials[this] = true;
            _waitingBitmaps.shift();
            if (_waitingBitmaps.length > 0)
            {
                this.loadNextBitmap();
            }
            else 
            {
                _loadingIdle = true;
                if (Boolean(callback))
                {
                    callback();
                }
            }
            return;
        }

        private function queueBitmap(arg1:String):void
        {
            if (!_subscribedMaterials[arg1])
            {
                _waitingBitmaps.push(arg1);
                _subscribedMaterials[arg1] = new Array();
            }
            _subscribedMaterials[arg1].push(this);
            if (_loadingIdle)
            {
                this.loadNextBitmap();
            }
            return;
        }

        public override function drawTriangle(arg1:org.papervision3d.core.render.command.RenderTriangle, arg2:flash.display.Graphics, arg3:org.papervision3d.core.render.data.RenderSessionData, arg4:flash.display.BitmapData=null, arg5:flash.geom.Matrix=null):void
        {
            if (bitmap == null || this.errorLoading)
            {
                if (this.errorLoading)
                {
                    arg2.lineStyle(lineThickness, lineColor, lineAlpha);
                }
                arg2.beginFill(fillColor, fillAlpha);
                arg2.moveTo(arg1.v0.x, arg1.v0.y);
                arg2.lineTo(arg1.v1.x, arg1.v1.y);
                arg2.lineTo(arg1.v2.x, arg1.v2.y);
                arg2.lineTo(arg1.v0.x, arg1.v0.y);
                arg2.endFill();
                if (this.errorLoading)
                {
                    arg2.lineStyle();
                }
                var loc1:*;
                var loc2:*;
                loc2 = ((loc1 = arg3.renderStatistics).triangles + 1);
                loc1.triangles = loc2;
            }
            super.drawTriangle(arg1, arg2, arg3);
            return;
        }

        public function get subscribedMaterials():Object
        {
            return _subscribedMaterials;
        }

        protected function loadBitmapErrorHandler(arg1:flash.events.IOErrorEvent):void
        {
            var loc1:*;
            loc1 = String(_waitingBitmaps.shift());
            _subscribedMaterials[loc1] = null;
            this.errorLoading = true;
            this.lineColor = ERROR_COLOR;
            this.lineAlpha = 1;
            this.lineThickness = 1;
            org.papervision3d.core.log.PaperLogger.error("BitmapFileMaterial: Unable to load file " + loc1);
            this.removeLoaderListeners();
            if (_waitingBitmaps.length > 0)
            {
                this.loadNextBitmap();
            }
            else 
            {
                _loadingIdle = true;
                if (Boolean(callback))
                {
                    callback();
                }
            }
            var loc2:*;
            loc2 = new org.papervision3d.events.FileLoadEvent(org.papervision3d.events.FileLoadEvent.LOAD_ERROR, loc1, -1, -1, arg1.text);
            dispatchEvent(loc2);
            return;
        }

        public override function set texture(arg1:Object):void
        {
            if (arg1 as String == false)
            {
                org.papervision3d.core.log.PaperLogger.error("BitmapFileMaterial.texture requires a String for the texture");
                return;
            }
            bitmap = this.createBitmapFromURL(String(arg1));
            _texture = arg1;
            return;
        }

        protected function loadComplete():void
        {
            this.fillAlpha = 0;
            this.fillColor = 0;
            this.loaded = true;
            var loc1:*;
            loc1 = new org.papervision3d.events.FileLoadEvent(org.papervision3d.events.FileLoadEvent.LOAD_COMPLETE, this.url);
            this.dispatchEvent(loc1);
            return;
        }

        
        {
            LOADING_COLOR = org.papervision3d.core.proto.MaterialObject3D.DEFAULT_COLOR;
            ERROR_COLOR = org.papervision3d.core.proto.MaterialObject3D.DEBUG_COLOR;
            loadingBitmap = new flash.display.BitmapData(1, 1, false, 0);
            _waitingBitmaps = new Array();
            _loaderUrls = new flash.utils.Dictionary(true);
            _bitmapMaterials = new flash.utils.Dictionary(true);
            _subscribedMaterials = new Object();
            _loadingIdle = true;
        }

        public var loaded:Boolean;

        protected var errorLoading:Boolean=false;

        protected var bitmapLoader:flash.display.Loader;

        public var url:String="";

        public var checkPolicyFile:Boolean=false;

        public static var LOADING_COLOR:int;

        public static var callback:Function;

        public static var loadingBitmap:flash.display.BitmapData;

        protected static var _loaderUrls:flash.utils.Dictionary;

        protected static var _loadingIdle:Boolean=true;

        public static var ERROR_COLOR:int;

        protected static var _subscribedMaterials:Object;

        protected static var _waitingBitmaps:Array;

        protected static var _bitmapMaterials:flash.utils.Dictionary;
    }
}


//        class BitmapMaterial
package org.papervision3d.materials 
{
    import flash.display.*;
    import flash.geom.*;
    import flash.utils.*;
    import org.papervision3d.*;
    import org.papervision3d.core.geom.renderables.*;
    import org.papervision3d.core.log.*;
    import org.papervision3d.core.material.*;
    import org.papervision3d.core.proto.*;
    import org.papervision3d.core.render.command.*;
    import org.papervision3d.core.render.data.*;
    import org.papervision3d.core.render.draw.*;
    import org.papervision3d.materials.utils.*;
    
    public class BitmapMaterial extends org.papervision3d.core.material.TriangleMaterial implements org.papervision3d.core.render.draw.ITriangleDrawer
    {
        public function BitmapMaterial(arg1:flash.display.BitmapData=null, arg2:Boolean=false)
        {
            this.precisionMode = org.papervision3d.materials.utils.PrecisionMode.ORIGINAL;
            this.uvMatrices = new flash.utils.Dictionary();
            this.tempTriangleMatrix = new flash.geom.Matrix();
            super();
            if (arg1)
            {
                this.texture = arg1;
            }
            this.precise = arg2;
            this.createRenderRecStorage();
            return;
        }

        public function transformUV(arg1:org.papervision3d.core.geom.renderables.Triangle3D):flash.geom.Matrix
        {
            var loc1:*;
            loc1 = null;
            var loc2:*;
            loc2 = NaN;
            var loc3:*;
            loc3 = NaN;
            var loc4:*;
            loc4 = NaN;
            var loc5:*;
            loc5 = NaN;
            var loc6:*;
            loc6 = NaN;
            var loc7:*;
            loc7 = NaN;
            var loc8:*;
            loc8 = NaN;
            var loc9:*;
            loc9 = NaN;
            var loc10:*;
            loc10 = NaN;
            var loc11:*;
            loc11 = NaN;
            var loc12:*;
            loc12 = NaN;
            var loc13:*;
            loc13 = NaN;
            var loc14:*;
            loc14 = null;
            var loc15:*;
            loc15 = null;
            if (arg1.uv)
            {
                if (bitmap)
                {
                    loc1 = arg1.uv;
                    loc2 = bitmap.width * maxU;
                    loc3 = bitmap.height * maxV;
                    loc4 = loc2 * arg1.uv0.u;
                    loc5 = loc3 * (1 - arg1.uv0.v);
                    loc6 = loc2 * arg1.uv1.u;
                    loc7 = loc3 * (1 - arg1.uv1.v);
                    loc8 = loc2 * arg1.uv2.u;
                    loc9 = loc3 * (1 - arg1.uv2.v);
                    if (loc4 == loc6 && loc5 == loc7 || loc4 == loc8 && loc5 == loc9)
                    {
                        loc4 = loc4 - (loc4 > 0.05 ? 0.05 : -0.05);
                        loc5 = loc5 - (loc5 > 0.07 ? 0.07 : -0.07);
                    }
                    if (loc8 == loc6 && loc9 == loc7)
                    {
                        loc8 = loc8 - (loc8 > 0.05 ? 0.04 : -0.04);
                        loc9 = loc9 - (loc9 > 0.06 ? 0.06 : -0.06);
                    }
                    loc10 = loc6 - loc4;
                    loc11 = loc7 - loc5;
                    loc12 = loc8 - loc4;
                    loc13 = loc9 - loc5;
                    loc14 = new flash.geom.Matrix(loc10, loc11, loc12, loc13, loc4, loc5);
                    if (org.papervision3d.Papervision3D.useRIGHTHANDED)
                    {
                        loc14.scale(-1, 1);
                        loc14.translate(loc2, 0);
                    }
                    loc14.invert();
                    var loc16:*;
                    this.uvMatrices[arg1] = loc16 = loc14.clone();
                    (loc15 = loc16).a = loc14.a;
                    loc15.b = loc14.b;
                    loc15.c = loc14.c;
                    loc15.d = loc14.d;
                    loc15.tx = loc14.tx;
                    loc15.ty = loc14.ty;
                }
                else 
                {
                    org.papervision3d.core.log.PaperLogger.error("MaterialObject3D: transformUV() material.bitmap not found!");
                }
            }
            else 
            {
                org.papervision3d.core.log.PaperLogger.error("MaterialObject3D: transformUV() uv not found!");
            }
            return loc15;
        }

        public function transformUVRT(arg1:org.papervision3d.core.render.command.RenderTriangle):flash.geom.Matrix
        {
            var loc1:*;
            loc1 = NaN;
            var loc2:*;
            loc2 = NaN;
            var loc3:*;
            loc3 = NaN;
            var loc4:*;
            loc4 = NaN;
            var loc5:*;
            loc5 = NaN;
            var loc6:*;
            loc6 = NaN;
            var loc7:*;
            loc7 = NaN;
            var loc8:*;
            loc8 = NaN;
            var loc9:*;
            loc9 = NaN;
            var loc10:*;
            loc10 = NaN;
            var loc11:*;
            loc11 = NaN;
            var loc12:*;
            loc12 = NaN;
            var loc13:*;
            loc13 = null;
            var loc14:*;
            loc14 = null;
            if (bitmap)
            {
                loc1 = bitmap.width * maxU;
                loc2 = bitmap.height * maxV;
                loc3 = loc1 * arg1.uv0.u;
                loc4 = loc2 * (1 - arg1.uv0.v);
                loc5 = loc1 * arg1.uv1.u;
                loc6 = loc2 * (1 - arg1.uv1.v);
                loc7 = loc1 * arg1.uv2.u;
                loc8 = loc2 * (1 - arg1.uv2.v);
                if (loc3 == loc5 && loc4 == loc6 || loc3 == loc7 && loc4 == loc8)
                {
                    loc3 = loc3 - (loc3 > 0.05 ? 0.05 : -0.05);
                    loc4 = loc4 - (loc4 > 0.07 ? 0.07 : -0.07);
                }
                if (loc7 == loc5 && loc8 == loc6)
                {
                    loc7 = loc7 - (loc7 > 0.05 ? 0.04 : -0.04);
                    loc8 = loc8 - (loc8 > 0.06 ? 0.06 : -0.06);
                }
                loc9 = loc5 - loc3;
                loc10 = loc6 - loc4;
                loc11 = loc7 - loc3;
                loc12 = loc8 - loc4;
                loc13 = new flash.geom.Matrix(loc9, loc10, loc11, loc12, loc3, loc4);
                if (org.papervision3d.Papervision3D.useRIGHTHANDED)
                {
                    loc13.scale(-1, 1);
                    loc13.translate(loc1, 0);
                }
                loc13.invert();
                var loc15:*;
                this.uvMatrices[arg1] = loc15 = loc13.clone();
                (loc14 = loc15).a = loc13.a;
                loc14.b = loc13.b;
                loc14.c = loc13.c;
                loc14.d = loc13.d;
                loc14.tx = loc13.tx;
                loc14.ty = loc13.ty;
            }
            else 
            {
                org.papervision3d.core.log.PaperLogger.error("MaterialObject3D: transformUV() material.bitmap not found!");
            }
            return loc14;
        }

        protected function renderRec(arg1:flash.geom.Matrix, arg2:org.papervision3d.core.geom.renderables.Vertex3DInstance, arg3:org.papervision3d.core.geom.renderables.Vertex3DInstance, arg4:org.papervision3d.core.geom.renderables.Vertex3DInstance, arg5:Number):void
        {
            this.az = arg2.z;
            this.bz = arg3.z;
            this.cz = arg4.z;
            if (this.az <= 0 && this.bz <= 0 && this.cz <= 0)
            {
                return;
            }
            this.cx = arg4.x;
            this.cy = arg4.y;
            this.bx = arg3.x;
            this.by = arg3.y;
            this.ax = arg2.x;
            this.ay = arg2.y;
            if (this.cullRect)
            {
                hitRect.x = this.bx < this.ax ? this.bx < this.cx ? this.bx : this.cx : this.ax < this.cx ? this.ax : this.cx;
                hitRect.width = (this.bx > this.ax ? this.bx > this.cx ? this.bx : this.cx : this.ax > this.cx ? this.ax : this.cx) + (hitRect.x < 0 ? -hitRect.x : hitRect.x);
                hitRect.y = this.by < this.ay ? this.by < this.cy ? this.by : this.cy : this.ay < this.cy ? this.ay : this.cy;
                hitRect.height = (this.by > this.ay ? this.by > this.cy ? this.by : this.cy : this.ay > this.cy ? this.ay : this.cy) + (hitRect.y < 0 ? -hitRect.y : hitRect.y);
                if (hitRect.right < this.cullRect.left || hitRect.left > this.cullRect.right)
                {
                    return;
                }
                else 
                {
                    if (hitRect.bottom < this.cullRect.top || hitRect.top > this.cullRect.bottom)
                    {
                        return;
                    }
                }
            }
            if (arg5 >= 100 || hitRect.width < this.minimumRenderSize || hitRect.height < this.minimumRenderSize || this.focus == Infinity)
            {
                this.a2 = arg3.x - arg2.x;
                this.b2 = arg3.y - arg2.y;
                this.c2 = arg4.x - arg2.x;
                this.d2 = arg4.y - arg2.y;
                this.tempTriangleMatrix.a = arg1.a * this.a2 + arg1.b * this.c2;
                this.tempTriangleMatrix.b = arg1.a * this.b2 + arg1.b * this.d2;
                this.tempTriangleMatrix.c = arg1.c * this.a2 + arg1.d * this.c2;
                this.tempTriangleMatrix.d = arg1.c * this.b2 + arg1.d * this.d2;
                this.tempTriangleMatrix.tx = arg1.tx * this.a2 + arg1.ty * this.c2 + arg2.x;
                this.tempTriangleMatrix.ty = arg1.tx * this.b2 + arg1.ty * this.d2 + arg2.y;
                if (lineAlpha)
                {
                    this.tempPreGrp.lineStyle(lineThickness, lineColor, lineAlpha);
                }
                this.tempPreGrp.beginBitmapFill(this.tempPreBmp, this.tempTriangleMatrix, tiled, smooth);
                this.tempPreGrp.moveTo(arg2.x, arg2.y);
                this.tempPreGrp.lineTo(arg3.x, arg3.y);
                this.tempPreGrp.lineTo(arg4.x, arg4.y);
                this.tempPreGrp.endFill();
                if (lineAlpha)
                {
                    this.tempPreGrp.lineStyle();
                }
                var loc4:*;
                var loc5:*;
                loc5 = ((loc4 = this.tempPreRSD.renderStatistics).triangles + 1);
                loc4.triangles = loc5;
                return;
            }
            this.faz = this.focus + this.az;
            this.fbz = this.focus + this.bz;
            this.fcz = this.focus + this.cz;
            this.mabz = 2 / (this.faz + this.fbz);
            this.mbcz = 2 / (this.fbz + this.fcz);
            this.mcaz = 2 / (this.fcz + this.faz);
            this.mabx = (this.ax * this.faz + this.bx * this.fbz) * this.mabz;
            this.maby = (this.ay * this.faz + this.by * this.fbz) * this.mabz;
            this.mbcx = (this.bx * this.fbz + this.cx * this.fcz) * this.mbcz;
            this.mbcy = (this.by * this.fbz + this.cy * this.fcz) * this.mbcz;
            this.mcax = (this.cx * this.fcz + this.ax * this.faz) * this.mcaz;
            this.mcay = (this.cy * this.fcz + this.ay * this.faz) * this.mcaz;
            this.dabx = this.ax + this.bx - this.mabx;
            this.daby = this.ay + this.by - this.maby;
            this.dbcx = this.bx + this.cx - this.mbcx;
            this.dbcy = this.by + this.cy - this.mbcy;
            this.dcax = this.cx + this.ax - this.mcax;
            this.dcay = this.cy + this.ay - this.mcay;
            this.dsab = this.dabx * this.dabx + this.daby * this.daby;
            this.dsbc = this.dbcx * this.dbcx + this.dbcy * this.dbcy;
            this.dsca = this.dcax * this.dcax + this.dcay * this.dcay;
            var loc1:*;
            loc1 = arg5 + 1;
            var loc2:*;
            var loc3:*;
            loc3 = (loc2 = org.papervision3d.materials.utils.RenderRecStorage(this.renderRecStorage[int(arg5)])).mat;
            if (this.dsab <= this._precision && this.dsca <= this._precision && this.dsbc <= this._precision)
            {
                this.a2 = arg3.x - arg2.x;
                this.b2 = arg3.y - arg2.y;
                this.c2 = arg4.x - arg2.x;
                this.d2 = arg4.y - arg2.y;
                this.tempTriangleMatrix.a = arg1.a * this.a2 + arg1.b * this.c2;
                this.tempTriangleMatrix.b = arg1.a * this.b2 + arg1.b * this.d2;
                this.tempTriangleMatrix.c = arg1.c * this.a2 + arg1.d * this.c2;
                this.tempTriangleMatrix.d = arg1.c * this.b2 + arg1.d * this.d2;
                this.tempTriangleMatrix.tx = arg1.tx * this.a2 + arg1.ty * this.c2 + arg2.x;
                this.tempTriangleMatrix.ty = arg1.tx * this.b2 + arg1.ty * this.d2 + arg2.y;
                if (lineAlpha)
                {
                    this.tempPreGrp.lineStyle(lineThickness, lineColor, lineAlpha);
                }
                this.tempPreGrp.beginBitmapFill(this.tempPreBmp, this.tempTriangleMatrix, tiled, smooth);
                this.tempPreGrp.moveTo(arg2.x, arg2.y);
                this.tempPreGrp.lineTo(arg3.x, arg3.y);
                this.tempPreGrp.lineTo(arg4.x, arg4.y);
                this.tempPreGrp.endFill();
                if (lineAlpha)
                {
                    this.tempPreGrp.lineStyle();
                }
                loc5 = ((loc4 = this.tempPreRSD.renderStatistics).triangles + 1);
                loc4.triangles = loc5;
                return;
            }
            if (this.dsab > this._precision && this.dsca > this._precision && this.dsbc > this._precision)
            {
                loc3.a = arg1.a * 2;
                loc3.b = arg1.b * 2;
                loc3.c = arg1.c * 2;
                loc3.d = arg1.d * 2;
                loc3.tx = arg1.tx * 2;
                loc3.ty = arg1.ty * 2;
                loc2.v0.x = this.mabx * 0.5;
                loc2.v0.y = this.maby * 0.5;
                loc2.v0.z = (this.az + this.bz) * 0.5;
                loc2.v1.x = this.mbcx * 0.5;
                loc2.v1.y = this.mbcy * 0.5;
                loc2.v1.z = (this.bz + this.cz) * 0.5;
                loc2.v2.x = this.mcax * 0.5;
                loc2.v2.y = this.mcay * 0.5;
                loc2.v2.z = (this.cz + this.az) * 0.5;
                this.renderRec(loc3, arg2, loc2.v0, loc2.v2, loc1);
                loc3.tx = (loc3.tx - 1);
                this.renderRec(loc3, loc2.v0, arg3, loc2.v1, loc1);
                loc3.ty = (loc3.ty - 1);
                loc3.tx = arg1.tx * 2;
                this.renderRec(loc3, loc2.v2, loc2.v1, arg4, loc1);
                loc3.a = (-arg1.a) * 2;
                loc3.b = (-arg1.b) * 2;
                loc3.c = (-arg1.c) * 2;
                loc3.d = (-arg1.d) * 2;
                loc3.tx = (-arg1.tx) * 2 + 1;
                loc3.ty = (-arg1.ty) * 2 + 1;
                this.renderRec(loc3, loc2.v1, loc2.v2, loc2.v0, loc1);
                return;
            }
            if (this.precisionMode != org.papervision3d.materials.utils.PrecisionMode.ORIGINAL)
            {
                this.dx = arg2.x - arg3.x;
                this.dy = arg2.y - arg3.y;
                this.d2ab = this.dx * this.dx + this.dy * this.dy;
                this.dx = arg3.x - arg4.x;
                this.dy = arg3.y - arg4.y;
                this.d2bc = this.dx * this.dx + this.dy * this.dy;
                this.dx = arg4.x - arg2.x;
                this.dy = arg4.y - arg2.y;
                this.d2ca = this.dx * this.dx + this.dy * this.dy;
                this.dmax = this.d2ca > this.d2bc ? this.d2ca > this.d2ab ? this.d2ca : this.d2ab : this.d2bc > this.d2ab ? this.d2bc : this.d2ab;
            }
            else 
            {
                this.d2ab = this.dsab;
                this.d2bc = this.dsbc;
                this.d2ca = this.dsca;
                this.dmax = this.dsca > this.dsbc ? this.dsca > this.dsab ? this.dsca : this.dsab : this.dsbc > this.dsab ? this.dsbc : this.dsab;
            }
            if (this.d2ab == this.dmax)
            {
                loc3.a = arg1.a * 2;
                loc3.b = arg1.b;
                loc3.c = arg1.c * 2;
                loc3.d = arg1.d;
                loc3.tx = arg1.tx * 2;
                loc3.ty = arg1.ty;
                loc2.v0.x = this.mabx * 0.5;
                loc2.v0.y = this.maby * 0.5;
                loc2.v0.z = (this.az + this.bz) * 0.5;
                this.renderRec(loc3, arg2, loc2.v0, arg4, loc1);
                loc3.a = arg1.a * 2 + arg1.b;
                loc3.c = 2 * arg1.c + arg1.d;
                loc3.tx = (arg1.tx * 2 + arg1.ty - 1);
                this.renderRec(loc3, loc2.v0, arg3, arg4, loc1);
                return;
            }
            if (this.d2ca == this.dmax)
            {
                loc3.a = arg1.a;
                loc3.b = arg1.b * 2;
                loc3.c = arg1.c;
                loc3.d = arg1.d * 2;
                loc3.tx = arg1.tx;
                loc3.ty = arg1.ty * 2;
                loc2.v2.x = this.mcax * 0.5;
                loc2.v2.y = this.mcay * 0.5;
                loc2.v2.z = (this.cz + this.az) * 0.5;
                this.renderRec(loc3, arg2, arg3, loc2.v2, loc1);
                loc3.b = loc3.b + arg1.a;
                loc3.d = loc3.d + arg1.c;
                loc3.ty = loc3.ty + (arg1.tx - 1);
                this.renderRec(loc3, loc2.v2, arg3, arg4, loc1);
                return;
            }
            loc3.a = arg1.a - arg1.b;
            loc3.b = arg1.b * 2;
            loc3.c = arg1.c - arg1.d;
            loc3.d = arg1.d * 2;
            loc3.tx = arg1.tx - arg1.ty;
            loc3.ty = arg1.ty * 2;
            loc2.v1.x = this.mbcx * 0.5;
            loc2.v1.y = this.mbcy * 0.5;
            loc2.v1.z = (this.bz + this.cz) * 0.5;
            this.renderRec(loc3, arg2, arg3, loc2.v1, loc1);
            loc3.a = arg1.a * 2;
            loc3.b = arg1.b - arg1.a;
            loc3.c = arg1.c * 2;
            loc3.d = arg1.d - arg1.c;
            loc3.tx = arg1.tx * 2;
            loc3.ty = arg1.ty - arg1.tx;
            this.renderRec(loc3, arg2, loc2.v1, arg4, loc1);
            return;
        }

        protected function createRenderRecStorage():void
        {
            this.renderRecStorage = new Array();
            var loc1:*;
            loc1 = 0;
            while (loc1 <= 100) 
            {
                this.renderRecStorage[loc1] = new org.papervision3d.materials.utils.RenderRecStorage();
                ++loc1;
            }
            return;
        }

        public function get texture():Object
        {
            return this._texture;
        }

        public function resetUVS():void
        {
            this.uvMatrices = new flash.utils.Dictionary(false);
            return;
        }

        public function set pixelPrecision(arg1:int):void
        {
            this._precision = arg1 * arg1 * 1.4;
            this._perPixelPrecision = arg1;
            return;
        }

        protected function correctBitmap(arg1:flash.display.BitmapData):flash.display.BitmapData
        {
            var loc1:*;
            loc1 = null;
            var loc2:*;
            loc2 = 1 << MIP_MAP_DEPTH;
            var loc3:*;
            loc3 = (loc3 = arg1.width / loc2) != uint(loc3) ? uint(loc3) + 1 : loc3;
            var loc4:*;
            loc4 = (loc4 = arg1.height / loc2) != uint(loc4) ? uint(loc4) + 1 : loc4;
            var loc5:*;
            loc5 = loc2 * loc3;
            var loc6:*;
            loc6 = loc2 * loc4;
            var loc7:*;
            loc7 = true;
            if (loc5 > 2880)
            {
                loc5 = arg1.width;
                loc7 = false;
            }
            if (loc6 > 2880)
            {
                loc6 = arg1.height;
                loc7 = false;
            }
            if (!loc7)
            {
                org.papervision3d.core.log.PaperLogger.warning("Material " + this.name + ": Texture too big for mip mapping. Resizing recommended for better performance and quality.");
            }
            if (arg1 && (!(arg1.width % loc2 == 0) || !(arg1.height % loc2 == 0)))
            {
                loc1 = new flash.display.BitmapData(loc5, loc6, arg1.transparent, 0);
                widthOffset = arg1.width;
                heightOffset = arg1.height;
                this.maxU = arg1.width / loc5;
                this.maxV = arg1.height / loc6;
                loc1.draw(arg1);
                this.extendBitmapEdges(loc1, arg1.width, arg1.height);
            }
            else 
            {
                var loc8:*;
                this.maxV = loc8 = 1;
                this.maxU = loc8;
                loc1 = arg1;
            }
            return loc1;
        }

        protected function createBitmap(arg1:flash.display.BitmapData):flash.display.BitmapData
        {
            var loc1:*;
            loc1 = null;
            this.resetMapping();
            if (AUTO_MIP_MAPPING)
            {
                loc1 = this.correctBitmap(arg1);
            }
            else 
            {
                var loc2:*;
                this.maxV = loc2 = 1;
                this.maxU = loc2;
                loc1 = arg1;
            }
            return loc1;
        }

        public function get precise():Boolean
        {
            return this._precise;
        }

        public function set texture(arg1:Object):void
        {
            if (arg1 as flash.display.BitmapData == false)
            {
                org.papervision3d.core.log.PaperLogger.error("BitmapMaterial.texture requires a BitmapData object for the texture");
                return;
            }
            bitmap = this.createBitmap(flash.display.BitmapData(arg1));
            this._texture = arg1;
            return;
        }

        public override function clone():org.papervision3d.core.proto.MaterialObject3D
        {
            var loc1:*;
            loc1 = super.clone();
            loc1.maxU = this.maxU;
            loc1.maxV = this.maxV;
            return loc1;
        }

        public override function drawTriangle(arg1:org.papervision3d.core.render.command.RenderTriangle, arg2:flash.display.Graphics, arg3:org.papervision3d.core.render.data.RenderSessionData, arg4:flash.display.BitmapData=null, arg5:flash.geom.Matrix=null):void
        {
            _triMap = arg5 ? arg5 : this.uvMatrices[arg1] || this.transformUVRT(arg1);
            if (!this._precise || !_triMap)
            {
                if (lineAlpha)
                {
                    arg2.lineStyle(lineThickness, lineColor, lineAlpha);
                }
                if (bitmap)
                {
                    this.x0 = arg1.v0.x;
                    this.y0 = arg1.v0.y;
                    this.x1 = arg1.v1.x;
                    this.y1 = arg1.v1.y;
                    this.x2 = arg1.v2.x;
                    this.y2 = arg1.v2.y;
                    _triMatrix.a = this.x1 - this.x0;
                    _triMatrix.b = this.y1 - this.y0;
                    _triMatrix.c = this.x2 - this.x0;
                    _triMatrix.d = this.y2 - this.y0;
                    _triMatrix.tx = this.x0;
                    _triMatrix.ty = this.y0;
                    _localMatrix.a = _triMap.a;
                    _localMatrix.b = _triMap.b;
                    _localMatrix.c = _triMap.c;
                    _localMatrix.d = _triMap.d;
                    _localMatrix.tx = _triMap.tx;
                    _localMatrix.ty = _triMap.ty;
                    _localMatrix.concat(_triMatrix);
                    arg2.beginBitmapFill(arg4 ? arg4 : bitmap, _localMatrix, tiled, smooth);
                }
                arg2.moveTo(this.x0, this.y0);
                arg2.lineTo(this.x1, this.y1);
                arg2.lineTo(this.x2, this.y2);
                arg2.lineTo(this.x0, this.y0);
                if (bitmap)
                {
                    arg2.endFill();
                }
                if (lineAlpha)
                {
                    arg2.lineStyle();
                }
                var loc1:*;
                var loc2:*;
                loc2 = ((loc1 = arg3.renderStatistics).triangles + 1);
                loc1.triangles = loc2;
            }
            else 
            {
                if (bitmap)
                {
                    this.focus = arg3.camera.focus;
                    this.tempPreBmp = arg4 ? arg4 : bitmap;
                    this.tempPreRSD = arg3;
                    this.tempPreGrp = arg2;
                    this.cullRect = arg3.viewPort.cullingRectangle;
                    this.renderRec(_triMap, arg1.v0, arg1.v1, arg1.v2, 0);
                }
            }
            return;
        }

        public function get precision():int
        {
            return this._precision;
        }

        public function resetMapping():void
        {
            this.uvMatrices = new flash.utils.Dictionary();
            return;
        }

        public override function copy(arg1:org.papervision3d.core.proto.MaterialObject3D):void
        {
            super.copy(arg1);
            this.maxU = arg1.maxU;
            this.maxV = arg1.maxV;
            return;
        }

        public override function toString():String
        {
            return "Texture:" + this.texture + " lineColor:" + this.lineColor + " lineAlpha:" + this.lineAlpha;
        }

        public function get pixelPrecision():int
        {
            return this._perPixelPrecision;
        }

        public function set precise(arg1:Boolean):void
        {
            this._precise = arg1;
            return;
        }

        protected function extendBitmapEdges(arg1:flash.display.BitmapData, arg2:Number, arg3:Number):void
        {
            var loc3:*;
            loc3 = 0;
            var loc1:*;
            loc1 = new flash.geom.Rectangle();
            var loc2:*;
            loc2 = new flash.geom.Point();
            if (arg1.width > arg2)
            {
                loc1.x = (arg2 - 1);
                loc1.y = 0;
                loc1.width = 1;
                loc1.height = arg3;
                loc2.y = 0;
                loc3 = arg2;
                while (loc3 < arg1.width) 
                {
                    loc2.x = loc3;
                    arg1.copyPixels(arg1, loc1, loc2);
                    ++loc3;
                }
            }
            if (arg1.height > arg3)
            {
                loc1.x = 0;
                loc1.y = (arg3 - 1);
                loc1.width = arg1.width;
                loc1.height = 1;
                loc2.x = 0;
                loc3 = arg3;
                while (loc3 < arg1.height) 
                {
                    loc2.y = loc3;
                    arg1.copyPixels(arg1, loc1, loc2);
                    ++loc3;
                }
            }
            return;
        }

        public override function destroy():void
        {
            super.destroy();
            if (this.uvMatrices)
            {
                this.uvMatrices = null;
            }
            if (bitmap)
            {
                bitmap.dispose();
            }
            this.renderRecStorage = null;
            return;
        }

        public function set precision(arg1:int):void
        {
            this._precision = arg1;
            return;
        }

        
        {
            hitRect = new flash.geom.Rectangle();
            AUTO_MIP_MAPPING = false;
            MIP_MAP_DEPTH = 8;
            _triMatrix = new flash.geom.Matrix();
            _localMatrix = new flash.geom.Matrix();
        }

        protected static const DEFAULT_FOCUS:Number=200;

        protected var renderRecStorage:Array;

        protected var dsbc:Number;

        private var d2bc:Number;

        private var b2:Number;

        public var uvMatrices:flash.utils.Dictionary;

        protected var _precise:Boolean;

        protected var faz:Number;

        protected var dsca:Number;

        protected var ax:Number;

        protected var ay:Number;

        protected var az:Number;

        private var d2ca:Number;

        protected var tempPreGrp:flash.display.Graphics;

        public var precisionMode:int;

        protected var fbz:Number;

        private var c2:Number;

        protected var mcax:Number;

        protected var mcay:Number;

        protected var mcaz:Number;

        private var d2:Number;

        protected var bx:Number;

        protected var by:Number;

        protected var bz:Number;

        protected var fcz:Number;

        public var minimumRenderSize:Number=4;

        protected var dbcx:Number;

        protected var dbcy:Number;

        protected var cx:Number;

        protected var cullRect:flash.geom.Rectangle;

        protected var cz:Number;

        protected var cy:Number;

        protected var dmax:Number;

        protected var dabx:Number;

        private var dy:Number;

        protected var _perPixelPrecision:int=8;

        protected var daby:Number;

        protected var tempPreRSD:org.papervision3d.core.render.data.RenderSessionData;

        private var dx:Number;

        private var x0:Number;

        private var x1:Number;

        private var x2:Number;

        protected var mbcy:Number;

        protected var mbcz:Number;

        protected var mbcx:Number;

        private var y0:Number;

        protected var focus:Number=200;

        private var y2:Number;

        protected var _texture:Object;

        protected var tempPreBmp:flash.display.BitmapData;

        private var y1:Number;

        protected var tempTriangleMatrix:flash.geom.Matrix;

        protected var maby:Number;

        protected var mabz:Number;

        private var d2ab:Number;

        protected var dsab:Number;

        protected var mabx:Number;

        protected var dcax:Number;

        protected var dcay:Number;

        private var a2:Number;

        protected var _precision:int=8;

        protected static var _triMatrix:flash.geom.Matrix;

        protected static var _triMap:flash.geom.Matrix;

        public static var AUTO_MIP_MAPPING:Boolean=false;

        public static var MIP_MAP_DEPTH:Number=8;

        protected static var hitRect:flash.geom.Rectangle;

        protected static var _localMatrix:flash.geom.Matrix;
    }
}


//        class MovieMaterial
package org.papervision3d.materials 
{
    import flash.display.*;
    import flash.geom.*;
    import org.papervision3d.core.log.*;
    import org.papervision3d.core.render.command.*;
    import org.papervision3d.core.render.data.*;
    import org.papervision3d.core.render.draw.*;
    import org.papervision3d.core.render.material.*;
    
    public class MovieMaterial extends org.papervision3d.materials.BitmapMaterial implements org.papervision3d.core.render.draw.ITriangleDrawer, org.papervision3d.core.render.material.IUpdateBeforeMaterial, org.papervision3d.core.render.material.IUpdateAfterMaterial
    {
        public function MovieMaterial(arg1:flash.display.DisplayObject=null, arg2:Boolean=false, arg3:Boolean=false, arg4:Boolean=false, arg5:flash.geom.Rectangle=null)
        {
            super();
            this.movieTransparent = arg2;
            this.animated = arg3;
            this.precise = arg4;
            this.userClipRect = arg5;
            if (arg1)
            {
                this.texture = arg1;
            }
            return;
        }

        protected function createBitmapFromSprite(arg1:flash.display.DisplayObject):flash.display.BitmapData
        {
            this.movie = arg1;
            this.initBitmap(this.movie);
            this.drawBitmap();
            bitmap = super.createBitmap(bitmap);
            return bitmap;
        }

        public function set rect(arg1:flash.geom.Rectangle):void
        {
            this.userClipRect = arg1;
            this.createBitmapFromSprite(this.movie);
            return;
        }

        public function updateAfterRender(arg1:org.papervision3d.core.render.data.RenderSessionData):void
        {
            if (this.movieAnimated == true && this.materialIsUsed == true)
            {
                this.drawBitmap();
                if (this.recreateBitmapInSuper)
                {
                    bitmap = super.createBitmap(bitmap);
                    this.recreateBitmapInSuper = false;
                }
            }
            return;
        }

        public function set animated(arg1:Boolean):void
        {
            this.movieAnimated = arg1;
            return;
        }

        public function drawBitmap():void
        {
            var loc3:*;
            loc3 = null;
            bitmap.fillRect(bitmap.rect, fillColor);
            if (this.stage && this.quality)
            {
                loc3 = this.stage.quality;
                this.stage.quality = this.quality;
            }
            var loc1:*;
            loc1 = this.rect;
            var loc2:*;
            loc2 = new flash.geom.Matrix(1, 0, 0, 1, -loc1.x, -loc1.y);
            bitmap.draw(this.movie, loc2, this.movie.transform.colorTransform, null);
            if (!this.userClipRect)
            {
                this.autoClipRect = this.movie.getBounds(this.movie);
            }
            if (this.stage && this.quality)
            {
                this.stage.quality = loc3;
            }
            return;
        }

        public override function get texture():Object
        {
            return this._texture;
        }

        public function updateBeforeRender(arg1:org.papervision3d.core.render.data.RenderSessionData):void
        {
            var loc1:*;
            loc1 = 0;
            var loc2:*;
            loc2 = 0;
            this.materialIsUsed = false;
            if (this.movieAnimated)
            {
                if (this.userClipRect)
                {
                    loc1 = int(this.userClipRect.width + 0.5);
                    loc2 = int(this.userClipRect.height + 0.5);
                }
                else 
                {
                    loc1 = int(this.movie.width + 0.5);
                    loc2 = int(this.movie.height + 0.5);
                }
                if (this.allowAutoResize && (!(loc1 == bitmap.width) || !(loc2 == bitmap.height)))
                {
                    this.initBitmap(this.movie);
                    this.recreateBitmapInSuper = true;
                }
            }
            return;
        }

        protected function initBitmap(arg1:flash.display.DisplayObject):void
        {
            if (bitmap)
            {
                bitmap.dispose();
            }
            if (this.userClipRect)
            {
                bitmap = new flash.display.BitmapData(int(this.userClipRect.width + 0.5), int(this.userClipRect.height + 0.5), this.movieTransparent, fillColor);
            }
            else 
            {
                if (arg1.width == 0 || arg1.height == 0)
                {
                    bitmap = new flash.display.BitmapData(256, 256, this.movieTransparent, fillColor);
                }
                else 
                {
                    bitmap = new flash.display.BitmapData(int(arg1.width + 0.5), int(arg1.height + 0.5), this.movieTransparent, fillColor);
                }
            }
            return;
        }

        public function get animated():Boolean
        {
            return this.movieAnimated;
        }

        public function get rect():flash.geom.Rectangle
        {
            var loc1:*;
            loc1 = this.userClipRect || this.autoClipRect;
            if (!loc1 && this.movie)
            {
                loc1 = this.movie.getBounds(this.movie);
            }
            return loc1;
        }

        public override function set texture(arg1:Object):void
        {
            if (arg1 as flash.display.DisplayObject == false)
            {
                org.papervision3d.core.log.PaperLogger.error("MovieMaterial.texture requires a Sprite to be passed as the object");
                return;
            }
            bitmap = this.createBitmapFromSprite(flash.display.DisplayObject(arg1));
            _texture = arg1;
            return;
        }

        public override function drawTriangle(arg1:org.papervision3d.core.render.command.RenderTriangle, arg2:flash.display.Graphics, arg3:org.papervision3d.core.render.data.RenderSessionData, arg4:flash.display.BitmapData=null, arg5:flash.geom.Matrix=null):void
        {
            this.materialIsUsed = true;
            super.drawTriangle(arg1, arg2, arg3, arg4, arg5);
            return;
        }

        public function setQuality(arg1:String, arg2:flash.display.Stage, arg3:Boolean=true):void
        {
            this.quality = arg1;
            this.stage = arg2;
            if (arg3)
            {
                this.createBitmapFromSprite(this.movie);
            }
            return;
        }

        public var movieTransparent:Boolean;

        private var quality:String;

        private var materialIsUsed:Boolean=false;

        private var stage:flash.display.Stage;

        private var autoClipRect:flash.geom.Rectangle;

        public var allowAutoResize:Boolean=false;

        public var movie:flash.display.DisplayObject;

        private var movieAnimated:Boolean;

        protected var recreateBitmapInSuper:Boolean;

        private var userClipRect:flash.geom.Rectangle;
    }
}


//        class WireframeMaterial
package org.papervision3d.materials 
{
    import flash.display.*;
    import flash.geom.*;
    import org.papervision3d.core.material.*;
    import org.papervision3d.core.render.command.*;
    import org.papervision3d.core.render.data.*;
    import org.papervision3d.core.render.draw.*;
    
    public class WireframeMaterial extends org.papervision3d.core.material.TriangleMaterial implements org.papervision3d.core.render.draw.ITriangleDrawer
    {
        public function WireframeMaterial(arg1:Number=16711935, arg2:Number=1, arg3:Number=0)
        {
            super();
            this.lineColor = arg1;
            this.lineAlpha = arg2;
            this.lineThickness = arg3;
            this.doubleSided = false;
            return;
        }

        public override function toString():String
        {
            return "WireframeMaterial - color:" + this.lineColor + " alpha:" + this.lineAlpha;
        }

        public override function drawTriangle(arg1:org.papervision3d.core.render.command.RenderTriangle, arg2:flash.display.Graphics, arg3:org.papervision3d.core.render.data.RenderSessionData, arg4:flash.display.BitmapData=null, arg5:flash.geom.Matrix=null):void
        {
            var loc1:*;
            loc1 = arg1.v0.x;
            var loc2:*;
            loc2 = arg1.v0.y;
            if (lineAlpha)
            {
                arg2.lineStyle(lineThickness, lineColor, lineAlpha);
                arg2.moveTo(loc1, loc2);
                arg2.lineTo(arg1.v1.x, arg1.v1.y);
                arg2.lineTo(arg1.v2.x, arg1.v2.y);
                arg2.lineTo(loc1, loc2);
                arg2.lineStyle();
                var loc3:*;
                var loc4:*;
                loc4 = ((loc3 = arg3.renderStatistics).triangles + 1);
                loc3.triangles = loc4;
            }
            return;
        }
    }
}


//      package objects
//        package primitives
//          class Plane
package org.papervision3d.objects.primitives 
{
    import org.papervision3d.*;
    import org.papervision3d.core.geom.*;
    import org.papervision3d.core.geom.renderables.*;
    import org.papervision3d.core.math.*;
    import org.papervision3d.core.proto.*;
    
    public class Plane extends org.papervision3d.core.geom.TriangleMesh3D
    {
        public function Plane(arg1:org.papervision3d.core.proto.MaterialObject3D=null, arg2:Number=0, arg3:Number=0, arg4:Number=0, arg5:Number=0)
        {
            super(arg1, new Array(), new Array(), null);
            this.segmentsW = arg4 || DEFAULT_SEGMENTS;
            this.segmentsH = arg5 || this.segmentsW;
            var loc1:*;
            loc1 = DEFAULT_SCALE;
            if (!arg3)
            {
                if (arg2)
                {
                    loc1 = arg2;
                }
                if (arg1 && arg1.bitmap)
                {
                    arg2 = arg1.bitmap.width * loc1;
                    arg3 = arg1.bitmap.height * loc1;
                }
                else 
                {
                    arg2 = DEFAULT_SIZE * loc1;
                    arg3 = DEFAULT_SIZE * loc1;
                }
            }
            this.buildPlane(arg2, arg3);
            return;
        }

        private function buildPlane(arg1:Number, arg2:Number):void
        {
            var loc12:*;
            loc12 = null;
            var loc13:*;
            loc13 = null;
            var loc14:*;
            loc14 = null;
            var loc15:*;
            loc15 = 0;
            var loc16:*;
            loc16 = NaN;
            var loc17:*;
            loc17 = NaN;
            var loc18:*;
            loc18 = null;
            var loc19:*;
            loc19 = null;
            var loc20:*;
            loc20 = null;
            var loc1:*;
            loc1 = this.segmentsW;
            var loc2:*;
            loc2 = this.segmentsH;
            var loc3:*;
            loc3 = loc1 + 1;
            var loc4:*;
            loc4 = loc2 + 1;
            var loc5:*;
            loc5 = this.geometry.vertices;
            var loc6:*;
            loc6 = this.geometry.faces;
            var loc7:*;
            loc7 = arg1 / 2;
            var loc8:*;
            loc8 = arg2 / 2;
            var loc9:*;
            loc9 = arg1 / loc1;
            var loc10:*;
            loc10 = arg2 / loc2;
            var loc11:*;
            loc11 = 0;
            while (loc11 < loc1 + 1) 
            {
                loc15 = 0;
                while (loc15 < loc4) 
                {
                    loc16 = loc11 * loc9 - loc7;
                    loc17 = loc15 * loc10 - loc8;
                    loc5.push(new org.papervision3d.core.geom.renderables.Vertex3D(loc16, loc17, 0));
                    ++loc15;
                }
                ++loc11;
            }
            loc11 = 0;
            while (loc11 < loc1) 
            {
                loc15 = 0;
                while (loc15 < loc2) 
                {
                    loc18 = loc5[(loc11 * loc4 + loc15)];
                    loc19 = loc5[(loc11 * loc4 + loc15 + 1)];
                    loc20 = loc5[((loc11 + 1) * loc4 + loc15)];
                    loc12 = new org.papervision3d.core.math.NumberUV(loc11 / loc1, loc15 / loc2);
                    loc13 = new org.papervision3d.core.math.NumberUV(loc11 / loc1, (loc15 + 1) / loc2);
                    loc14 = new org.papervision3d.core.math.NumberUV((loc11 + 1) / loc1, loc15 / loc2);
                    loc6.push(new org.papervision3d.core.geom.renderables.Triangle3D(this, [loc18, loc20, loc19], material, [loc12, loc14, loc13]));
                    loc18 = loc5[((loc11 + 1) * loc4 + loc15 + 1)];
                    loc19 = loc5[((loc11 + 1) * loc4 + loc15)];
                    loc20 = loc5[(loc11 * loc4 + loc15 + 1)];
                    loc12 = new org.papervision3d.core.math.NumberUV((loc11 + 1) / loc1, (loc15 + 1) / loc2);
                    loc13 = new org.papervision3d.core.math.NumberUV((loc11 + 1) / loc1, loc15 / loc2);
                    loc14 = new org.papervision3d.core.math.NumberUV(loc11 / loc1, (loc15 + 1) / loc2);
                    loc6.push(new org.papervision3d.core.geom.renderables.Triangle3D(this, [loc18, loc20, loc19], material, [loc12, loc14, loc13]));
                    ++loc15;
                }
                ++loc11;
            }
            this.geometry.ready = true;
            if (org.papervision3d.Papervision3D.useRIGHTHANDED)
            {
                this.geometry.flipFaces();
            }
            return;
        }

        
        {
            DEFAULT_SIZE = 500;
            DEFAULT_SCALE = 1;
            DEFAULT_SEGMENTS = 1;
        }

        public var segmentsH:Number;

        public var segmentsW:Number;

        public static var DEFAULT_SCALE:Number=1;

        public static var DEFAULT_SEGMENTS:Number=1;

        public static var DEFAULT_SIZE:Number=500;
    }
}


//          class Sphere
package org.papervision3d.objects.primitives 
{
    import org.papervision3d.*;
    import org.papervision3d.core.geom.*;
    import org.papervision3d.core.geom.renderables.*;
    import org.papervision3d.core.math.*;
    import org.papervision3d.core.proto.*;
    
    public class Sphere extends org.papervision3d.core.geom.TriangleMesh3D
    {
        public function Sphere(arg1:org.papervision3d.core.proto.MaterialObject3D=null, arg2:Number=100, arg3:int=8, arg4:int=6, arg5:String=null)
        {
            super(arg1, new Array(), new Array(), arg5);
            this.segmentsW = Math.max(MIN_SEGMENTSW, arg3 || DEFAULT_SEGMENTSW);
            this.segmentsH = Math.max(MIN_SEGMENTSH, arg4 || DEFAULT_SEGMENTSH);
            if (arg2 == 0)
            {
                arg2 = DEFAULT_RADIUS;
            }
            var loc1:*;
            loc1 = DEFAULT_SCALE;
            this.buildSphere(arg2);
            return;
        }

        private function buildSphere(arg1:Number):void
        {
            var loc1:*;
            loc1 = NaN;
            var loc2:*;
            loc2 = NaN;
            var loc3:*;
            loc3 = NaN;
            var loc10:*;
            loc10 = null;
            var loc11:*;
            loc11 = NaN;
            var loc12:*;
            loc12 = NaN;
            var loc13:*;
            loc13 = NaN;
            var loc14:*;
            loc14 = null;
            var loc15:*;
            loc15 = null;
            var loc16:*;
            loc16 = NaN;
            var loc17:*;
            loc17 = NaN;
            var loc18:*;
            loc18 = NaN;
            var loc19:*;
            loc19 = 0;
            var loc20:*;
            loc20 = false;
            var loc21:*;
            loc21 = null;
            var loc22:*;
            loc22 = null;
            var loc23:*;
            loc23 = null;
            var loc24:*;
            loc24 = null;
            var loc25:*;
            loc25 = NaN;
            var loc26:*;
            loc26 = NaN;
            var loc27:*;
            loc27 = NaN;
            var loc28:*;
            loc28 = NaN;
            var loc29:*;
            loc29 = null;
            var loc30:*;
            loc30 = null;
            var loc31:*;
            loc31 = null;
            var loc32:*;
            loc32 = null;
            var loc4:*;
            loc4 = Math.max(3, this.segmentsW);
            var loc5:*;
            loc5 = Math.max(2, this.segmentsH);
            var loc6:*;
            loc6 = this.geometry.vertices;
            var loc7:*;
            loc7 = this.geometry.faces;
            var loc8:*;
            loc8 = new Array();
            loc2 = 0;
            while (loc2 < loc5 + 1) 
            {
                loc11 = Number(loc2 / loc5);
                loc12 = (-arg1) * Math.cos(loc11 * Math.PI);
                loc13 = arg1 * Math.sin(loc11 * Math.PI);
                loc14 = new Array();
                loc1 = 0;
                while (loc1 < loc4) 
                {
                    loc16 = Number(2 * loc1 / loc4);
                    loc17 = loc13 * Math.sin(loc16 * Math.PI);
                    loc18 = loc13 * Math.cos(loc16 * Math.PI);
                    if (!((loc2 == 0 || loc2 == loc5) && loc1 > 0))
                    {
                        loc15 = new org.papervision3d.core.geom.renderables.Vertex3D(loc18, loc12, loc17);
                        loc6.push(loc15);
                    }
                    loc14.push(loc15);
                    loc1 = (loc1 + 1);
                }
                loc8.push(loc14);
                loc2 = (loc2 + 1);
            }
            var loc9:*;
            loc9 = loc8.length;
            loc2 = 0;
            while (loc2 < loc9) 
            {
                loc19 = loc8[loc2].length;
                if (loc2 > 0)
                {
                    loc1 = 0;
                    while (loc1 < loc19) 
                    {
                        loc20 = loc1 == (loc19 - 1);
                        loc21 = loc8[loc2][(loc20 ? 0 : loc1 + 1)];
                        loc22 = loc8[loc2][(loc20 ? (loc19 - 1) : loc1)];
                        loc23 = loc8[(loc2 - 1)][(loc20 ? (loc19 - 1) : loc1)];
                        loc24 = loc8[(loc2 - 1)][(loc20 ? 0 : loc1 + 1)];
                        loc25 = loc2 / (loc9 - 1);
                        loc26 = (loc2 - 1) / (loc9 - 1);
                        loc27 = (loc1 + 1) / loc19;
                        loc28 = loc1 / loc19;
                        loc29 = new org.papervision3d.core.math.NumberUV(loc27, loc26);
                        loc30 = new org.papervision3d.core.math.NumberUV(loc27, loc25);
                        loc31 = new org.papervision3d.core.math.NumberUV(loc28, loc25);
                        loc32 = new org.papervision3d.core.math.NumberUV(loc28, loc26);
                        if (loc2 < (loc8.length - 1))
                        {
                            loc7.push(new org.papervision3d.core.geom.renderables.Triangle3D(this, new Array(loc21, loc22, loc23), material, new Array(loc30, loc31, loc32)));
                        }
                        if (loc2 > 1)
                        {
                            loc7.push(new org.papervision3d.core.geom.renderables.Triangle3D(this, new Array(loc21, loc23, loc24), material, new Array(loc30, loc32, loc29)));
                        }
                        loc1 = (loc1 + 1);
                    }
                }
                loc2 = (loc2 + 1);
            }
            var loc33:*;
            loc33 = 0;
            var loc34:*;
            loc34 = loc7;
            for each (loc10 in loc34)
            {
                loc10.renderCommand.create = createRenderTriangle;
            }
            this.geometry.ready = true;
            if (org.papervision3d.Papervision3D.useRIGHTHANDED)
            {
                this.geometry.flipFaces();
            }
            return;
        }

        
        {
            DEFAULT_RADIUS = 100;
            DEFAULT_SCALE = 1;
            DEFAULT_SEGMENTSW = 8;
            DEFAULT_SEGMENTSH = 6;
            MIN_SEGMENTSW = 3;
            MIN_SEGMENTSH = 2;
        }

        private var segmentsH:Number;

        private var segmentsW:Number;

        public static var MIN_SEGMENTSW:Number=3;

        public static var DEFAULT_SCALE:Number=1;

        public static var DEFAULT_RADIUS:Number=100;

        public static var DEFAULT_SEGMENTSH:Number=6;

        public static var MIN_SEGMENTSH:Number=2;

        public static var DEFAULT_SEGMENTSW:Number=8;
    }
}


//        class DisplayObject3D
package org.papervision3d.objects 
{
    import org.papervision3d.*;
    import org.papervision3d.core.data.*;
    import org.papervision3d.core.geom.renderables.*;
    import org.papervision3d.core.log.*;
    import org.papervision3d.core.material.*;
    import org.papervision3d.core.math.*;
    import org.papervision3d.core.proto.*;
    import org.papervision3d.core.render.data.*;
    import org.papervision3d.materials.shaders.*;
    import org.papervision3d.materials.utils.*;
    import org.papervision3d.view.*;
    import org.papervision3d.view.layer.*;
    
    public class DisplayObject3D extends org.papervision3d.core.proto.DisplayObjectContainer3D
    {
        public function DisplayObject3D(arg1:String=null, arg2:org.papervision3d.core.proto.GeometryObject3D=null)
        {
            this.faces = new Array();
            this.filters = [];
            this.screen = new org.papervision3d.core.math.Number3D();
            this._position = org.papervision3d.core.math.Number3D.ZERO;
            this._lookatTarget = org.papervision3d.core.math.Number3D.ZERO;
            this._zAxis = org.papervision3d.core.math.Number3D.ZERO;
            this._xAxis = org.papervision3d.core.math.Number3D.ZERO;
            this._yAxis = org.papervision3d.core.math.Number3D.ZERO;
            this._rotation = org.papervision3d.core.math.Number3D.ZERO;
            this._rot = new org.papervision3d.core.math.Quaternion();
            this._qPitch = new org.papervision3d.core.math.Quaternion();
            this._qYaw = new org.papervision3d.core.math.Quaternion();
            this._qRoll = new org.papervision3d.core.math.Quaternion();
            super();
            if (arg1 != null)
            {
                org.papervision3d.core.log.PaperLogger.info("DisplayObject3D: " + arg1);
            }
            this.culled = false;
            this.transform = org.papervision3d.core.math.Matrix3D.IDENTITY;
            this.world = org.papervision3d.core.math.Matrix3D.IDENTITY;
            this.view = org.papervision3d.core.math.Matrix3D.IDENTITY;
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.rotationX = 0;
            this.rotationY = 0;
            this.rotationZ = 0;
            var loc2:*;
            this._localRotationZ = loc2 = 0;
            this._localRotationY = loc2 = loc2;
            this._localRotationX = loc2;
            var loc1:*;
            loc1 = org.papervision3d.Papervision3D.usePERCENT ? 100 : 1;
            this.scaleX = loc1;
            this.scaleY = loc1;
            this.scaleZ = loc1;
            this._tempScale = new org.papervision3d.core.math.Number3D();
            this.visible = true;
            var loc3:*;
            this.id = _newID++;
            this.name = arg1 || String(this.id);
            this._numClones = 0;
            if (arg2)
            {
                this.addGeometry(arg2);
            }
            return;
        }

        public function set localRotationX(arg1:Number):void
        {
            arg1 = org.papervision3d.Papervision3D.useDEGREES ? arg1 * toRADIANS : arg1;
            if (this._transformDirty)
            {
                this.updateTransform();
            }
            this._qPitch.setFromAxisAngle(this.transform.n11, this.transform.n21, this.transform.n31, this._localRotationX - arg1);
            this.transform.calculateMultiply3x3(this._qPitch.matrix, this.transform);
            this._localRotationX = arg1;
            this._rotationDirty = true;
            return;
        }

        public function set y(arg1:Number):void
        {
            this.transform.n24 = arg1;
            return;
        }

        public function set z(arg1:Number):void
        {
            this.transform.n34 = arg1;
            return;
        }

        public override function addChild(arg1:org.papervision3d.objects.DisplayObject3D, arg2:String=null):org.papervision3d.objects.DisplayObject3D
        {
            arg1 = super.addChild(arg1, arg2);
            if (arg1.scene == null)
            {
                arg1.scene = this.scene;
            }
            if (this.useOwnContainer)
            {
                arg1.parentContainer = this;
            }
            return arg1;
        }

        public function setChildMaterialByName(arg1:String, arg2:org.papervision3d.core.proto.MaterialObject3D):void
        {
            this.setChildMaterial(getChildByName(arg1, true), arg2);
            return;
        }

        public function moveDown(arg1:Number):void
        {
            this.translate(arg1, DOWN);
            return;
        }

        public function project(arg1:org.papervision3d.objects.DisplayObject3D, arg2:org.papervision3d.core.render.data.RenderSessionData):Number
        {
            var loc3:*;
            loc3 = null;
            if (this._transformDirty)
            {
                this.updateTransform();
            }
            this.world.calculateMultiply(arg1.world, this.transform);
            if (arg2.camera.culler)
            {
                if (this !== arg2.camera)
                {
                    this.culled = arg2.camera.culler.testObject(this) < 0;
                }
                else 
                {
                    this.culled = true;
                }
                if (this.culled)
                {
                    var loc4:*;
                    var loc5:*;
                    loc5 = ((loc4 = arg2.renderStatistics).culledObjects + 1);
                    loc4.culledObjects = loc5;
                    return 0;
                }
            }
            else 
            {
                this.culled = false;
            }
            if (arg1 === arg2.camera)
            {
                if (arg2.camera.useProjectionMatrix)
                {
                    this.view.calculateMultiply4x4(arg2.camera.eye, this.transform);
                }
                else 
                {
                    this.view.calculateMultiply(arg2.camera.eye, this.transform);
                }
            }
            else 
            {
                if (arg2.camera.useProjectionMatrix)
                {
                    this.view.calculateMultiply4x4(arg1.view, this.transform);
                }
                else 
                {
                    this.view.calculateMultiply(arg1.view, this.transform);
                }
            }
            if (this._autoCalcScreenCoords)
            {
                this.calculateScreenCoords(arg2.camera);
            }
            var loc1:*;
            loc1 = 0;
            var loc2:*;
            loc2 = 0;
            loc4 = 0;
            loc5 = this._childrenByName;
            for each (loc3 in loc5)
            {
                if (!loc3.visible)
                {
                    continue;
                }
                loc1 = loc1 + loc3.project(this, arg2);
                loc2 = (loc2 + 1);
            }
            this.screenZ = loc4 = loc1 / loc2;
            return loc4;
        }

        public function set scene(arg1:org.papervision3d.core.proto.SceneObject3D):void
        {
            var loc1:*;
            loc1 = null;
            this._scene = arg1;
            var loc2:*;
            loc2 = 0;
            var loc3:*;
            loc3 = this._childrenByName;
            for each (loc1 in loc3)
            {
                if (loc1.scene != null)
                {
                    continue;
                }
                loc1.scene = this._scene;
            }
            return;
        }

        public function setChildMaterial(arg1:org.papervision3d.objects.DisplayObject3D, arg2:org.papervision3d.core.proto.MaterialObject3D, arg3:org.papervision3d.core.proto.MaterialObject3D=null):void
        {
            var loc1:*;
            loc1 = null;
            if (!arg1)
            {
                return;
            }
            if (!arg3 || arg1.material === arg3)
            {
                arg1.material = arg2;
            }
            if (arg1.geometry && arg1.geometry.faces)
            {
                var loc2:*;
                loc2 = 0;
                var loc3:*;
                loc3 = arg1.geometry.faces;
                for each (loc1 in loc3)
                {
                    if (!(!arg3 || loc1.material === arg3))
                    {
                        continue;
                    }
                    loc1.material = arg2;
                }
            }
            return;
        }

        public function get userData():org.papervision3d.core.data.UserData
        {
            return this._userData;
        }

        public function get material():org.papervision3d.core.proto.MaterialObject3D
        {
            return this._material;
        }

        public function set userData(arg1:org.papervision3d.core.data.UserData):void
        {
            this._userData = arg1;
            return;
        }

        public function set rotationX(arg1:Number):void
        {
            this._rotationX = org.papervision3d.Papervision3D.useDEGREES ? arg1 * toRADIANS : arg1;
            this._transformDirty = true;
            return;
        }

        public function calculateScreenCoords(arg1:org.papervision3d.core.proto.CameraObject3D):void
        {
            var loc1:*;
            loc1 = NaN;
            var loc2:*;
            loc2 = NaN;
            var loc3:*;
            loc3 = NaN;
            var loc4:*;
            loc4 = NaN;
            var loc5:*;
            loc5 = NaN;
            var loc6:*;
            loc6 = NaN;
            var loc7:*;
            loc7 = NaN;
            if (arg1.useProjectionMatrix)
            {
                loc1 = 0;
                loc2 = 0;
                loc3 = 0;
                loc4 = loc1 * this.view.n41 + loc2 * this.view.n42 + loc3 * this.view.n43 + this.view.n44;
                loc5 = arg1.viewport.width / 2;
                loc6 = arg1.viewport.height / 2;
                this.screen.x = (loc1 * this.view.n11 + loc2 * this.view.n12 + loc3 * this.view.n13 + this.view.n14) / loc4;
                this.screen.y = (loc1 * this.view.n21 + loc2 * this.view.n22 + loc3 * this.view.n23 + this.view.n24) / loc4;
                this.screen.z = loc1 * this.view.n31 + loc2 * this.view.n32 + loc3 * this.view.n33 + this.view.n34;
                this.screen.x = this.screen.x * loc5;
                this.screen.y = this.screen.y * loc6;
            }
            else 
            {
                loc7 = arg1.focus * arg1.zoom / (arg1.focus + this.view.n34);
                this.screen.x = this.view.n14 * loc7;
                this.screen.y = this.view.n24 * loc7;
                this.screen.z = this.view.n34;
            }
            return;
        }

        public function lookAt(arg1:org.papervision3d.objects.DisplayObject3D, arg2:org.papervision3d.core.math.Number3D=null):void
        {
            var loc1:*;
            loc1 = null;
            var loc2:*;
            loc2 = null;
            if (this as org.papervision3d.core.proto.CameraObject3D)
            {
                this._position.reset(this.x, this.y, this.z);
            }
            else 
            {
                loc1 = this.parent as org.papervision3d.objects.DisplayObject3D;
                if (loc1)
                {
                    this.world.calculateMultiply(loc1.world, this.transform);
                }
                else 
                {
                    this.world.copy(this.transform);
                }
                this._position.reset(this.world.n14, this.world.n24, this.world.n34);
            }
            if (arg1 as org.papervision3d.core.proto.CameraObject3D)
            {
                this._lookatTarget.reset(arg1.x, arg1.y, arg1.z);
            }
            else 
            {
                loc1 = arg1.parent as org.papervision3d.objects.DisplayObject3D;
                if (loc1)
                {
                    arg1.world.calculateMultiply(loc1.world, arg1.transform);
                }
                else 
                {
                    arg1.world.copy(arg1.transform);
                }
                this._lookatTarget.reset(arg1.world.n14, arg1.world.n24, arg1.world.n34);
            }
            this._zAxis.copyFrom(this._lookatTarget);
            this._zAxis.minusEq(this._position);
            this._zAxis.normalize();
            if (this._zAxis.modulo > 0.1)
            {
                this._xAxis = org.papervision3d.core.math.Number3D.cross(this._zAxis, arg2 || UP, this._xAxis);
                this._xAxis.normalize();
                this._yAxis = org.papervision3d.core.math.Number3D.cross(this._zAxis, this._xAxis, this._yAxis);
                this._yAxis.normalize();
                (loc2 = this.transform).n11 = this._xAxis.x * this._scaleX;
                loc2.n21 = this._xAxis.y * this._scaleX;
                loc2.n31 = this._xAxis.z * this._scaleX;
                loc2.n12 = (-this._yAxis.x) * this._scaleY;
                loc2.n22 = (-this._yAxis.y) * this._scaleY;
                loc2.n32 = (-this._yAxis.z) * this._scaleY;
                loc2.n13 = this._zAxis.x * this._scaleZ;
                loc2.n23 = this._zAxis.y * this._scaleZ;
                loc2.n33 = this._zAxis.z * this._scaleZ;
                var loc3:*;
                this._localRotationZ = loc3 = 0;
                this._localRotationY = loc3 = loc3;
                this._localRotationX = loc3;
                this._transformDirty = false;
                this._rotationDirty = true;
            }
            else 
            {
                org.papervision3d.core.log.PaperLogger.error("lookAt error");
            }
            return;
        }

        public function set rotationZ(arg1:Number):void
        {
            this._rotationZ = org.papervision3d.Papervision3D.useDEGREES ? arg1 * toRADIANS : arg1;
            this._transformDirty = true;
            return;
        }

        public function pitch(arg1:Number):void
        {
            arg1 = org.papervision3d.Papervision3D.useDEGREES ? arg1 * toRADIANS : arg1;
            if (this._transformDirty)
            {
                this.updateTransform();
            }
            this._qPitch.setFromAxisAngle(this.transform.n11, this.transform.n21, this.transform.n31, arg1);
            this.transform.calculateMultiply3x3(this._qPitch.matrix, this.transform);
            this._localRotationX = this._localRotationX + arg1;
            this._rotationDirty = true;
            return;
        }

        public function set rotationY(arg1:Number):void
        {
            this._rotationY = org.papervision3d.Papervision3D.useDEGREES ? arg1 * toRADIANS : arg1;
            this._transformDirty = true;
            return;
        }

        public function get position():org.papervision3d.core.math.Number3D
        {
            this._position.reset(this.x, this.y, this.z);
            return this._position;
        }

        public function get sceneX():Number
        {
            return this.world.n14;
        }

        public function get scaleX():Number
        {
            if (org.papervision3d.Papervision3D.usePERCENT)
            {
                return this._scaleX * 100;
            }
            return this._scaleX;
        }

        public function get scaleY():Number
        {
            if (org.papervision3d.Papervision3D.usePERCENT)
            {
                return this._scaleY * 100;
            }
            return this._scaleY;
        }

        public function get scaleZ():Number
        {
            if (org.papervision3d.Papervision3D.usePERCENT)
            {
                return this._scaleZ * 100;
            }
            return this._scaleZ;
        }

        public function get scale():Number
        {
            if (this._scaleX == this._scaleY && this._scaleX == this._scaleZ)
            {
                if (org.papervision3d.Papervision3D.usePERCENT)
                {
                    return this._scaleX * 100;
                }
                return this._scaleX;
            }
            return NaN;
        }

        public function set position(arg1:org.papervision3d.core.math.Number3D):void
        {
            this.x = arg1.x;
            this.y = arg1.y;
            this.z = arg1.z;
            return;
        }

        public function moveUp(arg1:Number):void
        {
            this.translate(arg1, UP);
            return;
        }

        public function get sceneZ():Number
        {
            return this.world.n34;
        }

        public function get sceneY():Number
        {
            return this.world.n24;
        }

        public function distanceTo(arg1:org.papervision3d.objects.DisplayObject3D):Number
        {
            var loc1:*;
            loc1 = this.x - arg1.x;
            var loc2:*;
            loc2 = this.y - arg1.y;
            var loc3:*;
            loc3 = this.z - arg1.z;
            return Math.sqrt(loc1 * loc1 + loc2 * loc2 + loc3 * loc3);
        }

        public function addGeometry(arg1:org.papervision3d.core.proto.GeometryObject3D=null):void
        {
            if (arg1)
            {
                this.geometry = arg1;
            }
            return;
        }

        protected function setParentContainer(arg1:org.papervision3d.objects.DisplayObject3D, arg2:Boolean=true):void
        {
            var loc1:*;
            loc1 = null;
            if (arg2 && !(arg1 == this))
            {
                this.parentContainer = arg1;
            }
            var loc2:*;
            loc2 = 0;
            var loc3:*;
            loc3 = children;
            for each (loc1 in loc3)
            {
                loc1.setParentContainer(arg1, arg2);
            }
            return;
        }

        private function updateMaterials(arg1:org.papervision3d.objects.DisplayObject3D, arg2:org.papervision3d.core.proto.MaterialObject3D, arg3:org.papervision3d.core.proto.MaterialObject3D):void
        {
            var loc1:*;
            loc1 = null;
            var loc2:*;
            loc2 = null;
            arg2.unregisterObject(arg1);
            if (arg3 as org.papervision3d.core.material.AbstractLightShadeMaterial || arg3 as org.papervision3d.materials.shaders.ShadedMaterial)
            {
                arg3.registerObject(arg1);
            }
            if (arg1.material === arg2)
            {
                arg1.material = arg3;
            }
            if (arg1.geometry && arg1.geometry.faces && arg1.geometry.faces.length)
            {
                var loc3:*;
                loc3 = 0;
                var loc4:*;
                loc4 = arg1.geometry.faces;
                for each (loc2 in loc4)
                {
                    if (loc2.material !== arg2)
                    {
                        continue;
                    }
                    loc2.material = arg3;
                }
            }
            loc3 = 0;
            loc4 = arg1.children;
            for each (loc1 in loc4)
            {
                this.updateMaterials(loc1, arg2, arg3);
            }
            return;
        }

        public function clone():org.papervision3d.objects.DisplayObject3D
        {
            var loc3:*;
            loc3 = null;
            var loc4:*;
            var loc5:*;
            loc5 = ((loc4 = this)._numClones + 1);
            loc4._numClones = loc5;
            var loc1:*;
            loc1 = this.name + "_" + (loc4 = this)._numClones;
            var loc2:*;
            loc2 = new org.papervision3d.objects.DisplayObject3D(loc1);
            if (this.material)
            {
                loc2.material = this.material;
            }
            if (this.materials)
            {
                loc2.materials = this.materials.clone();
            }
            if (this.geometry)
            {
                loc2.geometry = this.geometry.clone(loc2);
                loc2.geometry.ready = true;
            }
            loc2.copyTransform(this);
            loc4 = 0;
            loc5 = this.children;
            for each (loc3 in loc5)
            {
                loc2.addChild(loc3.clone());
            }
            return loc2;
        }

        public function set material(arg1:org.papervision3d.core.proto.MaterialObject3D):void
        {
            if (this._material)
            {
                this._material.unregisterObject(this);
            }
            this._material = arg1;
            if (this._material)
            {
                this._material.registerObject(this);
            }
            return;
        }

        private function updateRotation():void
        {
            this._tempScale.x = org.papervision3d.Papervision3D.usePERCENT ? this._scaleX * 100 : this._scaleX;
            this._tempScale.y = org.papervision3d.Papervision3D.usePERCENT ? this._scaleY * 100 : this._scaleY;
            this._tempScale.z = org.papervision3d.Papervision3D.usePERCENT ? this._scaleZ * 100 : this._scaleZ;
            this._rotation = org.papervision3d.core.math.Matrix3D.matrix2euler(this.transform, this._rotation, this._tempScale);
            this._rotationX = this._rotation.x * toRADIANS;
            this._rotationY = this._rotation.y * toRADIANS;
            this._rotationZ = this._rotation.z * toRADIANS;
            this._rotationDirty = false;
            return;
        }

        public function hitTestObject(arg1:org.papervision3d.objects.DisplayObject3D, arg2:Number=1):Boolean
        {
            var loc1:*;
            loc1 = this.x - arg1.x;
            var loc2:*;
            loc2 = this.y - arg1.y;
            var loc3:*;
            loc3 = this.z - arg1.z;
            var loc4:*;
            loc4 = loc1 * loc1 + loc2 * loc2 + loc3 * loc3;
            var loc5:*;
            loc5 = this.geometry ? this.geometry.boundingSphere.maxDistance : 0;
            var loc6:*;
            loc6 = arg1.geometry ? arg1.geometry.boundingSphere.maxDistance : 0;
            return (loc5 = loc5 * arg2) + loc6 > loc4;
        }

        public function translate(arg1:Number, arg2:org.papervision3d.core.math.Number3D):void
        {
            var loc1:*;
            loc1 = arg2.clone();
            if (this._transformDirty)
            {
                this.updateTransform();
            }
            org.papervision3d.core.math.Matrix3D.rotateAxis(this.transform, loc1);
            this.x = this.x + arg1 * loc1.x;
            this.y = this.y + arg1 * loc1.y;
            this.z = this.z + arg1 * loc1.z;
            return;
        }

        public function get localRotationZ():Number
        {
            return org.papervision3d.Papervision3D.useDEGREES ? this._localRotationZ * toDEGREES : this._localRotationZ;
        }

        public function get localRotationY():Number
        {
            return org.papervision3d.Papervision3D.useDEGREES ? this._localRotationY * toDEGREES : this._localRotationY;
        }

        public function get z():Number
        {
            return this.transform.n34;
        }

        public function get localRotationX():Number
        {
            return org.papervision3d.Papervision3D.useDEGREES ? this._localRotationX * toDEGREES : this._localRotationX;
        }

        public function get x():Number
        {
            return this.transform.n14;
        }

        public function get y():Number
        {
            return this.transform.n24;
        }

        public function moveLeft(arg1:Number):void
        {
            this.translate(arg1, LEFT);
            return;
        }

        public function replaceMaterialByName(arg1:org.papervision3d.core.proto.MaterialObject3D, arg2:String):void
        {
            if (!this.materials)
            {
                return;
            }
            var loc1:*;
            loc1 = this.materials.getMaterialByName(arg2);
            if (!loc1)
            {
                return;
            }
            if (this.material === loc1)
            {
                this.material = arg1;
            }
            loc1 = this.materials.removeMaterial(loc1);
            arg1 = this.materials.addMaterial(arg1, arg2);
            this.updateMaterials(this, loc1, arg1);
            return;
        }

        public function get scene():org.papervision3d.core.proto.SceneObject3D
        {
            return this._scene;
        }

        public function set useOwnContainer(arg1:Boolean):void
        {
            this._useOwnContainer = arg1;
            this.setParentContainer(this, true);
            return;
        }

        public function getMaterialByName(arg1:String):org.papervision3d.core.proto.MaterialObject3D
        {
            var loc2:*;
            loc2 = null;
            var loc1:*;
            loc1 = this.materials ? this.materials.getMaterialByName(arg1) : null;
            if (loc1)
            {
                return loc1;
            }
            var loc3:*;
            loc3 = 0;
            var loc4:*;
            loc4 = this._childrenByName;
            for each (loc2 in loc4)
            {
                loc1 = loc2.getMaterialByName(arg1);
                if (!loc1)
                {
                    continue;
                }
                return loc1;
            }
            return null;
        }

        public function copyTransform(arg1:*):void
        {
            var loc3:*;
            loc3 = null;
            if (arg1 as org.papervision3d.objects.DisplayObject3D)
            {
                if ((loc3 = org.papervision3d.objects.DisplayObject3D(arg1))._transformDirty)
                {
                    loc3.updateTransform();
                }
            }
            var loc1:*;
            loc1 = this.transform;
            var loc2:*;
            loc2 = arg1 as org.papervision3d.objects.DisplayObject3D ? arg1.transform : arg1;
            loc1.n11 = loc2.n11;
            loc1.n12 = loc2.n12;
            loc1.n13 = loc2.n13;
            loc1.n14 = loc2.n14;
            loc1.n21 = loc2.n21;
            loc1.n22 = loc2.n22;
            loc1.n23 = loc2.n23;
            loc1.n24 = loc2.n24;
            loc1.n31 = loc2.n31;
            loc1.n32 = loc2.n32;
            loc1.n33 = loc2.n33;
            loc1.n34 = loc2.n34;
            this._transformDirty = false;
            this._rotationDirty = true;
            return;
        }

        public function get rotationY():Number
        {
            if (this._rotationDirty)
            {
                this.updateRotation();
            }
            return org.papervision3d.Papervision3D.useDEGREES ? this._rotationY * toDEGREES : this._rotationY;
        }

        public function get rotationZ():Number
        {
            if (this._rotationDirty)
            {
                this.updateRotation();
            }
            return org.papervision3d.Papervision3D.useDEGREES ? this._rotationZ * toDEGREES : this._rotationZ;
        }

        public function set scaleY(arg1:Number):void
        {
            if (this._rotationDirty)
            {
                this.updateRotation();
            }
            if (org.papervision3d.Papervision3D.usePERCENT)
            {
                this._scaleY = arg1 / 100;
            }
            else 
            {
                this._scaleY = arg1;
            }
            this._transformDirty = true;
            return;
        }

        public function roll(arg1:Number):void
        {
            arg1 = org.papervision3d.Papervision3D.useDEGREES ? arg1 * toRADIANS : arg1;
            if (this._transformDirty)
            {
                this.updateTransform();
            }
            this._qRoll.setFromAxisAngle(this.transform.n13, this.transform.n23, this.transform.n33, arg1);
            this.transform.calculateMultiply3x3(this._qRoll.matrix, this.transform);
            this._localRotationZ = this._localRotationZ + arg1;
            this._rotationDirty = true;
            return;
        }

        public function set scaleZ(arg1:Number):void
        {
            if (this._rotationDirty)
            {
                this.updateRotation();
            }
            if (org.papervision3d.Papervision3D.usePERCENT)
            {
                this._scaleZ = arg1 / 100;
            }
            else 
            {
                this._scaleZ = arg1;
            }
            this._transformDirty = true;
            return;
        }

        public function get rotationX():Number
        {
            if (this._rotationDirty)
            {
                this.updateRotation();
            }
            return org.papervision3d.Papervision3D.useDEGREES ? this._rotationX * toDEGREES : this._rotationX;
        }

        public function set scale(arg1:Number):void
        {
            if (this._rotationDirty)
            {
                this.updateRotation();
            }
            if (org.papervision3d.Papervision3D.usePERCENT)
            {
                arg1 = arg1 / 100;
            }
            var loc1:*;
            this._scaleZ = loc1 = arg1;
            this._scaleY = loc1 = loc1;
            this._scaleX = loc1;
            this._transformDirty = true;
            return;
        }

        public function get autoCalcScreenCoords():Boolean
        {
            return this._autoCalcScreenCoords;
        }

        public function yaw(arg1:Number):void
        {
            arg1 = org.papervision3d.Papervision3D.useDEGREES ? arg1 * toRADIANS : arg1;
            if (this._transformDirty)
            {
                this.updateTransform();
            }
            this._qYaw.setFromAxisAngle(this.transform.n12, this.transform.n22, this.transform.n32, arg1);
            this.transform.calculateMultiply3x3(this._qYaw.matrix, this.transform);
            this._localRotationY = this._localRotationY + arg1;
            this._rotationDirty = true;
            return;
        }

        public function set scaleX(arg1:Number):void
        {
            if (this._rotationDirty)
            {
                this.updateRotation();
            }
            if (org.papervision3d.Papervision3D.usePERCENT)
            {
                this._scaleX = arg1 / 100;
            }
            else 
            {
                this._scaleX = arg1;
            }
            this._transformDirty = true;
            return;
        }

        public function createViewportLayer(arg1:org.papervision3d.view.Viewport3D, arg2:Boolean=true):org.papervision3d.view.layer.ViewportLayer
        {
            var loc1:*;
            loc1 = arg1.getChildLayer(this, true);
            if (arg2)
            {
                this.addChildrenToLayer(this, loc1);
            }
            return loc1;
        }

        public override function toString():String
        {
            return this.name + ": x:" + Math.round(this.x) + " y:" + Math.round(this.y) + " z:" + Math.round(this.z);
        }

        public function moveForward(arg1:Number):void
        {
            this.translate(arg1, FORWARD);
            return;
        }

        public function addChildrenToLayer(arg1:org.papervision3d.objects.DisplayObject3D, arg2:org.papervision3d.view.layer.ViewportLayer):void
        {
            var loc1:*;
            loc1 = null;
            var loc2:*;
            loc2 = 0;
            var loc3:*;
            loc3 = arg1.children;
            for each (loc1 in loc3)
            {
                arg2.addDisplayObject3D(loc1);
                loc1.addChildrenToLayer(loc1, arg2);
            }
            return;
        }

        public function copyPosition(arg1:*):void
        {
            var loc1:*;
            loc1 = this.transform;
            var loc2:*;
            loc2 = arg1 as org.papervision3d.objects.DisplayObject3D ? arg1.transform : arg1;
            loc1.n14 = loc2.n14;
            loc1.n24 = loc2.n24;
            loc1.n34 = loc2.n34;
            return;
        }

        public function get useOwnContainer():Boolean
        {
            return this._useOwnContainer;
        }

        public function updateTransform():void
        {
            this._rot.setFromEuler(this._rotationY, this._rotationZ, this._rotationX);
            this.transform.copy3x3(this._rot.matrix);
            _tempMatrix.reset();
            _tempMatrix.n11 = this._scaleX;
            _tempMatrix.n22 = this._scaleY;
            _tempMatrix.n33 = this._scaleZ;
            this.transform.calculateMultiply(this.transform, _tempMatrix);
            this._transformDirty = false;
            return;
        }

        public function hitTestPoint(arg1:Number, arg2:Number, arg3:Number):Boolean
        {
            var loc1:*;
            loc1 = this.x - arg1;
            var loc2:*;
            loc2 = this.y - arg2;
            var loc3:*;
            loc3 = this.z - arg3;
            var loc4:*;
            loc4 = loc1 * loc1 + loc2 * loc2 + loc3 * loc3;
            var loc5:*;
            return (loc5 = this.geometry ? this.geometry.boundingSphere.maxDistance : 0) > loc4;
        }

        public function moveBackward(arg1:Number):void
        {
            this.translate(arg1, BACKWARD);
            return;
        }

        public function set localRotationY(arg1:Number):void
        {
            arg1 = org.papervision3d.Papervision3D.useDEGREES ? arg1 * toRADIANS : arg1;
            if (this._transformDirty)
            {
                this.updateTransform();
            }
            this._qYaw.setFromAxisAngle(this.transform.n12, this.transform.n22, this.transform.n32, this._localRotationY - arg1);
            this.transform.calculateMultiply3x3(this._qYaw.matrix, this.transform);
            this._localRotationY = arg1;
            this._rotationDirty = true;
            return;
        }

        public function set localRotationZ(arg1:Number):void
        {
            arg1 = org.papervision3d.Papervision3D.useDEGREES ? arg1 * toRADIANS : arg1;
            if (this._transformDirty)
            {
                this.updateTransform();
            }
            this._qRoll.setFromAxisAngle(this.transform.n13, this.transform.n23, this.transform.n33, this._localRotationZ - arg1);
            this.transform.calculateMultiply3x3(this._qRoll.matrix, this.transform);
            this._localRotationZ = arg1;
            this._rotationDirty = true;
            return;
        }

        public function moveRight(arg1:Number):void
        {
            this.translate(arg1, RIGHT);
            return;
        }

        public function set x(arg1:Number):void
        {
            this.transform.n14 = arg1;
            return;
        }

        public function materialsList():String
        {
            var loc2:*;
            loc2 = null;
            var loc3:*;
            loc3 = null;
            var loc1:*;
            loc1 = "";
            var loc4:*;
            loc4 = 0;
            var loc5:*;
            loc5 = this.materials;
            for (loc2 in loc5)
            {
                loc1 = loc1 + loc2 + "\n";
            }
            loc4 = 0;
            loc5 = this._childrenByName;
            for each (loc3 in loc5)
            {
                var loc6:*;
                loc6 = 0;
                var loc7:*;
                loc7 = loc3.materials.materialsByName;
                for (loc2 in loc7)
                {
                    loc1 = loc1 + "+ " + loc2 + "\n";
                }
            }
            return loc1;
        }

        public function set autoCalcScreenCoords(arg1:Boolean):void
        {
            this._autoCalcScreenCoords = arg1;
            return;
        }

        public static function get ZERO():org.papervision3d.objects.DisplayObject3D
        {
            return new DisplayObject3D();
        }

        
        {
            sortedArray = new Array();
            _tempMatrix = org.papervision3d.core.math.Matrix3D.IDENTITY;
            _tempQuat = new org.papervision3d.core.math.Quaternion();
            _newID = 0;
            toDEGREES = 180 / Math.PI;
            toRADIANS = Math.PI / 180;
            entry_count = 0;
        }

        public static const MESH_SORT_CENTER:uint=1;

        private static const LEFT:org.papervision3d.core.math.Number3D=new org.papervision3d.core.math.Number3D(-1, 0, 0);

        public static const MESH_SORT_CLOSE:uint=3;

        private static const BACKWARD:org.papervision3d.core.math.Number3D=new org.papervision3d.core.math.Number3D(0, 0, -1);

        private static const FORWARD:org.papervision3d.core.math.Number3D=new org.papervision3d.core.math.Number3D(0, 0, 1);

        public static const MESH_SORT_FAR:uint=2;

        private static const DOWN:org.papervision3d.core.math.Number3D=new org.papervision3d.core.math.Number3D(0, -1, 0);

        private static const UP:org.papervision3d.core.math.Number3D=new org.papervision3d.core.math.Number3D(0, 1, 0);

        private static const RIGHT:org.papervision3d.core.math.Number3D=new org.papervision3d.core.math.Number3D(1, 0, 0);

        public var extra:Object;

        public var frustumTestMethod:int=0;

        private var _rot:org.papervision3d.core.math.Quaternion;

        public var id:int;

        private var _rotationY:Number;

        private var _rotationZ:Number;

        public var cullTest:Number=0;

        private var _lookatTarget:org.papervision3d.core.math.Number3D;

        public var materials:org.papervision3d.materials.utils.MaterialsList;

        public var meshSort:uint=1;

        private var _rotationX:Number;

        private var _qYaw:org.papervision3d.core.math.Quaternion;

        private var _xAxis:org.papervision3d.core.math.Number3D;

        private var _zAxis:org.papervision3d.core.math.Number3D;

        private var _scaleDirty:Boolean=false;

        private var _autoCalcScreenCoords:Boolean=false;

        private var _tempScale:org.papervision3d.core.math.Number3D;

        private var _numClones:uint=0;

        public var alpha:Number=1;

        public var useClipping:Boolean=true;

        public var screen:org.papervision3d.core.math.Number3D;

        private var _scaleX:Number;

        private var _scaleY:Number;

        private var _scaleZ:Number;

        public var geometry:org.papervision3d.core.proto.GeometryObject3D;

        private var _qPitch:org.papervision3d.core.math.Quaternion;

        public var visible:Boolean;

        protected var _userData:org.papervision3d.core.data.UserData;

        public var screenZ:Number;

        public var container:org.papervision3d.view.layer.ViewportLayer;

        protected var _useOwnContainer:Boolean=false;

        public var transform:org.papervision3d.core.math.Matrix3D;

        private var _material:org.papervision3d.core.proto.MaterialObject3D;

        private var _position:org.papervision3d.core.math.Number3D;

        public var name:String;

        protected var _scene:org.papervision3d.core.proto.SceneObject3D=null;

        private var _qRoll:org.papervision3d.core.math.Quaternion;

        private var _localRotationZ:Number=0;

        public var culled:Boolean;

        public var world:org.papervision3d.core.math.Matrix3D;

        public var blendMode:String="normal";

        private var _localRotationX:Number=0;

        private var _localRotationY:Number=0;

        public var view:org.papervision3d.core.math.Matrix3D;

        public var parent:org.papervision3d.core.proto.DisplayObjectContainer3D;

        public var faces:Array;

        private var _yAxis:org.papervision3d.core.math.Number3D;

        public var flipLightDirection:Boolean=false;

        private var _rotation:org.papervision3d.core.math.Number3D;

        protected var _transformDirty:Boolean=false;

        protected var _sorted:Array;

        private var _rotationDirty:Boolean=false;

        public var parentContainer:org.papervision3d.objects.DisplayObject3D;

        public var testQuad:Boolean=true;

        public var filters:Array;

        private static var entry_count:uint=0;

        private static var _newID:int=0;

        private static var _tempMatrix:org.papervision3d.core.math.Matrix3D;

        public static var sortedArray:Array;

        public static var faceLevelMode:Boolean;

        private static var _tempQuat:org.papervision3d.core.math.Quaternion;

        private static var toRADIANS:Number=0.0174532925199;

        private static var toDEGREES:Number=57.2957795131;
    }
}


//      package render
//        class BasicRenderEngine
package org.papervision3d.render 
{
    import flash.geom.*;
    import org.papervision3d.core.clipping.*;
    import org.papervision3d.core.proto.*;
    import org.papervision3d.core.render.*;
    import org.papervision3d.core.render.command.*;
    import org.papervision3d.core.render.data.*;
    import org.papervision3d.core.render.filter.*;
    import org.papervision3d.core.render.material.*;
    import org.papervision3d.core.render.project.*;
    import org.papervision3d.core.render.sort.*;
    import org.papervision3d.core.utils.*;
    import org.papervision3d.events.*;
    import org.papervision3d.view.*;
    import org.papervision3d.view.layer.*;
    
    public class BasicRenderEngine extends org.papervision3d.core.render.AbstractRenderEngine implements org.papervision3d.core.render.IRenderEngine
    {
        public function BasicRenderEngine()
        {
            this.cleanRHD = new org.papervision3d.core.render.data.RenderHitData();
            super();
            this.init();
            return;
        }

        protected function doRender(arg1:org.papervision3d.core.render.data.RenderSessionData, arg2:Array=null):org.papervision3d.core.render.data.RenderStatistics
        {
            var loc1:*;
            loc1 = null;
            var loc3:*;
            loc3 = null;
            this.stopWatch.reset();
            this.stopWatch.start();
            org.papervision3d.core.render.material.MaterialManager.getInstance().updateMaterialsBeforeRender(arg1);
            this.filter.filter(this.renderList);
            this.sorter.sort(this.renderList);
            var loc2:*;
            loc2 = arg1.viewPort;
            for (;;) 
            {
                var loc4:*;
                loc1 = loc4 = this.renderList.pop();
                if (!loc4)
                {
                    break;
                }
                loc3 = loc2.accessLayerFor(loc1, true);
                loc1.render(arg1, loc3.graphicsChannel);
                loc2.lastRenderList.push(loc1);
                loc3.processRenderItem(loc1);
            }
            org.papervision3d.core.render.material.MaterialManager.getInstance().updateMaterialsAfterRender(arg1);
            arg1.renderStatistics.renderTime = this.stopWatch.stop();
            arg1.viewPort.updateAfterRender(arg1);
            return this.renderStatistics;
        }

        protected function init():void
        {
            this.renderStatistics = new org.papervision3d.core.render.data.RenderStatistics();
            this.projectionPipeline = new org.papervision3d.core.render.project.BasicProjectionPipeline();
            this.stopWatch = new org.papervision3d.core.utils.StopWatch();
            this.sorter = new org.papervision3d.core.render.sort.BasicRenderSorter();
            this.filter = new org.papervision3d.core.render.filter.BasicRenderFilter();
            this.renderList = new Array();
            this.clipping = null;
            this.renderSessionData = new org.papervision3d.core.render.data.RenderSessionData();
            this.renderSessionData.renderer = this;
            this.projectionDoneEvent = new org.papervision3d.events.RendererEvent(org.papervision3d.events.RendererEvent.PROJECTION_DONE, this.renderSessionData);
            this.renderDoneEvent = new org.papervision3d.events.RendererEvent(org.papervision3d.events.RendererEvent.RENDER_DONE, this.renderSessionData);
            return;
        }

        public override function renderScene(arg1:org.papervision3d.core.proto.SceneObject3D, arg2:org.papervision3d.core.proto.CameraObject3D, arg3:org.papervision3d.view.Viewport3D):org.papervision3d.core.render.data.RenderStatistics
        {
            arg2.viewport = arg3.sizeRectangle;
            this.renderSessionData.scene = arg1;
            this.renderSessionData.camera = arg2;
            this.renderSessionData.viewPort = arg3;
            this.renderSessionData.container = arg3.containerSprite;
            this.renderSessionData.triangleCuller = arg3.triangleCuller;
            this.renderSessionData.particleCuller = arg3.particleCuller;
            this.renderSessionData.renderObjects = arg1.objects;
            this.renderSessionData.renderLayers = null;
            this.renderSessionData.renderStatistics.clear();
            this.renderSessionData.clipping = this.clipping;
            if (this.clipping)
            {
                this.clipping.reset(this.renderSessionData);
            }
            arg3.updateBeforeRender(this.renderSessionData);
            this.projectionPipeline.project(this.renderSessionData);
            if (hasEventListener(org.papervision3d.events.RendererEvent.PROJECTION_DONE))
            {
                dispatchEvent(this.projectionDoneEvent);
            }
            this.doRender(this.renderSessionData, null);
            if (hasEventListener(org.papervision3d.events.RendererEvent.RENDER_DONE))
            {
                dispatchEvent(this.renderDoneEvent);
            }
            return this.renderSessionData.renderStatistics;
        }

        public function hitTestPoint2D(arg1:flash.geom.Point, arg2:org.papervision3d.view.Viewport3D):org.papervision3d.core.render.data.RenderHitData
        {
            return arg2.hitTestPoint2D(arg1);
        }

        public override function removeFromRenderList(arg1:org.papervision3d.core.render.command.IRenderListItem):int
        {
            return this.renderList.splice(this.renderList.indexOf(arg1), 1);
        }

        public override function addToRenderList(arg1:org.papervision3d.core.render.command.RenderableListItem):int
        {
            return this.renderList.push(arg1);
        }

        private function getLayerObjects(arg1:Array):Array
        {
            var loc2:*;
            loc2 = null;
            var loc1:*;
            loc1 = new Array();
            var loc3:*;
            loc3 = 0;
            var loc4:*;
            loc4 = arg1;
            for each (loc2 in loc4)
            {
                loc1 = loc1.concat(loc2.getLayerObjects());
            }
            return loc1;
        }

        public function destroy():void
        {
            this.renderDoneEvent = null;
            this.projectionDoneEvent = null;
            this.projectionPipeline = null;
            this.sorter = null;
            this.filter = null;
            this.renderStatistics = null;
            this.renderList = null;
            this.renderSessionData.destroy();
            this.renderSessionData = null;
            this.cleanRHD = null;
            this.stopWatch = null;
            this.clipping = null;
            return;
        }

        public function renderLayers(arg1:org.papervision3d.core.proto.SceneObject3D, arg2:org.papervision3d.core.proto.CameraObject3D, arg3:org.papervision3d.view.Viewport3D, arg4:Array=null):org.papervision3d.core.render.data.RenderStatistics
        {
            this.renderSessionData.scene = arg1;
            this.renderSessionData.camera = arg2;
            this.renderSessionData.viewPort = arg3;
            this.renderSessionData.container = arg3.containerSprite;
            this.renderSessionData.triangleCuller = arg3.triangleCuller;
            this.renderSessionData.particleCuller = arg3.particleCuller;
            this.renderSessionData.renderObjects = this.getLayerObjects(arg4);
            this.renderSessionData.renderLayers = arg4;
            this.renderSessionData.renderStatistics.clear();
            this.renderSessionData.clipping = this.clipping;
            arg3.updateBeforeRender(this.renderSessionData);
            this.projectionPipeline.project(this.renderSessionData);
            if (hasEventListener(org.papervision3d.events.RendererEvent.PROJECTION_DONE))
            {
                dispatchEvent(this.projectionDoneEvent);
            }
            this.doRender(this.renderSessionData);
            if (hasEventListener(org.papervision3d.events.RendererEvent.RENDER_DONE))
            {
                dispatchEvent(this.renderDoneEvent);
            }
            return this.renderSessionData.renderStatistics;
        }

        public var clipping:org.papervision3d.core.clipping.DefaultClipping;

        protected var renderDoneEvent:org.papervision3d.events.RendererEvent;

        public var sorter:org.papervision3d.core.render.sort.IRenderSorter;

        public var projectionPipeline:org.papervision3d.core.render.project.ProjectionPipeline;

        protected var renderList:Array;

        protected var renderStatistics:org.papervision3d.core.render.data.RenderStatistics;

        protected var cleanRHD:org.papervision3d.core.render.data.RenderHitData;

        protected var projectionDoneEvent:org.papervision3d.events.RendererEvent;

        protected var renderSessionData:org.papervision3d.core.render.data.RenderSessionData;

        protected var stopWatch:org.papervision3d.core.utils.StopWatch;

        public var filter:org.papervision3d.core.render.filter.IRenderFilter;
    }
}


//      package scenes
//        class Scene3D
package org.papervision3d.scenes 
{
    import org.papervision3d.core.proto.*;
    
    public class Scene3D extends org.papervision3d.core.proto.SceneObject3D
    {
        public function Scene3D()
        {
            super();
            return;
        }
    }
}


//      package view
//        package layer
//          package util
//            class ViewportLayerSortMode
package org.papervision3d.view.layer.util 
{
    public class ViewportLayerSortMode extends Object
    {
        public function ViewportLayerSortMode()
        {
            super();
            return;
        }

        
        {
            Z_SORT = "z";
            INDEX_SORT = "index";
            ORIGIN_SORT = "origin";
            NONE = "none";
        }

        public static var Z_SORT:String="z";

        public static var ORIGIN_SORT:String="origin";

        public static var NONE:String="none";

        public static var INDEX_SORT:String="index";
    }
}


//          class ViewportBaseLayer
package org.papervision3d.view.layer 
{
    import org.papervision3d.objects.*;
    import org.papervision3d.view.*;
    
    public class ViewportBaseLayer extends org.papervision3d.view.layer.ViewportLayer
    {
        public function ViewportBaseLayer(arg1:org.papervision3d.view.Viewport3D)
        {
            super(arg1, null);
            return;
        }

        public override function getChildLayer(arg1:org.papervision3d.objects.DisplayObject3D, arg2:Boolean=true, arg3:Boolean=false):org.papervision3d.view.layer.ViewportLayer
        {
            if (layers[arg1])
            {
                return layers[arg1];
            }
            if (arg2 || arg1.useOwnContainer)
            {
                return getChildLayerFor(arg1, arg3);
            }
            return this;
        }

        public override function updateBeforeRender():void
        {
            clear();
            var loc1:*;
            loc1 = (childLayers.length - 1);
            while (loc1 >= 0) 
            {
                if (childLayers[loc1].dynamicLayer)
                {
                    removeLayerAt(loc1);
                }
                loc1 = (loc1 - 1);
            }
            super.updateBeforeRender();
            return;
        }
    }
}


//          class ViewportLayer
package org.papervision3d.view.layer 
{
    import flash.display.*;
    import flash.utils.*;
    import org.papervision3d.core.log.*;
    import org.papervision3d.core.render.command.*;
    import org.papervision3d.objects.*;
    import org.papervision3d.view.*;
    import org.papervision3d.view.layer.util.*;
    
    public class ViewportLayer extends flash.display.Sprite
    {
        public function ViewportLayer(arg1:org.papervision3d.view.Viewport3D, arg2:org.papervision3d.objects.DisplayObject3D, arg3:Boolean=false)
        {
            this.layers = new flash.utils.Dictionary(true);
            this.displayObjects = new flash.utils.Dictionary(true);
            this.sortMode = org.papervision3d.view.layer.util.ViewportLayerSortMode.Z_SORT;
            super();
            this.viewport = arg1;
            this.displayObject3D = arg2;
            this.dynamicLayer = arg3;
            this.graphicsChannel = this.graphics;
            if (arg3)
            {
                this.filters = arg2.filters;
                this.blendMode = arg2.blendMode;
                this.alpha = arg2.alpha;
            }
            if (arg2)
            {
                this.addDisplayObject3D(arg2);
                arg2.container = this;
            }
            this.init();
            return;
        }

        public function removeLayerAt(arg1:Number):void
        {
            var loc1:*;
            loc1 = null;
            var loc2:*;
            loc2 = 0;
            var loc3:*;
            loc3 = this.childLayers[arg1].displayObjects;
            for each (loc1 in loc3)
            {
                this.unlinkChild(loc1);
            }
            removeChild(this.childLayers[arg1]);
            this.childLayers.splice(arg1, 1);
            return;
        }

        private function onChildAdded(arg1:org.papervision3d.view.layer.ViewportLayerEvent):void
        {
            if (arg1.do3d)
            {
                this.linkChild(arg1.do3d, arg1.layer, arg1);
            }
            return;
        }

        public function addLayer(arg1:org.papervision3d.view.layer.ViewportLayer):void
        {
            var loc1:*;
            loc1 = null;
            var loc2:*;
            loc2 = null;
            if (this.childLayers.indexOf(arg1) != -1)
            {
                org.papervision3d.core.log.PaperLogger.warning("Child layer already exists in ViewportLayer");
                return;
            }
            this.childLayers.push(arg1);
            addChild(arg1);
            arg1.addEventListener(org.papervision3d.view.layer.ViewportLayerEvent.CHILD_ADDED, this.onChildAdded);
            arg1.addEventListener(org.papervision3d.view.layer.ViewportLayerEvent.CHILD_REMOVED, this.onChildRemoved);
            var loc3:*;
            loc3 = 0;
            var loc4:*;
            loc4 = arg1.displayObjects;
            for each (loc1 in loc4)
            {
                this.linkChild(loc1, arg1);
            }
            loc3 = 0;
            loc4 = arg1.layers;
            for each (loc2 in loc4)
            {
                var loc5:*;
                loc5 = 0;
                var loc6:*;
                loc6 = loc2.displayObjects;
                for each (loc1 in loc6)
                {
                    this.linkChild(loc1, loc2);
                }
            }
            return;
        }

        protected function getChildLayerFor(arg1:org.papervision3d.objects.DisplayObject3D, arg2:Boolean=false):org.papervision3d.view.layer.ViewportLayer
        {
            var loc1:*;
            loc1 = null;
            if (arg1)
            {
                loc1 = new org.papervision3d.view.layer.ViewportLayer(this.viewport, arg1, arg1.useOwnContainer);
                this.addLayer(loc1);
                if (arg2)
                {
                    arg1.addChildrenToLayer(arg1, loc1);
                }
                return loc1;
            }
            org.papervision3d.core.log.PaperLogger.warning("Needs to be a do3d");
            return null;
        }

        public function updateAfterRender():void
        {
            var loc1:*;
            loc1 = null;
            var loc2:*;
            loc2 = 0;
            var loc3:*;
            loc3 = this.childLayers;
            for each (loc1 in loc3)
            {
                loc1.updateAfterRender();
            }
            return;
        }

        protected function init():void
        {
            this.childLayers = new Array();
            return;
        }

        public function clear():void
        {
            this.graphicsChannel.clear();
            this.reset();
            return;
        }

        public function childLayerIndex(arg1:org.papervision3d.objects.DisplayObject3D):Number
        {
            arg1 = arg1.parentContainer ? arg1.parentContainer : arg1;
            var loc1:*;
            loc1 = 0;
            while (loc1 < this.childLayers.length) 
            {
                if (this.childLayers[loc1].hasDisplayObject3D(arg1))
                {
                    return loc1;
                }
                ++loc1;
            }
            return -1;
        }

        protected function reset():void
        {
            if (!this.forceDepth)
            {
                this.screenDepth = 0;
                this.originDepth = 0;
            }
            this.weight = 0;
            return;
        }

        public function updateInfo():void
        {
            var loc1:*;
            loc1 = null;
            var loc2:*;
            loc2 = 0;
            var loc3:*;
            loc3 = this.childLayers;
            for each (loc1 in loc3)
            {
                loc1.updateInfo();
                if (this.forceDepth)
                {
                    continue;
                }
                if (isNaN(loc1.screenDepth))
                {
                    continue;
                }
                this.weight = this.weight + loc1.weight;
                this.screenDepth = this.screenDepth + loc1.screenDepth * loc1.weight;
                this.originDepth = this.originDepth + loc1.originDepth * loc1.weight;
            }
            if (!this.forceDepth)
            {
                this.screenDepth = this.screenDepth / this.weight;
                this.originDepth = this.originDepth / this.weight;
            }
            return;
        }

        public function getChildLayer(arg1:org.papervision3d.objects.DisplayObject3D, arg2:Boolean=true, arg3:Boolean=false):org.papervision3d.view.layer.ViewportLayer
        {
            arg1 = arg1.parentContainer ? arg1.parentContainer : arg1;
            if (this.layers[arg1])
            {
                return this.layers[arg1];
            }
            if (arg2)
            {
                return this.getChildLayerFor(arg1, arg3);
            }
            return null;
        }

        protected function orderLayers():void
        {
            var loc2:*;
            loc2 = null;
            if (this.sortMode == org.papervision3d.view.layer.util.ViewportLayerSortMode.NONE)
            {
                return;
            }
            var loc1:*;
            loc1 = 0;
            while (loc1 < this.childLayers.length) 
            {
                loc2 = this.childLayers[loc1];
                if (this.getChildIndex(loc2) != loc1)
                {
                    this.setChildIndex(loc2, loc1);
                }
                loc2.sortChildLayers();
                ++loc1;
            }
            return;
        }

        public function updateBeforeRender():void
        {
            var loc1:*;
            loc1 = null;
            this.clear();
            var loc2:*;
            loc2 = 0;
            var loc3:*;
            loc3 = this.childLayers;
            for each (loc1 in loc3)
            {
                loc1.updateBeforeRender();
            }
            return;
        }

        public function hasDisplayObject3D(arg1:org.papervision3d.objects.DisplayObject3D):Boolean
        {
            return !(this.displayObjects[arg1] == null);
        }

        public function sortChildLayers():void
        {
            var loc1:*;
            loc1 = this.sortMode;
            switch (loc1) 
            {
                case org.papervision3d.view.layer.util.ViewportLayerSortMode.Z_SORT:
                {
                    this.childLayers.sortOn("screenDepth", Array.DESCENDING | Array.NUMERIC);
                    break;
                }
                case org.papervision3d.view.layer.util.ViewportLayerSortMode.INDEX_SORT:
                {
                    this.childLayers.sortOn("layerIndex", Array.NUMERIC);
                    break;
                }
                case org.papervision3d.view.layer.util.ViewportLayerSortMode.ORIGIN_SORT:
                {
                    this.childLayers.sortOn(["originDepth", "screenDepth"], [Array.DESCENDING | Array.NUMERIC, Array.DESCENDING | Array.NUMERIC]);
                    break;
                }
            }
            this.orderLayers();
            return;
        }

        private function onChildRemoved(arg1:org.papervision3d.view.layer.ViewportLayerEvent):void
        {
            if (arg1.do3d)
            {
                this.unlinkChild(arg1.do3d, arg1);
            }
            return;
        }

        public function removeAllLayers():void
        {
            var loc1:*;
            loc1 = (this.childLayers.length - 1);
            while (loc1 >= 0) 
            {
                this.removeLayerAt(loc1);
                loc1 = (loc1 - 1);
            }
            return;
        }

        public function processRenderItem(arg1:org.papervision3d.core.render.command.RenderableListItem):void
        {
            if (!this.forceDepth)
            {
                if (!isNaN(arg1.screenZ))
                {
                    this.screenDepth = this.screenDepth + arg1.screenZ;
                    if (arg1.instance)
                    {
                        this.originDepth = this.originDepth + arg1.instance.world.n34;
                        this.originDepth = this.originDepth + arg1.instance.screen.z;
                    }
                    var loc1:*;
                    var loc2:*;
                    loc2 = ((loc1 = this).weight + 1);
                    loc1.weight = loc2;
                }
            }
            return;
        }

        public function removeLayer(arg1:org.papervision3d.view.layer.ViewportLayer):void
        {
            var loc1:*;
            loc1 = getChildIndex(arg1);
            if (loc1 > -1)
            {
                this.removeLayerAt(loc1);
            }
            else 
            {
                org.papervision3d.core.log.PaperLogger.error("Layer not found for removal.");
            }
            return;
        }

        private function linkChild(arg1:org.papervision3d.objects.DisplayObject3D, arg2:org.papervision3d.view.layer.ViewportLayer, arg3:org.papervision3d.view.layer.ViewportLayerEvent=null):void
        {
            this.layers[arg1] = arg2;
            dispatchEvent(new org.papervision3d.view.layer.ViewportLayerEvent(org.papervision3d.view.layer.ViewportLayerEvent.CHILD_ADDED, arg1, arg2));
            return;
        }

        public function addDisplayObject3D(arg1:org.papervision3d.objects.DisplayObject3D, arg2:Boolean=false):void
        {
            if (!arg1)
            {
                return;
            }
            this.displayObjects[arg1] = arg1;
            dispatchEvent(new org.papervision3d.view.layer.ViewportLayerEvent(org.papervision3d.view.layer.ViewportLayerEvent.CHILD_ADDED, arg1, this));
            if (arg2)
            {
                arg1.addChildrenToLayer(arg1, this);
            }
            return;
        }

        public function removeDisplayObject3D(arg1:org.papervision3d.objects.DisplayObject3D):void
        {
            var loc1:*;
            loc1 = null;
            this.displayObjects[arg1] = null;
            var loc2:*;
            loc2 = 0;
            var loc3:*;
            loc3 = arg1;
            for each (loc1 in loc3)
            {
                this.removeDisplayObject3D(loc1);
            }
            dispatchEvent(new org.papervision3d.view.layer.ViewportLayerEvent(org.papervision3d.view.layer.ViewportLayerEvent.CHILD_REMOVED, arg1, this));
            return;
        }

        private function unlinkChild(arg1:org.papervision3d.objects.DisplayObject3D, arg2:org.papervision3d.view.layer.ViewportLayerEvent=null):void
        {
            this.layers[arg1] = null;
            dispatchEvent(new org.papervision3d.view.layer.ViewportLayerEvent(org.papervision3d.view.layer.ViewportLayerEvent.CHILD_REMOVED, arg1));
            return;
        }

        public function getLayerObjects(arg1:Array=null):Array
        {
            var loc1:*;
            loc1 = null;
            var loc2:*;
            loc2 = null;
            if (!arg1)
            {
                arg1 = new Array();
            }
            var loc3:*;
            loc3 = 0;
            var loc4:*;
            loc4 = this.displayObjects;
            for each (loc1 in loc4)
            {
                if (!loc1)
                {
                    continue;
                }
                arg1.push(loc1);
            }
            loc3 = 0;
            loc4 = this.childLayers;
            for each (loc2 in loc4)
            {
                loc2.getLayerObjects(arg1);
            }
            return arg1;
        }

        public var layerIndex:Number;

        public var layers:flash.utils.Dictionary;

        public var childLayers:Array;

        public var weight:Number=0;

        public var dynamicLayer:Boolean=false;

        public var forceDepth:Boolean=false;

        public var displayObject3D:org.papervision3d.objects.DisplayObject3D;

        public var sortMode:String;

        protected var viewport:org.papervision3d.view.Viewport3D;

        public var displayObjects:flash.utils.Dictionary;

        public var graphicsChannel:flash.display.Graphics;

        public var originDepth:Number=0;

        public var screenDepth:Number=0;
    }
}


//          class ViewportLayerEvent
package org.papervision3d.view.layer 
{
    import flash.events.*;
    import org.papervision3d.objects.*;
    
    public class ViewportLayerEvent extends flash.events.Event
    {
        public function ViewportLayerEvent(arg1:String, arg2:org.papervision3d.objects.DisplayObject3D=null, arg3:org.papervision3d.view.layer.ViewportLayer=null)
        {
            super(arg1, false, false);
            this.do3d = arg2;
            this.layer = arg3;
            return;
        }

        public static const CHILD_REMOVED:String="childRemoved";

        public static const CHILD_ADDED:String="childAdded";

        public var layer:org.papervision3d.view.layer.ViewportLayer;

        public var do3d:org.papervision3d.objects.DisplayObject3D;
    }
}


//        class AbstractView
package org.papervision3d.view 
{
    import flash.display.*;
    import flash.events.*;
    import org.papervision3d.core.proto.*;
    import org.papervision3d.core.view.*;
    import org.papervision3d.render.*;
    import org.papervision3d.scenes.*;
    
    public class AbstractView extends flash.display.Sprite implements org.papervision3d.core.view.IView
    {
        public function AbstractView()
        {
            super();
            return;
        }

        public function set viewportWidth(arg1:Number):void
        {
            this._width = arg1;
            this.viewport.width = arg1;
            return;
        }

        public function singleRender():void
        {
            this.onRenderTick();
            return;
        }

        public function startRendering():void
        {
            addEventListener(flash.events.Event.ENTER_FRAME, this.onRenderTick);
            this.viewport.containerSprite.cacheAsBitmap = false;
            return;
        }

        public function get viewportWidth():Number
        {
            return this._width;
        }

        protected function onRenderTick(arg1:flash.events.Event=null):void
        {
            this.renderer.renderScene(this.scene, this._camera, this.viewport);
            return;
        }

        public function set viewportHeight(arg1:Number):void
        {
            this._height = arg1;
            this.viewport.height = arg1;
            return;
        }

        public function get camera():org.papervision3d.core.proto.CameraObject3D
        {
            return this._camera;
        }

        public function get viewportHeight():Number
        {
            return this._height;
        }

        public function stopRendering(arg1:Boolean=false, arg2:Boolean=false):void
        {
            removeEventListener(flash.events.Event.ENTER_FRAME, this.onRenderTick);
            if (arg1)
            {
                this.onRenderTick();
            }
            if (arg2)
            {
                this.viewport.containerSprite.cacheAsBitmap = true;
            }
            else 
            {
                this.viewport.containerSprite.cacheAsBitmap = false;
            }
            return;
        }

        public var renderer:org.papervision3d.render.BasicRenderEngine;

        protected var _camera:org.papervision3d.core.proto.CameraObject3D;

        protected var _width:Number;

        public var scene:org.papervision3d.scenes.Scene3D;

        protected var _height:Number;

        public var viewport:org.papervision3d.view.Viewport3D;
    }
}


//        class BasicView
package org.papervision3d.view 
{
    import org.papervision3d.cameras.*;
    import org.papervision3d.core.view.*;
    import org.papervision3d.objects.*;
    import org.papervision3d.render.*;
    import org.papervision3d.scenes.*;
    
    public class BasicView extends org.papervision3d.view.AbstractView implements org.papervision3d.core.view.IView
    {
        public function BasicView(arg1:Number=640, arg2:Number=480, arg3:Boolean=true, arg4:Boolean=false, arg5:String="Target")
        {
            super();
            scene = new org.papervision3d.scenes.Scene3D();
            viewport = new org.papervision3d.view.Viewport3D(arg1, arg2, arg3, arg4);
            addChild(viewport);
            renderer = new org.papervision3d.render.BasicRenderEngine();
            var loc1:*;
            loc1 = arg5;
            switch (loc1) 
            {
                case org.papervision3d.cameras.CameraType.DEBUG:
                {
                    _camera = new org.papervision3d.cameras.DebugCamera3D(viewport);
                    break;
                }
                case org.papervision3d.cameras.CameraType.TARGET:
                {
                    _camera = new org.papervision3d.cameras.Camera3D(60);
                    _camera.target = org.papervision3d.objects.DisplayObject3D.ZERO;
                    break;
                }
                case org.papervision3d.cameras.CameraType.SPRING:
                {
                    _camera = new org.papervision3d.cameras.SpringCamera3D();
                    _camera.target = org.papervision3d.objects.DisplayObject3D.ZERO;
                    break;
                }
                case org.papervision3d.cameras.CameraType.FREE:
                default:
                {
                    _camera = new org.papervision3d.cameras.Camera3D(60);
                    break;
                }
            }
            this.cameraAsCamera3D.update(viewport.sizeRectangle);
            return;
        }

        public function get cameraAsDebugCamera3D():org.papervision3d.cameras.DebugCamera3D
        {
            return _camera as org.papervision3d.cameras.DebugCamera3D;
        }

        public function get cameraAsCamera3D():org.papervision3d.cameras.Camera3D
        {
            return _camera as org.papervision3d.cameras.Camera3D;
        }
    }
}


//        class Viewport3D
package org.papervision3d.view 
{
    import flash.display.*;
    import flash.events.*;
    import flash.geom.*;
    import flash.utils.*;
    import org.papervision3d.core.culling.*;
    import org.papervision3d.core.geom.renderables.*;
    import org.papervision3d.core.log.*;
    import org.papervision3d.core.render.*;
    import org.papervision3d.core.render.command.*;
    import org.papervision3d.core.render.data.*;
    import org.papervision3d.core.utils.*;
    import org.papervision3d.core.view.*;
    import org.papervision3d.objects.*;
    import org.papervision3d.view.layer.*;
    
    public class Viewport3D extends flash.display.Sprite implements org.papervision3d.core.view.IViewport3D
    {
        public function Viewport3D(arg1:Number=640, arg2:Number=480, arg3:Boolean=false, arg4:Boolean=false, arg5:Boolean=true, arg6:Boolean=true)
        {
            super();
            this.init();
            this.interactive = arg4;
            this.viewportWidth = arg1;
            this.viewportHeight = arg2;
            this.autoClipping = arg5;
            this.autoCulling = arg6;
            this.autoScaleToStage = arg3;
            this._layerInstances = new flash.utils.Dictionary(true);
            return;
        }

        public function set viewportWidth(arg1:Number):void
        {
            this._width = arg1;
            this._hWidth = arg1 / 2;
            this.containerSprite.x = this._hWidth;
            this.cullingRectangle.x = -this._hWidth;
            this.cullingRectangle.width = arg1;
            this.sizeRectangle.width = arg1;
            if (this._autoClipping)
            {
                scrollRect = this.sizeRectangle;
            }
            return;
        }

        public function get autoCulling():Boolean
        {
            return this._autoCulling;
        }

        protected function onStageResize(arg1:flash.events.Event=null):void
        {
            if (this._autoScaleToStage)
            {
                this.viewportWidth = stage.stageWidth;
                this.viewportHeight = stage.stageHeight;
            }
            return;
        }

        public function set autoCulling(arg1:Boolean):void
        {
            if (arg1)
            {
                this.triangleCuller = new org.papervision3d.core.culling.RectangleTriangleCuller(this.cullingRectangle);
                this.particleCuller = new org.papervision3d.core.culling.RectangleParticleCuller(this.cullingRectangle);
                this.lineCuller = new org.papervision3d.core.culling.RectangleLineCuller(this.cullingRectangle);
            }
            else 
            {
                if (!arg1)
                {
                    this.triangleCuller = new org.papervision3d.core.culling.DefaultTriangleCuller();
                    this.particleCuller = new org.papervision3d.core.culling.DefaultParticleCuller();
                    this.lineCuller = new org.papervision3d.core.culling.DefaultLineCuller();
                }
            }
            this._autoCulling = arg1;
            return;
        }

        public function getChildLayer(arg1:org.papervision3d.objects.DisplayObject3D, arg2:Boolean=true, arg3:Boolean=true):org.papervision3d.view.layer.ViewportLayer
        {
            return this.containerSprite.getChildLayer(arg1, arg2, arg3);
        }

        protected function init():void
        {
            this.renderHitData = new org.papervision3d.core.render.data.RenderHitData();
            this.lastRenderList = new Array();
            this.sizeRectangle = new flash.geom.Rectangle();
            this.cullingRectangle = new flash.geom.Rectangle();
            this._containerSprite = new org.papervision3d.view.layer.ViewportBaseLayer(this);
            this._containerSprite.doubleClickEnabled = true;
            addChild(this._containerSprite);
            addEventListener(flash.events.Event.ADDED_TO_STAGE, this.onAddedToStage);
            addEventListener(flash.events.Event.REMOVED_FROM_STAGE, this.onRemovedFromStage);
            return;
        }

        public function get autoClipping():Boolean
        {
            return this._autoClipping;
        }

        public function updateAfterRender(arg1:org.papervision3d.core.render.data.RenderSessionData):void
        {
            var loc1:*;
            loc1 = null;
            if (this.interactive)
            {
                this.interactiveSceneManager.updateAfterRender();
            }
            if (arg1.renderLayers)
            {
                var loc2:*;
                loc2 = 0;
                var loc3:*;
                loc3 = arg1.renderLayers;
                for each (loc1 in loc3)
                {
                    loc1.updateInfo();
                    loc1.sortChildLayers();
                    loc1.updateAfterRender();
                }
            }
            else 
            {
                this.containerSprite.updateInfo();
                this.containerSprite.updateAfterRender();
            }
            this.containerSprite.sortChildLayers();
            return;
        }

        protected function onAddedToStage(arg1:flash.events.Event):void
        {
            if (this._autoScaleToStage)
            {
                this.setStageScaleMode();
            }
            stage.addEventListener(flash.events.Event.RESIZE, this.onStageResize);
            this.onStageResize();
            return;
        }

        public function get containerSprite():org.papervision3d.view.layer.ViewportLayer
        {
            return this._containerSprite;
        }

        public function set autoClipping(arg1:Boolean):void
        {
            if (arg1)
            {
                scrollRect = this.sizeRectangle;
            }
            else 
            {
                scrollRect = null;
            }
            this._autoClipping = arg1;
            return;
        }

        protected function setStageScaleMode():void
        {
            if (!this.stageScaleModeSet)
            {
                org.papervision3d.core.log.PaperLogger.info("Viewport autoScaleToStage : Papervision has changed the Stage scale mode.");
                stage.align = flash.display.StageAlign.TOP_LEFT;
                stage.scaleMode = flash.display.StageScaleMode.NO_SCALE;
                this.stageScaleModeSet = true;
            }
            return;
        }

        public function accessLayerFor(arg1:org.papervision3d.core.render.command.RenderableListItem, arg2:Boolean=false):org.papervision3d.view.layer.ViewportLayer
        {
            var loc1:*;
            loc1 = null;
            if (arg1.renderableInstance)
            {
                loc1 = arg1.renderableInstance.instance;
                loc1 = loc1.parentContainer ? loc1.parentContainer : loc1;
                if (this.containerSprite.layers[loc1])
                {
                    if (arg2)
                    {
                        loc1.container = this.containerSprite.layers[loc1];
                    }
                    return this.containerSprite.layers[loc1];
                }
                if (loc1.useOwnContainer)
                {
                    return this.containerSprite.getChildLayer(loc1, true, true);
                }
            }
            return this.containerSprite;
        }

        public function get viewportWidth():Number
        {
            return this._width;
        }

        public function set interactive(arg1:Boolean):void
        {
            if (arg1 != this._interactive)
            {
                if (this._interactive && this.interactiveSceneManager)
                {
                    this.interactiveSceneManager.destroy();
                    this.interactiveSceneManager = null;
                }
                this._interactive = arg1;
                if (arg1)
                {
                    this.interactiveSceneManager = new org.papervision3d.core.utils.InteractiveSceneManager(this);
                }
            }
            return;
        }

        public function set viewportObjectFilter(arg1:org.papervision3d.core.culling.ViewportObjectFilter):void
        {
            this._viewportObjectFilter = arg1;
            return;
        }

        public function set autoScaleToStage(arg1:Boolean):void
        {
            this._autoScaleToStage = arg1;
            if (arg1 && !(stage == null))
            {
                this.setStageScaleMode();
                this.onStageResize();
            }
            return;
        }

        public function set viewportHeight(arg1:Number):void
        {
            this._height = arg1;
            this._hHeight = arg1 / 2;
            this.containerSprite.y = this._hHeight;
            this.cullingRectangle.y = -this._hHeight;
            this.cullingRectangle.height = arg1;
            this.sizeRectangle.height = arg1;
            if (this._autoClipping)
            {
                scrollRect = this.sizeRectangle;
            }
            return;
        }

        public function updateBeforeRender(arg1:org.papervision3d.core.render.data.RenderSessionData):void
        {
            var loc1:*;
            loc1 = null;
            this.lastRenderList.length = 0;
            if (arg1.renderLayers)
            {
                var loc2:*;
                loc2 = 0;
                var loc3:*;
                loc3 = arg1.renderLayers;
                for each (loc1 in loc3)
                {
                    loc1.updateBeforeRender();
                }
            }
            else 
            {
                this._containerSprite.updateBeforeRender();
            }
            this._layerInstances = new flash.utils.Dictionary(true);
            return;
        }

        public function hitTestMouse():org.papervision3d.core.render.data.RenderHitData
        {
            var loc1:*;
            loc1 = new flash.geom.Point(this.containerSprite.mouseX, this.containerSprite.mouseY);
            return this.hitTestPoint2D(loc1);
        }

        public function get interactive():Boolean
        {
            return this._interactive;
        }

        public function get autoScaleToStage():Boolean
        {
            return this._autoScaleToStage;
        }

        public function hitTestPointObject(arg1:flash.geom.Point, arg2:org.papervision3d.objects.DisplayObject3D):org.papervision3d.core.render.data.RenderHitData
        {
            var loc1:*;
            loc1 = null;
            var loc2:*;
            loc2 = null;
            var loc3:*;
            loc3 = null;
            var loc4:*;
            loc4 = 0;
            if (this.interactive)
            {
                loc2 = new org.papervision3d.core.render.data.RenderHitData();
                loc4 = this.lastRenderList.length;
                for (;;) 
                {
                    var loc5:*;
                    loc3 = loc5 = this.lastRenderList[--loc4];
                    if (!loc5)
                    {
                        break;
                    }
                    if (!(loc3 as org.papervision3d.core.render.command.RenderableListItem))
                    {
                        continue;
                    }
                    loc1 = loc3 as org.papervision3d.core.render.command.RenderableListItem;
                    if (loc1.renderableInstance as org.papervision3d.core.geom.renderables.Triangle3D)
                    {
                        if (org.papervision3d.core.geom.renderables.Triangle3D(loc1.renderableInstance).instance != arg2)
                        {
                            continue;
                        }
                    }
                    else 
                    {
                        continue;
                    }
                    if (!(loc2 = loc1.hitTestPoint2D(arg1, loc2)).hasHit)
                    {
                        continue;
                    }
                    return loc2;
                }
            }
            return new org.papervision3d.core.render.data.RenderHitData();
        }

        public function hitTestPoint2D(arg1:flash.geom.Point):org.papervision3d.core.render.data.RenderHitData
        {
            var loc1:*;
            loc1 = null;
            var loc2:*;
            loc2 = null;
            var loc3:*;
            loc3 = null;
            var loc4:*;
            loc4 = 0;
            this.renderHitData.clear();
            if (this.interactive)
            {
                loc2 = this.renderHitData;
                loc4 = this.lastRenderList.length;
                for (;;) 
                {
                    var loc5:*;
                    loc3 = loc5 = this.lastRenderList[--loc4];
                    if (!loc5)
                    {
                        break;
                    }
                    if (!(loc3 as org.papervision3d.core.render.command.RenderableListItem))
                    {
                        continue;
                    }
                    loc1 = loc3 as org.papervision3d.core.render.command.RenderableListItem;
                    loc2 = loc1.hitTestPoint2D(arg1, loc2);
                    if (!loc2.hasHit)
                    {
                        continue;
                    }
                    return loc2;
                }
            }
            return this.renderHitData;
        }

        protected function onRemovedFromStage(arg1:flash.events.Event):void
        {
            stage.removeEventListener(flash.events.Event.RESIZE, this.onStageResize);
            return;
        }

        public function get viewportHeight():Number
        {
            return this._height;
        }

        public function destroy():void
        {
            if (this.interactiveSceneManager)
            {
                this.interactiveSceneManager.destroy();
                this.interactiveSceneManager = null;
            }
            this.lastRenderList = null;
            return;
        }

        public function get viewportObjectFilter():org.papervision3d.core.culling.ViewportObjectFilter
        {
            return this._viewportObjectFilter;
        }

        public var interactiveSceneManager:org.papervision3d.core.utils.InteractiveSceneManager;

        public var lastRenderList:Array;

        public var cullingRectangle:flash.geom.Rectangle;

        protected var _interactive:Boolean;

        private var stageScaleModeSet:Boolean=false;

        protected var _autoCulling:Boolean;

        protected var _viewportObjectFilter:org.papervision3d.core.culling.ViewportObjectFilter;

        public var particleCuller:org.papervision3d.core.culling.IParticleCuller;

        protected var _height:Number;

        protected var _width:Number;

        public var lineCuller:org.papervision3d.core.culling.ILineCuller;

        protected var _layerInstances:flash.utils.Dictionary;

        protected var _autoScaleToStage:Boolean;

        public var triangleCuller:org.papervision3d.core.culling.ITriangleCuller;

        protected var _lastRenderer:org.papervision3d.core.render.IRenderEngine;

        protected var _hWidth:Number;

        protected var _containerSprite:org.papervision3d.view.layer.ViewportBaseLayer;

        protected var _hHeight:Number;

        public var sizeRectangle:flash.geom.Rectangle;

        protected var renderHitData:org.papervision3d.core.render.data.RenderHitData;

        protected var _autoClipping:Boolean;
    }
}


//      class Papervision3D
package org.papervision3d 
{
    import org.papervision3d.core.log.*;
    
    public class Papervision3D extends Object
    {
        public function Papervision3D()
        {
            super();
            return;
        }

        
        {
            useDEGREES = true;
            usePERCENT = false;
            useRIGHTHANDED = false;
            NAME = "Papervision3D";
            VERSION = "2.0.0";
            DATE = "March 12th, 2009";
            AUTHOR = "(c) 2006-2008 Copyright by Carlos Ulloa | John Grden | Ralph Hauwert | Tim Knip | Andy Zupko";
            PAPERLOGGER = org.papervision3d.core.log.PaperLogger.getInstance();
        }

        public static var useDEGREES:Boolean=true;

        public static var useRIGHTHANDED:Boolean=false;

        public static var PAPERLOGGER:org.papervision3d.core.log.PaperLogger;

        public static var NAME:String="Papervision3D";

        public static var DATE:String="March 12th, 2009";

        public static var AUTHOR:String="(c) 2006-2008 Copyright by Carlos Ulloa | John Grden | Ralph Hauwert | Tim Knip | Andy Zupko";

        public static var VERSION:String="2.0.0";

        public static var usePERCENT:Boolean=false;
    }
}


//  class Main
package 
{
    import com.zam.*;
    import flash.display.*;
    import flash.events.*;
    import flash.net.*;
    import flash.system.*;
    
    public class Main extends flash.display.Sprite
    {
        public function Main()
        {
            var loc3:*;
            loc3 = null;
            var loc4:*;
            loc4 = null;
            this.ZAMLogo = Main_ZAMLogo;
            super();
            stage.quality = "low";
            stage.align = "TL";
            stage.scaleMode = "noScale";
            flash.system.Security.allowDomain("*");
            var loc1:*;
            loc1 = new RegExp("^http:\\/\\/.*\\.(wowhead|allakhazam|thottbot)\\.com\\/", "i");
            if (!loc1.test(root.loaderInfo.url) && false)
            {
                trace("BUSTED");
                loc3 = (new this.ZAMLogo() as flash.display.Bitmap).bitmapData;
                (loc4 = new flash.display.MovieClip()).graphics.beginBitmapFill(loc3);
                loc4.graphics.drawRect(0, 0, loc3.width, loc3.height);
                loc4.graphics.endFill();
                loc4.x = stage.stageWidth / 2 - loc3.width / 2;
                loc4.y = stage.stageHeight / 2 - loc3.height / 2;
                loc4.buttonMode = true;
                loc4.addEventListener("mouseDown", this.onLogoClick);
                addChild(loc4);
                return;
            }
            var loc2:*;
            loc2 = new com.zam.Viewer(loaderInfo.parameters, root.loaderInfo.url);
            addChild(loc2);
            return;
        }

        private function onLogoClick(arg1:flash.events.Event):void
        {
            flash.net.navigateToURL(new flash.net.URLRequest("http://www.zam.com"), "_self");
            return;
        }

        private var ZAMLogo:Class;
    }
}


//  class Main_ZAMLogo
package 
{
    import mx.core.*;
    
    public class Main_ZAMLogo extends mx.core.BitmapAsset
    {
        public function Main_ZAMLogo()
        {
            super();
            return;
        }
    }
}


