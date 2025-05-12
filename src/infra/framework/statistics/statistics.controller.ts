import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetStatisticsUseCase } from 'src/use-cases/statistics/get-statistics/get-statistics';

@ApiTags('Statistics')
@Controller('statistics')
export class StatisticsController {
    constructor(private getStatisticsUseCase: GetStatisticsUseCase) { }
    
    @Get()
    getStatistics() {
        return this.getStatisticsUseCase.execute();
    }
    
}
