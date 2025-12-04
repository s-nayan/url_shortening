import express from "express";
import { nanoid } from "nanoid";
import Url from "../models/url";
import dotenv from "dotenv";
import { validateUrl } from "../utils";

dotenv.config({path:"../.env"});

const router = express.Router();

router.post("/",async(req,res) => {
    const {originalId} = req.body;
    const base = process.env.BASE;
    const urlId = nanoid(5);
    if(validateUrl(originalId)){
        try{
            let url = await Url.findOne({originalId});
            if(url){
                return req.json(url);
            }else{
                const shortUrl = `${base}/${urlId}`;
                let url = new Url({
                    urlId,
                    originalId,
                    shortUrl,
                    accessCount:0,
                });

                await url.save();
                res.json(url);
            }
        }catch(err){
            console.log(err);
            res.status(500).json("Server Error");
        }
    }else{
        res.status(400).json("Invalid URl");
    }
});
router.get("/:urlId/status",async (req,res) => {
    try{
        const urlId = req.params.urlId;
        const url = await Url.findOne({urlId});
        if(url){
            return res.status(200).json(url);
        }else{
            return res.status(404).json("Not found");
        }
    }catch(err){
        console.log(err);
        return res.status(500).json("Server Error");
    }
});

router.get("/:urlId", async (req,res) => {
    try{
        const urlId = req.params.urlId;
        const url = await Url.findOne({ urlId,});
        if(url){
            return res.status(200).json("url");
        }else{
            res.status(404).json("Not found");
        }
    }catch(err){
        console.log(err);
        res.status(500).json("Server Error");
    }
});

router.put("/:urlId", async (req,res) => {
    const {urlId} = req.params;
    const {newUrl} = req.body;
    const base = process.env.BASE;
    if(validateUrl(newUrl)){
        try{
            let url = await Url.findOne({urlId});
            if(url){
                let updateUrl = await Url.findOneAndUpdate(
                    {urlId},
                    {originalId:newUrl},
                    {new:true}
                );
                return res.json(updateUrl);
            }else{
                res.status(404).json("Not found");
            }
        }catch(err){
            console.log(err);
            return res.status(500).json("Server Error");
        }
    }else{
        res.status(400).json("Invalid Url");
    }
});
router.delete("/urlId", async (req,res) => {
    try{
        const urlId = req.params.urlId;
        const url = Url.findByIdAndDelete({urlId});
        if(url){
            return res.status(204).json("Deleted");
        }else{
            return res.status(404).json("Not found");
        }
    }catch(err){
        console.log(err);
        return res.status(500).json("Server Error");
    }
});

export default router;