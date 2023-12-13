import express from 'express'
import SectionModel from '../models/section.js'
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const sections = await SectionModel.find({})
        if(!sections){
            return res.status(404).json({ error: 'sections not found' });
        }
        res.status(200).json(sections)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal server error"})
    }
})

router.get('/:sectionId', async (req, res) => {
    try {
        const section = await SectionModel.findById(req.params.sectionId).populate('snippets')    
        if(!section){
            return res.status(404).json({ error: 'section not found' });
        }
        res.status(200).json(section)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal server error"})
    }
})

router.post('/', async (req, res) => {
    try {
        const section = await SectionModel.create(req.body)        
        if(!section){
            return res.status(500).json({ error: ' Failed to create the section ' });
        }
        res.status(200).json({ message: 'section Created successfully' })
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal server error"})
    }
})

router.put('/:sectionId', async (req, res) => {
    try {
        const sectionId = req.params.sectionId
        const section = await SectionModel.findById(sectionId)
        if(!section){
            return res.status(404).json({error: 'section not found'})
        }
        const updatedSection = await SectionModel.findByIdAndUpdate(sectionId, {snippets: req.body.snippets})
        if(!updatedSection){
            return res.status(500).json({ error: 'section not Updated' });
        }
        res.status(200).json({ message: 'Section Updated successfully' })
    } catch (error) {
        res.status(500).json({error: "Internal server error"})
    }
})

router.delete('/:sectionId', async (req, res) => {
    try {
        const section = await SectionModel.findById(req.params.sectionId)        
        if(!section){
            return res.status(404).json({ error: 'section not found' });
        }
        const deletedSection = await SectionModel.findByIdAndDelete(req.params.sectionId)
        if (!deletedSection) {
            return res.status(500).json({ error: 'snippet not Deleted' });
        }
        res.status(200).json({ message: 'Snippet Deleted successfully' })
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal server error"})
    }
})

export default router