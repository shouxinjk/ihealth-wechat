package com.shouxin.weixin.api;

import me.chanjar.weixin.common.exception.WxErrorException;

public interface WxMpService {
	/**
	  * ��ȡaccess_token, ��ǿ��ˢ��access_token
	  * @see #getAccessToken(boolean)
	  * @return
	  * @throws WxErrorException
	 */
	public String getAccessToken() throws Exception;

	  /**
	   * <pre>
	   * ��ȡaccess_token���������̰߳�ȫ
	   * ���ڶ��߳�ͬʱˢ��ʱֻˢ��һ�Σ����ⳬ��2000��/�յĵ��ô�������
	   * 
	   * ����service�����з���������access_token�����ǵ��ô˷���
	   * 
	   * ����Ա�ڷǱ�Ҫ����¾�����Ҫ�������ô˷���

	   * �������: http://mp.weixin.qq.com/wiki/index.php?title=��ȡaccess_token
	   * </pre>
	   * @param forceRefresh ǿ��ˢ��
	   * @return
	   * @throws me.chanjar.weixin.common.exception.WxErrorException
	   */
	public String getAccessToken(boolean forceRefresh) throws Exception;
}
