import { AirbagService , CrashSensor, AirbagIgniter, AirbagResult} from "../../services/airbag.services";
import {when} from 'jest-when';
import { mock, MockProxy } from 'jest-mock-extended'

describe('AirbagService', () => {
    let sensorMock: MockProxy<CrashSensor>;
    let igniterMock : MockProxy<AirbagIgniter>;
    let service: AirbagService;

      beforeEach(() => {
    sensorMock = mock<CrashSensor>();
    igniterMock = mock<AirbagIgniter>();
    service = new AirbagService(sensorMock, igniterMock);
  });

    it('deploys the airbag when a crash is detected', () => {
        //arrange
        when(sensorMock.isCrashDetected).calledWith().mockReturnValue(true);
        //act
        const res:AirbagResult = service.deployAirbag();
        //assert
        expect(res).toEqual({triggered : true, force:100, timing:50});
        expect(sensorMock.isCrashDetected).toHaveBeenCalled();
        expect(igniterMock.trigger).toHaveBeenCalledWith(100, 50);
    });

    //to make sure the ignitor function is never called when the sensor value returns false 
    it('does not deploy the airbag when no crash is detected', () => {
      when(sensorMock.isCrashDetected).calledWith().mockReturnValue(false);
      const res:AirbagResult = service.deployAirbag();
      expect(res).toEqual({triggered:false});
      expect(sensorMock.isCrashDetected).toHaveBeenCalled();
      expect(igniterMock.trigger).not.toHaveBeenCalled();
    })
})