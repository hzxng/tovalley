package kr.ac.kumoh.illdang100.tovalley.dto.page;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.domain.Page;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import static kr.ac.kumoh.illdang100.tovalley.dto.review.ReviewRespDto.*;

public class WaterPlaceDetailPageRespDto {

    @AllArgsConstructor
    @Data
    public static class WaterPlaceDetailAllRespDto {

        private List<DailyWaterPlaceWeatherDto> waterPlaceWeathers; // 물놀이 장소 날씨 (5일)
        private WaterPlaceDetailRespDto waterPlaceDetails; // 물놀이 장소 정보
        private RescueSupplyRespDto rescueSupplies; // 구조용품 현황
        private WaterPlaceAccidentFor5YearsDto accidents; // 최근 5년간 사고 수
        private Map<LocalDate, Integer>  tripPlanToWaterPlace; // 여행 계획
        private WaterPlaceReviewDetailRespDto reviewRespDto; // 리뷰
    }

    @AllArgsConstructor
    @Data
    public static class WaterPlaceReviewDetailRespDto {
        private Double waterPlaceRating; // 물놀이 장소 평점
        private int reviewCnt; // 리뷰 수
        private Map<Integer, Long> ratingRatio;
        private Page<WaterPlaceReviewRespDto> reviews; // 리뷰
    }

    @AllArgsConstructor
    @Data
    public static class WaterPlaceAccidentFor5YearsDto {

        private Integer totalDeathCnt;
        private Integer totalDisappearanceCnt;
        private Integer totalInjuryCnt;
    }

    @AllArgsConstructor
    @Builder
    @Data
    public static class WaterPlaceDetailRespDto {

        private String waterPlaceImage; // 물놀이 장소 사진
        private String waterPlaceName; // 물놀이 장소 명칭
        private String latitude; // 위도
        private String longitude; // 경도
        private String detailAddress; // 주소 + 세부지명(null)
        private String town; // 읍면(null)
        private String annualVisitors; // 연평균 총 이용객수(천명)
        private String safetyMeasures; // 안전조치 사항
        private String waterPlaceSegment; // 물놀이구간(m)
        private String dangerSegments; // 위험구역구간(null)
        private String dangerSignboardsNum; // 위험구역 설정 안내표지판(합계)
        private Double waterTemperature; // 계곡 수온(°C)
        private Double bod; // BOD(mg/L)
        private Double turbidity; // 탁도(NTU)
    }

    @AllArgsConstructor
    @Builder
    @Data
    public static class RescueSupplyRespDto {

        private Integer lifeBoatNum; // 인명구조함(null)
        private Integer portableStandNum; // 이동식거치대(null)
        private Integer lifeJacketNum; // 구명조끼(null)
        private Integer lifeRingNum; // 구명환(null)
        private Integer rescueRopeNum; // 구명로프(null)
        private Integer rescueRodNum; // 구조봉(null)
    }

    @AllArgsConstructor
    @Data
    public static class DailyWaterPlaceWeatherDto {

        @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
        private LocalDate weatherDate;
        private String climateIcon; // 날씨 아이콘 ID
        private String climateDescription; // 날씨 설명
        private Double lowestTemperature; // 최소 일일 온도
        private Double highestTemperature; // 최고 일일 온도
        private Integer humidity; // 습도(%)
        private Double windSpeed; // 풍속(m/s)
        private Double rainPrecipitation; // 강수량(mm)
        private Integer clouds; // 흐림(%)
        private Double dayFeelsLike; // 주간 체감 온도
    }
}
