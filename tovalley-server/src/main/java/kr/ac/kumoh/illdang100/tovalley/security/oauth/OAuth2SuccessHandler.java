package kr.ac.kumoh.illdang100.tovalley.security.oauth;

import kr.ac.kumoh.illdang100.tovalley.domain.member.Member;
import kr.ac.kumoh.illdang100.tovalley.security.auth.PrincipalDetails;
import kr.ac.kumoh.illdang100.tovalley.security.jwt.JwtProcess;
import kr.ac.kumoh.illdang100.tovalley.security.jwt.JwtVO;
import kr.ac.kumoh.illdang100.tovalley.security.jwt.RefreshTokenRedisRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static kr.ac.kumoh.illdang100.tovalley.util.CustomResponseUtil.ISLOGIN;
import static kr.ac.kumoh.illdang100.tovalley.util.CustomResponseUtil.addCookie;
import static kr.ac.kumoh.illdang100.tovalley.util.CustomResponseUtil.saveRefreshToken;

@Slf4j
@RequiredArgsConstructor
@Component
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtProcess jwtProcess;

    private  final RefreshTokenRedisRepository refreshTokenRedisRepository;

    private static final String REDIRECT_URL = "http://localhost:3000";


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();

        Member member = principalDetails.getMember();

        String accessToken = jwtProcess.createAccessToken(principalDetails);

        String refreshToken = saveRefreshToken(jwtProcess, refreshTokenRedisRepository, member);

        addCookie(response, JwtVO.ACCESS_TOKEN, accessToken);
        addCookie(response, JwtVO.REFRESH_TOKEN, refreshToken);
        addCookie(response, ISLOGIN, "true", false);

        getRedirectStrategy().sendRedirect(request, response, REDIRECT_URL);
    }
}
