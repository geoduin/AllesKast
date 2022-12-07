import { ImageValidationService} from './ImageValidationService';
describe('Test test (1)', ()=>{
    let service: ImageValidationService;

    it('Test test-service', ()=>{
        service = new ImageValidationService();
        expect(service.GetHello()).toEqual("Hello");
    })
})